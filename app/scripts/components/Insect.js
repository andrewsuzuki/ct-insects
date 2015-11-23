import React from 'react';

export default class extends React.Component {
  render() {
    const { insect } = this.props;

    return (
      <div className="row insect-result">
        <div className="col-md-12">
          {insect.name}
          <hr />
        </div>
      </div>
    );
  }
}
