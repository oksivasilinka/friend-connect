import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "redux/store";
import {follow, getUsersTC, setCurrentPage, unFollow} from "redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers,
} from "redux/usersSelectors";
import {UserResponseType} from "api/api";


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

type UsersPagePropsType = {
    users: UserResponseType[]
    follow: (id: number) => void,
    unFollow: (id: number) => void,
    pageSize: number
    totalCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    isFetching: boolean
    followingInProgress: number[]
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersPage extends React.Component<UsersPagePropsType, UserResponseType> {

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
    connect(mapStateToProps, {follow, unFollow, setCurrentPage, getUsers: getUsersTC,})
)(UsersPage)
