const ToDo = ({ todo }) => {
  /* try using for loop to return multiple todos */
  return (
    <button className="todo">
      <div className="todo-top">
        <div className="todo-checkbox-container">
          <button className="todo-checkbox" />
          <p className="todo-text">{todo.text}</p>
        </div>
        <div className="todo-edit">📝</div>
      </div>

      <div className="todo-description">{todo.description}</div>

      <div className="todo-due-date">{todo.dueDate}</div>
    </button>
  );
};

export default ToDo;
