import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unFollow, UsersType
} from "../../redux/usersReducer";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/preloader";

export type UserPageType = {
    users: UsersType[]
}

type MapStateToPropsType = {
    usersPage: UserPageType
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}


type UsersApiPropsType = {
    usersPage: UserPageType
    follow: (id: any) => void,
    unFollow: (id: any) => void,
    setUsers: (users: UsersType[]) => void
    pageSize: number
    totalCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

class UsersAPIComponent extends React.Component<UsersApiPropsType, UsersType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {withCredentials: true, headers: {'API-KEY':'b8ffb6e7-45c3-4a90-bff5-2d282762bc9f'}})
            .then(res => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
            })
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`, {withCredentials: true, headers: {'API-KEY':'b8ffb6e7-45c3-4a90-bff5-2d282762bc9f'}})
            .then(res => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(res.data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                usersPage={this.props.usersPage}
                pageSize={this.props.pageSize}
                totalCount={this.props.totalCount}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
            />
        </>
    }
}

export const UsersContainer = connect(mapStateToProps, {
        follow,
        unFollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching
    }
)(UsersAPIComponent)