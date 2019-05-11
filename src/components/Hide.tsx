import React from 'react';
import './hide.css';

interface HideProps {
  hidden: boolean
}

export function Hide (props) {
  return (
    <div className={props.hidden ? 'hidden' : 'visible'}>
      {props.children}
    </div>
  )
}
