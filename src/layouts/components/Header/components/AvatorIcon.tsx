import avator from '@/assets/images/avatar.png';
import { Avatar, Modal, Dropdown, message } from "antd";
import type { MenuProps } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/golbal/action";
import "./index.less";

const AvatorIcon = (props: any) => {

  const { setToken } = props;
  const navigate = useNavigate();

  const logout = () => {
    const logoutModal = Modal.confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setToken("");
        message.success("退出登录成功！")
        navigate("/login");
        logoutModal.destroy();
      }
      
    })
    
  }

  
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch(key){
      case '1':
        navigate(HOME_URL)
        break;
      case '2':
        break;
      case '3':
        break; 
      case '4':
        logout();
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      label: '首页',
      key: '1',
    },
    {
      label: '个人信息',
      key: '2',
    },
    {
      label: '修改密码',
      key: '3',
    },
    {
      type: "divider"
    },
    {
      label: '退出登录',
      key: '4',
    },
  ];

  return (
    <div>
      <Dropdown placement='bottom' arrow  menu={{items, onClick}} overlayClassName={'avatorDropDown'}>
        <Avatar src={avator} size='large' />
      </Dropdown>
    </div>
  )
}

export default connect(null, {setToken})(AvatorIcon);