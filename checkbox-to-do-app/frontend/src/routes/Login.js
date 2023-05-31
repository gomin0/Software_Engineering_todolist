import { useEffect, useState } from "react";
import './Login.css'

const NaverLogin = () => {
  const { naver } = window;
  const NAVER_CLIENT_ID = "nuZ04sTeb2LDphCqc4qv"; // client ID
  const NAVER_CALLBACK_URL = "http://localhost:3000/"; // callback url

  const initNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  // const getAccessToken = () => {
  //   const token = window.location.href.split("=")[1].split("&")[0];
  //   alert(token);
  //   localStorage.setItem("access_token", token);
  //   setGetToken(token);
  // };

  // const getUserAccessToken = () => {
  //   window.location.href.includes("access_token") && getAccessToken();
  // };

  useEffect(() => {
    initNaverLogin();
    //getUserAccessToken();
  }, []);

  const proverbs =
  [ [ "The future is already here, it's just not evenly distributed.", "-William Gibson-"],
  ["Give me six hours to chop down a tree and I will spend the first four sharpening the axe.", "-Abraham Lincoln-"] ,
  ["If you don't know where you are going, you'll end up someplace else.", "-Yogi Berra-"] ,
  ["I need to stop getting into situations where all my options are potentially bad.", "-Jack Campbell-"] ,
  ["Always, Always have a plan.", "-Rick Riordan-"] ,
  ["An hour of planning can save you 10 hours of doing.", "-Dale Carnegie-"] ,
  ["There are dreamers and there are planners; the planners make their dreams come true.", "-Edwin Louis Cole-"] ,
  ["The key is not to prioritize what’s on your schedule, but to schedule your priorities.", "-Stephen Covey-"] ,
  ["Planning is a skill and an art which takes a lifetime to master.", "-Paddick Van Zyl-"]
  ]
  
  const getRandomIndex = (length) => {
    return parseInt(Math.random() * length);
  }
  
  const a = getRandomIndex(proverbs.length);

  return (
    <>
      <div className="page-container">
        <div class="login-form-container shadow">

            <div class="login-form-left-side">
                <div class="top-logo-wrap">
                  <h1> {proverbs[a][0]} </h1>
                  <p> {proverbs[a][1]} </p>
                </div>
            </div>

            <div class="login-form-right-side">
              
                 <div className="title">
                   <span className="to-right-line">Checkbox</span> 
                </div>
      
                <div class="login-btn">
                    <div id="naverIdLogin"></div>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
};

export default NaverLogin;
