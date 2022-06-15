/*
 * @Description: use new Logger Insatnce
 * @Author: Amy
 * @Date: 2022-06-14 14:37:24
 * @LastEditTime: 2022-06-14 15:22:20
 */
import logger from './index'

const newLogger = logger.create('custom')

console.log(newLogger === logger) // false 

logger.info()
logger.warn()
logger.error()
logger.addBeforeFunc(() => {
    namespace: 'amy'
})
logger.addAfterFunc(() => {
    namespace: 'jos'
})
logger.setNamespace('bks')