# digo-concat
[digo](https://github.com/digojs/digo) 插件：合并文件。

## 安装
```bash
npm install digo-concat -g
```

## 用法
### 合并所有文件为一个
```js
digo.src("*.*").pipe("digo-concat", "out.txt").dest("output/");
```

### 源映射(Source Map)
本插件支持生成源映射，详见 [源映射](https://github.com/digojs/digo/wiki/源映射)。

## 选项
```js
digo.src("*.js").pipe("digo-concat", {
	path: "combo.js",		// 合并后文件的路径。默认为原文件夹名。
	seperator: "\n",        // 每个文件的分隔符。可以是文本或函数。函数原型为：seperator(file, index)。
	prependEach: "",        // 每个文件顶部追加的文本。可以是文本或函数。函数原型为：prependEach(file, index)。
	appendEach: "",         // 每个文件底部追加的文本。可以是文本或函数。函数原型为：appendEach(file, index)。
	prepend: "",            // 最终文件底部追加的文本。可以是文本或函数。函数原型为：prepend()。
	append: "",             // 最终文件底部追加的文本。可以是文本或函数。函数原型为：append()。
	content: null,          // 返回每个文件内容的回调函数。函数原型为：content(file)，函数返回 null 则使用原始文件内容。
	sort: null,          	// 用于排序的回调函数。函数原型为：sort(file1, file2)，函数返回数字，正负性表示顺序。
}).dest("output/");
```
