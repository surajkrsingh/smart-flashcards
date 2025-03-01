const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		'blocks/flashcard-front/index': './src/blocks/flashcard-front/index.js',
		'blocks/flashcard-back/index': './src/blocks/flashcard-back/index.js',
		'blocks/flashcard/index': './src/blocks/flashcard/index.js',
		'blocks/flashcard-set/index': './src/blocks/flashcard-set/index.js',
		'blocks/flashcard-set/editor': './src/blocks/flashcard-set/editor.scss',
		'blocks/flashcard-set/style': './src/blocks/flashcard-set/style.scss',

		'blocks/single-post-display/index': './src/blocks/single-post-display/index.js',
		'blocks/single-post-display/editor': './src/blocks/single-post-display/editor.scss',
		'blocks/single-post-display/style': './src/blocks/single-post-display/style.scss',

		'blocks/user-display/index': './src/blocks/user-display/index.js',
		'blocks/user-display/editor': './src/blocks/user-display/editor.scss',
		'blocks/user-display/style': './src/blocks/user-display/style.scss',	

		'frontend': './src/blocks/frontend.js',
		'style': './src/style.scss',
		'editor': './src/editor.scss',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		clean: true
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false
			}
		}
	}
}; 
