const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: './src/app.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	},
	plugins: [
		new UglifyJsPlugin(),
		new BrowserSyncPlugin({
			post: 3000,
			server: {
				baseDir: './'
			},
			files: ['index.html', './dist/**/*']
		})
	]
};
