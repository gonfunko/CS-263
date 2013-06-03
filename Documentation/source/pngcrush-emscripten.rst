PNGCrush Emscripten Demo
========================

Getting the Demo
----------------

The PNGCrush Emscripten demo is available at https://github.com/gonfunko/CS-263/tree/master/Project/pngcrush-emscripten. To get the source, clone the root git repo and copy the pngcrush-emscripten folder into a directory being served by a web server.

Installation and Use
--------------------

The entire demo is functional as soon as it is being served. Navigate to index.html in a browser, and drag a PNG image into the drag region in the lower left corner. Alternatively, you can use the Upload an image button to choose a PNG using a standard file picker dialog. As soon as the image is uploaded, PNGCrush will be run on it, and the compressed image will be downloaded to your system.

Recompiling
-----------

If you'd like to rebuild the main PNGCrush JavaScript file, you can do so fairly easily. Start by following the instructions in `Installation <installation.html>`_.

Then, copy the src directory to the same directory as your Emscripten installation directory (named emscripten), ``cd`` into src, and run the following commands:

* ``make``
* ``mv pngcrush pngcrush.bc``
* ``../emscripten/emcc pngcrush.bc --js-library done.js -O2 --closure 0 -o pngcrush.js``

The final command compiles the LLVM bitcode to JavaScript, includes the functions in the ``done.js`` file, runs at a high optimization level, disables the Closure compiler (necessary to prevent runtime issues) and writes out ``pngcrush.js``. This file can be copied into the ``js`` directory to deploy it.

