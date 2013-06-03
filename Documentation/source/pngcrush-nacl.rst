PNGCrush Native Client Demo
===========================

Getting the Demo
----------------

The PNGCrush Emscripten demo is available at https://github.com/gonfunko/CS-263/tree/master/Project/pngcrush-emscripten. To get the source, clone the root git repo and copy the pngcrush-nacl folder into the examples directory of the Pepper SDK in your Native Client installation.

Installation and Use
--------------------

Before the demo is functional, you will need to compile the Native Client module. To do so, see the `Compilation`_ section below. Once you have done so, from the examples directory of the Pepper SDK in your Native Client installation, run the following command:

* ``python ../sdk_tools/httpd.py``

Then navigate to `http://localhost:5103/pngcrush-nacl/index.html <http://localhost:5103/pngcrush-nacl/index.html>`_ in Google Chrome. You will likely need to go into  `chrome://flags/ <chrome://flags/>`_ and enable Native Client for all web applications, not just those installed from the Chrome Web Store. At this point, the demo should work fine. As in the Emscripten version, drag a PNG image into the drag region in the lower left corner. Alternatively, you can use the Upload an image button to choose a PNG using a standard file picker dialog. As soon as the image is uploaded, PNGCrush will be run on it, and the compressed image will be downloaded to your system.

Compilation
-----------

To build the Native Client module, first copy the pngcrush-nacl folder into the examples directory of the Pepper SDK in your Native Client installation. Next, ``cd`` into the pngcrush-nacl directory and run ``make``. The project should compile, albeit with a few warnings. To view the demo, follow the instructions in the `Installation and Use`_ section above.