import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "../scss/Users.scss";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const searchUsers = async (q) => {
    if(q.length > 0){
        try {
            const response = await axios.get(`http://localhost:3001/users/search/?q=${q}`);
            setUsers(response.data);
          } catch (err) {
            console.error("Error fetching users:", err);
          }
    }
    else{
        fetchUsers();
    }
  };

  const handleSearchChange = (e) => {
    const q = e.target.value;
    searchUsers(q);
  };

  const deleteUser = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />

      <div className="search">
        <input type="text" onChange={handleSearchChange} placeholder="Search..." />
      </div>

      <div className="users">

        {users.map((user) => (

          <div className="users__user" key={user._id}>

            <div className="users__user__info">
              <p><span>Name :</span>{user.first_name} {user.last_name}</p>
              <p><span>Email: </span>{user.email}</p>
              <p><span>Username: </span>{user.username}</p>
            </div>

            <div className="users__user__actions">
              <Link to={`/users/view/${user._id}`} className="users__user__actions__button view">View</Link>
              <Link to={`/users/edit/${user._id}`} className="users__user__actions__button edit">Edit</Link>
              <button onClick={() => deleteUser(user._id)} className="users__user__actions__button delete">Delete</button>
            </div>
            
          </div>

        ))}

      </div>
    </>
  );
}
export default Users;
