module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',

	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:prettier/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'import-no-duplicates-prefix-resolved-path'],
	overrides: [
		{
			files: ['**/*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			rules: {
				'import/no-named-as-default': 0,
				'import/no-named-as-default-member': 0,
				semi: ['error', 'never'],
			},
		},
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		project: './tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.cjs', '.js', '.ts'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	rules: {
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'prefer-const': 'off',
		'no-console': 'off',
		'function-paren-newline': 'off',
		endOfLine: 'off',
		indent: 'off',
		semi: ['error', 'never'],
		'arrow-body-style': ['error', 'as-needed'],
		'prefer-arrow-callback': [
			'error',
			{ allowNamedFunctions: false, allowUnboundThis: true },
		],
		'import/prefer-default-export': 0,
		'no-param-reassign': 0,
		'import/extensions': 0,
		'import/no-extraneous-dependencies': 0,
		'import/no-mutable-exports': 0,
		'import/no-duplicates': 0,
		'import-no-duplicates-prefix-resolved-path/no-duplicates': [
			'error',
			{
				prefixResolvedPathWithImportName: true,
			},
		],
		'no-restricted-imports': ['error', { paths: ['$env/static/private'] }],
	},
}
