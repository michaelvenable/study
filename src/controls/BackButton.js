import { Link } from 'react-router-dom';

import './BackButton.css';

export function BackButton() {
  return <Link className="back-button" to="/">Back</Link>;
}
