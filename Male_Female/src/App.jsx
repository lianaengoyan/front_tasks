import { useEffect, useState } from 'react'
import Buttons from './components/Buttons.jsx';
import UserList from './components/UserList.jsx';
import "./components/StyleApp.css";

export default function App () {

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then(res => res.json())
      .then(data => setUsers(data.results));
  }, []);

  const findUsers = users.filter(user => {
    if(filter === "all") return true;
    return user.gender === filter;
  });

  return (
    <div className='container'>
      <h2> Render of the Users </h2>

      <Buttons setFilter={setFilter} />
      <UserList findUsers={findUsers} />
    </div>
  )
  
}
