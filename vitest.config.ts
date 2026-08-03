const config = {
  css: {
    postcss: {
      plugins: [],
    },
  },
  oxc: {
    jsx: {
      runtime: "automatic",
    },
  },
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    },
  },
  test: {
    css: false,
    environment: "node",
    globals: false,
    include: ["src/**/*.test.{ts,tsx}"],
  },
} satisfies import("vitest/config").ViteUserConfig;

module.exports = config;
