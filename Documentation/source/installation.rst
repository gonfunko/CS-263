Installing Emscripten
=====================

This document assumes that you are installing Emscripten on a fresh installation of OS X 10.8 Mountain Lion.

Prereqs
-------

Before installing Emscripten, you will need to install and configure its dependencies.

Xcode Command Line Tools
~~~~~~~~~~~~~~~~~~~~~~~~
Before proceeding, you should install the Xcode command line tools. These provide a base set of common utilities, compilers and other tools. You can install the tools either through Xcode or directly from Apple's website.

**To install the Command Line Tools via Xcode:**

* If you haven't already, install Xcode.
	- Open the Finder
	- Navigate to /Applications
	- Open the App Store
	- Search for Xcode
	- Click the FREE button
	- Enter your Apple ID and password
	- When the download completes, Xcode will be in your Applications folder
* Open Xcode in /Applications
* Choose Xcode > Preferences... in the menu bar
* Click the Downloads tab in the toolbar
* If it is not already selected, click the Components tab in the Downloads section of Preferences
* Click the Install button next to Command Line Tools in the table
* Enter your username and password, and wait for the download to complete

**To install the Command Line Tools manually:**

* Go to https://developer.apple.com/mac, click Sign in, and enter your Apple ID username and password
	- If you have set up your Apple ID as a developer account, click the Register button below the username and password field and do so first
* Scroll to the bottom and click View all downloads in the Additional Downloads section
* In the list of available downloads, look for and click on the most recent version of the Command Line Tools. As of this writing, that is "Command Line Tools (OS X Mountain Lion) for Xcode - April 2013"
* Click the link next to the disk image icon to download them
* When the download completes, open ~/Downloads and double click the .dmg to mount it
* In the .dmg, run the installer

Homebrew
~~~~~~~~

Homebrew is a package manager for OS X that makes it much easier to install and configure the other utilities Emscripten depends on. More information is available at http://mxcl.github.io/homebrew/.

To install Homebrew, copy and paste ``ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"`` into Terminal and follow the script's instructions. When it is done, run ``brew doctor``, ``brew update`` and ``brew upgrade``. If you already have Homebrew installed, make sure to run ``brew update`` and ``brew upgrade`` before proceeding.

Other Utilities
~~~~~~~~~~~~~~~

With Homebrew installed, you can now use it to install other utilities Emscripten depends on. These are based on https://gist.github.com/nathanhammond/1974955.

* ``brew install node spidermonkey closure-compiler yuicompressor``
* ``brew install llvm --with-clang``

Getting the Source
------------------

At this point, you're ready to install Emscripten. First, you'll need to get the source. To do so, open a Terminal, ``cd`` to the directory you want Emscripten to reside at, and run ``git clone git://github.com/kripken/emscripten.git``

Finalizing Installation
-----------------------

To begin, ``cd`` into the directory you cloned Emscripten into in the previous step. Then, run ``python emcc``. This will write out a configuration file at ``~/.emscripten``. Open this file in your editor of choice and replace the line
``LLVM_ROOT = os.path.expanduser(os.getenv('LLVM') or '/usr/bin') # directory``
with the line
``LLVM_ROOT = os.path.expanduser(os.getenv('LLVM') or '/usr/local/Cellar/llvm/3.2/bin') # directory``

Then, run ``python emcc`` again. If everything worked, you should see a few lines ending with ``emcc: no input files``. If you receive an error instead, consult the official Emscripten documentation at https://github.com/kripken/emscripten/wiki/Tutorial.

You are now ready to use Emscripten.