import React from 'react';
import ReactDragListView from 'react-drag-listview';
import './Flashcard.css';

export class Flashcard extends React.Component {
  /**
   * @param {array<string} props.content    Words to be sorted by the student.
   */
  constructor(props) {
    super(props);

    const words = this.shuffle(props.words);

    this.state = {
      isSorted: this.isSorted(words),
      words: words
    }
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

  handleDragEnd(fromIndex, toIndex) {
    var words = [...this.state.words];

    const from = words[fromIndex];
    words.splice(fromIndex, 1);
    words.splice(toIndex, 0, from);

    this.setState({
      isSorted: this.isSorted(words),
      words: words
    });
  }

  isSorted(words) {
    const sorted = [...words].map(w => w.toLowerCase()).sort();

    for (let i = 0; i < words.length; i++) {
      if (words[i].toLowerCase() !== sorted[i].toLowerCase()) {
        return false;
      }
    }

    return true;
  }

  render() {
    return (
      <article className={'alphabetical-order-flashcard ' + (this.state.isSorted ? 'sorted' : null)}>
        <ReactDragListView onDragEnd={(from, to) => this.handleDragEnd(from, to)} nodeSelector="li" handleSelector="li">
          <ol className="words">
            {
              this.state.words.map(word =>
                <li key={word} className="word">
                  {word}
                </li>
              )
            }
          </ol>
        </ReactDragListView>
      </article>
    );
  }
}