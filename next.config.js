/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 👈 YEH MAGICAL LINE HAI
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig