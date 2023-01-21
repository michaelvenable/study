export class Deck {
  constructor(cards) {
    this._cards = cards ? [...cards] : [];
  }

  get cards() {
    return this._cards;
  }

  get numCards() {
    return this.cards.length;
  }

  addCard(card) {
    this.cards.push(card);
  }

  addCards(cards) {
    this._cards = this.cards.concat(cards);
  }

  combine(deck) {
    return new Deck(this.cards.concat(deck.cards));
  }

  draw() {
    return this._cards.pop();
  }

  shuffle() {
    let currentIndex = this.numCards,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this._cards[currentIndex], this._cards[randomIndex]] = [this._cards[randomIndex], this._cards[currentIndex]];
    }

    return this;
  }
}