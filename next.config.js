/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatar.iran.liara.run",
      "influenergybucket.s3.us-west-1.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "influenergy.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/creators/**",
      },
    ],
  },
};

module.exports = nextConfig;
