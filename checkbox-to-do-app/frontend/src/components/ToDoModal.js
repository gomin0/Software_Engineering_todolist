import React, { useState, useEffect } from "react";
import style from "./ToDoModal.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ToDoModal = ({ curList, setShowModal, setCurToDos, todo, mode }) => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (curList.userID) {
      setUserID(curList.userID);
    } else {
      setUserID(curList.user.userID);
    }
  }, [curList]);

  const editMode = mode === "Modify" ? true : false;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [data, setData] = useState({
    userID: userID,
    id: editMode ? todo.id : "",
    title: editMode ? todo.title : "",
    description: editMode ? todo.description : "",
    createdDate: editMode ? todo.createdDate : new Date(),
    dueDate: editMode ? todo.dueDate : date,
    remindTime: editMode ? todo.remindTime : time,
    isCompleted: editMode ? todo.isCompleted : false,
    priority: editMode ? todo.priority : 4,
  });

  // useEffect(() => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     userID: userID,
  //     priority: priority,
  //   }));
  // }, [userID]);

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

  const handlePriority = (event) => {
    setPriority(event.target.value);
    setData((data) => ({
      ...data,
      priority: event.target.value,
    }));
    console.log(data);
  };

  const handleDate = (newDate) => {
    setDate(newDate);

    const year = newDate.$y;
    const month = newDate.$M + 1;
    const day = newDate.$D;

    const date = newDate.$d;

    setData((data) => ({
      ...data,
      // dueDate: `${newDate.$M}, ${newDate.$D}, ${newDate.$y}`,
      // dueDate: `${year}-${month}-${day}`,
      dueDate: date,
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

    console.log(data.dueDate);
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

      const list = json.list.todos;
      const todoID = list[list.length - 1].id;

      setData((data) => ({
        ...data,
        id: todoID,
      }));
      console.log(data);

      setCurToDos((oldToDos) => [
        ...(oldToDos || []),
        { ...data, id: todoID, priority: priority },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateToDo = async (e) => {
    const todoTitle = data.title;
    const todoDescription = data.description;

    e.preventDefault();

    console.log(data.dueDate);
    try {
      const response = await fetch(
        `http://localhost:8080/users/todolist/${curList.id}/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      console.log(json);

      setData((data) => ({
        ...data,
        id: json.id,
      }));

      setCurToDos((oldToDos) => {
        return oldToDos.map((item) =>
          item.id == json.id
            ? {
                ...item,
                title: todoTitle,
                description: todoDescription,
                priority: json.priority,
              }
            : item
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    mode == "Modify" ? updateToDo(e) : postToDo(e);
    setShowModal(false);
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
              value={data.title}
              onChange={handleTitleChange}
              autoFocus
            />
            <input
              type="text"
              maxLength={20}
              placeholder="Description"
              name="description"
              value={data.description}
              onChange={handleContentChange}
            />
          </div>

          <div className="reminder-div">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  defaultValue={""}
                  value={data.priority}
                  onChange={handlePriority}
                >
                  <MenuItem value="4">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">High</MenuItem>
                  <MenuItem value="2">Medium</MenuItem>
                  <MenuItem value="3">Low</MenuItem>
                </Select>
              </FormControl>

              <DatePicker
                label="Until"
                value={data.dueDate}
                onChange={(newDate) => handleDate(newDate)}
              />

              <TimePicker
                label="Remind me at"
                value={data.remindTime}
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
            <button className="button-add" type="submit">
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
