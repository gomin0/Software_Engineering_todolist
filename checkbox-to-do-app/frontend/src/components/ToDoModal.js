import React, { useState } from "react";
import style from "./ToDoModal.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const ToDoModal = ({ curList, setShowModal, setCurToDos, todo, mode }) => {
  const curUser = curList.user;
  const editMode = mode === "Modify" ? true : false;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // TODO: useState(sync with list)
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [data, setData] = useState({
    userID: curUser.userID,
    todo_id: editMode ? todo.id : "",
    title: editMode ? todo.name : "",
    description: editMode ? todo.description : "",
    createdDate: editMode ? todo.createdDate : new Date(),
    remindDate: editMode ? todo.remindDate : date,
    remindTime: editMode ? todo.remindTime : time,
    isCompleted: editMode ? todo.isCompleted : false,
    priority: editMode ? todo.priority : null,
  });

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setTitle(value);
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setContent(value);
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const activateReminder = () => {
    setIsChecked((prev) => !prev);
  };

  const handleDate = (newDate) => {
    setDate(newDate);
    setData((data) => ({
      ...data,
      remindDate: `${date.$M}, ${date.$D}, ${date.$y}`,
    }));
  };

  const handleTime = (newTime) => {
    setTime(newTime);
    setData((data) => ({
      ...data,
      remindTime: `${time.$H}, ${time.$m}`,
    }));
  };

  const postToDo = async (e) => {
    const todoInfo = {
      title: data.todoTitle,
      description: data.todoContent,
    };

    e.preventDefault();

    console.log(data);
    try {
      const response = await fetch(
        `http://localhost:8080/users/todolist/${curList.id}/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      console.log(json);

      setData((data) => ({
        ...data,
        todo_id: json.todo_id,
      }));

      setCurToDos((oldToDos) => [...oldToDos, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateToDo = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    mode == "Modify" ? updateToDo(e) : postToDo(e);
    setShowModal(false);
    console.log(data);
  };

  return (
    <div>
      <div className="todo-modal">
        <div className="todo-modal-top">
          <h3>{mode} a To-Do</h3>
          <div className="todo-list-title">{curList.title}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-inputs">
            <input
              type="text"
              maxLength={20}
              placeholder="Task Name"
              name="title"
              value={title}
              onChange={handleTitleChange}
              autoFocus
            />
            <input
              type="text"
              maxLength={20}
              placeholder="Description"
              name="description"
              value={content}
              onChange={handleContentChange}
            />
          </div>

          <div className="reminder-div">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Remind me on"
                value={date}
                onChange={(newDate) => handleDate(newDate)}
              />
              <TimePicker
                label="Remind me at"
                value={time}
                onChange={(newTime) => handleTime(newTime)}
              />
            </LocalizationProvider>
          </div>

          <div className="submit-contatiner">
            <button
              className="button-cancel"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="button-add" type="submit" disabled={!title}>
              {mode} task
            </button>
          </div>
        </form>
      </div>
      <div className="overlay" onClick={() => setShowModal(false)}></div>
    </div>
  );
};
export default ToDoModal;
