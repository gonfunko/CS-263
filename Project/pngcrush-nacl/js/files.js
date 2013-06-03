var localFileSystem = null;

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
	
	window.webkitRequestFileSystem(PERSISTENT, 1024*1024*10, onInitFs, errorHandler);
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

function onInitFs(fs) {
	localFileSystem = fs;
}

function handleFiles(files) {
	var file = files[0];
 
	document.getElementById("instructionalText").innerHTML = "Loading...";
	 
	var reader = new FileReader();

	reader.onload = (function(theFile) { return function(e) {
		var data = e.target.result;
		document.getElementById("instructionalText").style.display = "none";
		document.getElementById("dropbox").style.border = "none";
		document.getElementById("innerDropbox").style.border = "none";
		document.getElementById("crunchStatus").style.display = "block";
		document.getElementById("progress").style.display = "block";
		document.getElementById("progressBar").style.width = "0px";
		document.getElementById("maintext").innerHTML = "Crunching your image...";
		document.getElementById("subtext").innerHTML = "Hang tight &mdash; this might take a bit";
		var img = document.getElementById("preview");
		img.src = data;
		img.style.display = "block";
		
	     localFileSystem.root.getFile('/input.png', {create: true}, function(fileEntry) {

	        // Create a FileWriter object for our FileEntry (log.txt).
	        fileEntry.createWriter(function(fileWriter) {

	          fileWriter.onwriteend = function(e) {
	            console.log('Write completed.');
			  	console.log(new Date());
			  document.getElementById('nacl_module').postMessage(makeCall('fopen', ""));
	          };

	          fileWriter.onerror = function(e) {
	            console.log('Write failed: ' + e.toString());
	          };

			var blob = window.dataURLtoBlob(data);
			console.log(blob);

	          fileWriter.write(blob);

	        }, errorHandler);

	      }, errorHandler);

	};})(file);
	
	reader.readAsDataURL(file);
}

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

function incrementProgress() {
	var progressBar = document.getElementById('progressBar');
	var width = parseInt(progressBar.style.width);
	progressBar.style.width = (width + 2) + 'px';
}

function prepareDownload() {
	console.log(new Date());
	localFileSystem.root.getFile('output.png', {}, function(fileEntry) {

	    // Get a File object representing the file,
	    // then use FileReader to read its contents.
	    fileEntry.file(function(file) {
	       var reader = new FileReader();

	       reader.onloadend = function(e) {
		    var blob = window.dataURLtoBlob(this.result);
		    saveAs(blob, "compressed.png");
	       };

	       reader.readAsDataURL(file);
	    }, errorHandler);

	  }, errorHandler);
	  
	document.getElementById("progress").style.display = "none";
	document.getElementById("maintext").innerHTML = "All done!";
	
	reset();
}

function reset() {
	document.getElementById("instructionalText").innerHTML = "Drag a file here to compress it";
	document.getElementById("instructionalText").style.display = "block";
	document.getElementById("dropbox").style.border = "6px dashed #ffffff";
	document.getElementById("innerDropbox").style.border = "6px dashed #bbbbbb";
	document.getElementById("crunchStatus").style.display = "block";
	document.getElementById("preview").style.display = "none";
}
