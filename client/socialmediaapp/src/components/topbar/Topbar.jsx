import {Link} from "react-router-dom";
import {Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Logout } from "@mui/icons-material";
import "./topbar.css";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import {logoutCall} from "../../apiCalls";
export default function Topbar() {

    const {user,dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = () => {
        logoutCall(
          dispatch
        );
      }

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}} >
                    <span className="logo"> SocialMediaApp </span>
                </Link>
                
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                <Search className="searchIcon"/>
                <input placeholder="Search here" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                    <Link to="/" style={{textDecoration:"none"}} >
                       <span title="Logout" className="topbarLink" onClick={handleClick}><Logout   style={{textDecoration: "none", color: "white"}}/></span>
                    </Link>
                    </div>
                </div>
                <Link to ={`/profile/${user.username}`}>
                <img src={user.profilePicture? PF + user.profilePicture : PF+"person/noAvatar.jpeg"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
    
}