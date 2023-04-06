import React from "react";
import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";



function Profile (props:any) {
    return <div>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCmO7xX0UxUNkyPhxObqf4o9RvB4O0fX_BQ&usqp=CAU" alt="bg"/>
        </div>
        <div>
            ava + descr
        </div>
        <MyPosts message={props.message} like={props.like}/>

    </div>
}

export default Profile;