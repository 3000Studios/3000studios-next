import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Performance and best practices
      'react/no-unescaped-entities': 'warn',
      'react/jsx-no-target-blank': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      
      // Next.js specific
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "analyze/**",
    "node_modules/**",
    ".vercel/**",
  ]),
]);

export default eslintConfig;
