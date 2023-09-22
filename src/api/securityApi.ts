import { instance } from 'api/commonApi'


export const securityAPI = {
    getCaptchaUrl: async () => {
        const res = await instance.get<CaptchaResponseType>(`security/get-captcha-url`)
        return res.data
    }
}


export type CaptchaResponseType = {
    url: string
}