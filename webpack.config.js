const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: () => [
									autoprefixer
								]
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			}

		],
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		historyApiFallback: {
			disableDotRule: true
		}
	},
	optimization: {
		runtimeChunk: 'single',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Dream Bakery',
		}),
	],
};
