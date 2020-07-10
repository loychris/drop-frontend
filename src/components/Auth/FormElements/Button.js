import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = props => {
  if (props.href) {
    return (
      <a
        className={`${classes.button} button${props.size || 'default'} ${props.inverse &&
          'buttonInverse'} ${props.danger && 'buttonDanger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${classes.button} button${props.size || 'default'} ${props.inverse &&
          'buttonInverse'} ${props.danger && 'buttonDanger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.button} button${props.size || 'default'} ${props.inverse &&
        'buttonInverse'} ${props.danger && 'buttonDanger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
