import React, { useState } from 'react';
import style from './ToDoModal.css'

const ToDoModal = ({ todo, mode, setShowModal }) => {
  const editMode = mode === "Modify" ? true : false;

  const [title, setTitle] = useState(""
  );
  const [content, setContent] = useState(""
  );



  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 입력된 제목과 내용을 활용하여 원하는 작업 수행
    // 예: 서버로 전송, 상태 업데이트 등
    console.log('제목:', title);
    console.log('내용:', content);
    // 모달 닫기
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
            name="title"
            value={title}
            onChange={handleTitleChange}
            maxlength="20"
            autoFocus
          />
          <input
          type="text"
            maxLength={20}
            placeholder="Description"
            name="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="submit-contatiner">
          <button className="button-cancel" onClick={() => setShowModal(false)}>
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
