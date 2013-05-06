#!/usr/bin/python

import numpy
import sys

f = open(sys.argv[1], "r")
contents = f.read()

arr = numpy.fromstring(contents, dtype=numpy.uint8, sep=',')
filename = open("processed.png", "w")
arr.astype('uint8').tofile(filename)