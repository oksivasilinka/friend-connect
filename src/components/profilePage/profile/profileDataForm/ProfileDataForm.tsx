import { Input, Textarea } from 'components/common/formsControls/FormControls'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileResponseType } from 'api/profileApi'
import { createField } from 'utils/createField/createField'
import { Button, Icon } from 'components/common'
import s from './ProfileDataForm.module.css'

type ProfileFormData = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

type ProfileFormPropertiesType = Extract<keyof ProfileFormData, string>
type ProfileOwnProps = {
    profile: ProfileResponseType | null
}

type Props = InjectedFormProps<ProfileResponseType, ProfileOwnProps> & ProfileOwnProps

const ProfileDataForm = ({ handleSubmit, error, profile }: Props) => {
    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <div>
                <Button title={'Edit profilePage'} className={s.button}>
                    <Icon id={'save'} width={'18'} height={'18'} />
                    <span>Save Profile</span>
                </Button>
                {error && <div> {error} </div>}
            </div>

            <span className={s.subtitle}>Full name: </span>
            {createField<ProfileFormPropertiesType>('Full name...', 'fullName', [], Input)}
            <span className={s.subtitle}>About me: </span>
            {createField<ProfileFormPropertiesType>('About me...', 'aboutMe', [], Textarea)}
            <div style={{ display: 'flex', gap: 10 }}>
                <span className={s.subtitle}>Looking for a job:</span>
                <div
                    style={{ width: '30px' }}>{createField<ProfileFormPropertiesType>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}</div>
            </div>
            <span className={s.subtitle}>My skills:</span>
            {createField<ProfileFormPropertiesType>('My skills...', 'lookingForAJobDescription', [], Textarea)}
            <div>
                {profile?.contacts && Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <span className={s.subtitle}>{key}: </span>
                            {createField(`${key}`, 'contacts.' + key, [], Input)}
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

export const ProfileReduxDataForm = reduxForm<ProfileResponseType, ProfileOwnProps>({ form: 'edit-profilePage' })(ProfileDataForm)