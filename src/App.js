import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleAddUser = (e) => {
    const name = e.target.name.value;
    const email = e.target.email.value;
    //console.log(name, email);
    const newUser = { name: name, email: email };
    fetch("http://localhost:5000/users", {
      method: "POST",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
        console.log(data);
      });
    e.target.name.value = "";
    e.target.email.value = "";
    e.preventDefault();
  };
  return (
    <div className="App">
      <h1>Hello Motherfucker!</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Please Type your name" />
        <br />
        <input type="text" name="email" placeholder="Please Type your Email" />
        <br />
        <input type="submit" value="submit" />
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
