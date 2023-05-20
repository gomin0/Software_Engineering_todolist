import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Callback from "./routes/Callback";

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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={curUser} />}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Routes>
        <Route path="/callback" element={<Callback />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
