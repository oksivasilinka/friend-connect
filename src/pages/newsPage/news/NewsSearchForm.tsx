import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Form, Select } from 'antd'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { Button } from 'components/common'
import { getNews } from 'redux/newsReducer'
import { useNavigate } from 'react-router-dom'


export type FilterNewsForm = {
    country: string
}

export const NewsSearchForm = () => {

    const filter = useSelector((state: AppRootStateType) => state.news.filter)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onFilterChanged = (filter: FilterNewsForm) => {
        dispatch(getNews(filter))
        // navigate({
        //     search: `?country=${filter.country}`
        // })
    }

    const formik = useFormik({
        initialValues: {
            country: 'us'
        },

        onSubmit: (values: FilterNewsForm) => {
            onFilterChanged(values)
        }
    })

    return (

        <Form onFinish={formik.handleSubmit} initialValues={{ country: filter.country }}>

            <Select style={{ width: 200 }}
                    onChange={(value) => formik.setFieldValue('country', value)} defaultValue={'us'}
            >
                <Select.Option value='us'>USA</Select.Option>
                <Select.Option value='fr'>France</Select.Option>
                <Select.Option value='ru'>Russia</Select.Option>
            </Select>

            <Button children={'Find'} />

        </Form>


    )
}
