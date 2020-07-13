import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'antd';
import classPrefix from '@ali-whale/class-prefix';

import './TopMenu.less';

const { SubMenu } = Menu;

const PREFIX = 'top-menu';
const px = classPrefix(PREFIX);

const renderMenuList = menuList => menuList.map((item) => {
  const { key, icon, text, children, render } = item;
  const isArray = Array.isArray(children);

  const renderItem = () => (
    typeof render === 'function'
      ? render()
      : (
        <span>
          {icon && (React.isValidElement(icon) ? icon : <Icon type={icon} />)}
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
      >
        {renderMenuList(children)}
      </SubMenu>
    );
  }

  return (
    <Menu.Item key={key}>
      {renderItem()}
    </Menu.Item>
  );
});

const TopMenu = (props) => {
  const { className, data, ...otherProps } = props;
  return (
    <Menu
      className={`${PREFIX} ${className}`}
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="horizontal"
      {...otherProps}
    >
      {renderMenuList(data)}
    </Menu>
  );
};


TopMenu.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

TopMenu.defaultProps = {
  className: '',
  style: {},
  data: [],
};

export default TopMenu;
