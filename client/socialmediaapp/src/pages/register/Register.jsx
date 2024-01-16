import { useRef } from "react";
import "./register.css"
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Password do not match");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,

            };
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            }
            catch(err){
                console.log(err)
            }
        }

    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialMediaApp</h3>
                    <span className="loginDesc">Connect with friends and the world around you on SocialMediaApp.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="Email" required ref={email} type="email" className="loginInput" />
                        <input type="password" required ref={password} placeholder="Password" minLength="6" className="loginInput" />
                        <input type="password" required ref={passwordAgain} placeholder="Password Again" className="loginInput" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <Link to="/login">
                        <button className="loginRegisterButton">Log into Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
