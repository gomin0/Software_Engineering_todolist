import styles from "./Button.module.css";

const List = ({ onClick, list, selected }) => {
  const isSelected = selected.id === list.id;

  return (
    <>
      <li key={list.id}>
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
        </button>
      </li>
    </>
  );
};

export default List;
