import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Form, Select } from 'antd'
import { AppRootStateType, useAppDispatch } from 'redux/store'
import { Button, Typography } from 'components/common'
import { getNews } from 'redux/newsReducer'

export type FilterNewsForm = {
    country: string
    category: string
}
const countries = [
    { id: 'ae', name: 'UAE' },
    { id: 'ar', name: 'Argentina' },
    { id: 'at', name: 'Austria' },
    { id: 'au', name: 'Australia' },
    { id: 'be', name: 'Belgium' },
    { id: 'bg', name: 'Bulgaria' },
    { id: 'br', name: 'Brazil' },
    { id: 'ca', name: 'Canada' },
    { id: 'ch', name: 'Switzerland' },
    { id: 'cn', name: 'China' },
    { id: 'co', name: 'Colombia' },
    { id: 'cu', name: 'Cuba' },
    { id: 'cz', name: 'Czech Republic' },
    { id: 'de', name: 'Germany' },
    { id: 'eg', name: 'Egypt' },
    { id: 'fr', name: 'France' },
    { id: 'gb', name: 'United Kingdom' },
    { id: 'gr', name: 'Greece' },
    { id: 'hk', name: 'Hong Kong' },
    { id: 'hu', name: 'Hungary' },
    { id: 'id', name: 'Indonesia' },
    { id: 'ie', name: 'Ireland' },
    { id: 'il', name: 'Israel' },
    { id: 'in', name: 'India' },
    { id: 'it', name: 'Italy' },
    { id: 'kr', name: 'South Korea' },
    { id: 'lt', name: 'Lithuania' },
    { id: 'lv', name: 'Latvia' },
    { id: 'ma', name: 'Morocco' },
    { id: 'mx', name: 'Mexico' },
    { id: 'my', name: 'Malaysia' },
    { id: 'ng', name: 'Nigeria' },
    { id: 'nl', name: 'Netherlands' },
    { id: 'no', name: 'Norway' },
    { id: 'nz', name: 'New Zealand' },
    { id: 'ph', name: 'Philippines' },
    { id: 'pl', name: 'Poland' },
    { id: 'pt', name: 'Portugal' },
    { id: 'ro', name: 'Romania' },
    { id: 'rs', name: 'Serbia' },
    { id: 'ru', name: 'Russia' },
    { id: 'sa', name: 'Saudi Arabia' },
    { id: 'se', name: 'Sweden' },
    { id: 'sg', name: 'Singapore' },
    { id: 'si', name: 'Slovenia' },
    { id: 'sk', name: 'Slovakia' },
    { id: 'th', name: 'Thailand' },
    { id: 'tr', name: 'Turkey' },
    { id: 'tw', name: 'Taiwan' },
    { id: 'ua', name: 'Ukraine' },
    { id: 'us', name: 'USA' },
    { id: 've', name: 'Venezuela' },
    { id: 'za', name: 'South Africa' }
]

const categories = [
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'general', name: 'General' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Technology' }
]

export const NewsSearchForm = () => {

    const filter = useSelector((state: AppRootStateType) => state.news.filter)

    const dispatch = useAppDispatch()

    const onFilterChanged = (filter: FilterNewsForm) => {
        dispatch(getNews(filter))
    }

    const formik = useFormik({
        initialValues: {
            country: 'us',
            category: ''
        },

        onSubmit: (values: FilterNewsForm) => {
            onFilterChanged(values)
        }
    })

    return (

        <Form onFinish={formik.handleSubmit} initialValues={{ country: filter.country, category: filter.category }}>
            <Typography as={'label'}>Choose a country</Typography>
            <Select style={{ width: 200 }}
                    onChange={(value) => formik.setFieldValue('country', value)} defaultValue={'us'}
            >
                {countries.map((country: { id: string, name: string }) => {
                    return <Select.Option key={country.id} value={country.id}>{country.name}</Select.Option>
                })}
            </Select>

            <Button children={'Find'} />
            <Typography as={'label'}>Choose a category</Typography>
            <Select style={{ width: 200 }}
                    onChange={(value) => formik.setFieldValue('category', value)} defaultValue={'All'}
            >
                {categories.map((category: { id: string, name: string }) => {
                    return <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                })}
            </Select>

            <Button children={'Find'} />


        </Form>


    )
}
