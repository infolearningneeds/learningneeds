'use client'

import Image, { ImageProps } from 'next/image';
import { isSupabaseImage } from '@/lib/isSupabaseImage';

/**
 * Drop-in replacement for next/image's <Image>. Behaves identically, except
 * it automatically sets `unoptimized` for any Supabase storage URL, so call
 * sites don't need to remember `unoptimized={isSupabaseImage(src)}` every
 * time. Local images and other remote images still go through Next's
 * optimizer as normal.
 */
export default function SafeImage({ src, unoptimized, ...rest }: ImageProps) {
    const srcString = typeof src === 'string' ? src : undefined;
    const shouldSkipOptimization = unoptimized ?? isSupabaseImage(srcString);

    // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and forwarded via {...rest}
    return <Image src={src} unoptimized={shouldSkipOptimization} {...rest} />;
}
