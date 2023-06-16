import { useState } from "react";
import style from "./ToDo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";

const ToDo = ({ todo, onClickModify, onClickDelete }) => {
  const isCompleted = todo.isCompleted;
  const [isChecked, setIsChecked] = useState(isCompleted);

  const updateChecked = async () => {
    setIsChecked((prev) => !prev);
    todo.isCompleted = !isChecked;
    try {
      const response = await fetch(
        `http://localhost:8080/todolist/${todo.listID}/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="todo" style={style}>
      <div className="todo-top">
        <div className="todo-checkbox-container">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={updateChecked}
            className="todo-checkbox"
          />
          <p className="todo-text">{todo.title}</p>
        </div>
        <div className="todo-btns">
          <div className="todo-edit" onClick={onClickModify}>
            <FontAwesomeIcon icon={faInfo} />
          </div>
          <div className="todo-delete" onClick={onClickDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>

      <div className="todo-description">
        <p>{todo.description}</p>
      </div>

      <div className="todo-due-date">{todo.dueDate}</div>
    </button>
  );
};

export default ToDo;
