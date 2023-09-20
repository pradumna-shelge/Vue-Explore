import { ref } from "vue";
import { userApi, loginApi } from "../endpoints/index";
import axios from "axios";
import router from "../routers";


const loggedInUsername = ref(''); 
export { loggedInUsername };
export const isLoggedIn = localStorage.getItem("userInfo") != null; 

export const decodeUserInfo = () => {
  try {
    let tokenData = localStorage.getItem("userInfo");
    var base64Payload = tokenData.split(".")[1];
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

    loggedInUsername.value =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];

    console.log("Logged-In Username:", loggedInUsername.value);
  } catch (error) {
    console.error("Token decoding failed:", error);
  }
};

// Function to set user information in local storage and decode it
export let setUserInfo = (tokenData) => {
  
  localStorage.setItem("userInfo", tokenData);
  decodeUserInfo();
};

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

// Function to log in a user
export let loginUser = async (username, password) => {
  const loginUrl = loginApi;

  try {
    const response = await axios.post(loginUrl, {
      username: username,
      password: password,
    });

    console.log("Set user data after login");
    setUserInfo(response.data.token);
    router.push("/");
  } catch (error) {
    console.error("Error during login:", error);
    toaster.error(error.response.data + "!");
  }
};

// Function to add a user
export let addUser = async (username, email, password) => {
  const addUserUrl = userApi;

  try {
    const response = await axios.post(addUserUrl, {
      username: username,
      email: email,
      passwordHash: password,
    });
    
    console.log(response.data);
    toaster.info(
      "Congratulations! 🎉 You've successfully signed up for ShopNest."
    );

    router.push("/login");
  } catch (error) {
    console.error("Error adding user:", error);
    toaster.error(error.response.data + "!");
  }
};
