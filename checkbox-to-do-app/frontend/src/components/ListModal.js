import React, { useState } from "react";
import style from "./ListModal.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const ListModal = ({ curUser, mode, setShowModal, list }) => {
  const editMode = mode === "Modify" ? true : false;

  const [data, setData] = useState({
    userID: curUser.userID,
    listID: editMode ? list.id : "",
    listTitle: editMode ? list.name : "",
    createdDate: editMode ? list.createdDate : new Date(),
  });

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postList = async (event) => {
    console.log(data);
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
  // TODO: updateList -> update = PUT

  return (
    <div className="overlay">
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
