import { useState } from "react";
import "./ForgotPassword.css";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const params = useParams();

  const history = useHistory();

  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = values;

    // if(newPassword.length > 6){
    //   return alert("Password Length Must Be 6 Or More Characters!")
    // }
    if (newPassword !== confirmPassword && confirmPassword !== newPassword) {
      return toast.error("Passwords Do Not Match!");
    }

    if (newPassword.length < 6) {
      return toast.error("New Password Must Be At Least 6 Characters");
    }

    let token = params.token;


    try {
      await axios.patch(
        `/api/v1/password/resetPassword/${token}`,
        {
          newPassword: values.newPassword,
        }
      );
      toast.success("Password Updated");

      setTimeout(() => {
        history.push("/");
      }, 3000);
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  return (
    <div className="password-box">
      <div className="authitems">
        <h2>Muscle Memory</h2>
        <p>Type Your New Password</p>
        <form className="loginbox" onSubmit={(e) => resetPassword(e)}>
          <input
            name="newPassword"
            value={values.newPassword}
            placeholder="New Password"
            onChange={handleInputChange}
          />
          <input
            name="confirmPassword"
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
          <button>Reset Password</button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
