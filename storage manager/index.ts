/*
 * @Description: config file
 * @Author: Amy
 */
import {encrypt, decrypt} from './encrypt'

type Config = {
    type: string,
    perfix: string,
    expires: number,
    isEncrypt: boolean,
}

type dataType = {
    key: string,
    value: any,
}
// localStorage | sessionStorage
const config: Config = {
    type: 'localStorage',
    perfix: '',
    expires: 7, // 天
    isEncrypt: false,
}
// 自动添加前缀
const autoAddPrefix = (key: string) => {
    const perfix = config.perfix ? config.perfix + '_' : ''
    return perfix + key
}
// 自动删除前缀
const autoRemovePrefix = (key: string) => {
    const perfix = config.perfix ? config.perfix + '_' : ''
    return key.replace(perfix, '')
}

// 判断是否支持 Storage
export const isSupportStorage = () => {
    return (typeof (Storage) !== 'undefined')
}
// 设置 setStorage
export const setStorage = (key: string, value: any, expire?: number) => {
    if(value === '' || value === undefined || value === null) {
        value = null
    }
    if(expire && (isNaN(expire) || expire < 0)){
        throw new Error('expire must be a number')
    }
    expire = (expire ? expire : config.expires) * 24 * 60 * 60
    let data = {
        value,
        time: Date.now(),
        expire: expire,
    }
    const encryptStr = config.isEncrypt ?  encrypt(JSON.stringify(data)) : JSON.stringify(data)
    
    window[config.type].setItem(autoAddPrefix(key), encryptStr)
}
// 获取 getStorage
export const getStorage = (key: string) => {
    if (window[config.type].getItem(autoAddPrefix(key)) === null) {
        return null
    }
    let data =  JSON.parse(window[config.type].getItem(autoAddPrefix(key)))
    if(config.isEncrypt) {
        data = decrypt(data)
    }
    let nowTime = Date.now()
    const expiresTime = config.expires * 24 * 60 * 60
    console.log(config.expires * 24 * 60 * 60, nowTime - data.time);
    if (data.expire && nowTime - data.time > expiresTime) {
        removeStorage(key)
        return null
    } else {
        setStorage(key, data.value)
        return data.value
    } 
}
// 获取所有 getAllStorage
export const getAllStorage = () => {
    let res:dataType[] = []
    for (let i = 0; i < window[config.type].length; i++) {
        const key = window[config.type].key(i)
        const value = config.isEncrypt ? decrypt(JSON.parse(window[config.type].getItem(key)))
            : JSON.parse(window[config.type].getItem(key))
        res.push({key, value})
    }
    return res
}
// 是否存在 hasStorage
export const hasStorage = (key: string) => {
    key = autoAddPrefix(key)
    let res = getAllStorage().filter(item => item.key === key)
    return res.length > 0
}
// 根据索引值获取
export const getStorageByIndex = (index: number) => {
    if (index < 0 || index >= window[config.type].length) {
        return null
    }
    return window[config.type].key(index)
}
// 删除 removeStorage
export const removeStorage = (key: string) => {
    window[config.type].removeItem(autoAddPrefix(key))
}
//清空 clearStorage
export const clearStorage = () => {
    window[config.type].clear()
}
