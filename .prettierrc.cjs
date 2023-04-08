module.exports = {
	useTabs: true,
	singleQuote: true,
	semi: false,
	trailingComma: 'es5',
	tabWidth: 2,
	printWidth: 80,
	bracketSameLine: true,
	endOfLine: 'auto',
	plugins: ['prettier-plugin-svelte'],
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}
