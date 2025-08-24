/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatar.iran.liara.run',
            port: '',
            pathname: '/public/**',
          },
          {
            protocol: "https",
            hostname: "placehold.co",
            pathname: "/public/**",
          },
          {
            protocol: 'https',
            hostname: 'influenergy.s3.ap-south-1.amazonaws.com',
            port: '',
            pathname: '/creators/**',
          },
          {
            protocol: "https",
            hostname: "via.placeholder.com", 
            pathname: "/**",
          },
        ],
      },
};

export default nextConfig;
