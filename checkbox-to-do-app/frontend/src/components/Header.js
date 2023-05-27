import style from "./Header.css";

const Header = ({ curUser }) => {
  const root = document.documentElement;
  root.style.setProperty(
    "--background-image",
    `url(${curUser.profileImageURL})`
  );
  return (
    <div className="header" style={style}>
      <div className="header-left">✓ Checkbox</div>
      <div className="user-info">
        <button
          className="user-icon"
          onClick={() => alert(curUser.username)}
        ></button>
        <p>{curUser.username}</p>
      </div>
    </div>
  );
};

export default Header;
