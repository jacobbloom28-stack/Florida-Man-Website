import type { NextConfig } from "next";

// No remote image domains needed — the site uses illustrated CSS/emoji
// cards instead of stock photography, so next/image's remote loader isn't
// used anywhere.
const nextConfig: NextConfig = {};

export default nextConfig;
