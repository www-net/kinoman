const path = require(`path`);
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    mode: `development`, // Режим сборки
    entry: `./src/main.js`, // Точка входа приложения
    output: { // Настройка выходного файла
        filename: `bundle.js`,
        path: path.join(__dirname, `public`),
    },
    devtool: `source-map`, // Подключаем sourcemaps
    devServer: {
        contentBase: path.join(__dirname, `public`), // Где искать сборку
        watchContentBase: true,
    },
    plugins: [
      new MomentLocalesPlugin()
    ]
}
