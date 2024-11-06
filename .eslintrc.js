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
        },
    ],
};
