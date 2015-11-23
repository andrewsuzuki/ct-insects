import React from 'react';

import Insect from './Insect';

export default class extends React.Component {
  render() {
    const {
      insects,
      keywords,
      colors,
      categories,
      sizerange
    } = this.props;

    console.log(keywords, colors, categories, sizerange);

    let i = 0;
    const renderedResults = insects.filter(insect => {
      // Filter by keywords
      if (keywords.length) {
        if (!insect.keywords) {
          return false;
        }
        // Keywords are matched using an effective logical OR.
        // So, if one keyword matches one keyword of the Insect
        // then it's a match
        const found = keywords.some(keyword => {
          if (insect.keywords.indexOf(keyword) > -1) {
            return true;
          }
        });
        if (!found) {
          return false;
        }
      }

      // Filter by colors
      if (colors.length) {
        if (!insect.colors) {
          return false;
        }
        // Keywords are matched using an effective logical AND.
        // So, the insect needs to have all specified colors
        const hasAll = colors.every(color => {
          return insect.colors.indexOf(color) > -1;
        });
        if (!hasAll) {
          return false;
        }
      }

      // Filter by categories
      if (categories.length) {
        if (!insect.category) {
          return false;
        }
        // Categories are matched using an effective logical OR.
        // So, if one category matches the Insect's category
        // then it's a match
        const found = categories.indexOf(insect.category) > -1;
        if (!found) {
          return false;
        }
      }

      // Filter by size range
      if (sizerange.length === 2 && (sizerange[0] !== 0 || sizerange[1] !== 0)) {
        if (!insect.sizerange) {
          return false;
        }
        // We have to check the overlap between two ranges: the specified range,
        // and each insect's range
        const lowerInRange = insect.sizerange[0] >= sizerange[0] &&
                             insect.sizerange[0] <= sizerange[1];
        const upperInRange = insect.sizerange[1] >= sizerange[0] &&
                             insect.sizerange[1] <= sizerange[1];
        if (!lowerInRange && !upperInRange) {
          return false;
        }
      }

      // This insect passed all applicable filters
      return true;
    })
    // Now make list by mapping Insect listing component
    .map(insect => <Insect key={i++} insect={insect} />);

    return (
      <div className="row insect-results">
        <div className="col-md-12">
          {renderedResults}
        </div>
      </div>
    );
  }
}
