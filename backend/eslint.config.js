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
      // ──────────────────────────────────────────────────────
      // REGLAS DE CALIDAD DE CÓDIGO (Nivel Clase Mundial)
      // ──────────────────────────────────────────────────────

      // No usar console.log en producción
      "no-console": "warn",

      // Usar const en lugar de let cuando no se reasigna
      "prefer-const": "error",

      // Usar === y !== en lugar de == y !=
      "eqeqeq": ["error", "always"],

      // No usar var
      "no-var": "error",

      // Preferir template literals
      "prefer-template": "warn",

      // No usar else después de return
      "no-else-return": "warn",

      // Usar arrow functions cuando sea posible
      "arrow-body-style": ["warn", "as-needed"],

      // ──────────────────────────────────────────────────────
      // REGLAS DE TYPESCRIPT (Nivel Estricto)
      // ──────────────────────────────────────────────────────

      // ❌ ERROR: Variables no usadas (excepto _)
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],

      // ❌ ERROR: Uso de 'any' (prohibido)
      "@typescript-eslint/no-explicit-any": "error",

      // ⚠️ ADVERTENCIA: Funciones deben tener tipo de retorno explícito
      "@typescript-eslint/explicit-function-return-type": "warn",

      // ⚠️ ADVERTENCIA: Módulos deben tener tipos explícitos en exports
      "@typescript-eslint/explicit-module-boundary-types": "warn",

      // ❌ ERROR: Promesas no manejadas
      "@typescript-eslint/no-floating-promises": "error",

      // ⚠️ ADVERTENCIA: Funciones async sin await
      "@typescript-eslint/require-await": "warn",

      // ❌ ERROR: Argumentos inseguros
      "@typescript-eslint/no-unsafe-argument": "error",

      // ❌ ERROR: Asignaciones inseguras
      "@typescript-eslint/no-unsafe-assignment": "error",

      // ❌ ERROR: Acceso inseguro a miembros
      "@typescript-eslint/no-unsafe-member-access": "error",

      // ❌ ERROR: Llamadas inseguras
      "@typescript-eslint/no-unsafe-call": "error",

      // ❌ ERROR: Retornos inseguros
      "@typescript-eslint/no-unsafe-return": "error",

      // ✅ RECOMENDADO: Usar interfaces en lugar de types para objetos
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // ✅ RECOMENDADO: Usar import type para tipos
      "@typescript-eslint/consistent-type-imports": ["error", {
        "prefer": "type-imports"
      }],

      // ✅ RECOMENDADO: Naming conventions
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "custom": { "regex": "^I[A-Z]", "match": false }
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        },
        {
          "selector": "enum",
          "format": ["PascalCase"]
        },
        {
          "selector": "class",
          "format": ["PascalCase"]
        }
      ],

      // ✅ RECOMENDADO: Array con tipo simple
      "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],

      // ⚠️ ADVERTENCIA: No inferir tipos cuando es obvio
      "@typescript-eslint/no-inferrable-types": "warn",
    },
  },
  {
    // Ignorar archivos
    ignores: ["dist/**", "node_modules/**", "tests/**", "**/*.test.ts", "**/*.spec.ts"],
  },
];