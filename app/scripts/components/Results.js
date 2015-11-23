import React from 'react';

import Insect from './Insect';

export default class extends React.Component {
  render() {
    const {
      insects,
      keywords,
      colors,
      categories,
      range
    } = this.props;

    const results = insects;

    return (
      <div className="row insect-results">
        <div className="col-md-12">
          {results.map(insect => <Insect insect={insect} />)}
        </div>
      </div>
    );
  }
}
