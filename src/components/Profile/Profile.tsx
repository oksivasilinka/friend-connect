import React from "react";
import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

// let s = {
//     'content': 'Profile_content__KAfe3',
//     'item': 'Profile_item__jqkg9',
// }

function Profile () {
    return <div className={classes.content}>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCmO7xX0UxUNkyPhxObqf4o9RvB4O0fX_BQ&usqp=CAU" alt="bg"/>
        </div>
        <div>
            ava + descr
        </div>
        <MyPosts/>

    </div>
}

export default Profile;