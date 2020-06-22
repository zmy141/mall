export function formatDate(date, fmt) {
    //获取年份
    if (/(y+)/.test(fmt)) {
        //RegExp.$1指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
        //RegExp.$1指的是yyyy或者yy
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
        //字面量/xxx/形式不能表示变量
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };