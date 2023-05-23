import { useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import List from "../components/List";
import ToDo from "../components/ToDo";

const getInfo = () => {
  var naver_id_login = new window.naver_id_login(
    "nuZ04sTeb2LDphCqc4qv", // client ID
    "http://localhost:3000/" // callback url
  );
  // 접근 토큰 값 출력
  alert(naver_id_login.oauthParams.access_token);
  // 네이버 사용자 프로필 조회
  naver_id_login.get_naver_userprofile("naverSignInCallback()");
  // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
  function naverSignInCallback() {
    console.log(naver_id_login.getProfileData("email"));
    console.log(naver_id_login.getProfileData("nickname"));
    console.log(naver_id_login.getProfileData("age"));
  }
};

const Home = ({ user }) => {
  useEffect(() => {
    getInfo();
  }, []);

  const lists = user.lists;

  return (
    <>
      <Header user={user}></Header>
      <Main lists={lists}></Main>
    </>
  );
};

export default Home;
