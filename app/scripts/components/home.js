import React from 'react';
import _ from 'lodash';

import MagIcon from './MagIcon';
import CriteriaSelect from './CriteriaSelect';
import SizeRange from './SizeRange';
import Results from './Results';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insects: [],
      // criteria
      keywords: [],
      colors: [],
      categories: [],
      sizerange: [0, 0]
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: process.env.NODE_ENV === 'production' ? './data.json' : '../data.json',
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
            <h1>Connecticut Insect Identifier <MagIcon /></h1>
          </div>
          <p className="lead">Filter Connecticut insects by various criteria. By Andrew Suzuki (UConn 2017)</p>

          <div className="row filter-wrapper">
            <div className="col-md-3 filter">
              <label>Keywords (Match any)</label>
              <CriteriaSelect
                name="keywords"
                criteriaKey="keywords"
                placeholder="Filter by multiple keywords..."
                insects={this.state.insects}
                onChange={this.onChangeKeywords.bind(this)}
                existing={this.state.keywords}
              />
            </div>
            <div className="col-md-3 filter">
              <label>Colors (Match all)</label>
              <CriteriaSelect
                name="colors"
                criteriaKey="colors"
                placeholder="Filter by multiple colors..."
                insects={this.state.insects}
                onChange={this.onChangeColors.bind(this)}
                existing={this.state.colors}
              />
            </div>
            <div className="col-md-3 filter">
              <label>Categories (Match any)</label>
              <CriteriaSelect
                name="categories"
                criteriaKey="category"
                placeholder="Filter by multiple categories..."
                insects={this.state.insects}
                onChange={this.onChangeCategories.bind(this)}
                existing={this.state.categories}
              />
            </div>
            <div className="col-md-3 filter">
              <SizeRange
                onChange={this.onChangeSizeRange.bind(this)}
                existing={this.state.sizerange}
              />
            </div>
          </div>

          <Results
            insects={this.state.insects}
            keywords={this.state.keywords}
            colors={this.state.colors}
            categories={this.state.categories}
            sizerange={this.state.sizerange}
          />
        </div>

        <footer className="footer">
          <div className="container">
            <p className="text-muted">&copy; 2015 Andrew Suzuki</p>
          </div>
        </footer>
      </div>
    );
  }

  onChangeGeneric(key, data) {
    if (Array.isArray(data)) {
      this.setState(_.extend({}, this.state, {
        [key]: data
      }));
    }
  }

  onChangeKeywords(data) { this.onChangeGeneric('keywords', data); }
  onChangeColors(data) { this.onChangeGeneric('colors', data); }
  onChangeCategories(data) { this.onChangeGeneric('categories', data); }
  onChangeSizeRange(data) { this.onChangeGeneric('sizerange', data); }
}
