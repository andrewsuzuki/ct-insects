import React from 'react';

import noUiSlider from 'nouislider';

class RangeSlider extends React.Component {
  componentDidUpdate() {
    this.attachSlider();
  }

  attachSlider() {
    if (this.$el) {
      this.$el.noUiSlider.destroy();
    }

    let start = [ this.props.min, this.props.max ];
    if (this.props.existing[0] !== 0 || this.props.existing[1] !== 0) {
      start = this.props.existing;
    }

    const $el = this.refs.slider;
    this.$el = $el;
    const slider = noUiSlider.create($el, {
      start: start,
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
  constructor() {
    super();
    this.state = {
      range: [0, 0]
    };
  }
  render() {
    const { range } = this.state;

    let mmText = 'mm';

    if (range[0] !== 0 || range[1] !== 0) {
      // mmmm mmm mmmmmmm, elegant!
      mmText = range.map(n => n + 'mm').join(' to ');
    }

    return (
      <div>
        <label>Adult Size Range ({mmText})</label>
        <RangeSlider
          max={175}
          min={0}
          step={1}
          existing={this.props.existing}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }

  onChange(range) {
    // update label mm values
    this.setState({
      range: range
    });

    // forward to parent onChange (prop)
    this.props.onChange(range);
  }
}
