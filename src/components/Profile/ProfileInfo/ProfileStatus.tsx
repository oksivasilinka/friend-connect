import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus: React.FC<ProfileStatusPropsType> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = useState(true)
    const [userStatus, setUserStatus] = useState(status)

    useEffect(() => {
        setUserStatus(status)
    }, [status])

    const onDoubleClickHandler = () => {
        setEditMode(!editMode)
        updateStatus(userStatus)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setUserStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode &&
                <div>
                    <h4>Статус: </h4>
                    <span onDoubleClick={onDoubleClickHandler}>
                        {userStatus || 'no status'}
                    </span>
                </div>
            }
            {!editMode &&
                <div>
                    <input onBlur={onDoubleClickHandler}
                           onChange={onChangeStatus}
                           value={userStatus}
                           autoFocus>
                    </input>
                </div>
            }
        </div>
    )
}