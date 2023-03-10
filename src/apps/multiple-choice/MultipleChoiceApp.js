import React from 'react';
import './MultipleChoiceApp.css';

import { BackButton } from '../../controls/BackButton';
import { Deck } from './deck';
import { DeckGallery } from './DeckGallery';
import { Flashcard } from './Flashcard';

import decksss from './decks.json';

export class MultipleChoiceApp extends React.Component {
  constructor(props) {
    super(props);

    this.advanceCard = this.advanceCard.bind(this);
    this.changeDeckSelection = this.changeDeckSelection.bind(this);
    this.repeatCard = this.repeatCard.bind(this);

    this.state = {
      current: undefined,
      duration: 0,
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
      current: this.cards.draw(),
      duration: 0,
    });

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    let duration = 0;
    this.interval = setInterval(() => {
      duration += 1;
      this.setState({
        duration: duration,
      });
    }, 1000);
  }

  repeatCard(count) {
    console.log("Rpeeat", count);
    for (let i = 0; i < count; i++) {
      this.cards.addCard(this.state.current);
    }

    this.cards.shuffle();
    console.log(this.cards);
  }

  render() {
    return (
      <div className="multiple-choice-app">
        <DeckGallery className="deck-gallery" decks={this.state.decks} selectionChanged={this.changeDeckSelection} />

        <div className="table">
          { this.state.current
              ? <Flashcard
                    key={this.state.current.question}
                    content={this.state.current}
                    duration={this.state.duration}
                    onCorrect={this.advanceCard}
                    onRepeat={this.repeatCard} />
              : null
          }
        </div>

        <BackButton />
      </div>
    );
  }
}

