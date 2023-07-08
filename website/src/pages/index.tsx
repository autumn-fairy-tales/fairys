import { Button } from "@fairys/react/lib/components/button"

const Index = () => {
  return <div>
    Index
    <Button type="primary" className="dajd" >
      展示内容
    </Button>
    <Button disabled type="dashed" className="dajd" >
      展示内容
    </Button>
    <Button size="large"  >
      展示内容
    </Button>
    <Button size="small" >
      展示内容
    </Button>
  </div>;
};
export const element = <Index />;
