import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>{this.props.count} Results</h2>
          <hr />
        </div>
      </div>
    );
  }
}
