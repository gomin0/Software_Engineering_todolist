import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import ToDo from "./components/ToDo";

class ToDos {
  constructor(id, listID, text, description, isCompleted, dueDate, priority) {
    this.id = id;
    this.listID = listID;
    this.text = text;
    this.description = description;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const todo1 = new ToDos(0, 0, "css", "init", false, "15MAY23", 1);
const todo2 = {
  id: 1,
  listID: 1,
  text: "git",
  description: "2nd",
  dueDate: "19MAY23",
  priority: 3,
};

// NOTE: Try to generalize the function
const getData = async ({ data }) => {
  try {
    const response = await fetch(`http://localhost:8000/{data}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const App = () => {
  const usrInfo = "admin";
  const [lists, setLists] = useState(null);
  const [todos, setToDos] = useState(null);

  /* const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/${usrInfo}/${listID}`
      );
      const json = await response.json();
      setToDos;
    } catch (error) {
      console.error(error);
    }
  }; */

  useEffect(() => getData, []);

  // TODO: get function required for todos
  const sortedToDos = todos?.sort(
    (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
  );

  return (
    <div className="app">
      <Header></Header>
      {sortedToDos?.map((todo) => (
        <ToDo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default App;
