const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: ['react-hot-loader/patch', './src/index.tsx'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ts(x)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			templateContent: ({ htmlWebpackPlugin }) =>
				'<!DOCTYPE html><html><head><style>body{margin: 0}</style><meta charset="utf-8"><title>' +
				htmlWebpackPlugin.options.title +
				'</title></head><body><div id="app"></div></body></html>',
			filename: 'index.html',
		}),
	],
	devServer: {
		static: {
			directory: './dist',
		},
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
};

module.exports = config;
