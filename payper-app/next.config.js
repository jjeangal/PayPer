/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'next-blog-wordpress.vercel.app',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '*',
                port: '',
            }
        ],
    },
}

module.exports = nextConfig
