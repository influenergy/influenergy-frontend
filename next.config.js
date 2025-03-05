/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "influenergybucket.s3.us-west-1.amazonaws.com",
        pathname: "/creators/**",
      },
      {
        protocol: "https",
        hostname: "influenergy.s3.ap-south-1.amazonaws.com",
        pathname: "/creators/**",
      },
    ],
  },
};

module.exports = nextConfig;
