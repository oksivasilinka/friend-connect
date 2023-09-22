import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': 'b8ffb6e7-45c3-4a90-bff5-2d282762bc9f' },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
