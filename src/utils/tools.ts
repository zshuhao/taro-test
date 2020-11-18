/**
 * 解析url中的参数
 * @example ?id=1232&name=jack
 * retrun Object {id:1231,name:'jack'}
 */
export const urlParse = function (url: string): object {
    url = url || window.location.search
    const result: { [key: string]: string } = {}
    // 一般来说，末尾不需要匹配#,但存在部分服务对哈希处理不好的情况
    const reg = /[?&][^?&]+=[^?&|#]+/g
    const arr = url.match(reg)
    if (!arr) return result
    // ['id=1232','&name=jack']
    arr.forEach((item) => {
        const temp = item.substr(1).split('=')
        const key = decodeURIComponent(temp[0])
        const val = decodeURIComponent(temp[1])
        result[key] = val
    })
    return result
}