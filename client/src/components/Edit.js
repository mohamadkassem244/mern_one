import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Edit() {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/users/${id}`, user);
      fetchUser();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />

      <h1>Edit User</h1>

      {user ?
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          required
          placeholder="First Name"
          onChange={handleChange}
          value={user.first_name}
        />
        <input
          type="text"
          name="last_name"
          required
          placeholder="Last Name"
          onChange={handleChange}
          value={user.last_name}
        />
        <input
          type="text"
          name="username"
          required
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
        <input type="submit" value="Submit" />
      </form>
      :
      <></>
      }
    </>
  );
}
export default Edit;
