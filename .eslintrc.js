const path = require('path');

/* eslint-env node */
module.exports = {
    ignorePatterns: ['node_modules/**', 'dist/**', '**/*.js'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    rules: {
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'class',
                format: ['PascalCase'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
            },
            {
                selector: 'enum',
                format: ['PascalCase'],
            },
            {
                selector: 'function',
                format: ['camelCase'],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'method',
                format: ['camelCase'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
        ],
    },
    overrides: [
        {
            files: ['frontend/**/*.{ts,tsx}'],
        },
        {
            files: ['backend/**/*.ts'],
            rules: {
              '@typescript-eslint/interface-name-prefix': 'off',
              '@typescript-eslint/explicit-function-return-type': 'off',
              '@typescript-eslint/explicit-module-boundary-types': 'off',
              '@typescript-eslint/no-explicit-any': 'off',
            },
            env: {
              jest: true
            },
            parserOptions: {
              project: 'tsconfig.json',
              tsconfigRootDir: path.join(__dirname, 'backend'),
              sourceType: 'module',
            },
        },
    ],
};
