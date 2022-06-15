/*
 * @Description: log type|style
 * @Author: Amy
 * @Date: 2022-06-14 14:41:45
 * @LastEditTime: 2022-06-14 15:25:48
 */
export const enum LogLevel {
    Log, //普通日志
    Warning, // 警告日志
    Error // 错误日志
}

export const Styles = ['color: green;', 'color: orange;', 'color: red;']
export const Methods = ['info', 'warn', 'error'] as const

export type LoggerConfigtype = {
    namespace?: string
}

export type InterceptorFuncType = (config: LoggerConfigtype) => void