module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    require.resolve('./index')
  ],
  ignorePatterns: [".eslintrc.js", "tsconfig.json", "test/*.test.js"],
}
