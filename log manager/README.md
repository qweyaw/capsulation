<!--
 * @Description: 
 * @Author: Amy
 * @Date: 2022-06-14 13:48:48
 * @LastEditTime: 2022-06-14 15:05:08
-->
## Logger Manager

### 需求

1. 支持区分 info、warning、error 三种本地调试类型日志
2. 支持远程自定义日志上报 report()
3. 支持 namespace，用于区分代码执行的 scope
4. 支持链式操作 
5. 区分生产环境和开发环境，生产环境禁止日志输出到控制台
6. 支持功能可扩展

### 方案设计

1. 设计模式：单例模式
2. 实际借助于 window.console 方法
3. console 是一个已经初始化的实例，同时也是一个单例，因为它是全局唯一
4. 而单例模式的最大好处就是全局唯一，对于做日志统一管理有着天然的友好支持基础。

### 实现

1. ES Module 下的单例模式
    > 在 ESM 规范下，我们可以直接通过 `export default new ClassName()`，来实现单例模式
2. 可扩展的单例模式
3. 定义打印日志的方法
4. 支持修改 namespace
5. 埋点远程上报
    >埋点上报一般有三类：代码埋点、可视化埋点、无痕埋点，此处使用 代码埋点

### 扩展方案
1. 继承 Logger 类
2. 增加回掉函数作为参数 （推荐）
3. 拦截器：参考 Axios 的拦截器设计，也就是 AOP（面向切面编程模式）的设计思想，来扩展 _log() 方法