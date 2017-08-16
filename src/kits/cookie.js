/**
 * 设置cookie
 * @param {cookie键} c_name 
 * @param {cookie值} value 
 * @param {cookie过期时间} expiredays 
 */
export function setCookie(c_name, value, expiredays){
    var exdate = new Date();　　　　
    exdate.setDate(exdate.getDate() + expiredays);　　　　
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * 获取cookie
 * @param {cookie键} name 
 */
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

/**
 * 删除cookie
 * @param {cookie键} name 
 */
export function deleteCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }