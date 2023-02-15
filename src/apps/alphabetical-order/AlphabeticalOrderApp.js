import React from 'react';
import './AlphabeticalOrderApp.css';

import { BackButton } from '../../controls/BackButton';
import { DeckGallery } from './DeckGallery';
import { Flashcard } from './Flashcard';

import decks from './decks.json';

export class AlphabeticalOrderApp extends React.Component {
  constructor(props) {
    super(props);

    this.advanceCard = this.advanceCard.bind(this);
    this.changeDeckSelection = this.changeDeckSelection.bind(this);

    this.state = {
      words: undefined,
      decks: [],
    };
  }

  componentDidMount() {
    this.setState({
      words: undefined,
      decks: decks,
    });
  }

  advanceCard() {
    this.setState({
      current: this.cards.draw()
    });
  }

  changeDeckSelection(selectedDecks) {
    var words = selectedDecks.reduce((previous, current) => previous.concat(current), []);

    this.setState({
      words: words
    });
  }

  render() {
    return (
      <div className="alphabetical-order-app">
        <DeckGallery className="deck-gallery" decks={this.state.decks} selectionChanged={this.changeDeckSelection} />

        <div className="table">
          { this.state.words
              ? <Flashcard key={this.state.words} words={this.state.words} onCorrect={this.advanceCard} />
              : null
          }
        </div>

        <BackButton />
      </div>
    );
  }
}

