import React from 'react';

import './Rekenrek.css';

/**
 * Input:
 * numBeads {number}     Number of beads to display on the Rekenrek. Defaults to 20.
 * fullLines {boolean}   If true, each line of Rekenrek will be completely filled before placing beads on the next line. Defaults
 *                       to true.
 */
export class Rekenrek extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numBeadsOnStrings: [0, 0, 0, 0]
    };
  }

  componentDidMount() {
    this.setState({
      numBeadsOnStrings: this.getBeadsOnStrings(this.props.numBeads)
    });
  }

  componentDidUpdate(previousProps) {
    if (this.props.numBeads !== previousProps.numBeads) {
      this.setState({
        numBeadsOnStrings: this.getBeadsOnStrings(this.props.numBeads)
      });
    }
  }

  getBeadsOnStrings(numBeads) {
    const minBeadsPerString = 1;
    const maxBeadsPerString = 10;

    let strings = [];

    let numBeadsRemaining = numBeads || 20;
    let fullLines = (this.props.fullLines === undefined) ? true : this.props.fullLines;

    while (numBeadsRemaining > 0) {
      let numBeadsOnString = Math.min(numBeadsRemaining, maxBeadsPerString)

      if (!fullLines) {
        let numbers = [];
        for (var i = minBeadsPerString; i <= numBeadsOnString; i++) {
          for (var j = 0; j < i; j++) {
            numbers.push(i);
          }
        }
        numBeadsOnString = numbers[Math.ceil(Math.random() * numbers.length)];
      }

      strings.push(numBeadsOnString);
      numBeadsRemaining -= numBeadsOnString;
    }

    while (strings.length < 2) {
      strings.push(0);
    }

    return strings;
  }

  render() {
    console.log("Rendering the Rekenrek.");

    return (
      <div className="rekenrek">
        <h2>Rekenrek</h2>
        { this.state.numBeadsOnStrings.map((numBeadsOnString, index) => (
          <div key={index} className="row">
            <span className="string"></span>
            <div className="beads">
              { [...Array(numBeadsOnString)].map((_, index) => (
                <span className="bead" key={numBeadsOnString + index}></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}