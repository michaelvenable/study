import React from 'react';

import './Flashcard.css';

export class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      status: '',
      choices: this.getChoices()
    }
  }

  getChoices() {
    return this.shuffleChoices(this.props.content.choices, this.props.content.answer, this.props.content.take || this.props.content.choices.length);
  }

  shuffleChoices(allChoices, answer, count) {
    const shuffledChoices = this.shuffle(allChoices.filter(c => c !== answer));

    const reducedChoices = shuffledChoices.slice(0, count - 1);

    // Add the correct answer.
    reducedChoices.push(answer);

    // And reshuffled.
    // return this.shuffle(reducedChoices);
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

    // Double-equals (instead of tripple-equals) is intentional to allow casting of string values from the
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
    return (
      <article className={'multiple-choice-flashcard ' + this.state.status}>
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