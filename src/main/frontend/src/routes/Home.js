import { useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";

const Home = ({ curUser, lists }) => {
  return (
    <>
      <Header curUser={curUser}></Header>
      <Main curUser={curUser} lists={lists}></Main>
    </>
  );
};

export default Home;
