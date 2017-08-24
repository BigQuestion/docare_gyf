# docare改版系统前端部署及部分技术说明

## 部分涉及技术
1.js框架：[vue](https://cn.vuejs.org/v2/guide/)
2.前端自动化部署：[webpack](https://doc.webpack-china.org/)
3.跨平台桌面应用（客户端）打包工具：[electron](https://electron.org.cn/)（建设中。。。）

## 安装部署
运行命令(如果无git命令,参照[git安装](https://git-scm.com/downloads))
```bash
git clone https://github.com/419like/docare_front
```
进入目录(如果无git命令,参照[node和npm安装](http://nodejs.cn/))
```bash
npm install
```
开始运行服务器
```bash
npm run dev
```

## 目录结构
```bash
├── build/           # webpack部署文件目录
├── config/          # webpack配置文件目录
├── dist/            # 项目构建输出目录
├── lib/             # 项目依赖其他库的引入文件
├── src/             # 项目开发源码目录
├── static/          # 部分静态文件目录
├── test/            # 前端自动化测试文档
├── .babelrc         # babel配置文件
├── .editorconfig    # 编辑器配置文件
├── .eslintignore    # 代码检查忽略文件配置
├── .eslintrc        # 代码检查配置文件
├── .gitignore       # 忽略文件列表
├── .postcssrc       # css文件处理配置
├── README.md        # 项目说明文档
├── index.html       # 基础入口html
├── gulpfile.js      # 自动化部署
├── package.json     # npm配置文档
```


## 有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(419like#163.com, 把#换成@)
* QQ: 897996541
* github: [layuiPlus](https://github.com/419like/docare_front)