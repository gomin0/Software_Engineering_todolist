import React, { useState } from "react";
import style from "./ToDoModal.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const ToDoModal = ({ curList, todo, mode, setShowModal }) => {
  const editMode = mode === "Modify" ? true : false;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // TODO: useState(sync with list)
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [data, setData] = useState({
    userID: curList.userID,
    todoID: editMode ? todo.id : "",
    todoTitle: editMode ? todo.name : "",
    todoContent: editMode ? todo.description : "",
    createdDate: editMode ? todo.createdDate : new Date(),
    remindDate: editMode ? todo.remindDate : date,
    remindTime: editMode ? todo.remindTime : time,
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
    console.log(name, value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 입력된 제목과 내용을 활용하여 원하는 작업 수행
    // 예: 서버로 전송, 상태 업데이트 등
    // console.log("제목:", title);
    // console.log("내용:", content);
    // // 모달 닫기
    console.log(data);
  };

  return (
    <div>
      <div className="todo-modal">
        <form onSubmit={handleSubmit}>
          <div className="form-inputs">
            <input
              type="text"
              maxLength={20}
              placeholder="Task Name"
              name="todoTitle"
              value={title}
              onChange={handleTitleChange}
              maxlength="20"
              autoFocus
            />
            <input
              type="text"
              maxLength={20}
              placeholder="Description"
              name="todoContent"
              value={content}
              onChange={handleContentChange}
            />
          </div>

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

          <div className="submit-contatiner">
            <button
              className="button-cancel"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="button-add" type="submit" disabled={!title}>
              Add task
            </button>
          </div>
        </form>
      </div>
      <div className="overlay" onClick={() => setShowModal(false)}></div>
    </div>
  );
};
export default ToDoModal;
