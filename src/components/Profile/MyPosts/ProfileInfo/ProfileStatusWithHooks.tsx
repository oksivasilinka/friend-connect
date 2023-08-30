import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    const [editMode, setEditMode] = useState(true)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onDoubleClickHandler = () => {
        setEditMode(!editMode)
        props.updateStatus(status)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode &&
                <div>
                    <h4>Статус: </h4>
                    <span onDoubleClick={onDoubleClickHandler}>
                        {status || 'no status'}
                    </span>
                </div>
            }
            {!editMode &&
                <div>
                    <input onBlur={onDoubleClickHandler}
                           onChange={onChangeStatus}
                           value={status}
                           autoFocus>
                    </input>
                </div>
            }
        </div>
    )
}