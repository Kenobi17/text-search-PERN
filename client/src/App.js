import React, { useEffect, useState } from "react";
import usersAPI from "./api/usersAPI";

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await usersAPI.get(`/?name=${name}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await usersAPI.get("/");
      setUsers(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="App container text-center">
      <h1 className="my-5">Users List</h1>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          placeholder="Search for user"
          className="form-control"
        />
        <button className="btn btn-success">Submit</button>
      </form>
      <table className="table my-5">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p>No results found</p>}
    </div>
  );
}

export default App;
