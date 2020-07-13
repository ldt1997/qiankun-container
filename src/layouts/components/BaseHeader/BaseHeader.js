import React from 'react';
import PropTypes from 'prop-types';
import classPrefix from '@ali-whale/class-prefix';
import logo from './logo.png';
import './BaseHeader.less';

const PREFIX = 'cbd-header';
const px = classPrefix(PREFIX);

const Logo = (props) => {
  const { className = '', src = logo, ...otherProps } = props;
  return (
    <div className={`${px('logo')} ${className}`} {...otherProps}>
      <img alt="logo" src={src} />
    </div>
  );
};

const Title = (props) => {
  const { className = '', ...otherProps } = props;
  return (
    <div className={(`${px('title')} ${className}`)} {...otherProps} />
  );
};

const HSpace = (props) => {
  const { size, ...otherProps } = props;
  return (<div style={{ width: size || 0 }} {...otherProps} />);
};

const Item = (props) => {
  const { className = '', text = false, hPadding = 12, style = {}, ...otherProps } = props;
  return (
    <div
      className={px(`${px('item', { 'text-link': text })} ${className}`)}
      style={{
        paddingLeft: hPadding,
        paddingRight: hPadding,
        ...style,
      }}
      {...otherProps}
    />
  );
};


const BaseHeader = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <div className={`${PREFIX} ${className}`} {...otherProps}>
      {children}
    </div>
  );
};


BaseHeader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

BaseHeader.defaultProps = {
  className: '',
  style: {},
};

export { Logo, Title, HSpace, Item };

export default BaseHeader;
