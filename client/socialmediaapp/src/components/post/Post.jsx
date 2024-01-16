import { Link } from "react-router-dom";
import "./post.css";
import {MoreVert} from "@mui/icons-material"
import { IconButton } from "@mui/material";
import {Menu} from "@mui/material";
import {MenuItem} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {format} from "timeago.js";
import { AuthContext } from "../../context/AuthContext";


const Post = ({post}) => { 

    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(() =>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(() =>{
        const fetchUser = async () =>{
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data)
        };
        fetchUser();
    },[post.userId])

    const likeHandler =()=>{
       try{
        axios.put("/posts/"+post._id+"/like",{userId:currentUser._id});
       }catch(err){
        console.log(err);
       }
        
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    const [anchorEl, setAnchorEl] = useState(null);
 
    const MyOptions = [
        "Delete",
    ];
 
    const handleClickOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
 
    const open = Boolean(anchorEl);
 
    const handleClose = () => {
        setAnchorEl(null);
    };
 

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="posttopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img
                         className="postProfileImg"
                        src={
                             user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.jpeg"
                            }
                            alt=""
                    />
                    </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <IconButton
                            aria-label="more"
                            onClick={handleClickOptions}
                            aria-haspopup="true"
                            aria-controls="long-menu"
                        >
                
                            <MoreVert />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            onClose={handleClose}
                            open={open}
                        >
                            {MyOptions.map((option) => (
                                <MenuItem
                                    key={option}
                                    onClick={handleClose}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                        <span className="postlikeCounter">{like} Likes</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
