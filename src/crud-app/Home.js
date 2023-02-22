import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [errorMassege, setErroMassage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        setErroMassage("");
        const { data } = await axios.get("http://localhost:3030/users");
        setData(data);
      } catch (error) {
        setErroMassage(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="table__wrapper">
      <div className="header">
        <h1>My Frist Crud Application...</h1>
        <Link to="/create" className="create">
          + Create Record
        </Link>
      </div>
      {errorMassege && <p>{errorMassege}</p>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th className="action">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>
                    <Link to={`/read/${d.id}`} className="read">
                      Read
                    </Link>
                    <Link className="update__btn" to={`/update/${d.id}`}>
                      Update
                    </Link>
                    <button
                      className="delete"
                      onClick={(e) => handleDelete(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );

  function handleDelete(id) {
    const comfirm = window.confirm("Are you sure you want to delete?");
    if (comfirm) {
      axios.delete("http://localhost:3030/users/" + id).then((res) => {
        alert("Data Deleted Successfully!");
        const filteredUsers = data.filter((user) => user.id !== id);
        setData(filteredUsers);
      });
    } else {
      return 0;
    }
  }
};

export default Home;
