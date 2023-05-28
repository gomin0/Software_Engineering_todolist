import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Header.css";

const Header = ({ curUser }) => {
  const root = document.documentElement;
  root.style.setProperty(
    "--background-image",
    `url(${curUser.profileImageURL})`
  );

  const navigate = useNavigate();

  const NaverLogout = async () => {
    try {
      const response = await axios.get("/oauth2.0/token", {
        params: {
          grant_type: "delete",
          client_id: "nuZ04sTeb2LDphCqc4qv",
          client_secret: "14kXprQq98",
          access_token: curUser.access_token,
          service_provider: "NAVER",
        },
      });
      if (response) {
        console.log(response);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="header" style={style}>
      <div className="header-left">✓ Checkbox</div>
      <div className="user-info">
        <button
          className="user-icon"
          onClick={() => alert(curUser.username)}
        ></button>
        <p>{curUser.username}</p>
        <div className="naverLogout" onClick={() => NaverLogout()}>
          Sign out
        </div>
      </div>
    </div>
  );
};

export default Header;
