import styles from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const List = ({ onClick, list, selected }) => {
  const isSelected = selected.id === list.id;

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
          selected
          onClick={(event) => onClick(event)}
        >
          <svg className="list-icon" viewBox="0 0 24 24">
            <path
              d="M12 7a5 5 0 110 10 5 5 0 010-10z"
              fill="currentColor"
            ></path>
          </svg>
          <span>{list.name}</span>
          <div className="list-edit-div">
            <FontAwesomeIcon className="list-edit-btn" icon={faPenToSquare} />
          </div>
        </button>
      </li>
    </>
  );
};

export default List;
