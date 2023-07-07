import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../redux/state";

export const DialogItem = (props: DialogsType) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCr-lKqKLOq1h6gltfpiurLTi6eX9Y0hkTiw&usqp=CAU"
                alt="ava"/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}