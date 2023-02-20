import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./read.scss";

const Read = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/users/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <h1 className="read__info">Read Your Info...</h1>
      <div className="container">
        <p>{data.id}</p>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <Link className="back__btn" to="/">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Read;
