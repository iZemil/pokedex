const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(options) {
    const opts = Object.assign(
        {
            minimize: true,
            sourceMap: false
        },
        options
    );

    return {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: opts
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: opts.sourceMap,
                        javascriptEnabled: true
                    }
                }
            ],

            // For images and fonts
            publicPath: '../'
        })
    };
};
