import { useRef, useState } from "react";
import style from "./Inbox.css";
import ToDo from "./ToDo";
import ToDoModal from "./ToDoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Inbox = ({ curList }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const handleCreateButton = () => {
    setMode("Create");
    setShowModal(true);
  };

  const handleModifyButton = (event) => {
    const id = event.target.parentNode.parentNode.parentNode.id;
    console.log(curList[id]);
    setMode("Modify");
    setShowModal(true);
  };

  const curTodos = curList.todos.map(todo => ({...todo, key: todo.id}));

  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        <h2>{curList.name}</h2>
      </div>

      <div className="toDo-container">
        <ul className = "todos">
          {curTodos?.map((todo) => (
            <ToDo
              onClickModify={handleModifyButton}
              key={todo.id}
              todo={todo}
            />
          ))}
          {showModal && (
            <ToDoModal
              setShowModal={setShowModal}
              todo={curTodos}  // 이거 이대로 둬도되나
              mode={mode}
            />
          )}
        
        </ul>
      </div>
      

      <button className="add-todo" onClick={handleCreateButton}>
        <FontAwesomeIcon icon={faPlus} className="add-todo-btn" />
        <p>add a new task</p>
        </button>

        {showModal && (
            <ToDoModal
              setShowModal={setShowModal}
              todo={curTodos}  // 이거 이대로 둬도되나
              mode={mode}
            />
          )}
          
    </div>
  );
};

export default Inbox;
