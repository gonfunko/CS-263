function initialize() {
	var dropbox = document.getElementById("dropbox");
	dropbox.addEventListener("dragenter", noopHandler, false);
	dropbox.addEventListener("dragexit", noopHandler, false);
	dropbox.addEventListener("dragover", noopHandler, false);
	dropbox.addEventListener("drop", drop, false);
	
	var fileSelect = document.getElementById("fileSelect"),
	  fileElem = document.getElementById("fileElem");
 
	fileSelect.addEventListener("click", function (e) {
	  if (fileElem) {
	    fileElem.click();
	  }
	  e.preventDefault(); // prevent navigation to "#"
	}, false);
}

function noopHandler(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

function drop(event) {
	event.stopPropagation();
	event.preventDefault();
 
	var files = event.dataTransfer.files;
	var count = files.length;
 
	if (count > 0) {
		handleFiles(files);
	}
}

function handleFiles(files) {
	var file = files[0];
 
	document.getElementById("instructionalText").innerHTML = "Loading...";
	 
	var reader = new FileReader();

	reader.onload = function(event) {
		var imageData = event.target.result;
		showImagePreview(imageData);
		showCrunchStatus();
		createEmscriptenFiles(imageData);
		runPNGCrush();
	};
		
	reader.readAsDataURL(file);
}

function showImagePreview(imageData) {
	var preview = document.getElementById("preview");
	preview.style.display = "block";
	preview.src = imageData;
}

function showCrunchStatus() {
	document.getElementById("instructionalText").style.display = "none";
	document.getElementById("dropbox").style.border = "none";
	document.getElementById("innerDropbox").style.border = "none";
	document.getElementById("crunchStatus").style.display = "block";
}

function createEmscriptenFiles(imageData) {
	var byteArray = b64ToByteArray(imageData.substring(22)); 
	FS.createDataFile("/", "input.png", byteArray, true, false);
	_outputFile = FS.createDataFile("/", "output.png", "", true, true);
}

function runPNGCrush() {
	var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_STATIC) ];
	pad();
	argv.push(allocate(intArrayFromString("/input.png"), 'i8', ALLOC_STATIC));
	pad();
	argv.push(allocate(intArrayFromString("/output.png"), 'i8', ALLOC_STATIC));
	pad();
	argv.push(0);
	argv = allocate(argv, 'i32', ALLOC_STATIC);
	var argc = 3;
	console.log(new Date());
	Module['_main'](argc, argv, 0);

	function pad() {
		for (var i = 0; i < 4-1; i++) {
			argv.push(0);
		}
	}
}

function prepareDownload() {
	console.log(new Date());
	var typedArray = new Uint8Array(_outputFile.contents);
	var blob = new Blob([typedArray], {type: "application/octet-binary"});
	saveAs(blob, "compressed.png");
	reset();
}

function reset() {
	document.getElementById("instructionalText").innerHTML = "Drag a file here to compress it";
	document.getElementById("instructionalText").style.display = "block";
	document.getElementById("dropbox").style.border = "6px dashed #ffffff";
	document.getElementById("innerDropbox").style.border = "6px dashed #bbbbbb";
	document.getElementById("crunchStatus").style.display = "block";
	document.getElementById("preview").style.display = "none";
	
	FS.deleteFile("/input.png");
	FS.deleteFile("/output.png");
}