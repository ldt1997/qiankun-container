import React from 'react';
import queryString from 'query-string';

import Exception from '@/components/Exception/Exception';

export default ({ location }) => {
  const { msg } = queryString.parse(location.search);
  return <Exception type={500} desc={msg} />;
};
