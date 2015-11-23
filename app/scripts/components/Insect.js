import React from 'react';

import InsectExtension from './InsectExtension';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      showExtension: false
    };
  }

  render() {
    const { insect } = this.props;
    const {
      name,
      about,
      keywords,
      colors,
      category,
      sizerange,
      reach,
      common_name,
      scientific_name,
      other_names
    } = insect;

    const { showExtension } = this.state;

    const extension = showExtension ? <InsectExtension insect={insect} /> : '';

    return (
      <div className="row insect-result">
        <div className="col-md-12">
          <div className="row">
            <div className="col-sm-6">
              <h3>{name}</h3>
              <button className="btn btn-default" onClick={this.onClickToggleExtension.bind(this)}>
                {showExtension ? 'Hide' : 'Show'} info and images
              </button>
            </div>
            <div className="col-sm-6">
              {keywords ? <p><strong>Keywords:</strong> {keywords.join(', ')}</p> : ''}
              {colors ? <p><strong>Colors:</strong> {colors.join(', ')}</p> : ''}
              {category ? <p><strong>Category:</strong> {category}</p> : ''}
              {sizerange ? <p><strong>Adult Size Range:</strong> {sizerange[0].toString() + 'mm to ' + sizerange[1].toString() + 'mm'}</p> : ''}
            </div>
          </div>
          {extension}
          <div className="row">
            <div className="col-md-12">
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClickToggleExtension(e) {
    e.preventDefault();

    this.setState({
      showExtension: !this.state.showExtension
    });
  }
}
