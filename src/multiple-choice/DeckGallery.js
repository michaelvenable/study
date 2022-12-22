import React from 'react';

import './DeckGallery.css';

export class DeckGallery extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeckClick = this.handleDeckClick.bind(this);

    this.state = {
      options: Object.keys(props.decks).reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      )
    }
  }

  handleDeckClick(e) {
    const name = e.target.name;

    this.setState(state => ({
      options: {
        ...state.options,
        [name]: !state.options[name]
      }
    }),
      () => {
        if (this.props.selectionChanged) {
          const selectedDecks =
            Object.keys(this.state.options)
              .filter(k => this.state.options[k])
              .map(k => this.props.decks[k]);

          this.props.selectionChanged(selectedDecks);
        }
      }
    );
  }

  render() {
    return (
      <article className='deck-gallery'>
        {Object.keys(this.props.decks).map((name, index) => (
        <div key={name} className="deck-gallery-item">
          <input id={`deck-gallery-item-${index}`} name={name} value={this.state.options[name]} type="checkbox" onChange={this.handleDeckClick} />
          <label htmlFor={`deck-gallery-item-${index}`}>
            <p>{name}</p>
          </label>
        </div>
        ))}
      </article>
    );
  }
}