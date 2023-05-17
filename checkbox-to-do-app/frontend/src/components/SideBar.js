const SideBar = ({ list }) => {
  return (
    <div className="sidebar">
      <div className="search-bar">Search Bar</div>
      <div className="list-container">
        <ul>
          <li className="class">list1</li>
          <li className="class">list2</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
