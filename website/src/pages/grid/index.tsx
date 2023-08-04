import React from 'react';
import { Row, Col  } from '@fairys/react'

const colStyle: React.CSSProperties = {
  padding: 5
}

const style: React.CSSProperties = {
  background: '#1677ff',
  color: '#fff',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const Page = () => {
  return (
    <div>
      <Row style={{ padding: 5 }}>
        <Col span={24} style={colStyle}><div style={style}>span 24</div></Col>
        <Col span={12} style={colStyle}><div style={style}>span 12</div></Col>
        <Col span={12} style={colStyle}><div style={style}>span 12</div></Col>
        <Col span={8} style={colStyle}><div style={style}>span 8</div></Col>
        <Col span={8} style={colStyle}><div style={style}>span 8</div></Col>
        <Col span={8} style={colStyle}><div style={style}>span 8</div></Col>
        <Col span={6} style={colStyle}><div style={style}>span 12</div></Col>
        <Col span={6} style={colStyle}><div style={style}>span 6</div></Col>
        <Col span={6} style={colStyle}><div style={style}>span 6</div></Col>
        <Col span={6} style={colStyle}><div style={style}>span 6</div></Col>
        <Col span={4} style={colStyle}><div style={style}>span 4</div></Col>
        <Col span={4} style={colStyle}><div style={style}>span 4</div></Col>
        <Col span={4} style={colStyle}><div style={style}>span 4</div></Col>
        <Col span={4} style={colStyle}><div style={style}>span 4</div></Col>
        <Col span={4} style={colStyle}><div style={style}>span 4</div></Col>
        <Col span={4} style={colStyle}><div style={style}>span 4</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
        <Col span={3} style={colStyle}><div style={style}>span 3</div></Col>
      </Row>
    </div>
  )
}

export const element = <Page />;