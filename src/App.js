import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './home/Home';
import { FlashcardApp } from './flashcards/FlashcardApp';
import { MultipleChoiceApp } from './multiple-choice/MultipleChoiceApp';
import { RekenrekApp } from './rekenrek/RekenrekApp';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/flashcards" element={<FlashcardApp />} />
        <Route path="/multiple-choice" element={<MultipleChoiceApp />} />
        <Route path="/rekenrek" element={<RekenrekApp />} />
      </Routes>
    </Router>
  );
}

export default App;
