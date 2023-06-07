import { useEffect, useState } from "react";
import style from "./Main.css";
import SideBar from "./SideBar";
import Inbox from "./Inbox";

const Main = ({ curUser, lists }) => {
  var initialList = lists[0];
  var [curList, setListName] = useState(initialList);
  const [selection, setSelect] = useState(0);

  const clickAndSelectList = (event) => {
    //const selectedID = event.target.id;
    //const selectedList = lists.find((list) => list.id === parseInt(selectedID));
    //setListName(selectedList);
    const select = event.target.id;
    console.log(select);
    setSelect(selection);
  };

  return (
    <div className="main" style={style}>
      <SideBar
        curUser={curUser}
        clickList={(event) => clickAndSelectList(event)}
        lists={lists}
        selected={curList}
      />
      <Inbox curList={curList} />
    </div>
  );
};

export default Main;
