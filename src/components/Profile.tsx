import React from "react";
import classes from './Profile.module.css';

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
        <div>
            My post
            <div>
                New post
            </div>
            <div className={'posts'}>
                <div className={classes.item}>
                    post 1
                </div>
                <div className={classes.item}>
                    post 2
                </div>
                <div className={classes.item}>
                    post 3
                </div>
            </div>
        </div>
    </div>
}

export default Profile;