import { useEffect, useState } from "react";
import style from "./Inbox.css";
import Dropdown from "./Dropdown";
import ToDo from "./ToDo";
import ToDoModal from "./ToDoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Inbox = ({ curList }) => {
  // const curTodos = curList.todos?.map((todo) => ({ ...todo, key: todo.id }));
  const todos = curList.todos;
  const [curToDos, setCurToDos] = useState(todos);
  const [viewToDos, setViewToDos] = useState(null);

  const [current, setCurrent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");
  const [viewOption, setViewOption] = useState("NormalView");

  useEffect(() => {
    getToDosInfo();
  }, [curList]);

  useEffect(() => {
    if (curToDos.length > 0) {
      setCurrent(curToDos[curToDos.length - 1]);
    }
    // setViewToDos(curToDos);
  }, [curList, curToDos]);

  const getToDosInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/todolist/${curList.id}/todos`
      );
      const json = await response.json();

      setCurToDos(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const latest = curToDos[curToDos.length - 1];

    if (viewOption == "NormalView") {
      normalView();
    } else if (viewOption === "CompletedOnlyView") {
      completedOnlyView();
    } else if (viewOption === "PriorityView") {
      priorityView();
    } else if (viewOption === "DueDateView") {
      dueDateView();
    }
  }, [curToDos, viewOption]);

  const handleViewOptions = (event) => {
    setViewOption(event.target.value);
  };

  const normalView = () => {
    const normalToDos = curToDos.sort((a, b) => a.id - b.id);

    setViewToDos(normalToDos);
  };

  const completedOnlyView = () => {
    if (!curToDos) {
      return;
    }

    const completedToDos = curToDos.filter((todo) => {
      return todo.isCompleted;
    });
    console.log(completedToDos);

    setViewToDos(completedToDos);
  };

  const priorityView = () => {
    if (!curToDos) {
      return;
    }

    const prioritySortedToDos = [...curToDos].sort((a, b) => {
      if (a.priority === null) return 1;
      if (b.priority === null) return -1;

      return a.priority - b.priority;
    });
    console.log(prioritySortedToDos);

    setViewToDos(prioritySortedToDos);
  };

  const dueDateView = () => {
    if (!curToDos) {
      return;
    }

    console.log(curToDos);
    const sortedToDos = [...curToDos].sort((a, b) => {
      if (a.dueDate === null && b.dueDate === null) {
        return 0;
      } else if (a.dueDate === null) {
        return 1;
      } else if (b.dueDate === null) {
        return -1;
      } else {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });

    setViewToDos(sortedToDos);
  };

  const handleCreateButton = () => {
    setMode("Create");
    setShowModal(true);
  };

  const handleModifyButton = (event) => {
    const id = event.target.id;
    const element = curToDos?.find((e) => e.id == id);
    if (element) {
      setCurrent(element);
      console.log(element);
      setMode("Modify");
      setShowModal(true);
    }
  };

  const deleteToDo = async (id) => {
    try {
      await fetch(
        `http://localhost:8080/users/todolist/${curList.id}/todos/${current.id}`,
        {
          method: "DELETE",
          header: { "Content-Type": "application/json" },
        }
      );

      setCurToDos((oldToDos) => {
        //TODO: find and delete
        return oldToDos.filter((element) => element.id != id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButton = (event) => {
    const id = event.target.id;
    const element = curToDos?.find((e) => e.id == id);
    if (element) {
      setCurrent(element);
      if (window.confirm(`Delete To-Do "${element.title}"?`)) {
        deleteToDo(id);
      }
    }
  };

  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        <h2>{curList.title}</h2>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={viewOption}
            onChange={handleViewOptions}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ height: 30 }}
          >
            <MenuItem value={"NormalView"}>Normal</MenuItem>
            <MenuItem value={"CompletedOnlyView"}>Completed</MenuItem>
            <MenuItem value={"PriorityView"}>Priority</MenuItem>
            <MenuItem value={"DueDateView"}>Due Date</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="toDo-container">
        <ul className="todos">
          {viewToDos?.map((todo) => (
            <ToDo
              onClickModify={handleModifyButton}
              onClickDelete={handleDeleteButton}
              key={todo.id}
              todo={todo}
            />
          ))}
          {showModal && (
            <ToDoModal
              curList={curList}
              setShowModal={setShowModal}
              setCurToDos={setCurToDos}
              setCurrent={setCurrent}
              todo={current}
              mode={mode}
            />
          )}
        </ul>
      </div>

      <button className="add-todo" onClick={handleCreateButton}>
        <FontAwesomeIcon icon={faPlus} className="add-todo-btn" />
        <p>add a new task</p>
      </button>

      {showModal && (
        <ToDoModal
          curList={curList}
          setShowModal={setShowModal}
          setCurToDos={setCurToDos}
          setCurrent={setCurrent}
          todo={current}
          mode={mode}
        />
      )}
    </div>
  );
};

export default Inbox;
