import { useEffect, useState } from "react";
import style from "./Main.css";
import SideBar from "./SideBar";
import Inbox from "./Inbox";

const Main = ({ curUser }) => {
  const [curLists, setLists] = useState([]);
  const [selection, setSelect] = useState(null);

  useEffect(() => {
    getAllLists();
  }, []);

  /** request lists info with current user info */
  async function getAllLists() {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${curUser.userID}/todolist`
      );
      const json = await response.json();
      console.log(json);
      setLists(json);
      setSelect(json[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const clickAndSelectList = (event) => {
    console.log(curLists);
    //const selectedID = event.target.id;
    //const selectedList = lists.find((list) => list.id === parseInt(selectedID));
    //setListName(selectedList);
    const select = event.target.id;
    console.log(select);
    //setSelect(lists[select]);
  };

  return (
    <div className="main" style={style}>
      {curLists.length > 0 && (
        <SideBar
          curUser={curUser}
          curLists={curLists}
          clickList={(event) => clickAndSelectList(event)}
          selectedList={selection}
          setLists={setLists}
        />
      )}
      {curLists.length > 0 && <Inbox curList={selection} />}
    </div>
  );
};

export default Main;
