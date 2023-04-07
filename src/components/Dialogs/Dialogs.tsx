import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

const Dialogs = (props: any) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to={'/dialogs/1'} activeClassName={s.active}>Oksana</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to={'/dialogs/2'}>Volodya</NavLink>

                </div>
                <div className={s.dialog}>
                    <NavLink to={'/dialogs/3'}>Valera</NavLink>

                </div>
            </div>
            <div className={s.messages}>
                <div className={s.dialog}>Hi</div>
                <div className={s.dialog}>Hello!</div>
                <div className={s.dialog}>How are you?</div>
            </div>
        </div>
    )
}

export default Dialogs;