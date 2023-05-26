import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./routes/Home";
import NaverLogin from "./NaverLogin";

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

  const handleToken = (token) => {
    setToken(token);
  };
  const handleUserInfo = (user) => {
    setUserInfo(user);
  };

  const userID = localStorage.getItem("id");
  const username = localStorage.getItem("username");

  /* !!! uncomment the below and test !!! */
  //const getUserInfo = async () => {
  //  try {
  //    const response = await fetch(
  //      `http://localhost:8080/${userID}/${username}`
  //    );
  //    const json = await response.json();
  //    console.log(json);
  //  } catch (error) {
  //    console.error(error);
  //  }
  //};
  //useEffect(() => getUserInfo, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={curUser} />} />
        <Route
          path="/login"
          element={
            <NaverLogin
              setGetToken={handleToken}
              setUserInfo={handleUserInfo}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
