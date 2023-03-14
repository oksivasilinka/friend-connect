import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Technologies />
    </div>
  );
}
function Technologies() {
    return (
        <div>
            <ul>
                <li>css</li>
                <li>html</li>
                <li>js</li>
                <li>react</li>
            </ul>
        </div>
    );
}
function Header() {
    return (
        <div>
            <a href="#">Home</a>
            <a href="#">News Feed</a>
            <a href="#">Messages</a>
        </div>
    );
}

export default App;
