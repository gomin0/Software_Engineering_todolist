import React, { useState, useEffect } from "react";
import style from "./SideBar.css";
import List from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ListModal from "./ListModal";

const SideBar = ({
  curUser,
  curLists,
  clickList,
  selectedList,
  setSelect,
  setLists,
}) => {
  const [updatedLists, setUpdatedLists] = useState(curLists);

  console.log(updatedLists);
  useEffect(() => {
    console.log(updatedLists);
    // setLists((oldLists) => [...oldLists, ...updatedLists]);
    setLists(updatedLists);
  }, [updatedLists]);

  const [current, setCurrent] = useState(selectedList);

  function findElementByID(array, id) {
    return array.find((element) => element.id == id);
  }

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const handleCreateButton = () => {
    setMode("Create");
    setShowModal(true);
  };

  const handleModifyButton = (event) => {
    const id = event.target.id;
    console.log(event.target);
    const list = findElementByID(curLists, id);
    setCurrent(list);
    setMode("Modify");
    setShowModal(true);
  };

  const handleDeleteButton = async (event) => {
    const id = event.target.id;
    const list = curLists.find((e) => e.id == id);

    if (window.confirm(`Delete list "${list.title}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8080/users/todolist/${id}`,
          {
            method: "DELETE",
            header: { "Content-Type": "application/json" },
          }
        );
        const json = await response.json();
        //TODO: find and delete
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="sidebar" style={style}>
      <div className="list-header">
        <h3>Lists</h3>

        <button className="add-list" onClick={handleCreateButton}>
          <FontAwesomeIcon icon={faPlus} className="add-list-btn" />
        </button>
      </div>

      {showModal && (
        <ListModal
          curUser={curUser}
          mode={mode}
          setShowModal={setShowModal}
          setLists={setUpdatedLists}
          // setLists={setLists}
          setSelect={setSelect}
          list={current}
        />
      )}

      <div className="list-container">
        <ul className="lists">
          {curLists?.map((list) => (
            <List
              key={list.id}
              list={list}
              clickList={clickList}
              selectedList={selectedList}
              onClickModify={handleModifyButton}
              onClickDelete={handleDeleteButton}
            />
          ))}
          {showModal && (
            <ListModal
              curUser={curUser}
              mode={mode}
              setShowModal={setShowModal}
              setLists={setUpdatedLists}
              // setLists={setLists}
              setSelect={setSelect}
              list={current}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
