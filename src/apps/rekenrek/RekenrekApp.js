import React from 'react';
import './RekenrekApp.css';

import { Rekenrek } from './Rekenrek';
import { Answers } from './Answers';

const maxNumItems = 20;

export class RekenrekApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fullLines: true,
      guesses: [],
      numItems: Math.ceil(Math.random() * maxNumItems),
      numChoices: maxNumItems
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  handleAnswerSelected(answer) {
    if (answer === this.state.numItems) {
      this.setState(
        (state) => ({ guesses: [...state.guesses, answer] }),
        () => {
          setTimeout(() => {
            this.setState({
              guesses: [],
              numItems: Math.ceil(Math.random() * maxNumItems),
              numChoices: maxNumItems
            });
          }, 500);
        }
      );
    } else {
      this.setState((state) => {
        return {
          guesses: [...state.guesses, answer]
        };
      });
    }
  }

  render() {
    return (
      <div className="rekenrek-app">
        <h1 className="title">Counting With a Rekenrek</h1>
        <Rekenrek numBeads={this.state.numItems} fullLines={this.state.fullLines}></Rekenrek>

        <Answers answer={this.state.numItems}
                 guesses={this.state.guesses}
                 numChoices={this.state.numChoices}
                 onSelection={this.handleAnswerSelected}>
        </Answers>
      </div>
    );
  }
}
