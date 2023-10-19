import { FilterForm, getUsersTC } from 'redux/usersReducer'
import React from 'react'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { usersFilterSelector } from 'components/users/usersSelectors'
import { Button, Form, Input, Select } from 'antd'
import s from './UsersSearchForm.module.css'
import { useAppDispatch } from 'redux/store'


type Props = {
    pageSize: number
}

export const UsersSearchForm = ({ pageSize }: Props) => {

    const filter = useSelector(usersFilterSelector)
    const dispatch = useAppDispatch()

    const onFilterChanged = (filter: FilterForm) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }

    const formik = useFormik({
        initialValues: {
            term: '',
            friend: null
        },

        onSubmit: (values: FilterForm) => {
            onFilterChanged(values)
        }
    })

    return (

        <Form onFinish={formik.handleSubmit} initialValues={{ term: filter.term, friend: filter.friend }} className={s.FormBlock}>

            <Input
                className={s.input}
                id='firstName'
                name='term'
                type='text'
                onChange={formik.handleChange}

            />

            <Select
                onChange={(value) => formik.setFieldValue('friend', value)}
              className={s.select}
                defaultValue={'null'}
            >
                <option value='null'>All</option>
                <option value='true'>Only followed</option>
                <option value='false'>Only unfollowed</option>
            </Select>

            <Button type='primary' htmlType='submit'>Find</Button>

        </Form>


    )
}
