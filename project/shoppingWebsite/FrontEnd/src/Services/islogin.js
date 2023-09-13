

export let  isLogin = localStorage.getItem('userInfo')?true : false;
export let  setUserInfo=(data) =>{ localStorage.setItem('userInfo',data)};