import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const compat = new FlatCompat();

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
    },
  },
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  }),
];
