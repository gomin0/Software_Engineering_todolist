import { useEffect, useState } from "react";
import style from "./Inbox.css";
import ToDoContainer from "./ToDoContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const Inbox = ({ curList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const getAllToDos = () => {
  //   lists?.map((list) => getToDoInfo(list));
  // };

  // const getToDoInfo = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/${curUser}/${curList.listID}`
  //     );
  //     const json = await response.json();
  //     console.log(json);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => getToDoInfo(), []);

  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        <h2>{curList.name}</h2>
      </div>
      <ToDoContainer curList={curList}></ToDoContainer>
      <button className="add-todo" onClick={() => openModal()}>
        <FontAwesomeIcon icon={faPlus} className="add-todo-btn" />
        <p>add a new task</p>
      </button>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default Inbox;
