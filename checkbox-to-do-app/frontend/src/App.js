import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Switch from "react-switch";
import Home from "./routes/Home";
import Login from "./routes/Login";

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

const getInfo = () => {
  var naver_id_login = new window.naver_id_login(
    "nuZ04sTeb2LDphCqc4qv", // client ID
    "http://localhost:3000/" // callback url
  );
  // 접근 토큰 값 출력
  console.log(naver_id_login.oauthParams.access_token);

  // 네이버 사용자 프로필 조회
  //naver_id_login.get_naver_userprofile("naverSignInCallback()");
  // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function

  function naverSignInCallback() {
    console.log(naver_id_login.getProfileData("email"));
    console.log(naver_id_login.getProfileData("nickname"));
    console.log(naver_id_login.getProfileData("age"));
  }
  if (naver_id_login.oauthParams.access_token) {
    console.log("success!");
    return true;
  } else {
    console.log("failed💀");
    return false;
  }
};

const App = () => {
  const access_token = getInfo();

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={access_token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/"
          element={
            access_token ? <Home user={curUser} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};
//<Route exact path="/login" element={<Login />}></Route>
//<Route exact path="/" element={<Home user={curUser} />}></Route>

export default App;
