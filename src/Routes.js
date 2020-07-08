import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './pages/Main.js';
import Uploader from './pages/Uploader.js';

export default function Routes() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Main} />
        <Route path="/upload" exact component={Uploader} />
      </Router>
    </>
  );
}
