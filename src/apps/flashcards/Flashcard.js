import React from 'react';

import './Flashcard.css';

import redo1Icon from './redo-1.png';
import redo3Icon from './redo-3.png';

export class Flashcard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleRepeat1Click = this.handleRepeat1Click.bind(this);
    this.handleRepeat3Click = this.handleRepeat3Click.bind(this);
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  handleRepeat1Click(e) {
    if (this.props.onRepeat) {
      this.props.onRepeat(1);
    }
    e.stopPropagation();
  }

  handleRepeat3Click(e) {
    if (this.props.onRepeat) {
      this.props.onRepeat(3);
    }
    e.stopPropagation();
  }

  render() {
    return (
      <article className='flashcard' onClick={this.handleClick}>
        <button className="repeat-button repeat-1" onClick={this.handleRepeat1Click}><img src={redo1Icon} alt="Add card to deck"/></button>
        <button className="repeat-button repeat-3" onClick={this.handleRepeat3Click}><img src={redo3Icon} alt="Add three copies of card to deck" /></button>
        {
          this.props.content.startsWith('/')
            ? <img className="content" src={this.props.content} alt='Flashcard' />
            : <p className="content" key={this.props.content}>{this.props.content}</p>
        }
      </article>
    );
  }
}
