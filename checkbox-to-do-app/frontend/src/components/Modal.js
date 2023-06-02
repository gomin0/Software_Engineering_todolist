import React, { useState } from "react";
import style from "./Modal.css";

const Modal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
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
    console.log("제목:", title);
    console.log("내용:", content);
    // 모달 닫기
    closeModal();
  };

  return (
    <div>
      <div className="modal" style={style}>
        <form onSubmit={handleSubmit}>
          <div className="form-inputs">
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목"
            />
            <input
              type="text"
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="내용"
            />
            <input
              type="checkbox"
              checked={isChecked}
              onChange={activateReminder}
            />
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
            <button className="button-cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="button-add" type="submit">
              Add task
            </button>
          </div>
        </form>
      </div>
      <div className="overlay" onClick={closeModal}></div>
    </div>
  );
};

export default Modal;
