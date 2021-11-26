### 初始化项目 `npm install`


### 启动项目 `npm start`
在浏览器中打开 [http://localhost:3000](http://localhost:3000)


<!-- ###　`npm run build` -->

目录结构src中：
主入口文件index.js, 其中引入App.js, 整体界面在App.js中编写
其中包括：遍历接口返回的数据对应的画出每一个card组件, 弹窗组件, 以及分页组件

mock.js文件是构建的假数据结构

card文件夹内为一个单独的card组件内容。
modal文件夹内是每次打开的详情弹窗, 需要根据每次的id获取对应详情内容
