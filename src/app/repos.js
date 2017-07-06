import React, {Component} from 'react';
import {Link} from 'react-router';

export class Repos extends Component {
  render() {
    return (
      <div>
        <Link id={this.props.index} to={`/${this.props.repo.name}`} onClick={this.props.onClick}>{this.props.repo.name}</Link>
      </div>
    );
  }
}

Repos.propTypes = {
  repo: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired
};
