import axios from "../../constants/axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
// import { Context } from "../../context/Context";
import "./login.css";
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../features/userSlice';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  // const { dispatch, isFetching } = useContext(Context);
  const dispatch=useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data)
      dispatch(login(res.data))
      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      // dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={user.isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
