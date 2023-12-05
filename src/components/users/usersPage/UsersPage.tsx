import { Users } from 'components/users/usersPage/users/Users'
import { Title } from 'components/common'

type Props = {
    pageTitle: string
}

export const UsersPage = ({ pageTitle }: Props) => {

    return (
        <>
            <Title title={pageTitle} />
            <Users />
        </>
    )
}
