import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../redux/dialogsReducer";


export const DialogItem: React.FC<DialogsType> = ({id, name}) => {
    let path = '/dialogs/' + id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCr-lKqKLOq1h6gltfpiurLTi6eX9Y0hkTiw&usqp=CAU"
                alt="ava"/>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}