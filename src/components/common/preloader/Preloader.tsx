import loader from "../../../assets/img/loader.svg";
import s from './preloader.module.css'

export const Preloader = () => {
return (
    <div>
        <img className={s.preloader} src={loader} alt={'loader'}/>
    </div>
)
}