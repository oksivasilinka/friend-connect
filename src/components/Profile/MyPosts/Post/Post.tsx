import React from "react";
import s from './Post.module.css'

type Props = {
    message: string
    likeCount: number
}

export const Post: React.FC<Props> = ({message, likeCount}) => {
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa50GcxIx9RSLUfR8h_GtLk89fsNlRDRexZCApYj20akbHjZLdZK-Kp54sQlatXTAWJeY&usqp=CAU"
                alt="ava"/>
            {message}
            <div>
                <span>like {likeCount}</span>
            </div>
        </div>
    )
}