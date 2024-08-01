import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function View() {
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

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Header />
      {user ?
      <>
      <h1>{user.first_name} {user.last_name}</h1>
      <form>
        <input
          type="text"
          name="first_name"
          required
          placeholder="First Name"
          value={user.first_name}
          disabled
        />
        <input
          type="text"
          name="last_name"
          required
          placeholder="Last Name"
          value={user.last_name}
          disabled
        />
        <input
          type="text"
          name="username"
          required
          placeholder="Username"
          value={user.username}
          disabled
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          disabled
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          disabled
        />
      </form>
      </>
      :
      <></>
      }
    </>
  );
}
export default View;
