import { useState } from "react";
import style from "./ListModal.css";

const ListModal = ({ mode, setShowModal }) => {
  const editMode = mode === "Edit" ? true : false;

  const [data, setData] = useState({
    userID: "",
    listID: "",
    listName: "",
    createdDate: editMode ? "" : new Date(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

    console.log(data);
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
              name="listName"
              value={data.listName}
              onChange={handleChange}
            />
          </form>
        </div>

        <div className="list-modal-down">
          <button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
