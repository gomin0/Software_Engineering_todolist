import { useEffect, useState } from "react";
import style from "./Main.css";
import SideBar from "./SideBar";
import Inbox from "./Inbox";

const Main = ({ curUser }) => {
  const [curLists, setLists] = useState([]);
  const [listLoaded, setListLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selection, setSelect] = useState(null);

  useEffect(() => {
    getAllLists();
  }, []);

  useEffect(() => {
    if (curLists.length > 0) {
      console.log(curLists);
      setSelect(curLists[curLists.length - 1]);
      setLoaded(true);
    }
  }, [curLists]);

  /** request lists info with current user info */
  async function getAllLists() {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${curUser.userID}/todolist`
      );
      const json = await response.json();
      setLists(json);
      setSelect(curLists[0]);
      setListLoaded(true);
      console.log(selection);
    } catch (error) {
      console.error(error);
    }
  }

  const clickAndSelectList = (event) => {
    const id = parseInt(event.target.id);
    const selectedList = curLists.find((list) => list.id === id);
    console.log(curLists);
    if (!selectedList) {
      setLoaded(false);
      return;
    }
    setLoaded(true);
    setSelect(selectedList);
  };

  //{curLists.length > 0 && <Inbox curList={selection} />}
  console.log(selection);
  return (
    <div className="main" style={style}>
      {listLoaded ? (
        <SideBar
          curUser={curUser}
          curLists={curLists}
          clickList={(event) => clickAndSelectList(event)}
          selectedList={selection}
          setSelect={setSelect}
          setLists={setLists}
        />
      ) : (
        <div></div>
      )}
      {loaded ? (
        <>
          <Inbox curList={selection} />
        </>
      ) : (
        <div>nothing so far</div>
      )}
    </div>
  );
};

export default Main;
