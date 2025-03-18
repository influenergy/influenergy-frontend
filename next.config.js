/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatar.iran.liara.run",
      "influenergy.s3.ap-south-1.amazonaws.com",
      "placehold.co",
      "influenergybucket.s3.us-west-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
