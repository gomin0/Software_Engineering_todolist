import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";

const App = () => {
  const [token, setToken] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userID: null,
    userName: "",
    userEmail: "",
    isLoaded: false,
  });

  const { naver } = window;
  const NAVER_CLIENT_ID = "nuZ04sTeb2LDphCqc4qv"; // client ID
  const NAVER_CALLBACK_URL = "http://localhost:3000/"; // callback url

  const callbackNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userEmail = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        const profileImageURL = naverLogin.user.getProfileImage();
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("username", username);
        localStorage.setItem("profile_image", profileImageURL);
        setUserInfo(naverLogin.user);

        // TODO: when in a login a page, the following line causing a problem
        const token = window.location.href.split("=")[1].split("&")[0];
        localStorage.setItem("access_token", token);
        setToken(token);
      }
    });
  };

  const userEmail = localStorage.getItem("userEmail");
  const username = localStorage.getItem("username");
  const profileImageURL = localStorage.getItem("profile_image");
  const access_token = token;

  async function getUserInfo(email) {
    try {
      const response = await fetch(
        `http://localhost:8080/users/email/${email}`
      );
      const json = await response.json();
      setUserInfo((userInfo) => ({
        ...userInfo,
        userID: json.userID,
        userName: json.userName,
        userEmail: json.userEmail,
      }));
    } catch (error) {
      try {
        console.error(error);
        console.error("I've been fired");
        // add a new user
        const user = {
          userName: localStorage.getItem("username"),
          userEmail: localStorage.getItem("userEmail"),
        };
        console.log(userInfo);
        console.log(JSON.stringify(user));
        const newResponse = await fetch(`http://localhost:8080/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(user),
        });
        const newJson = await newResponse.json();
        console.log(newJson);
        setUserInfo((userInfo) => ({
          ...userInfo,
          userID: newJson.userID,
          userName: newJson.userName,
          userEmail: newJson.userEmail,
        }));
      } catch (error) {}
    }
  }

  useEffect(() => {
    callbackNaverLogin();
    getUserInfo(userEmail).then(() => {
      setUserInfo((info) => ({
        ...info,
        isLoaded: true,
      }));
    });
  }, []);

  console.log(userInfo.userID);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home curUser={userInfo} />} />
        <Route path="/" element={<Home curUser={userInfo} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
