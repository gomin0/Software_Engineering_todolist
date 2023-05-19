import React, { useState, useRef } from "react";
import style from "./SideBar.css";
import List from "./List";

const SideBar = ({ onClick, lists, selected }) => {
  const curLists = lists?.sort((a, b) => a.createdDate - b.createdDate);

  // NOTE: search bar
  return (
    <div className="sidebar" style={style}>
      <div className="list-container">
        <ul className="lists">
          {curLists?.map((list) => (
            <List
              onClick={(event) => onClick(event)}
              list={list}
              selected={selected}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
