import { useEffect, useState } from "react";
import style from "./Inbox.css";
import ToDo from "./ToDo";
import ToDoModal from "./ToDoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Inbox = ({ curList }) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const getToDosInfo = async (curList) => {
    try {
      const response = await fetch(
        `http://localhost:8080/${curList.userID}/${curList.listID}`
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  //useEffect(() => getToDosInfo(curList), []);

  const handleCreateButton = () => {
    setMode("Create");
    setShowModal(true);
    // 8080번 포트로 POST 호출
  };

  const handleModifyButton = (event) => {
    const id = event.target.parentNode.parentNode.parentNode.id;
    console.log(curList[id]);
    setMode("Modify");
    setShowModal(true);
    // 8080번 포트로 PUT 호출
  };

  const deleteToDo = async (curList, id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/todolist/${curList.listID}/todos/${id}`,
        {
          method: "DELETE",
          header: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButton = (event) => {
    const id = event.target.parentElement.parentElement.parentElement.id;
    console.log(id);
    // 8080번 포트로 DELETE 호출
    deleteToDo(curList, id);
  };

  const curTodos = curList.todos.map((todo) => ({ ...todo, key: todo.id }));

  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        <h2>{curList.name}</h2>
      </div>

      <div className="toDo-container">
        <ul className="todos">
          {curTodos?.map((todo) => (
            <ToDo
              onClickModify={handleModifyButton}
              onClickDelete={handleDeleteButton}
              key={todo.id}
              todo={todo}
            />
          ))}
          {showModal && (
            <ToDoModal
              curList={curList}
              setShowModal={setShowModal}
              todo={curTodos} // 이거 이대로 둬도되나
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
          curList={curList}
          setShowModal={setShowModal}
          todo={curTodos} // 이거 이대로 둬도되나
          mode={mode}
        />
      )}
    </div>
  );
};

export default Inbox;
