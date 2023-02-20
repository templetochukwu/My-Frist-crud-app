import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMassege, setErroMassage] = useState("");
  const [inputData, setInputData] = useState({
    id: id,
    name: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/users/" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setErroMassage("");
      await axios
        .put("http://localhost:3030/users/" + id, inputData)
        .then((res) => setInputData(res.data));
      alert("Data updated successfully!");
      navigate("/");
    } catch (error) {
      setErroMassage(error.response.data.massage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form__wrapper">
      <h1 className="new">Update a Record...</h1>
      {errorMassege && <p>{errorMassege}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form__holder">
          <div className="fields">
            <label>ID</label>
            <br></br>
            <input
              type="number"
              name=""
              id=""
              placeholder="Id"
              disabled
              required
              value={inputData.id}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>

          <div className="fields">
            <label>Enter Name</label>
            <br></br>
            <input
              type="text"
              name=""
              id=""
              placeholder="Name"
              required
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>

          <div className="fields">
            <label>Enter Email Address</label>
            <br></br>
            <input
              type="email"
              name=""
              id=""
              placeholder="Email"
              required
              value={inputData.email}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>

          <button className="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
