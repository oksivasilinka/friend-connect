import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateStatus } from 'redux/profileReducer'
import { statusSelector } from 'components/profile/profileSelector'
import { useAppDispatch } from 'redux/store'


export const ProfileStatus = () => {
    const status = useSelector(statusSelector)
    const [editMode, setEditMode] = useState(true)
    const [userStatus, setUserStatus] = useState(status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setUserStatus(status)
    }, [status])

    const onDoubleClickHandler = () => {
        setEditMode(!editMode)
        dispatch(updateStatus(userStatus))
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