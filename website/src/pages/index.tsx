import "@fairys/core"
import { MyComponent, CarefreeButton, } from "@fairys/react"


const Index = () => {
  return <div>
    Index
    <MyComponent first="Your" middle="张三" last="Name" />
  </div>;
};
export const element = <Index />;
