import React, { useState } from "react";
import styles from "./Button.module.css";
import style from "./SideBar.css";

const SideBar = ({ lists }) => {
  const curLists = lists?.sort((a, b) => a.createdDate - b.createdDate);

  // NOTE: search bar
  return (
    <div className="sidebar" style={style}>
      <div className="list-container">
        <ul className="lists">
          {curLists?.map((list) => (
            <li>
              <button key={list.id} className={styles.Button}>
                <svg className="list-icon" viewBox="0 0 24 24">
                  <path
                    d="M12 7a5 5 0 110 10 5 5 0 010-10z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>{list.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
