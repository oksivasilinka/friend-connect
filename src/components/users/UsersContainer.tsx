import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "redux/store";
import { usersActions, follow, getUsersTC, unFollow } from 'redux/usersReducer'
import {Users} from "./Users";
import {Preloader} from "components/common/preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers,
} from "components/users/usersSelectors";
import { UserResponseType } from 'api/usersApi'


type MapStateToPropsType = {
    users: UserResponseType[]
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}


type MapDispatchToProps = {
    follow: (id: number) => void,
    unFollow: (id: number) => void,
    setCurrentPage: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToProps


class UsersPage extends React.Component<PropsType> {

    componentDidMount() {
        const {getUsers, currentPage, pageSize} = this.props
        getUsers(currentPage, pageSize)
    }

    onPageChanged = (page: number) => {
        const {getUsers, pageSize} = this.props
        getUsers(page, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalCount={this.props.totalCount}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToProps, null, AppRootStateType>(mapStateToProps, {follow, unFollow, setCurrentPage: usersActions.setCurrentPage, getUsers: getUsersTC,})
)(UsersPage)
