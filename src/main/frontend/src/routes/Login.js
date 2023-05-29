import { useEffect } from "react";
import NaverLogin from "../NaverLogin";

//const initNaverLogin = () => {
//  var naver_id_login = new window.naver_id_login(
//    "nuZ04sTeb2LDphCqc4qv", // client ID
//    "http://localhost:3000/" // callback url
//  );
//  var state = naver_id_login.getUniqState();
//  naver_id_login.setButton("white", 2, 40);
//  naver_id_login.setDomain("http://localhost:3000");
//  naver_id_login.setState(state);
//  //naver_id_login.setPopup();
//  naver_id_login.init_naver_id_login();
//};

const Login = () => {
  return (
    <>
      <div>Hello</div>
      <div id="naverIdLogin"></div>
    </>
  );
};

export default Login;
