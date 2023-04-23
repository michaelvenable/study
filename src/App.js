import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './apps/home/Home';
import { AlphabeticalOrderApp } from './apps/alphabetical-order/AlphabeticalOrderApp';
import { FillInTheBlankApp } from './apps/fill-in-the-blank/FillInTheBlankApp';
import { FlashcardApp } from './apps/flashcards/FlashcardApp';
import { MultipleChoiceApp } from './apps/multiple-choice/MultipleChoiceApp';
import { RekenrekApp } from './apps/rekenrek/RekenrekApp';

import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alphabetical-order" element={<AlphabeticalOrderApp />} />
          <Route path="/fill-in-the-blank" element={<FillInTheBlankApp />} />
          <Route path="/flashcards" element={<FlashcardApp />} />
          <Route path="/multiple-choice" element={<MultipleChoiceApp />} />
          <Route path="/rekenrek" element={<RekenrekApp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
  );
}

export default App;
