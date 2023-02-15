import { Link } from 'react-router-dom';

import './Home.css';

export function Home() {
  return (
    <div className="home">
      <h1>Eva's Learning Tools</h1>
      <nav className="tools">
        <Link to="/flashcards">Flashcards</Link>
        <Link to="/alphabetical-order">Alphabetical Order</Link>
        <Link to="/multiple-choice">Multiple Choice</Link>
        <Link to="/rekenrek">Counting With a Rekenrek</Link>
      </nav>
    </div>
  );
}
