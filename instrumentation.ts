export async function register() {
  // Only run on the Node.js server runtime (not the Edge runtime, not the browser).
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("dns");

    // On some networks (WSL2, certain VPNs/ISPs, IPv6-only setups) Node's
    // default DNS resolution order returns NAT64-synthesized IPv6 addresses
    // (64:ff9b::/96) for hosts that only have an IPv4 address. Next.js's
    // image optimizer has an SSRF guard that misreads these as private IPs
    // and blocks the fetch, even though the underlying address is public.
    //
    // Forcing IPv4-first resolution avoids NAT64 synthesis entirely and
    // fixes the "upstream image ... resolved to private ip" error.
    dns.setDefaultResultOrder("ipv4first");
  }
}