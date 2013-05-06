Dealing with Files
==================

Emscripten provides several options for supporting programs that need to handle file-based input and output. Part of the boilerplate wrapped around output programs is support for a basic virtualized file system and implementations of the C standard library functions for doing IO.

Basic File Support
------------------
If a program only needs to read from pre-existing data files, they can be compiled directly in to the output JavaScript. To do so, use the ``--preload-file`` flag to ``emcc``, passing a file or directory as an argument. The file(s) will then be accessible by name from ``fopen`` and other function calls from within the program.

File System API
---------------
For more advanced file system support, Emscripten provides a JavaScript-based file system API that allows for the dynamic creation and deletion of files, directories and symlinks. The official documentation at https://github.com/kripken/emscripten/wiki/Filesystem-Guide provides a good overview.

Creating Files and Directories
______________________________

Interacting with Emscripten's file system is fairly straightforward from within a HTML page containing the generated Javascript. To add a file to the file system, place the following Javascript within ``<script>`` tags::
	
	FS.createDataFile("/", "file.txt", "File contents here", true, true);

This will create a file named file.txt located at / with the contents "File contents here" and with both read and write permissions granted for the Emscripten program. After the call completes, the Emscripten program will be able to access the file, modify and save it through the normal C standard library functions. File contents can be provided as a string or as an array of bytes, and the path to create the file at can be specified by a string or by the return value from a call to ``FS.createPath`` or ``FS.createFolder``. 

``FS.createDataFile`` returns a reference to the file as a Javascript object. It includes some standard metadata, and its contents can be accessed through ``file.contents``, assuming the reference was stored in a ``var`` named ``file``.

Creating directories is similar to files. To create a subfolder at an already existing path, use::

	FS.createFolder("/", "name", true, true);

To create a folder named ``name`` at the path ``/`` with both read and write permissions. An entire directory structure can be recursively created by calling::

	FS.createPath("/", "usr/bin/local", true, true);
	
Again, the created directories (``usr``, ``bin``, and ``local``) will have both read and write permissions set (the respective ``true`` arguments).

Both ``createFolder`` and ``createPath`` return a reference to the deepest-nested folder.


Deleting Files
______________

Emscripten provides support for deleting both files and directories through the same call::

	FS.deleteFile("/foo.txt");
	FS.deleteFile("/usr/local/bin");
	
These will delete the file ``foo.txt`` in ``/`` and the directory ``bin`` in ``/usr/local``.


Persisting Data
_______________

In combination with HTML 5 local storage (http://diveintohtml5.info/storage.html), it is possible to save the state of Emscripten's virtual file system. To do so, the return values of ``FS.root`` and ``FS.nextInode`` should be saved, and then reassigned when the page is loaded in the future.