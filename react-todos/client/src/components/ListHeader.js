import Modal from "./Modal";

const ListHeader = ({ listName }) => {
  const signOut = () => {
    console.log("signout");
    console.log(Date());
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create">Add New</button>
        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <Modal></Modal>
    </div>
  );
};

export default ListHeader;
