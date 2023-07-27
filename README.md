## CRA 없이 직접 빌드해서 리액트 앱을 가동시킨 적이 없어서 이번성 기회에 한번  해보려고 합니다.

CRA 가 대신 해주는 작업들 리스트압니다.

1. React 설치
2. webpack
3. babel
4. jest
5. eslint
6. polyfill
7. HMR
8. CSS 후처리

이렇게 편한걸 처음부터 막 써서 그냥 되나보다~~ 하고 무지성으로 CRA 을 눌렀었는데요.

직접 babel, webpack 을 설정 세팅하여 빌드를 해보겠습니다.

우선 위 패키지들이 필요하기 떄문에 package.json 을 생성시켜주세요.

```
npm init -y
```

src 리엑트 작업 폴더

public 정적 파일 보관 폴더

dist 번들링 결과물이 들어갈 폴더를 생성해주세요.

```
mkdir src public dist
```

```
cd public
touch index.html
```

root 파일을 만들어주세요!

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CRA 없이 설정하기</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

리엑트 컴포넌트 렌더링에 필요한 자바스크립트 파일 생성

```
cd src
touch index.jsx
```

리엑트 코어, DOM 연결에 필요한 라이브러리 다운

```
npm i react react-dom
```

---

CRA 에 포함되는 Webpack 을 설치하겠습니다. 그전에

## 웹팩이란?

웹팩이란 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)입니다. 모듈 번들러란 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미합니다.

[웹펙에 관한 자세하고 좋은 내용](https://joshua1988.github.io/webpack-guide/webpack/what-is-webpack.html#%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C-%EB%A0%88%EB%B2%A8%EC%97%85%EC%9D%84-%EB%8F%84%EC%99%80%EC%A3%BC%EB%8A%94-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%8F%84%EC%84%9C-%EC%86%8C%EA%B0%9C-%F0%9F%8E%81)
#

### Webpack 설치 (개발용 이므로 -D 추가)
```
npm i -D webpack webpack-cli
```

### webpack dev server 설치

(파일 변경 후 매번 웹팩 명령어를 실행하지 않아도 Webpack 으로 빌드된 결과를 자동으로 노출)

```
npm i -D webpack-dev-server
```

### html-webpack-plugin
플러그인이 HTML 파일을 동적으로 생성하도록 설정할 수 있습니다.

플러그인이 동적으로 생성한 HTML 코드 안에 웹팩으로 빌드한 결과물을 로딩하는 코드를

자동으로 주입시켜줍니다. 개발자가 index.html 에 스크립트 로딩 관련 코딩 작성 필요가 없어집니다.

#

이제 webpack 설정을 해보겠습니다.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.jsx', // webpack 최초 진입점 파일 경로 설정 옵션
    output: { // webpack 을 실행한 이후 결과물의 이름 / 경로 등을 설정
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html", // 번들링 파일을 주입하여 번들링 폴더로 복사할 대상 HTML 파일을 설정
        }),
    ],
    devServer: { // webpack-dev-server 옵션 설정
        static: path.resolve(__dirname, 'dist'),
        historyApiFallback: true, // 404 페이지 대신 index.html로 이동
        hot: true, // 모듈 전체를 로드하지 않고 변경된 사항만 갱신
    },
    resolve: { // resolve: import 를 할 때 확장자를 생략할 수 있습니다.
        extensions: ['.jsx', 'js']
    }
}
```

package.json 에 실행 스크립트를 작성합니다.

```
"build": "webpack --mode=production",
"start": "webpack serve --mode=development"
```

#

---
## 바벨이란

Babel이란, 
ECMAScript 2015+ 코드를 현재 및 과거의 브라우저와 같은 환경에서 호환되는 버전으로 변환하기 위해 사용하는 도구입니다.

바벨 설치

- @babel/core : 바벨 설치
- @babel/cli : 바벨 커맨드라인 도구
- @babel/preset-env : ECMAScript2015+를 변환하는 프리셋
- @babel/preset-react : 리액트 변환을 위한 프리셋
- babel-loader : babel-loader을 사용하면 바벨을 webpack으로 통합해서 사용할 수 있습니다.

```
npm i -D @babel/core @babel/cli @babel/preset-env @babel/preset-react babel-loader
```

webpack.config.js 수정

```
module.exports = {
    module: {
        rules: [
            {
                test: /\. (js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    ...
}
```

babel.config.js 생성

```
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
};
```

---

# ESLint

ESLint란 ECMAScript 코드의 문제점을 검사하거나 정정할 때 사용하는 Javascript Lint 도구입니다.

eslint 설치 및 옵션 구성

```
npm -i -D eslint
npx eslint --init
```

```

How would you like to use ESLint?
> To check syntax and find problems 

What type of modules does your project use?
> JavaScript modules (import/export) 

Which framework does your project use?
> React 

Does your project use TypeScript?
> Y

Where does your code run?
> Check Browser & Node (click space to check)
저는 두개 다 눌렀습니다.

What format do you want your config file to be in?
> JavaScript

Would you like to install them now with npm?
> Y
```

#

./src/App.jsx 생성

```jsx
import React from 'react';

export default function App() {
    return (
        <h1> hello world </h1>
    );
}
```

#

./src/index.jsx 수정

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
```

실행 해보자!

```
npm start
```

----

## 에러발생 ㅠㅠ

```
Plugin/Preset files are not allowed to export objects 
```

preset 설정을 해주었습니다.

```
// .babelrc
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

