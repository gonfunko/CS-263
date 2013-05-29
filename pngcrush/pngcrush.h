/* pngcrush.h */

/*
 * This software is released under a license derived from the libpng
 * license (see LICENSE, in pngcrush.c).
 */

/* Special defines for pngcrush version 1.7.58 */

#ifndef PNGCRUSH_H
#define PNGCRUSH_H

char* foo();
char* main_func(int argc, char* argv[]);

/* Do not build stuff we will not use */
#undef PNG_BUILD_GRAYSCALE_PALETTE_SUPPORTED
#undef PNG_CONVERT_tIME_SUPPORTED
#undef PNG_EASY_ACCESS_SUPPORTED
#undef PNG_FIXED_POINT_SUPPORTED
#undef PNG_INCH_CONVERSIONS_SUPPORTED
#undef PNG_INFO_IMAGE_SUPPORTED
#undef PNG_IO_STATE_SUPPORTED
#undef PNG_PROGRESSIVE_READ_SUPPORTED
#undef PNG_READ_ALPHA_MODE_SUPPORTED
#undef PNG_READ_BGR_SUPPORTED
#undef PNG_READ_COMPOSITE_NODIV_SUPPORTED
#if PNG_LIBPNG_VER >= 10600
#  undef PNG_READ_GAMMA_SUPPORTED
#endif
#undef PNG_READ_STRIP_16_TO_8_SUPPORTED
#undef PNG_READ_SWAP_ALPHA_SUPPORTED
#undef PNG_READ_SWAP_SUPPORTED
#undef PNG_READ_INVERT_ALPHA_SUPPORTED
#undef PNG_READ_INVERT_SUPPORTED
#undef PNG_READ_PACKSWAP_SUPPORTED
#undef PNG_READ_QUANTIZE_SUPPORTED
#undef PNG_READ_USER_CHUNKS_SUPPORTED
#undef PNG_USER_CHUNKS_SUPPORTED
#undef PNG_TIME_RFC1123_SUPPORTED
#undef PNG_WRITE_BGR_SUPPORTED
#undef PNG_WRITE_GET_PALETTE_MAX_SUPPORTED
#undef PNG_WRITE_INVERT_ALPHA_SUPPORTED
#undef PNG_WRITE_INVERT_SUPPORTED
#undef PNG_WRITE_OPTIMIZE_CMF_SUPPORTED
#undef PNG_WRITE_SWAP_ALPHA_SUPPORTED
#undef PNG_WRITE_SWAP_SUPPORTED
#undef PNG_WRITE_WEIGHTED_FILTER_SUPPORTED

#if PNG_LIBPNG_VER >= 10600
#  undef PNG_SIMPLIFIED_READ_AFIRST_SUPPORTED
#  undef PNG_SIMPLIFIED_READ_BGR_SUPPORTED
#  undef PNG_SIMPLIFIED_READ_SUPPORTED
#  undef PNG_SIMPLIFIED_WRITE_AFIRST_SUPPORTED
#  undef PNG_SIMPLIFIED_WRITE_BGR_SUPPORTED
#  undef PNG_SIMPLIFIED_WRITE_SUPPORTED
#endif

#if PNG_LIBPNG_VER < 10400
/* This allows png_default_error() to return, when it is called after our
 * own exception handling, which only returns after "Too many IDAT's",
 * or anything else that we might want to handle as a warning instead of
 * an error.  Doesn't work in libpng-1.4.0 and later; there we use
 * png_benign_error() instead.
 */
//#  undef PNG_ABORT()
//#  define PNG_ABORT()
   /* Suppress pedantic warnings in libpng-1.4.x */
#  define PNG_NORETURN /* This function does not return */
#endif

#endif /* !PNGCRUSH_H */
