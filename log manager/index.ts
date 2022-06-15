/*
 * @Description: Logger Manager: 统一管理日志信息
 * @Author: jxf
 * @Date: 2022-06-14 13:57:40
 */
import { LogLevel, Methods, Styles, LoggerConfigtype, InterceptorFuncType } from './enum'
class Logger {
    /* 命名空间：区分所在执行文件 */
    private namespace: string
    private __DEV__: boolean = true

    constructor(namespace: string = 'unknown') {
        this.namespace = namespace
    }
    /* 参考 axios 设计 为创建实例留一个入口方法 */
    public create (namespace: string = 'unknown') {
        return new Logger(namespace)
    }
    // 打印方法
    private _log(level: LogLevel, args: unknown[]) {
        // 区分生产和开发
        if (!this.__DEV__) return
        this.beforeFuncs.forEach(fn => fn(this.config))
        console[Methods[level]](`%c${this.namespace}`, Styles[level], ...args)
        this.afterFuncs.forEach(fn => fn(this.config))
    }
    // 返回 this 方便链式调用
    /* 打印输出信息 */
    public info(...args: unknown[]) {
        this._log(LogLevel.Log, args)
        return this
    }
    /* 打印输出警告信息 */
    public warn(...args: unknown[]) {
        this._log(LogLevel.Warning, args)
        return this
    }
    /* 打印输出错误信息 */
    public error(...args: unknown[]) {
        this._log(LogLevel.Error, args)
        return this
    }
    // 支持修改 namspace
    public setNamespace (namespace: string = '') {
        this.namespace = `[${this.namespace}]`
        return this
    }
    // 埋点控制 远程上报
    // 上报日志
    reportLog() {
        this.info()
    }
    // 上报事件
    reportEvent() {
        this.info()
    }
    // 上报异常
    reportException() {
        this.info()
    }
    // 扩展
    // 拦截器
    private beforeFuncs: Array<InterceptorFuncType> = []
    private afterFuncs: Array<InterceptorFuncType> = []
    private config: LoggerConfigtype = {}
    // 新增拦截器
    private addInterceptor(func: InterceptorFuncType, isBefore) {
        if (typeof func !== 'function') {
            return this.error('Interceptor is not Valid')
        }
        if (isBefore) {
            this.beforeFuncs.push(func)
            return this
        }
        this.afterFuncs.push(func)
        return this
    }
    // 打印之前拦截器
    public addBeforeFunc(func: InterceptorFuncType) {
        this.addInterceptor(func, true)
    }
    // 打印之后拦截器
    public addAfterFunc(func: InterceptorFuncType) {
        this.addInterceptor(func, false)
    }
}
export default new Logger()