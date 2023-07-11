import { Space, Button } from '@fairys/react'


const Page = () => {
  return (
    <div>
      <Space>
        {new Array(10).fill(null).map((item, index) => (
          <Button type="primary" key={index}>展示内容</Button>
        ))}
        <Button>展示内容</Button>
        <Button type="primary">展示内容</Button>
      </Space>
      <Space vertical>
        {new Array(10).fill(null).map((item, index) => (
          <Button type="primary" key={index}>展示内容</Button>
        ))}
        <Button>展示内容</Button>
        <Button type="primary">展示内容</Button>
      </Space>
    </div>
  )
}

export const element = <Page />;