import React from 'react';
import Aux from '../../hoc/Aux';
import River from './river.svg';

const layout = props => {


  const riverStyles = {
    position: 'absolute',
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 'auto',
  }
  return(
  <Aux>
    <img src={River} alt='' style={riverStyles}/>
    <main>{props.children}</main>
  </Aux>
  )
};

export default layout;