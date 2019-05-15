/**
 * 获取命令行的参数
 * @description  dep/--dep 等同 dep=true
 */
module.exports = function(arr) {
  const reg = /=|--/i;
  const result = arr
    .filter((_, i) => i > 1)
    .reduce((acc, cur) => {
      if (!reg.test(cur)) {
        cur = `${cur}=true`;
      }
      cur = cur.replace(/--([^\s]+)/, "$1=true");
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {});
  return result;
};
