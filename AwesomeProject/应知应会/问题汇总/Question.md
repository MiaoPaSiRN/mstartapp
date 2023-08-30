### 2023-08-29

## eslint 报错：Parsing error: No Babel config file detected?

https://www.cnblogs.com/hmy-666/p/16441069.html

初始化项目，用 VSCode 打开之后，发现 eslint 报了一个错： No Babel config file detected，也就是说没有找到 babel 配置文件。

报错原因：具体原因就是 babel 的配置文件默认是在根目录进行查找的，而我编辑器打开的目录不是我现在运行项目的目录。
