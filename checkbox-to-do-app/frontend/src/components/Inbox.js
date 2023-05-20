import { useRef } from "react";
import style from "./Inbox.css";
import ToDoContainer from "./ToDoContainer";

const Inbox = ({ curList }) => {
  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        <h2>{curList.name}</h2>
      </div>
      <ToDoContainer curList={curList}></ToDoContainer>
    </div>
  );
};

export default Inbox;
