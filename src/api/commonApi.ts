import axios from 'axios'
import { ResultCode } from 'api/profileApi'

export const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': 'daee8b0a-f79f-4c77-a8a2-1e2410d2bc56' },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export type BaseResponse<T = {}, R = ResultCode> = {
    data: T
    messages: string[]
    resultCode: R
}