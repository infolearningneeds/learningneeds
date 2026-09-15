/**
 * Detects any Supabase storage URL, across all buckets (product-images,
 * blog-images, gallery, etc.) and any Supabase project.
 *
 * Why this exists: on some dev networks (DNS64/NAT64 resolvers), Node
 * resolves Supabase's hostname to a synthesized IPv6 address in the
 * 64:ff9b::/96 range. Next.js's built-in image optimizer has an SSRF guard
 * that misreads these as private IPs and refuses to fetch the image,
 * producing:
 *   "⨯ upstream image https://xxx.supabase.co/... resolved to private ip"
 *
 * Supabase storage already serves images from its own CDN, so there's
 * little benefit to re-optimizing them server-side anyway — bypassing
 * Next's optimizer for these URLs sidesteps the bug with no real downside.
 */
export function isSupabaseImage(src: string | null | undefined): boolean {
    if (!src) return false;
    return /\.supabase\.co\/storage\//.test(src);
}
