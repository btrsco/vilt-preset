export default definePreset({
	name: 'vilt-preset',
	options: {
		// ...
	},
	handler: async() => {
		await extractTemplates()
		// ...
	},
})
