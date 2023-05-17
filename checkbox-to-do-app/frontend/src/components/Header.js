import style from "./Header.css";

const Header = ({ user }) => {
  const myAlert = (user) => {
    console.log(user.userName);
  };

  return (
    <div className="header" style={style}>
      <div className="header-left">✓ Checkbox</div>
      <div className="user-info">
        <button
          className="user-icon"
          onClick={() => alert(user.userName)}
        ></button>
        <p>{user.userName}</p>
      </div>
    </div>
  );
};

export default Header;
