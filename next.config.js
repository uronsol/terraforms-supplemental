// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      'terraforms.oolong.lol',
      'terraforms-supplemental.vercel.app',
      'tokens.mathcastles.xyz',
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  reactStrictMode: true,
};
