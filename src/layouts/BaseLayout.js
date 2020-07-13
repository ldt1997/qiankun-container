import React from 'react';
import classPrefix from '@ali-whale/class-prefix';
import { ConfigProvider, Layout, message } from 'antd';
import { router } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import BaseHeader, { HSpace, Item, Logo, Title } from './components/BaseHeader';
import TopMenu from './components/TopMenu';
import SearchBar from './components/SearchBar';
import headMenuData from './menuData';
import Avatar from './components/Avatar';
import './BaseLayout.less';

const { Header, Content } = Layout;


const PREFIX = 'base-layout';
const px = classPrefix(PREFIX);

const findPrefixSelectedKey = (topMenu, key = '') => {
  for (let i = 0; i < topMenu.length; i += 1) {
    const item = topMenu[i];
    if (item.key !== '/' && key.startsWith(item.key)) {
      return item.key;
    }
  }
  return key;
};


class BaseLayout extends React.Component {
  handleSideMenuClick = (item) => {
    const { history } = this.props;
    if (item.key) {
      history.push(item.key);
    }
  };

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== 'development') {
      const { location } = this.props;
      message.error({
        content: `非常抱歉，您当前访问的页面:${location.pathname}因为意外的错误崩溃了`,
        duration: 2,
        key: 'error',
      });
      router.replace('/exception/500');
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  render() {
    const { children, location } = this.props;

    return (
      <ConfigProvider locale={zhCN}>
        <Layout className={`${px('root')}`}>
          {/* 顶栏 */}
          <Header className={px('header')}>
            <BaseHeader>
              <Logo />
              <Title>Whale Cloud</Title>
              <HSpace size={50} />
              <TopMenu
                selectedKeys={[findPrefixSelectedKey(headMenuData, location.pathname)]}
                data={headMenuData}
                onClick={this.handleSideMenuClick}
                style={{ flex: 1 }}
              />
              <Item>
                <SearchBar />
              </Item>
              <Item text>消息</Item>
              <Avatar />
            </BaseHeader>
          </Header>
          <Content>
            {children}
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default BaseLayout;
