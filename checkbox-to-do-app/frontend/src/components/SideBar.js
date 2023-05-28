import React, { useState, useEffect } from "react";
import style from "./SideBar.css";
import List from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ListModal from "./ListModal";

const SideBar = ({ curUser, clickList, lists, selected }) => {
  /** request lists info with current user info */
  const sortedLists = lists?.sort((a, b) => a.createdDate - b.createdDate);
  const getAllLists = () => {
    sortedLists?.map((list) => getListInfo(list));
  };

  const getListInfo = async (list) => {
    try {
      const response = await fetch(
        `http://localhost:8080/${curUser.userEmail}/${list.listID}`
      );
      const json = await response.json();
      console.log(json);
      // TODO: print out each list info
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => getAllLists(), []);
  // TODO: replace lists with getListInfo()
  const curLists = lists?.sort((a, b) => a.createdDate - b.createdDate);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const handleCreateButton = () => {
    setMode("Create");
    setShowModal(true);
  };

  const handleModifyButton = () => {
    setMode("Modify");
    setShowModal(true);
  };

  return (
    <div className="sidebar" style={style}>
      <div className="list-header">
        <h3>Lists</h3>
        <button className="add-list" onClick={handleCreateButton}>
          <FontAwesomeIcon icon={faPlus} className="add-list-btn" />
        </button>
      </div>
      {showModal && <ListModal mode={mode} setShowModal={setShowModal} />}
      <div className="list-container">
        <ul className="lists">
          {curLists?.map((list) => (
            <List
              key={list.id}
              clickList={clickList}
              onClickModify={handleModifyButton}
              list={list}
              selected={selected}
            />
          ))}
          {showModal && (
            <ListModal
              mode={mode}
              setShowModal={setShowModal}
              list={selected}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
