import React from "react";

import './Answers.css';

/**
 * Input:
 * answer {int}         - The correct answer. This should be the number itself, not an index into a particular button.
 * guesses {int}        - The numbers that have been guessed by the user. Guessed answers will be shown on the answer
 *                        board.
 * numChoices {int}     - Number of selectable choices, starting from 1 and ending at numChoices.
 *
 * Output:
 * onSelection(int) - Fired when the user makes a choice. The event contains the option that selected.
 */
export class Answers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttons = [];

    for (let i = 1; i <= this.props.numChoices; i++) {
      buttons[i] = i;
    }

    return (
      <div className="answers">
        <h2>How many beads are on the rekenrek?</h2>
        <div className="buttons">
          { buttons.map((choice, index) => (
            <div key={index}
                 className={"answer " +
                            ((this.props.guesses.includes(choice) && choice !== this.props.answer) ? "answer-wrong" : "") +
                            ((this.props.guesses.includes(choice) && choice === this.props.answer) ? "answer-right" : "")}>
              <input type="button"
                     value={choice}
                     onClick={() => this.props.onSelection(choice)} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}