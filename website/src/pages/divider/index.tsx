import { Divider } from '@fairys/react'


const Page = () => {
  return (
    <div>
      <div style={{ padding: 20 }}>
        <span>正直</span>
        <Divider layout="vertical"></Divider>
        <span>进取</span>
        <Divider layout="vertical"></Divider>
        <span>合作</span>
        <Divider layout="vertical"></Divider>
        <span>创新</span>
      </div>

      <div style={{ padding: 20 }}>
        <span>正直</span>
        <Divider layout="horizontal"></Divider>
        <span>进取</span>
        <Divider layout="horizontal">Divider</Divider>
        <span>合作</span>
        <Divider layout="horizontal"></Divider>
        <span>创新</span>
      </div>

      <div style={{ padding: 20 }}>
        <div>
          通过高效广告平台，协助品牌和市场营销者触达数以亿计的中国消费者通过金融科技及企业服务，促进合作伙伴业务发展，助力实现数字化升级，我们大力投资于人才队伍和推动科技创新，积极参与互联网行业协同发展。
        </div>
        <Divider align="left">Divider</Divider>
        <div>
          通过高效广告平台，协助品牌和市场营销者触达数以亿计的中国消费者通过金融科技及企业服务，促进合作伙伴业务发展，助力实现数字化升级，我们大力投资于人才队伍和推动科技创新，积极参与互联网行业协同发展。
        </div>
        <Divider align="center" dashed>Divider</Divider>
        <div>
          通过高效广告平台，协助品牌和市场营销者触达数以亿计的中国消费者通过金融科技及企业服务，促进合作伙伴业务发展，助力实现数字化升级，我们大力投资于人才队伍和推动科技创新，积极参与互联网行业协同发展。
        </div>
        <Divider align="right">Divider</Divider>
        <div>
          通过高效广告平台，协助品牌和市场营销者触达数以亿计的中国消费者通过金融科技及企业服务，促进合作伙伴业务发展，助力实现数字化升级，我们大力投资于人才队伍和推动科技创新，积极参与互联网行业协同发展。
        </div>
      </div>
    </div>
  )
}

export const element = <Page />;