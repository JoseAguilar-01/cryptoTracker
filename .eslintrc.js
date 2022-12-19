module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'standard',
		'eslint-config-prettier',
		'plugin:prettier/recommended',
		'eslint:recommended',
	],
	plugins: ['eslint-plugin-import-helpers', 'react'],
	overrides: [],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always',
				groups: ['module', '/^@/', ['parent', 'sibling', 'index']],
				alphabetize: { order: 'asc', ignoreCase: true },
			},
		],
		'no-console': 'warn',
		'react/prop-types': 0,
	},
};
