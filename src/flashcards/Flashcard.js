import React from 'react';

import './Flashcard.css';

export class Flashcard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <article className='flashcard' onClick={this.handleClick}>
      {
        this.props.content.startsWith('/')
          ? <img src={this.props.content} alt='Oops! This image is missing!' />
          : <p key={this.props.content}>{this.props.content}</p>
      }
      </article>
    );
  }
}
