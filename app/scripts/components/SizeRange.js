import React from 'react';

import noUiSlider from 'nouislider';

class RangeSlider extends React.Component {
  componentDidUpdate() {
    this.attachSlider();
  }

  attachSlider() {
    const $el = this.refs.slider;
    const slider = noUiSlider.create($el, {
      start: [ this.props.min, this.props.max ],
      connect: true,
      step: this.props.step,
      range: {
        'min': this.props.min,
        'max': this.props.max
      }
    });
    $el.noUiSlider.on('change', e => this.props.onChange(e.map(i => parseInt(i))));
  }

  render() {
    return (
      <div className="slider-wrapper">
        <div ref="slider"></div>
      </div>
    );
  }
}

export default class extends React.Component {
  render() {
    return (
      <RangeSlider
        max={175}
        min={0}
        step={1}
        onChange={this.props.onChange}
      />
    );
  }
}
