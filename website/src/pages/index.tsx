import { FairysButton } from "@fairys/react"

const Index = () => {
  return <div>
    Index
    <FairysButton type="primary" className="dajd" >
      展示内容
    </FairysButton>
    <FairysButton disabled type="dashed" className="dajd" >
      展示内容
    </FairysButton>
    <FairysButton size="large"  >
      展示内容
    </FairysButton>
    <FairysButton size="small" >
      展示内容
    </FairysButton>
  </div>;
};
export const element = <Index />;
