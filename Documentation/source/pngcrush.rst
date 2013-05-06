Porting pngcrush
================

While Emscripten makes it simple to port basic programs, it is most impressive when used to make fairly complex software available on the web. As an example, this document shows how to use Emscripten to compile pngcrush to Javascript.

What it is
----------

PNGCrush is a command-line program that compresses .PNG image files with various compression and filtering methods to produce the smallest possible image. It takes as input a PNG image, and writes out the compressed version. The latest source (this tutorial assumes version 1.7.58) is available at http://sourceforge.net/projects/pmt/files/latest/download?source=files.

JSifying pngcrush
-----------------

To begin, download and extract the pngcrush source code, then ``cd`` into the directory it was extracted to. There are 50 or so C files and a Makefile. Although the official Emscripten documentation (https://github.com/kripken/emscripten/wiki/Building-Projects) suggests that simply swapping ``./configure`` and ``make`` with ``emconfigure ./configure`` and ``emmake make``, in practice this is rarely sufficient. It is however easy, and is therefore worth trying before proceeding. In the case of pngcrush, there is no ``configure`` file. Running ``emmake make`` actually builds pngcrush normally using ``gcc``, producing an x86 executable. This is not the desired behavior, so we'll have to make some changes.

Making make work
----------------

The first thing to try changing is the Makefile. Open it in a text editor and replace the occurrences of ``gcc`` with ``emcc``, then save the Makefile, switch back to the terminal, and try running ``emmake make`` again. Once again, files will be compiled. This time, ``emcc`` will compile the C files into LLVM bitcode, then link them into a single LLVM bitcode file named ``pngcrush``. This is neither an x86 executable nor Javascript, but it is something we can work with.

Bitcode to Javascript
---------------------

For the final stage, we need to convert the bitcode file to Javascript. First, rename the bitcode file so ``emcc`` knows what to do with it:

``mv pngcrush pngcrush.bc``

Next, invoke ``emcc`` one more time:

``emcc pngcrush.bc -o pngcrush.js``

After a bit of time, the final Javascript program will be created. To run it, type the following at a terminal:

``node pngcrush.js``

You'll see pngcrush output usage instructions, since it wasn't invoked with any arguments. Actually using input and output files is a bit more complex - take a look at the documentation for the file system APIs for guidance.