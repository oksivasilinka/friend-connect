import loader from "../../../assets/img/loader.svg";
import s from './preloader.module.css'
import React from 'react'

export const Preloader: React.FC = () => {
return (
    <div>
        <img className={s.preloader} src={loader} alt={'loader'}/>
    </div>
)
}