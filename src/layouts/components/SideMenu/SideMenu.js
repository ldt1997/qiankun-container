import React from 'react';
import PropTypes from 'prop-types';
import classPrefix from '@ali-whale/class-prefix';

import './SideMenu.less';
import { Icon, Menu } from 'antd';


const { SubMenu } = Menu;

const PREFIX = 'side-menu';
const px = classPrefix(PREFIX);

const renderMenuList = (menuList, onClick) => menuList.map((item) => {
  const { key, icon, text, children, render, clickable = false } = item;
  const isArray = Array.isArray(children);

  const renderItem = () => (
    typeof render === 'function'
      ? render()
      : (
        <span>
          {icon && <Icon type={icon} />}
          <span>{text}</span>
        </span>
      ));

  if (isArray) {
    /* subMenu */
    return (
      <SubMenu
        key={key}
        popupClassName={px('popup')}
        title={renderItem()}
        onTitleClick={(...args) => {
          if (clickable) {
            onClick(...args);
          }
        }}
      >
        {renderMenuList(children, onClick)}
      </SubMenu>
    );
  }

  return (
    <Menu.Item key={key}>
      {renderItem()}
    </Menu.Item>
  );
});

const SideMenu = (props) => {
  const { className, data, onClick, ...otherProps } = props;
  return (
    <Menu
      className={`${PREFIX} ${className}`}
      theme="dark"
      defaultSelectedKeys={['1']}
      {...otherProps}
      onClick={onClick}
      mode="inline"
    >
      {renderMenuList(data, onClick)}
    </Menu>
  );
};


SideMenu.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

SideMenu.defaultProps = {
  className: '',
  style: {},
  data: [],
};

export default SideMenu;
