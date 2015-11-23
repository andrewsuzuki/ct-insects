import React from 'react';

import MagIcon from './MagIcon';

export default class extends React.Component {
  render() {
    return (
      <header>
        <div className="page-header">
          <h1>Connecticut Insect Identifier <MagIcon /></h1>
        </div>
        <p className="lead">
          Filter Connecticut insects by various criteria.
          Made by <a href="http://andrewsuzuki.com" title="Andrew Suzuki Home">Andrew Suzuki</a> (UConn 2017).&nbsp;
          <a href="https://github.com/andrewsuzuki/ct-insects" title="ct-insects on GitHub">Source Code</a>
        </p>
      </header>
    );
  }
}
