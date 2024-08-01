import { useState, useEffect } from "react";
import Header from "./Header";
import "../scss/Add.scss";

function Add() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const postFormData = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postFormData(formData);
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <Header />

      <h1>New User</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          required
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          required
          placeholder="Last Name"
        />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          required
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
export default Add;
