import { Layout } from "antd";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LayoutHeader from "./components/Header";
import LayoutMenu from "./components/Menu";
import "./index.less"

const {Sider, Content} = Layout;
const LayoutIndex = () => {
  
  return (
    <section className="container">
      <Sider>
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader></LayoutHeader>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </section>
  )

}

export default LayoutIndex;

