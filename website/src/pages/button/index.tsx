import { Space, Button } from '@fairys/react'


const Page = () => {
  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 10 }}>
        <Button>基础按钮</Button>
        <Button type="primary">主题按钮</Button>
        <Button type="success">成功按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button type="white">白色按钮</Button>
      </Space>
      <Space style={{ marginBottom: 10 }}>
        <Button variant="border">基础按钮</Button>
        <Button variant="border" type="primary">主题按钮</Button>
        <Button variant="border" type="success">成功按钮</Button>
        <Button variant="border" type="warning">警告按钮</Button>
        <Button variant="border" type="danger">危险按钮</Button>
        <Button variant="border" dashed type="white">白色按钮</Button>
      </Space>
      <Space style={{ marginBottom: 10 }}>
        <Button variant="dashed">基础按钮</Button>
        <Button variant="dashed" type="primary">主题按钮</Button>
        <Button variant="dashed" type="success">成功按钮</Button>
        <Button variant="dashed" type="warning">警告按钮</Button>
        <Button variant="dashed" type="danger">危险按钮</Button>
        <Button variant="dashed" dashed type="white">白色按钮</Button>
      </Space>
      <Space style={{ marginBottom: 10 }}>
        <Button shape>基础按钮</Button>
        <Button shape size="large" type="primary">主题按钮</Button>
        <Button shape size="small" type="success">成功按钮</Button>
        <Button shape type="warning">警告按钮</Button>
        <Button shape type="danger">危险按钮</Button>
        <Button shape dashed type="white">白色按钮</Button>
      </Space>
      <div>
        <Space style={{ marginBottom: 10 }}>
          <Button shape size="large" type="primary">主题按钮</Button>
          <Button shape size="default" type="success">成功按钮</Button>
          <Button shape size="small" type="warning">警告按钮</Button>
        </Space>
      </div>
      <Space vertical style={{ marginBottom: 10, width: 300 }}>
        <Button block>基础按钮</Button>
        <Button block shape type="primary">主题按钮</Button>
        <Button block type="success">成功按钮</Button>
        <Button block type="warning">警告按钮</Button>
        <Button block type="danger">危险按钮</Button>
        <Button block dashed type="white">白色按钮</Button>
      </Space>
    </div>
  )
}

export const element = <Page />;