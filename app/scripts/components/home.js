import React from 'react';

import CriteriaSelect from './CriteriaSelect';
import SizeRange from './SizeRange';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: {},
      insects: []
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '../data.json',
      dataType: 'json',
      success: function(result) {
        this.setState(result);
      }.bind(this),
      data: {},
      async: true
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="page-header">
            <h1>Connecticut Insect Identifier <span className="glyphicon glyphicon-eye-open"></span></h1>
          </div>
          <p className="lead">Filter Connecticut insects by various criteria.</p>

          <div className="row">
            <div className="col-md-3">
              <label>Keywords</label>
              <CriteriaSelect
                name="keywords"
                criteriaKey="keywords"
                placeholder="Filter by multiple keywords..."
                insects={this.state.insects}
                onChange={this.onChangeKeywords}
              />
            </div>
            <div className="col-md-3">
              <label>Colors</label>
              <CriteriaSelect
                name="colors"
                criteriaKey="colors"
                placeholder="Filter by multiple colors..."
                insects={this.state.insects}
                onChange={this.onChangeColors}
              />
            </div>
            <div className="col-md-3">
              <label>Categories</label>
              <CriteriaSelect
                name="categories"
                criteriaKey="category"
                placeholder="Filter by multiple categories..."
                insects={this.state.insects}
                onChange={this.onChangeCategories}
              />
            </div>
            <div className="col-md-3">
              <label>Adult Size Range (mm)</label>
              <SizeRange
                onChange={this.onChangeSizeRange}
              />
            </div>
          </div>
        </div>


        <footer className="footer">
          <div className="container">
            <p className="text-muted">&copy; 2015 Andrew Suzuki</p>
          </div>
        </footer>
      </div>
    );
  }

  onChangeKeywords(data) {
    console.log('new keywords', data)
  }

  onChangeColors(data) {
    console.log('new colors', data)
  }

  onChangeCategories(data) {
    console.log('new categories', data)
  }

  onChangeSizeRange(data) {
    console.log('new range', data);
  }
}
