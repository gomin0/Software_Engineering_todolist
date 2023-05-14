const ListItem = () => {
  const mode = "create";
  const handleChange = () => {
    console.log("changed");
  };
  return (
    //<div className="overlay">
    //<div clasName="modal">
    <div className="form-title-container">
      <h3>{mode}</h3>
      <button>X</button>
    </div>
    /*
      <form>
        <input
          require
          maxLength={30}
          placeholder=" Name a task"
          name="title"
          value={""}
          onChange={handleChange}
        />
        <br />
        <input
          required
          type="range"
          min="0"
          max="100"
          name="progress"
          value={""}
          onChange={handleChange}
        />
        <input className={mode} type="submit" />
      </form>
      */
    //</div>
    //</div>
  );
};

export default ListItem;
