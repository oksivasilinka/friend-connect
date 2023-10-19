import axios from 'axios'
import { ResultCode } from 'api/profileApi'

export const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': '10ea9e36-ad5d-4a98-8bf1-6ac6abd14f8d' },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export type BaseResponseType<T = {}, R = ResultCode> = {
    data: T
    messages: string[]
    resultCode: R
}