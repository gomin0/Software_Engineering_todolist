import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./routes/Home";
import NaverLogin from "./routes/NaverLogin";

const curUser = {
  profile_image: "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
  userName: "Kim",
  lists: [
    {
      id: 0,
      name: "1st",
      todos: [
        {
          id: 0,
          title: "react",
          description: "no. 1",
          isCompleted: false,
        },
        {
          id: 1,
          title: "node",
          description: "no. 2",
          isCompleted: true,
        },
        {
          id: 2,
          title: "mySQL",
          isCompleted: false,
        },
      ],
    },
    {
      id: 1,
      name: "2nd",
      todos: [
        {
          id: 0,
          title: "two list",
          description: "no. 3",
          isCompleted: false,
        },
        {
          id: 1,
          title: "spring",
          description: "no. 4",
          isCompleted: true,
        },
      ],
    },
    {
      id: 2,
      name: "3rd",
    },
  ],
};

const App = () => {
  const [token, setToken] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
        const userID = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        const profileImageURL = naverLogin.user.getProfileImage();
        localStorage.setItem("id", userID);
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
  useEffect(() => {
    callbackNaverLogin();
  }, []);

  const userID = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const profileImageURL = localStorage.getItem("profile_image");
  // const userID = userInfo.email;
  // const username = userInfo.name;
  // const profileImageURL = userInfo.profile_image;
  const access_token = token;

  const user = {
    userID: userID,
    username: username,
    profileImageURL: profileImageURL,
    access_token: access_token,
  };
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home curUser={user} lists={curUser.lists} />}
        />
        <Route path="/login" element={<NaverLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
