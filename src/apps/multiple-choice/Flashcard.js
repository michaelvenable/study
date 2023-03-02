import React from 'react';

import './Flashcard.css';

/**
 * Display a flashcard containing multiple-choice answers.
 */
export class Flashcard extends React.Component {
  /**
   * Initializes this.
   *
   * @param {string | number} content.answer        The correct answer.
   * @param {number} content.take                   The number of multiple-choice answers to display.
   * @param {string[] | number[]} content.choices   The possible choices.
   * @param {number} duration                       The duration, measured in seconds, that the student has
   *                                                been working on this deck of cards. If not provided, then
   *                                                no duration counter will be shown.
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      status: '',
      choices: this.getChoices(),
      duration: props.duration ? this.getDurationDisplay(props.duration) : undefined
    }
  }

  getChoices() {
    return this.shuffleChoices(this.props.content.choices, this.props.content.answer, this.props.content.take || this.props.content.choices.length);
  }

  getDurationDisplay(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    return seconds < 10
      ? `${minutes}:0${seconds}`
      : `${minutes}:${seconds}`;
  }

  shuffleChoices(allChoices, answer, count) {
    const shuffledChoices = this.shuffle(allChoices.filter(c => c !== answer));

    const reducedChoices = shuffledChoices.slice(0, count - 1);

    // Add the correct answer.
    reducedChoices.push(answer);

    return reducedChoices.sort();
  }

  shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  handleClick(e) {
    e.preventDefault();

    // Double-equals (instead of triple-equals) is intentional to allow casting of string values from the
    // HTML to number values from decks.json.
    // eslint-disable-next-line
    if (e.target.value == this.props.content.answer) {
      if (this.props.onCorrect) {
        this.props.onCorrect();
      }
    } else {
      this.setState({
        status: 'wrong'
      });

      setTimeout(() => this.setState({ status: '' }), 500);
    }
  }

  render() {
    const durationDisplay = (this.props.duration !== undefined)
                              ? this.getDurationDisplay(this.props.duration)
                              : undefined

    return (
      <article className={'multiple-choice-flashcard ' + this.state.status}>
        <span className="duration">{durationDisplay}</span>
        <p className="question">{this.props.content.question}</p>
        <div className="choices">
          {
            this.state.choices.map(c =>
              <button key={c} type="button" value={c} onClick={this.handleClick}>{c}</button>
            )
          }
        </div>
      </article>
    );
  }
}