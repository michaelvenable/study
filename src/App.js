import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AlphabeticalOrderApp } from './apps/alphabetical-order/AlphabeticalOrderApp';
import { FlashcardApp } from './apps/flashcards/FlashcardApp';
import { Home } from './apps/home/Home';
import { MultipleChoiceApp } from './apps/multiple-choice/MultipleChoiceApp';
import { RekenrekApp } from './apps/rekenrek/RekenrekApp';

import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alphabetical-order" element={<AlphabeticalOrderApp />} />
          <Route path="/flashcards" element={<FlashcardApp />} />
          <Route path="/multiple-choice" element={<MultipleChoiceApp />} />
          <Route path="/rekenrek" element={<RekenrekApp />} />
        </Routes>
      </Router>
  );
}

export default App;
