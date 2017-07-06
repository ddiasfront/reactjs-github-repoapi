import React, {Component} from 'react';

export class Repos extends Component {
  render() {
    return (
      <div>
        <a id={this.props.index} onClick={this.props.onClick}>{this.props.repo.name}</a>
      </div>
    );
  }
}

Repos.propTypes = {
  repo: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired
};
