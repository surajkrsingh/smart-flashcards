const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		'flashcard/index': './src/blocks/flashcard/index.js',
		'flashcard-front/index': './src/blocks/flashcard-front/index.js',
		'flashcard-back/index': './src/blocks/flashcard-back/index.js',
		'frontend': './src/blocks/frontend.js',
		'flashcard-set/index': './src/blocks/flashcard-set/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				editor: {
					name: 'editor',
					test: /\.(css|scss)$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	}
}; 
