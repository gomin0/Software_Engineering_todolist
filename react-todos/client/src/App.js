import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

function App() {
  const userEmail = "kim@test.com";
  const [tasks, setTasks] = useState(null);
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getData, []);

  console.log(tasks);

  // Sort
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <ListHeader listName={"Checkbox ✓"} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default App;
