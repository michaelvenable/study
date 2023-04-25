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
    const percentageToRemove = 0.35;

    const letters = this.props.content.split('');

    const numLettersToRemove = Math.ceil(letters.length * percentageToRemove);
    let availableLetterIndexes = [...Array(letters.length).keys()];

    const blankIndexes = [];

    for (let i = 0; i < numLettersToRemove; i++) {
      const index = Math.floor(Math.random() * availableLetterIndexes.length);
      blankIndexes.push(availableLetterIndexes[index]);
      availableLetterIndexes = availableLetterIndexes.filter(n => n !== index);
    }

    return (
      <article className='flashcard' onClick={this.handleClick}>
        <p className="content">
          {
            letters.map((l, i) => blankIndexes.includes(i) ? '_' : l)
          }
        </p>
      </article>
    );
  }
}
