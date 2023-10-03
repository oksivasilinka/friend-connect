import { AppRootStateType } from 'redux/store'

export const dialogPageSelector = (state: AppRootStateType) => {
    return state.dialogsPage
}
