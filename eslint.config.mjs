import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import pluginTs from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018,
      },
    },
  },
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      ...pluginImport.configs.typescript.rules,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
    },
    settings: {
      ...pluginImport.configs.typescript.settings,
    },
  },
  pluginJs.configs.recommended,
  pluginPrettier,
  ...pluginTs.configs.recommended,
  {
    ignores: ['themes/app/dist', 'node_modules', 'public', 'vendor'],
  },
];

export default config;
