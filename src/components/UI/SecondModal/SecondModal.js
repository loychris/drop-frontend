import React from 'react';

import classes from './SecondModal.module.css';

const SecondModal = ( props ) => (
        <div
            className={classes.SecondModal}
            style={{
                backgorundColor: '#000a2f',
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
);

export default SecondModal;