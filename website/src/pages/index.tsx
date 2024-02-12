// import { Button } from "@fairys/react/lib/components/button"
import { useState } from "react"
import { Button, Icon, Input, Tab, TabItem } from '@fairys/react'



const Index = () => {
  const [activeKey, setActiveKey] = useState("1")


  return <div>
    <Tab onActive={(event) => {
      console.log("event", event.detail.activeKey)
      setActiveKey(event.detail.activeKey)
    }} >
      <TabItem title='标题' fkey='1' disabled={activeKey === '2'} >这是啥</TabItem>
      <TabItem title='标题2' fkey='2' >这是啥2</TabItem>
    </Tab>
    {/* <form action='/bout'>
      <Input label='label1' name="a">
        <div slot="start">start</div>
        <div slot="end">end</div>
      </Input>
      <br />
      <Input label='label2' name="b">
        <div slot="end">end</div>
      </Input>
      <br />
      <Input label='label3' name="c">
        <div slot="start">start</div>
      </Input>
      <br />
      <Input label='top' layoutType='top' name="d" />
      <br />
      <Input label='floating' layoutType='floating' name="e" />
    </form> */}
    {/* <form onSubmit={(event) => {
      event.preventDefault()
      event.stopPropagation()
      console.log("event", event)
      // const formData = new FormData(event.target);
    }} >
      
      Index
      <Icon
        onClickChange={(e) => console.log(333, e)}
      >33</Icon>
      <Button type="primary" className="dajd" >
        展示内容
      </Button>
      <Button size="large" type="primary"  >
        展示内容
      </Button>
      <Button size="small" >
        展示内容
      </Button>
      <Input name="daaa">
        <div slot="start">I'll be placed before the h1</div>
        <div slot="end">I'll be placed before the h2</div>
      </Input>
      <button type="submit" >提交</button>
    </form> */}

  </div>;
};
export const element = <Index />;
