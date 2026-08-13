import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  // Configuración base recomendada
  js.configs.recommended,
  
  // Configuración para TypeScript
  ...tseslint.configs.recommended,
  
  // Configuración personalizada
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
    },
  },
  {
    // Ignorar archivos
    ignores: ["dist/**", "node_modules/**", "tests/**"],
  },
];