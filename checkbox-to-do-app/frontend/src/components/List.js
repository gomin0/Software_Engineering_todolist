import styles from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const List = ({
  list,
  clickList,
  selectedList,
  onClickModify,
  onClickDelete,
}) => {
  const isSelected = selectedList ? selectedList.id == list.id : false;

  return (
    <>
      <li className="list-li" key={list.id}>
        <button
          id={list.id}
          className={
            isSelected
              ? `${styles.Button} ${styles.ButtonSelected}`
              : styles.Button
          }
          onClick={clickList}
        >
          <svg id={list.id} className="list-icon" viewBox="0 0 24 24">
            <path
              id={list.id}
              d="M12 7a5 5 0 110 10 5 5 0 010-10z"
              fill="currentColor"
            ></path>
          </svg>
          <span id={list.id}>{list.title}</span>
          <div id={list.id} className="list-btn-div">
            <div id={list.id} className="div-btn" onClick={onClickModify}>
              <FontAwesomeIcon
                id={list.id}
                className="list-edit-btn"
                icon={faPenToSquare}
              />
            </div>
            <div id={list.id} className="div-btn" onClick={onClickDelete}>
              <FontAwesomeIcon
                id={list.id}
                className="list-delete-btn"
                icon={faTrash}
              />
            </div>
          </div>
        </button>
      </li>
    </>
  );
};

export default List;
