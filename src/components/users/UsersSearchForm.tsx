import { FilterForm, getUsersTC } from 'redux/usersReducer'
import React, { FC } from 'react'
import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'


type Props = {
    pageSize: number
}

export const UsersSearchForm: FC<Props> = React.memo(({ pageSize}) => {

    const dispatch = useDispatch()
    const onFilterChanged = (filter: FilterForm) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }

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
                        <Field name='friend' as='select'>
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