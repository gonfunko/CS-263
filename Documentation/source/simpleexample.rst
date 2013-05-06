A Simple Example
=====================

Hello, World!
----------------

With Emscripten installed, you're now ready to use it to compile code. To begin, try the standard C Hello World program::

	#include <stdio.h>
	
	int main(int agrc, char *argv[]) {
		printf("Hello, world!\n");
		return 0;
	}
	
Save it into a file named ``hello.c``.

To compile code into Javascript, you use the Emscripten compiler, ``emcc``. It can take as input C or C++ code or LLVM bitcode and produce as output Javascript or Javascript embedded into an HTML page. File extensions are used by ``emcc`` to determine what input and output formats it should use for a particular invocation. To compile the above code to Javascript, run the following in a terminal:

``emcc hello.c -o hello.js``

This will produce a file named ``hello.js``. You can run it using node.js as follows:

``node hello.js``

And will receive the output you'd expect:

``Hello, world!``

If you open ``hello.js`` and inspect it, you'll find that it consists of several hundred lines of Javascript. Most of this is boilerplate that sets up the environment and emulates certain aspects of the system that C and C++ code expects, but you'll also find a _main function equivalent to that of the input file.

Compiler Options
----------------

Optimization Flags
__________________

Since ``emcc`` mostly wraps ``clang``, most standard compiler flags will also have their intended effect with Emscripten. During normal usage, the most important of these are likely to be the optimization flags. To improve performance, it's advisable to invoke ``emcc`` with ``-O1`` or ``-O2``. Consider the following rather inefficient program::

	#include <stdio.h>

	int main(int argc, char *argv[]) {
		int found = 0;
		long largestTestedNumber = 100000000;
	
		while (!found) {
			largestTestedNumber++;
			found = 1;
			int i;
			for (i = 1; i < 21; i++) {
				if (largestTestedNumber % i != 0)
					found = 0;
			}
		}
		
		printf("The smallest number evenly divisible by all the numbers from 1 to 20 is %i\n", largestTestedNumber);
		return 0;
	}
	
When compiled to native code by clang at optimization level O2, this program executes on a 1.8 GHz Core i7 in 3.05 seconds. When compiled to Javascript by Emscripten at optimization level O2 and executed by node.js on the same machine, it runs in 12.05 seconds - roughly 4 times slower, but still reasonable. However, if compiled without the optimization flag, the runtime grows to 164.42 seconds - a very significant difference.

Library Linking Flags
_____________________

Normally, when using libraries, a ``-llibname`` flag is required to cause the build product to be linked. Emscripten provides Javascript implementations of parts of several libraries, such as LibGL, OpenAL, SDL, and the C standard libraries. These do not need to be explicitly linked - if they are used, Emscripten will detect and link them without the ``-l`` flags. However, these flags are harmless if present.