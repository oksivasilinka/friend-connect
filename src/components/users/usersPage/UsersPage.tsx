import { Users } from 'components/users/usersPage/users/Users'
import { Typography } from 'components/common'

type Props = {
    pageTitle: string
}

export const UsersPage = ({ pageTitle }: Props) => {

    return (
        <>
            <Typography variant={'h2'} as={'h2'}>{pageTitle}</Typography>
            <Users />
        </>
    )
}
