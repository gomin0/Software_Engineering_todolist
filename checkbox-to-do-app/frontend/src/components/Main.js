import style from "./Main.css";
import SideBar from "./SideBar";

const Main = ({ lists }) => {
  return (
    <div className="main" style={style}>
      <SideBar lists={lists} />
      <div>TODOS GO HERE</div>
    </div>
  );
};

export default Main;
