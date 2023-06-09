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

  useEffect(() => {
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
    const list = findElementByID(curLists, id);

    if (list) {
      setCurrent(list);
      setMode("Modify");
      setShowModal(true);
    }
  };

  const handleDeleteButton = async (event) => {
    const id = event.target.id;
    const list = curLists.find((e) => e.id == id);

    if (list) {
      if (window.confirm(`Delete list "${list.title}"?`)) {
        try {
          await fetch(`http://localhost:8080/users/todolist/${id}`, {
            method: "DELETE",
            header: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error(error);
        }
      }
      setUpdatedLists((oldLists) => {
        return oldLists.filter((element) => element.id != list.id);
      });
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
          {updatedLists?.map((list) => (
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
