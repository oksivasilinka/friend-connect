import { Avatar, Card, Col, Row, Typography } from 'antd'
import s from './Message.module.css'
import { ChatMessageApi } from 'api/chat.api'
import React from 'react'

type Props = {
    message: ChatMessageApi
}

const { Title } = Typography

export const Message = React.memo(({ message }: Props) => {

    return (
        <Card className={s.messageCard}>
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
})