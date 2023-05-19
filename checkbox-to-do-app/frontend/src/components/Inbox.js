import { useRef } from "react";
import style from "./Inbox.css";

const Inbox = ({ curList }) => {
  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        {curList.name}
      </div>
      <button className="test"></button>
    </div>
  );
};

export default Inbox;
