import { useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";

const Home = ({ curUser }) => {
  const isLoaded = curUser.isLoaded;
  return (
    <>
      {isLoaded ? (
        <>
          <Header curUser={curUser}></Header>
          <Main curUser={curUser}></Main>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Home;
