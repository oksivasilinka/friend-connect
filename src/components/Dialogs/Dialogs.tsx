import React from "react";
import s from "./Dialogs.module.css"

const Dialogs = (props: any) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <div className={s.dialog + ' ' + s.active}>
                    Oksana
                </div>
                <div className={s.dialog}>
                    Volodya
                </div>
                <div className={s.dialog}>
                    Valera
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