import React, { useState } from "react";
import style from "./SideBar.css";
import List from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ListModal from "./ListModal";

const SideBar = ({ onClick, lists, selected }) => {
  const curLists = lists?.sort((a, b) => a.createdDate - b.createdDate);
  const [showModal, setShowModal] = useState(false);

  // NOTE: search bar
  return (
    <div className="sidebar" style={style}>
      <div className="list-header">
        <h3>Lists</h3>
        <button className="add-list" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} className="add-list-btn" />
        </button>
      </div>
      {showModal && <ListModal mode={"Create"} setShowModal={setShowModal} />}
      <div className="list-container">
        <ul className="lists">
          {curLists?.map((list) => (
            <List
              key={list.id}
              onClick={(event) => onClick(event)}
              list={list}
              selected={selected}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
