import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classPrefix from '@ali-whale/class-prefix';
import { useWindowListener } from '@ali-whale/hooks';
import { Icon, Layout } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { equals } from '@ali-whale/utils';
import './CollapsibleSiderMenu.less';
import SideMenu from '../SideMenu';

const PREFIX = 'collapsible-sider-menu';
const px = classPrefix(PREFIX);
const { Sider } = Layout;


const getSiderWidth = () => (window.innerWidth > 1600 ? 250 : 208);

const CollapsibleSiderMenu = (props) => {
  const { className, selectedKeys, onMenuClick, menuData } = props;
  const [siderWidth, setSiderWidth] = useState(getSiderWidth());
  useWindowListener('resize', () => {
    const width = getSiderWidth();
    if (width !== siderWidth) {
      setSiderWidth(width);
    }
  });
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(menuData.map(item => item.key));

  /* 菜单收起时的openKeys */
  const [openKeysC, setOpenKeysC] = useState([]);

  useEffect(() => {
    const ok = menuData.map(item => item.key);
    if (!equals(ok, openKeys)) {
      setOpenKeys(ok);
    }
  }, [menuData]);

  return (
    <Sider
      className={`${px('root')} ${className}`}
      width={siderWidth}
      collapsed={collapsed}
      collapsedWidth={50}
    >
      <div
        className={px('collapse-button', { collapsed })}
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon
          type="menu"
        />
      </div>
      <PerfectScrollbar className={px('side-menu')}>
        <SideMenu
          openKeys={collapsed ? openKeysC : openKeys}
          selectedKeys={selectedKeys}
          data={menuData}
          onClick={onMenuClick}
          onOpenChange={(o) => {
            if (collapsed) {
              setOpenKeysC(o);
            } else {
              setOpenKeys(o);
            }
          }}
        />
      </PerfectScrollbar>
    </Sider>
  );
};


CollapsibleSiderMenu.propTypes = {
  className: PropTypes.string,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  onMenuClick: PropTypes.func,
};

CollapsibleSiderMenu.defaultProps = {
  className: '',
  selectedKeys: [],
  menuData: [],
  onMenuClick: () => {

  },
};

export default CollapsibleSiderMenu;
