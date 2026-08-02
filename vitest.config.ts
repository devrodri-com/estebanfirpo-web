const config = {
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    },
  },
  test: {
    environment: "node",
    globals: false,
    include: ["src/**/*.test.ts"],
  },
} satisfies import("vitest/config").ViteUserConfig;

module.exports = config;
