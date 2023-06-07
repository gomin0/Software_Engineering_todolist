import styles from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const List = ({ list, selected, clickList, onClickModify }) => {
  const isSelected = selected.id === list.id;

  // const handleListClick = (event) => {
  //   const selectedID = event.target.id;
  //   const selectedList = lists.find((list) => list.id === parseInt(selectedID));
  //   setListName(selectedList);
  // };

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
          onClick={clickList}
        >
          <svg className="list-icon" viewBox="0 0 24 24">
            <path
              d="M12 7a5 5 0 110 10 5 5 0 010-10z"
              fill="currentColor"
            ></path>
          </svg>
          <span>{list.name}</span>
          <div className="list-edit-div" onClick={onClickModify}>
            <FontAwesomeIcon className="list-edit-btn" icon={faPenToSquare} />
          </div>
        </button>
      </li>
    </>
  );
};

export default List;