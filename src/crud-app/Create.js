import React, { useState } from "react";
import "./create.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMassege, setErroMassage] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setErroMassage("");
      await axios.post("http://localhost:3030/users", inputData).then((res) => {
        alert("Data posted Successfully!");
        navigate("/");
      });
    } catch (error) {
      setErroMassage(error.response.data.massage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="form__wrapper">
      <h1 className="new">Create New Record...</h1>
      {errorMassege && <p>{errorMassege}</p>}
      <>
        <form onSubmit={handleSubmit}>
          <div className="form__holder">
            <div className="fields">
              <label>Enter Name</label>
              <br></br>
              <input
                type="text"
                name=""
                id=""
                placeholder="Name"
                required
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
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
              />
            </div>

            <button className="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </>
    </div>
  );
};

export default Create;
