import { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const sendResetPasswordLink = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/password", {
        email: values.email,
      });

      toast.success(`Reset Link Sent!`)
     setValues({email: ""})
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  return (
    <div className="password-box">
      <div className="authitems">
        <h2>Muscle Memory</h2>
        <p>Email for new password link</p>
        <form className="loginbox" onSubmit={(e) => sendResetPasswordLink(e)}>
          <input
            name="email"
            value={values.email}
            placeholder="email"
            onChange={handleInputChange}
          />
          <button>Send Link</button>
        </form>
        <div className="auth-btn-cont">
          <Link to="/">Back To Login</Link>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default ForgotPassword;
