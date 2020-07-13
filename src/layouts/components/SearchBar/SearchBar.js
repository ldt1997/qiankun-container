import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './SearchBar.less';

const { Search } = Input;

const PREFIX = 'cbd-search-bar';

const SearchBar = (props) => {
  const { className, ...otherProps } = props;
  return (
    <Search className={`${PREFIX} ${className}`} placeholder="搜索" {...otherProps} />
  );
};


SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  ...Search.propTypes,
};

SearchBar.defaultProps = {
  className: '',
  style: {},
};

export default SearchBar;
