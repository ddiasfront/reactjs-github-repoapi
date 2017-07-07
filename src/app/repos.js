import React, {Component} from 'react';
import {Link} from 'react-router';

export class Repos extends Component {
  render() {
    return (
      <Link activeStyle={{color: 'black'}} id={this.props.index} to={`/${this.props.repo.name}`} onClick={this.props.onClick}>{this.props.repo.name}</Link>
    );
  }
}

Repos.propTypes = {
  repo: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired
};
