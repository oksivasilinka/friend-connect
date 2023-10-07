import { Avatar, Card, Col, Row, Typography } from 'antd'
import { ChatMessage } from 'components/Chat/Chat'

type Props = {
    message: ChatMessage
}

const { Title } = Typography

export const Message = ({ message }: Props) => {

    return (
        <Card style={{ marginBottom: '10px' }}>
            <Row>
                <Col span={4}>
                    <Avatar size={'large'} src={message.photo} />
                    <Title level={4}>{message.userName}</Title>
                </Col>
                <Col span={20}>
                    <Title level={5}>{message.message}</Title>
                </Col>
            </Row>
        </Card>
    )
}