import './index.less';
import AvatorIcon from './components/AvatorIcon';
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const LayoutHeader = () => {


  return (
    <div
      className="layout-header"
    >
      <div>
        <MenuUnfoldOutlined />
      </div>
      <div className='rightHeader'>
        <p style={{marginRight: 12}}>Hooks</p>
        <AvatorIcon />
      </div>
    </div>
  )
}

export default LayoutHeader;