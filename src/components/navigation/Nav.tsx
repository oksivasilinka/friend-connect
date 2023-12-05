import { Link } from 'react-router-dom'
import { Icon } from 'components/common/icon'
import s from './Nav.module.css'

const menuItems = [
    { id: 'profile', title: 'Profile' },
    { id: 'users', title: 'Users' },
    { id: 'chat', title: 'Chat' }
]

export const Nav = () => {

    return (
        <>
            {menuItems.map(item => (
                <Link key={item.id} className={s.link} to={`/${item.id}`}>
                    <Icon id={item.id} />
                    <span>{item.title}</span>
                </Link>
            ))}
        </>
    )
}
