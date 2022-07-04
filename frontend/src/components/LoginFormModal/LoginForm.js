import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoSubmit = (e) => {
    e.preventDefault();
    history.push("/");
    return dispatch(sessionActions.demoLogin());
  }

  return (
    <form id="loginmodalform" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <p id="loginheader">Log In</p>
      <label>
        <input id="inputusernamelogin"
          type="text"
          placeholder="Username"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        <input id="inputpasswordlogin"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button id="btnlogin" type="submit">Log In</button>
      <button className="demobutton" onClick={demoSubmit} >Demo User</button>
    </form>
  );
}

export default LoginForm;