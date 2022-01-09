import React from 'react'
import { Divider } from 'antd'
import {
  IdcardTwoTone,
  ProjectTwoTone,
  CameraTwoTone,
  EyeTwoTone,
  HourglassTwoTone,
  DollarTwoTone,
  ControlTwoTone,
  ProfileTwoTone,
  GiftTwoTone,
  FireTwoTone,
  DashboardTwoTone,
  CompassTwoTone,
  // CodeTwoTone
} from '@ant-design/icons'

import { Link } from 'react-router-dom'
import './home.less'

// import { Counter } from '@/counter/Counter';

const generatorList = [
  {
    name: 'person',
    icon: <IdcardTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'bing',
    icon: <CameraTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'nasa',
    icon: <EyeTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'color',
    icon: <ControlTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'lottery',
    icon: <GiftTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'plumFlower',
    icon: <FireTwoTone twoToneColor="#00bbbb" />
  },
  // {
  //   name: 'docker',
  //   icon: <CodeTwoTone twoToneColor="#00bbbb" />
  // }
]
const cnverterList = [
  {
    name: 'encode',
    icon: <HourglassTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'hex',
    icon: <ProjectTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'currency',
    icon: <DollarTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'queryString',
    icon: <ProfileTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'svg',
    icon: <DashboardTwoTone twoToneColor="#00bbbb" />
  }
]
const analyzerList = [
  {
    name: 'iPAddress',
    icon: <CompassTwoTone twoToneColor="#00bbbb" />
  }
]

const genTitle = (str: string) => {
  const FirstLetter = str.slice(0, 1).toUpperCase()
  return FirstLetter + str.slice(1).replace(/[A-Z](?=[a-z])/g, (x: string) => ' ' + x)
}


const genBtn = (list: any[], key: string) =>
  list.map((x: { name: string; icon: React.ReactChild }, i: number) => (
    <Link
      className="item inline-block align-top center m10"
      type="primary"
      key={key + i}
      to={'/' + x.name}
      title={genTitle(x.name)}>
      <div className="block">{x.icon}</div>
      <div className="text">{genTitle(x.name)}</div>
    </Link>
  ))
const Home = (props: any) => (
  <div className="app-home">
    <section className="home-container">
      <h1 className="common-title page-title">
        <img src="./logo-lab-thin.svg" alt="lab-logo" className="lab-logo" />
        project Lab
      </h1>
      <h2>Generator</h2>
      <div className="btn-list">{genBtn(generatorList, 'gen')}</div>
      <h2>Converter</h2>
      <div className="btn-list">{genBtn(cnverterList, 'cov')}</div>
      <h2>Analyzer</h2>
      <div className="btn-list">{genBtn(analyzerList, 'aly')}</div>
    </section>
    {/* <Counter /> */}
    <footer className="github">
      <Divider>
        <span className="footertext">
          <span>2020-present</span>
          <span className="splitcolor">\</span>
          <span>made by </span>
          <a
            href="https://github.com/hz2/project-lab"
            target="_blank"
            rel="noopener noreferrer">
            hz2
          </a>
          <span className="splitcolor">\</span>
          <a
            href="https://github.com/hz2/project-lab/discussions/new"
            target="_blank"
            rel="noopener noreferrer">
            feedback
          </a>
        </span>
      </Divider>
    </footer>
  </div>
)

export default Home
