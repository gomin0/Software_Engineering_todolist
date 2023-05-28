import { useState } from "react";
import style from "./ListModal.css";

const ListModal = ({ curUser, mode, setShowModal, list }) => {
  const editMode = mode === "Modify" ? true : false;

  const [data, setData] = useState({
    userID: curUser.userID,
    listID: editMode ? list.id : null,
    listTitle: editMode ? list.name : null,
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
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/${curUser.userID}/todolist`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="list-modal">
        <div className="list-modal-top">
          <h2>{mode} a list</h2>
        </div>

        <div className="list-modal-mid">
          <h3>Name</h3>
          <form>
            <input
              className="list-input"
              required
              maxLength={20}
              placeholder="add a new list"
              name="listTitle"
              value={data.listTitle}
              onChange={handleChange}
            />
          </form>
        </div>

        <div className="list-modal-down">
          <button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="submit-btn" onClick={postList}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
