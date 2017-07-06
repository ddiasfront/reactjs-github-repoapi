import React, {Component} from 'react';

export class Reposdetails extends Component {

  render() {
    return (
      <ul>
        <li>
          {this.props.details.name}
        </li>
        <li>
          {this.props.details.stargazers_count}
        </li>
        <li>
          {this.props.details.forks}
        </li>
        <li>
          {this.props.details.commits_url}
        </li>
      </ul>
    );
  }
}

Reposdetails.propTypes = {
  details: React.PropTypes.any.isRequired
};
