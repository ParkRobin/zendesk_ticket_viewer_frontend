import React from "react";
import './style.css';

export class Card extends React.Component {
  render() {
    const {num, children} = this.props;
    return (
      <div className='tic-card'>
        <div className='tic-num'>{num}</div>
        <div className='tic-content'>{children}</div>
      </div>
    );
  }
}

