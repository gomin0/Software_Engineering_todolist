import React, { useState } from "react";
import style from "./ListModal.css";

const ListModal = ({ curUser, mode, setShowModal, setLists, list }) => {
  const editMode = mode === "Modify" ? true : false;

  const [data, setData] = useState({
    userID: curUser.userID,
    id: editMode ? list.id : null,
    title: editMode ? list.title : "",
    createdDate: editMode ? list.createdDate : new Date(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postList = async (event) => {
    const listInfo = {
      title: data.title,
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/users/${curUser.userID}/todolist`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(listInfo),
        }
      );
      const json = await response.json();
      console.log(json.id);

      setData((data) => ({
        ...data,
        id: json.id,
      }));

      setLists((oldLists) => [...oldLists, { ...data, id: json.id }]);
      // setLists(() => ({
      //   ...data,
      //   id: json.id,
      // }));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const updateList = async (event) => {
    event.preventDefault();
    const listID = data.id;
    const listTitle = data.title;
    const listInfo = {
      userID: curUser.userID,
      title: listTitle,
    };
    try {
      const response = await fetch(
        `http://localhost:8080/users/todolist/${listID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(listInfo),
        }
      );
      const json = await response.json();
      console.log(json);
      setData((data) => ({
        ...data,
        title: json.title,
      }));
      console.log(data);

      // NOTE: make sure it works...
      // ...oldLists, [new]
      setLists((oldLists) => {
        return oldLists.map((item) =>
          item.id == listID ? { ...item, title: listTitle } : item
        );
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    editMode ? updateList(event) : postList(event);
  };

  return (
    <div>
      <div className="list-modal">
        <div className="list-modal-top">
          <h3>{mode} a list</h3>
        </div>

        <div className="list-modal-mid">
          <h4>Name</h4>
          <form>
            <input
              className="list-input"
              required
              maxLength={20}
              placeholder="add a new list"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
          </form>
        </div>

        <div className="list-modal-down">
          <button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="overlay" onClick={() => setShowModal(false)}></div>
    </div>
  );
};

export default ListModal;
