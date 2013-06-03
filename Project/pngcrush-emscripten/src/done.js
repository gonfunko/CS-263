mergeInto(LibraryManager.library, {
crunch_done: function() {
	prepareDownload();
}
});

mergeInto(LibraryManager.library, {
finish_crushing: function(percent) {
	document.getElementById("maintext").innerHTML = ("All done!");
	document.getElementById("subtext").innerHTML = ("Enjoy your shiny new file. It's now " + percent + "% smaller!");
}
});