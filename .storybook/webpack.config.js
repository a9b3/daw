const path = require('path')
const webpack = require('webpack')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.devtool = 'cheap-module-eval-source-map'
  storybookBaseConfig.module.rules.unshift({
    exclude: [
      /\.jsx?$/,
      /\.tsx?$/,
      /\.scss$/,
      /\.css$/,
      /\.html$/,
      /\.json$/,
      /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      /\.(png|jpe?g|gif|ico)$/i,
    ],
    loader: require.resolve('file-loader'),
  })
  storybookBaseConfig.module.rules.push({
    test: /\.(png|jpe?g|gif|ico)$/i,
    use: [
      {
        loader: require.resolve('url-loader'),
        options: {
          limit: 8192,
        },
      },
      {
        loader: require.resolve('image-webpack-loader'),
        options: {
          bypassOnDebug: true,
          mozjpeg: {
            progressive: true,
          },
          gifsicle: {
            interfaced: false,
          },
          optipng: {
            optimizationLevel: 7,
          },
          pngquant: {
            quality: '75-90',
            speed: 3,
          },
        },
      },
    ].filter(a => a),
  })
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
        },
      },
      'sass-loader',
    ],
  })
  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    loaders: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
        },
      },
    ],
  })

  storybookBaseConfig.resolve.modules.concat(
    (process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean),
  )

  storybookBaseConfig.plugins.push(
    new webpack.ProvidePlugin({
      _: 'lodash',
      React: 'react',
      cssModule: 'react-css-modules',
    }),
  )

  return storybookBaseConfig
}
