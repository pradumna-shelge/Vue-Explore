import { ref } from "vue";
import { userApi, loginApi } from "../Endpoints/ApiLinks";
import axios from "axios";
import router from "../Router";
import CryptoJS from "crypto-js";

const loginusername = ref(null);
export { loginusername };
export const isLogin = localStorage.getItem("userInfo") != null;

export const setuserData = () => {
  try {
    let data = localStorage.getItem("userInfo");
    var base64Payload = data.split(".")[1];
    var payload = decodeURIComponent(
      atob(base64Payload)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    console.log(JSON.parse(payload));
    const decodedToken = JSON.parse(payload);

    loginusername.value =
      decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];

    console.log("Username:", loginusername.value);
  } catch (error) {
    console.error("Token decoding failed:", error);
  }
};
export let setUserInfo = (data) => {
  localStorage.setItem("userInfo", data);
  setuserData();
};

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});
export let loginUser = async (username, password) => {
  const url = loginApi;

  try {
    const res = await axios.post(url, {
      username: username,
      password: password,
    });

    console.log("set user data after login");
    setUserInfo(res.data.token);
    router.push("/");
  } catch (err) {
    console.error("error", err);
    toaster.error(err.response.data + "!");
  }
};

export let AddUser = async (username, email, password) => {
  const url = userApi;

  try {
    const res = await axios.post(url, {
      username: username,
      email: email,
      passwordHash: password,
    });
    debugger;
    console.log(res.data);
    toaster.info(
      "Congratulations! 🎉 You've successfully signed up for ShopNest."
    );

    router.push("/login");
  } catch (err) {
    console.error("error", err);

    toaster.error(err.response.data + "!");
  }
};
