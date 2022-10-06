import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser, setUser } from "../../redux/reducer";
import "./Auth.css";

import React from "react";

const Auth = (props) => {
  const [newUser, setNewUser] = useState(false);
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const history = useHistory();

  const toggleNewUser = () => {
    setNewUser(!newUser);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    // return alert("Login unavailable");
    try {
      const user = await axios.post("/api/v1/auth/login", {
        email: values.email,
        password: values.password,
      });
      sessionStorage.setItem("token", user.data.token);
      props.setUser(user.data.user);
      history.push("/home");
    } catch (err) {
      alert(err.response.request.response);
    }
  };
  const register = async (e) => {
    e.preventDefault();


    try {
      const user = await axios.post("/api/v1/auth/register", { ...values });
      sessionStorage.setItem("token", user.data.token);
      console.log(user);
      props.setUser(user.data.user);
      history.push("/home");
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  return (
    <div className="authbox">
      {/* <div className="construction">
      <h2>Website Currently Under Construction</h2>
      <p>Please try logging in another time</p>
      <p>Sorry for any inconveinence</p>
    </div> */}
      {newUser ? (
        <div className="authitems">
          <h2>Muscle Memory</h2>
          <form className="loginbox" onSubmit={(e) => register(e)}>
            <input
              name="email"
              value={values.email}
              placeholder="email"
              onChange={handleInputChange}
            />
            <input
              name="username"
              value={values.username}
              placeholder="username"
              onChange={handleInputChange}
              maxLength="100"
            />
            <input
              name="password"
              value={values.password}
              // type="password"
              placeholder="password"
              onChange={handleInputChange}
            />
            <button>Create Account</button>
          </form>
          <button onClick={() => toggleNewUser()}>Have an account?</button>
        </div>
      ) : (
        <div className="authitems">
          <h2>Muscle Memory</h2>
          <form className="loginbox" onSubmit={(e) => login(e)}>
            <input
              name="email"
              value={values.email}
              placeholder="email"
              onChange={handleInputChange}
            />
            <input
              name="password"
              value={values.password}
              type="password"
              placeholder="password"
              onChange={handleInputChange}
            />
            <button>Login</button>
          </form>
          <div className="auth-btn-cont">
            <Link to="/forgot-password" onClick={() => toggleNewUser()}>Forgot Password?</Link>
            <button onClick={() => toggleNewUser()}>Need an account?</button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  loginUser,
  setUser,
};

const mapStateToProps = (reduxState) => {
  console.log(reduxState);
  return reduxState.userReducer.user;
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
