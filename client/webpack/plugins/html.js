const HtmlWebpackPlugin = require('html-webpack-plugin');
const { publicPath } = require('../paths');

module.exports = function(options) {
    const opts = Object.assign(
        {
            title: 'Pokedex',
            filename: 'index.html',
            lang: 'en',
            icon: false
        },
        options
    );

    return new HtmlWebpackPlugin({
        lang: opts.lang,
        title: opts.title,
        filename: opts.filename,
        favicon: opts.icon && `${publicPath}/favicon.png`,
        template: `${publicPath}/${opts.filename}`,
        chunksSortMode: 'dependency',
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    });
};
