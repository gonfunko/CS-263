VALID_TOOLCHAINS:=newlib glibc pnacl linux win

NACL_SDK_ROOT?=$(abspath $(CURDIR)/../..)
include $(NACL_SDK_ROOT)/tools/common.mk

TARGET=pngcrusher

DEPS=ppapi_cpp
LIBS=$(DEPS) ppapi pthread nosys

ZHDR = zlib.h

ZSRCS  = adler32.c compress.c crc32.c deflate.c \
	 infback.c inffast.c inflate.c inftrees.c \
	 trees.c uncompr.c zutil.c

SRCS  = pngcrusher.cc pngcrush.c png.c pngerror.c pngget.c pngmem.c \
	pngpread.c pngread.c pngrio.c pngrtran.c pngrutil.c \
	pngset.c pngtrans.c pngwio.c pngwrite.c \
	pngwtran.c pngwutil.c $(ZSRCS)

$(foreach dep,$(DEPS),$(eval $(call DEPEND_RULE,$(dep))))
$(foreach src,$(SRCS),$(eval $(call COMPILE_RULE,$(src))))
$(eval $(call LINK_RULE,$(TARGET),$(SRCS),$(LIBS),$(DEPS)))
$(eval $(call NMF_RULE,$(TARGET),))