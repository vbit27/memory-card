import React from 'react';

function Header() {
  return (
    <header>
      <div className="level">
        <h2>Level 1</h2>
      </div>
      <div className="score-container">
        <div className="score">Score: 5</div>
        <div className="best-score">Best Score: 10</div>
      </div>
    </header>
  );
}

export default Header;
