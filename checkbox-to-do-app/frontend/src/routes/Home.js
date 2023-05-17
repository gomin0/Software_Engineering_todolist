import { useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import List from "../components/List";
import ToDo from "../components/ToDo";

const Home = ({ user }) => {
  const lists = user.lists;

  return (
    <>
      <Header user={user}></Header>
      <Main lists={lists}></Main>
    </>
  );
};

export default Home;
