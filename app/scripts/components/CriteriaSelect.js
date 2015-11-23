import React from 'react';

import Select from 'react-select';

export default class extends React.Component {
  render() {
    // Make map of value -> count
    const countMap = {};
    this.props.insects.forEach(insect => {
      let todo = [];

      if (Array.isArray(insect[this.props.criteriaKey])) {
        todo = insect[this.props.criteriaKey];
      } else if (insect[this.props.criteriaKey]) {
        todo = [insect[this.props.criteriaKey]];
      }

      todo.forEach(crit => {
        if (countMap[crit]) {
          countMap[crit] += 1;
        } else {
          countMap[crit] = 1;
        }
      });
    });

    // Make array of crits (label/value/count)
    const crits = Object.keys(countMap).map(crit => {
      return {
        label: crit,
        value: crit,
        count: countMap[crit]
      }
    });

    return (
      <Select
        name={this.props.name}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        multi={true}
        options={crits}
        optionRenderer={this.renderOption}
        valueRenderer={this.renderValue}
      />
    );
  }

  renderOption(option) {
		return (
      <span>
        {option.label}
        &nbsp;
        <span style={{color: 'gray'}}>({option.count})</span>
      </span>
    );
	}

  renderValue(option) {
		return <strong>{option.label}</strong>;
	}
}
