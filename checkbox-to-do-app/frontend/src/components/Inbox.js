import { useRef } from "react";
import style from "./Inbox.css";
import ToDoContainer from "./ToDoContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Inbox = ({ curList }) => {
  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        <h2>{curList.name}</h2>
      </div>
      <ToDoContainer curList={curList}></ToDoContainer>
      <button className="add-todo" onClick={() => alert("clicked")}>
        <FontAwesomeIcon icon={faPlus} className="add-todo-btn" />
        <p>add a new task</p>
      </button>
    </div>
  );
};

export default Inbox;
