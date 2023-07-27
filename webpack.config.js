const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            }
        ]
    },
    entry: './src/index.jsx', // webpack 최초 진입점 파일 경로 설정 옵션
    output: { // webpack 을 실행한 이후 결과물의 이름 / 경로 등을 설정
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html", // 번들링 파일을 주입하여 번들링 폴더로 복사할 대상 HTML 파일을 설정
        }),
    ],
    devServer: { // webpack-dev-server 옵션 설정
        static: path.resolve(__dirname, 'dist'),
        historyApiFallback: true, // 404 페이지 대신 index.html로 이동
        hot: true, // 모듈 전체를 로드하지 않고 변경된 사항만 갱신
    },
    resolve: { // resolve: import 를 할 때 확장자를 생략할 수 있습니다.
        extensions: ['.jsx', '.js']
    }
}