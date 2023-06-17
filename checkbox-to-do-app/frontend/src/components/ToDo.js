import { useEffect, useState } from "react";
import style from "./ToDo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";

const ToDo = ({ todo, onClickModify, onClickDelete }) => {
  const isCompleted = todo.isCompleted;
  const [isChecked, setIsChecked] = useState(isCompleted);

  useEffect(() => {
    priorityConvert(todo.priority);
  }, [todo]);

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

  const priorityConvert = (p) => {
    if (p == 1) {
      return "!!!";
    } else if (p == 2) {
      return "!!";
    } else if (p == 3) {
      return "!";
    } else {
      return "";
    }
  };

  const [formattedDate, setFormattedDate] = useState("");
  const [isOutdated, setIsOutdated] = useState(false);

  const dueDateConvert = () => {
    if (todo.dueDate === null) {
      setFormattedDate("");
    } else {
      const date = new Date(todo.dueDate);
      const newDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });

      if (date < new Date()) {
        setIsOutdated(true);
      }

      setFormattedDate(newDate);
    }
  };

  useEffect(() => {
    dueDateConvert();
  }, [todo]);

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
          <p
            id={todo.id}
            className={`todo-priority ${isChecked ? "checked" : ""}`}
          >
            <b>{priorityConvert(todo.priority)} </b>
          </p>
          <p id={todo.id} className={`todo-text ${isChecked ? "checked" : ""}`}>
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

      <div className={`todo-description ${isChecked ? "checked" : ""}`}>
        <p>{todo.description}</p>
      </div>

      <div
        className={`todo-due-date ${isChecked ? "checked" : ""} ${
          isOutdated ? "outdated" : ""
        }`}
      >
        {formattedDate}
      </div>
    </button>
  );
};

export default ToDo;
