import React from 'react';
import GoogleImages from '../GoogleImages';
import _ from 'lodash';

import LoadingIndicator from './LoadingIndicator';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      loading: true
    };
  }

  componentDidMount() {
    GoogleImages(this.props.insect.name).then((response, error) => {
      if (error) { return; }
      this.setState({
        images: _.take(response.data.responseData.results, 4),
        loading: false
      });
    });
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

    const { images, loading } = this.state;

    let i = 0;
    const imagesRendered = loading ? <LoadingIndicator /> : images.map(image => {
      return (
        <div className="col-sm-3" key={i++}>
          <a href={image.originalContextUrl} target="_blank">
            <img src={image.url} className="insect-image" />
          </a>
        </div>
      );
    });

    return (
      <div className="row insect-extension">
        <div className="col-md-12">
          <div className="row">
            <div className="col-sm-4">
              <p><strong>Common Name:</strong> {common_name}</p>
              <p><strong>Scientific Name:</strong> {scientific_name}</p>
              <p><strong>Other Names:</strong> {other_names}</p>
            </div>
            <div className="col-sm-8">
              <p><strong>Reach:</strong> {reach.join(', ')}</p>
            </div>
          </div>
          <p>{about}</p>
          <div className="row">
            {imagesRendered}
          </div>
        </div>
      </div>
    );
  }
}
