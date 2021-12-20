// @ts-check

/** @type {import('next').NextConfig} */
module.exports = withTM({
  images: {
    domains: ['terraforms.oolong.lol', 'terraforms-supplemental.vercel.app'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  reactStrictMode: true,
});
