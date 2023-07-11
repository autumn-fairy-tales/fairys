// import { Button } from "@fairys/react/lib/components/button"
import { Button, Icon } from '@fairys/react'

const Index = () => {
  return <div>
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
  </div>;
};
export const element = <Index />;
