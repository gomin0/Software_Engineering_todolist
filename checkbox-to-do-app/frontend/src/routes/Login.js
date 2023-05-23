import { useEffect } from "react";

const initNaverLogin = () => {
  const naver_id_login = new window.naver_id_login(
    "nuZ04sTeb2LDphCqc4qv", // client ID
    "http://localhost:3000/" // callback url
  );
  var state = naver_id_login.getUniqState();
  naver_id_login.setButton("white", 2, 40);
  naver_id_login.setDomain("http://localhost:3000");
  naver_id_login.setState(state);
  naver_id_login.setPopup();
  naver_id_login.init_naver_id_login();

  console.log(naver_id_login);
  // TODO: fetch userID, userName, and etc.
};

const Login = () => {
  useEffect(() => {
    initNaverLogin();
  }, []);

  return (
    <>
      <div>Hello</div>
      <div id="naver_id_login"></div>
    </>
  );
};

export default Login;
