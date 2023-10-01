import React from 'react'
import { connect } from 'react-redux'
import { AppRootStateType } from 'redux/store'
import { usersActions, follow, getUsersTC, unFollow, FilterForm } from 'redux/usersReducer'
import { Users } from './Users'
import { Preloader } from 'components/common/preloader'
import { compose } from 'redux'
import {
    getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter
} from 'components/users/usersSelectors'
import { UserResponseType } from 'api/usersApi'
import { Field, Form, Formik } from 'formik'


type MapStateToPropsType = {
    users: UserResponseType[]
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    filter: FilterForm
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}


type MapDispatchToProps = {
    follow: (id: number) => void,
    unFollow: (id: number) => void,
    setCurrentPage: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterForm) => void
}

type PropsType = MapStateToPropsType & MapDispatchToProps


class UsersPage extends React.Component<PropsType> {

    componentDidMount() {
        const { getUsers, currentPage, pageSize, filter } = this.props
        getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (page: number) => {
        const { getUsers, pageSize, filter } = this.props
        getUsers(page, pageSize, filter)
    }

    onFilterChanged = (filter: FilterForm) => {
        const { getUsers, pageSize } = this.props
        getUsers(1, pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalCount={this.props.totalCount}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToProps, null, AppRootStateType>(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage: usersActions.setCurrentPage,
        getUsers: getUsersTC
    })
)(UsersPage)


// const usersSearchFormValidate = (values: any) => {
//     return { values }
// }


type UsersSearchFormObjectType = {
    onFilterChanged: (filter: FilterForm) => void
}

export const UsersSearchForm: React.FC<UsersSearchFormObjectType> = React.memo(({ onFilterChanged }) => {

    const submit = (values: FilterForm, { setSubmitting }: {
        setSubmitting: (isSubmitting: boolean) => void
    }) => {
        onFilterChanged(values)
        setSubmitting(false)
    }
    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: undefined }}
                // validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type='text' name='term' />
                        <Field name='friend' as='select' >
                        <option value='undefined'>All</option>
                        <option value='true'>Only followed</option>
                        <option value='false'>Only unfollowed</option>
                    </Field>
                        <button type='submit' disabled={isSubmitting}> Find</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})