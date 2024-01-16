import { useContext, useRef } from "react";
import "./login.css";
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import {Link} from "react-router-dom";


const Login = () => {

    const email = useRef();
    const password = useRef();

    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick =(e) =>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch);

    };
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialMediaApp</h3>
                    <span className="loginDesc">Connect with friends and the world around you on SocialMediaApp.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" required type="email" className="loginInput" ref={email}/>
                        <input type="password" required minLength="6" placeholder="Password" className="loginInput" ref={password}/>
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? (<CircularProgress color="inherit" size="20px"/>): ("Login")}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register" style={{textDecoration: "none"}}>
                        <button className="loginRegisterButton">{isFetching ? (<CircularProgress color="inherit" size="20px"/>): ("Create a new account")}</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
