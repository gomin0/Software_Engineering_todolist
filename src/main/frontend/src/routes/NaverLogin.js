import { useEffect, useState } from "react";

const NaverLogin = () => {
  const { naver } = window;
  const NAVER_CLIENT_ID = "nuZ04sTeb2LDphCqc4qv"; // client ID
  const NAVER_CALLBACK_URL = "http://localhost:3000/"; // callback url

  const initNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  // const getAccessToken = () => {
  //   const token = window.location.href.split("=")[1].split("&")[0];
  //   alert(token);
  //   localStorage.setItem("access_token", token);
  //   setGetToken(token);
  // };

  // const getUserAccessToken = () => {
  //   window.location.href.includes("access_token") && getAccessToken();
  // };

  useEffect(() => {
    initNaverLogin();
    //getUserAccessToken();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
