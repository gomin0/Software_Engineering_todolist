import ToDo from "./ToDo";
import style from "./ToDoContainer.css";

const ToDoContainer = ({ curList }) => {
  const todos = curList.todos;

  return (
    <div className="todo-container" style={style}>
      {todos?.map((todo) => (
        <ToDo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ToDoContainer;
