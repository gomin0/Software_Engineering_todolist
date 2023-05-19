import { useState } from "react";
import style from "./Main.css";
import SideBar from "./SideBar";
import Inbox from "./Inbox";

const Main = ({ lists }) => {
  var initialList = lists[0];
  var [curList, setListName] = useState(initialList);

  const clickAndSelectList = (event) => {
    const selectedID = event.target.id;
    const selectedList = lists.find((list) => list.id === parseInt(selectedID));
    setListName(selectedList);
  };

  return (
    <div className="main" style={style}>
      <SideBar
        onClick={(event) => clickAndSelectList(event)}
        lists={lists}
        selected={curList}
      />
      <Inbox curList={curList} />
    </div>
  );
};

export default Main;
