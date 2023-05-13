const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// const withMDX = require("@next/mdx")({
//     extension: /\.mdx?$/,
// });

module.exports = withPlugins([[withBundleAnalyzer]], {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  compress: true,
  output: "standalone",
  future: {
    webpack5: true,
  },
  webpack: (config, { webpack }) => {
    const prod = process.env.NODE_ENV === "production";
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
          },
        },
      ],
    });

    // config.module.rules.push({
    //     test: /\.svg$/,
    //     use: ["@svgr/webpack"],
    // });

    // if (!dev && !isServer) {
    //     // Replace React with Preact only in client production build
    //     Object.assign(config.resolve.alias, {
    //         react: "preact/compat",
    //         "react-dom/test-utils": "preact/test-utils",
    //         "react-dom": "preact/compat",
    //     });
    // }

    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
});

// module.exports = withBundleAnalyzer({
//   compress: true,
//   webpack(config, { webpack }) {
//     const prod = process.env.NODE_ENV === 'production';
//     return {
//       ...config,
//       mode: prod ? 'production' : 'development',
//       devtool: prod ? 'hidden-source-map' : 'eval',
//       plugins: [
//         ...config.plugins,
//         new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
//       ],
//     };
//   },
// });
