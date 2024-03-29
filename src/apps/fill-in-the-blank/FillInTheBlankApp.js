import React from 'react';
import { Deck } from './deck';
import { DeckGallery } from './DeckGallery';
import { Flashcard } from './Flashcard';
import { BackButton } from '../../controls/BackButton';

import './FillInTheBlankApp.css';

import decksss from './decks.json';

export class FillInTheBlankApp extends React.Component {
  constructor(props) {
    super(props);

    this.advanceCard = this.advanceCard.bind(this);
    this.changeDeckSelection = this.changeDeckSelection.bind(this);
    this.repeatCard = this.repeatCard.bind(this);

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

  repeatCard(count) {
    for (let i = 0; i < count; i++) {
      this.cards.addCard(this.state.current);
    }

    this.cards.shuffle();
  }

  render() {
    return (
      <div className="fill-in-the-blank-app">
        <DeckGallery className="deck-gallery" decks={this.state.decks} selectionChanged={this.changeDeckSelection} />

        <div className="table">
          { this.state.current
              ? <Flashcard content={this.state.current} onClick={this.advanceCard} onRepeat={this.repeatCard} />
              : null
          }
        </div>

        <BackButton />
      </div>
    );
  }
}
