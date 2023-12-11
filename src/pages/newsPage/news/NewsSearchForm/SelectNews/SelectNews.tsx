import { Button, Typography } from 'components/common'
import { Select } from 'antd'
import { SelectItem } from 'api/newsApi'

type Props = {
    label: string
    values: SelectItem[]
    onChange: (type: string, value: string) => void
    defaultValue: string
    type: string
}

export const SelectNews = ({ label, values, onChange, defaultValue, type }: Props) => {
    return (
        <div>
            <Typography as={'label'}>{label}</Typography>
            <Select style={{ width: 200 }}
                    onChange={(value) => onChange(type, value)} defaultValue={defaultValue}
            >
                {values.map((item: SelectItem) => {
                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                })}
            </Select>
            <Button children={'Find'} />
        </div>
    )
}