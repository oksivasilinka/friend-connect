import React from "react";
import s from './ProfileInfo.module.css';


function ProfileInfo() {
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCmO7xX0UxUNkyPhxObqf4o9RvB4O0fX_BQ&usqp=CAU"
                    alt="bg"/>
            </div>
            <div className={s.descriptionBlock}>
                ava + descr
            </div>
        </div>)
}

export default ProfileInfo;