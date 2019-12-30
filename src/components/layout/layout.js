import React from 'react';
import Aux from '../../hoc/Aux';
import River from '../../SVGs/River.svg';

const layout = props => {
  return(
  <Aux>
    <img src={River} alt='' className='River'/>
    <main>{props.children}</main>
  </Aux>
  )
};

export default layout;