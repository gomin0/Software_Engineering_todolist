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
      id: 1,
      name: "1st",
    },
    {
      id: 2,
      name: "2nd",
    },
    {
      id: 3,
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
