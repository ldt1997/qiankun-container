import React from 'react';
import SideMenuLayout from '../../layouts/components/SideMenuLayout';

const menuData = [
  {
    key: '/sub',
    text: '子页面',
    icon: 'file',
    children: [
      {
        key: '/sub/sub1',
        text: '子页面1',
      },
      {
        key: '/sub/sub2',
        text: '子页面2',
      },
    ],
  },
];

const SubLayout = props => (
  <SideMenuLayout {...props} menuData={menuData} />
);


export default SubLayout;
