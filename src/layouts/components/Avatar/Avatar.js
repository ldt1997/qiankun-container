import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import people from './user.svg';
import styles from './Avatar.less';

const menu = (
  <Menu theme="dark">
    <Menu.Item>退出登录</Menu.Item>
  </Menu>
);

const Avatar = (props) => {
  const { className, ...otherProps } = props;
  return (
    <Dropdown overlay={menu}>
      <div className={`${styles.root} ${className}`} {...otherProps}>
        <img alt="people" src={people} />
      </div>
    </Dropdown>
  );
};


Avatar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

Avatar.defaultProps = {
  className: '',
  style: {},
};

export default Avatar;
