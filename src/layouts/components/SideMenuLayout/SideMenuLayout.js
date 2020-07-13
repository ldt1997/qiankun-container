import React from 'react';
import classPrefix from '@ali-whale/class-prefix';
import { Layout } from 'antd';
import CollapsibleSiderMenu from '../CollapsibleSiderMenu';
import './SideMenuLayout.less';

const PREFIX = 'side-menu-layout';
const px = classPrefix(PREFIX);

const { Content } = Layout;

const SideMenuLayout = (props) => {
  const { children, history, location, menuData = [] } = props;

  const handleSideMenuClick = (item) => {
    if (item.key) {
      history.push(item.key);
    }
  };
  return (
    <Layout className={px('root')}>
      {/* 侧边栏 */}
      <CollapsibleSiderMenu
        selectedKeys={[location.pathname]}
        menuData={menuData}
        onMenuClick={handleSideMenuClick}
      />
      <Content className={px('content')}>
        <div style={{ minHeight: '100%' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default SideMenuLayout;
