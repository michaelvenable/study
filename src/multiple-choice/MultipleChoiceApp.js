import React from 'react';
import './MultipleChoiceApp.css';

import { Deck } from './deck';
import { DeckGallery } from './DeckGallery';
import { Flashcard } from './Flashcard';

import decksss from './decks.json';

export class MultipleChoiceApp extends React.Component {
  constructor(props) {
    super(props);

    this.advanceCard = this.advanceCard.bind(this);
    this.changeDeckSelection = this.changeDeckSelection.bind(this);

    this.state = {
      current: undefined,
      decks: [],
    };
  }

  componentDidMount() {
    // Convert the JSON data into domain objects.
    let decks = {};

    for (let key in decksss) {
      decks[key] = new Deck(decksss[key]);
    }

    this.setState({
      current: undefined,
      decks: decks,
    });
  }

  advanceCard() {
    this.setState({
      current: this.cards.draw()
    });
  }

  changeDeckSelection(selectedDecks) {
    this.cards = selectedDecks.reduce((previous, current) => previous.combine(current), new Deck());
    this.cards.shuffle();

    this.setState({
      current: this.cards.draw()
    });
  }

  render() {
    return (
      <div className="multiple-choice-app">
        <DeckGallery decks={this.state.decks} selectionChanged={this.changeDeckSelection} />
        { this.state.current
            ? <Flashcard key={this.state.current.question} content={this.state.current} onCorrect={this.advanceCard} />
            : null
        }
      </div>
    );
  }
}

