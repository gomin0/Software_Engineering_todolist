import { useEffect, useState } from "react";
import style from "./Inbox.css";
import Dropdown from "./Dropdown";
import ToDo from "./ToDo";
import ToDoModal from "./ToDoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Inbox = ({ curList }) => {
  // const curTodos = curList.todos?.map((todo) => ({ ...todo, key: todo.id }));
  const todos = curList.todos;
  const [curToDos, setCurToDos] = useState(todos);

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");

  useEffect(() => {
    // handleCompleteMenu();
    // handleNormalMenu();
    getToDosInfo();
  }, []);

  const getToDosInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/todolist/${curList.id}/todos`
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const filterCompleted = () => {
    if (!todos) {
      return;
    }
    const completedToDos = todos.filter((todo) => {
      return todo.isCompleted;
    });
    // setCurToDos(completedToDos);
  };

  const handleNormalMenu = () => {
    console.log(curToDos);
    // setCurToDos(curToDos);
    setOpen(false);
  };

  const handleCompleteMenu = () => {
    // show completed todos only
    filterCompleted();
    setOpen(false);
  };
  const handlePriorityMenu = () => {
    alert("Prio");
    setOpen(false);
  };

  const handleDueDateMenu = () => {
    alert("Due");
    setOpen(false);
  };

  const handleCreateButton = () => {
    setMode("Create");
    setShowModal(true);
    // 8080번 포트로 POST 호출
  };

  const handleModifyButton = (event) => {
    const id = event.target.parentNode.parentNode.parentNode.id;
    console.log(curList[id]);
    setMode("Modify");
    setShowModal(true);
    // 8080번 포트로 PUT 호출
  };

  const deleteToDo = async (curList, id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/todolist/${curList.listID}/todos/${id}`,
        {
          method: "DELETE",
          header: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButton = (event) => {
    const id = event.target.parentElement.parentElement.parentElement.id;
    console.log(id);
    // 8080번 포트로 DELETE 호출
    deleteToDo(curList, id);
  };

  return (
    <div className="inbox">
      <div className="list-name" style={style}>
        <h2>{curList.title}</h2>
        <Dropdown
          open={open}
          trigger={
            <button className="opt-btn" onClick={handleOpen}>
              Option
            </button>
          }
          menu={[
            <button onClick={handleNormalMenu}>Normal View</button>,
            <button onClick={handleCompleteMenu}>Completed Tasks</button>,
            <button onClick={handlePriorityMenu}>Menu 1</button>,
            <button onClick={handleDueDateMenu}>Menu 2</button>,
          ]}
        />
      </div>

      <div className="toDo-container">
        <ul className="todos">
          {curToDos?.map((todo) => (
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
              todo={curToDos} // 이거 이대로 둬도되나
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
          todo={curToDos} // 이거 이대로 둬도되나
          mode={mode}
        />
      )}
    </div>
  );
};

export default Inbox;
