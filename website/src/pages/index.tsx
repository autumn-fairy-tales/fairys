// import { Button } from "@fairys/react/lib/components/button"
import { Button, Icon, Input } from '@fairys/react'

const Index = () => {

  return <div>
    <form onSubmit={(event) => {
      event.preventDefault()
      event.stopPropagation()
      console.log("event", event)
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
        <p slot="addon-before">I'll be placed before the h1</p>
        <p slot="addon-after">I'll be placed before the h2</p>
      </Input>
      <button type="submit" >提交</button>
    </form>

  </div>;
};
export const element = <Index />;
