import { useState } from "react";
import style from "./ToDo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";

const ToDo = ({ todo, onClickModify, onClickDelete }) => {
  console.log(todo.id);
  const isCompleted = todo.isCompleted;
  const [isChecked, setIsChecked] = useState(isCompleted);

  const updateChecked = async () => {
    setIsChecked((prev) => !prev);
    todo.isCompleted = !isChecked;
    console.log(todo);
    try {
      const response = await fetch(
        `http://localhost:8080/users/todolist/${todo.list.id}/todos/${todo.id}?completed=${todo.isCompleted}`,
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
    <button id={todo.id} className="todo" style={style}>
      <div id={todo.id} className="todo-top">
        <div id={todo.id} className="todo-checkbox-container">
          <input
            id={todo.id}
            type="checkbox"
            checked={isChecked}
            onChange={updateChecked}
            className="todo-checkbox"
          />
          <p id={todo.id} className="todo-text">
            {todo.title}
          </p>
        </div>
        <div id={todo.id} className="todo-btns">
          <div id={todo.id} className="todo-edit" onClick={onClickModify}>
            <FontAwesomeIcon id={todo.id} icon={faInfo} />
          </div>
          <div id={todo.id} className="todo-delete" onClick={onClickDelete}>
            <FontAwesomeIcon id={todo.id} icon={faTrash} />
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
