import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import type { MenuProps } from "antd";
import "./index.less"
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { getMenuList } from "@/api/serviceApi";
import { searchRoute } from "@/utils/util";
import * as Icons from "@ant-design/icons";

// 定义 menu 类型
type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
):MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const LayoutMenu = () => {


  // 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState<MenuItem[]>([]);


  // 动态渲染 Icon 图标
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

  const deepLoopFloat = (menuList:any[], newArr: MenuItem[] = []) => {
    menuList.forEach((item: any[]) => {
      if(!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)))
      newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)))
    });
    return newArr;
  }

  const getMenuData = async() => {
    const res = await getMenuList() ;
    if(res?.data){
      setMenuList(deepLoopFloat(res.data))
    }
  }

  useEffect(()=>{
    getMenuData();
  }, [])

  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
    // const route = searchRoute(key, props.menuList);
    // if (route.isLink) window.open(route.isLink, "_blank");
    navigate(key);
  };

  return (
    <div className="menu">
      <Logo></Logo>
      <Menu
        style={{
          height: '100%',
        }} 
        items={menuList}
        mode='inline'
        onClick={clickMenu}
      />
    </div>
  )

}

export default LayoutMenu;