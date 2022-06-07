/* eslint-disable camelcase */

const isQuotaExceeded = (e: any): boolean => {
  // 检查localstorage 是否已满
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
        default:
          quotaExceeded = true;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
};
type params = {
  include?: string[]
  exclude?: string[]
  encode?: (value: string) => string
  decode?: (value: string) => string
  expire?: number
}

class LocalStorage {
  expire: number

  key_allow: (key: string) => boolean

  encode: (value: string) => string

  decode: (value: string) => string

  constructor({
    // 允许的键范围，空则不限制
    include = [],
    // 不允许的键范围，空则不限制
    exclude = [],
    // 加密函数
    encode = (value: string) => value,
    // 解密函数
    decode = (value: string) => value,
    expire = 1000 * 60 * 60 * 24 * 7,
  }: params) {
    this.encode = encode;
    this.decode = decode;
    this.expire = expire || Infinity;
    this.key_allow = (key: string) => {
      if (Array.isArray(include)) {
        return include.includes(key);
      }
      if (Array.isArray(exclude)) {
        return !exclude.includes(key);
      }
      return true;
    };
  }

  // 默认一周过期， null为不限期
  $set(key: string, value: any, expire?: number) {
    if (this.key_allow(key)) {
      try {
        localStorage.setItem(this.encode(key), this.encode(JSON.stringify({
          value,
          expire: expire || this.expire,
          date: Date.now(),
        })));
      } catch (err) {
        if (isQuotaExceeded(err)) {
          window.console.log('localStorage 已满！');
        } else {
          window.console.log(err);
        }
      }
    } else {
      window.console.log(`${key}不在可设置范围`);
    }
  }

  $get(key : string) {
    if (this.key_allow(key)) {
      const itemKey = this.encode(key);
      const ls = localStorage.getItem(itemKey);
      if (ls) {
        const { value, expire, date } = JSON.parse(this.decode(ls));
        if (expire === null || date + expire >= Date.now()) {
          return value;
        }
        localStorage.removeItem(itemKey);
        window.console.log(`${key}已过期`);
      }
    } else {
      window.console.log(`${key}不在可设置范围`);
    }
    return undefined;
  }

  $delete(key: string) {
    localStorage.removeItem(this.encode(key));
  }
}
export default LocalStorage;
