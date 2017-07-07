import React, {Component} from 'react';

export class Reposdetails extends Component {
  render() {
    return (
      <article>
        <h3>Nome do repositório: </h3>
        <p>{this.props.details.name}</p>
        <h3>Stars: </h3>
        <p>{this.props.details.stargazers_count}</p>
        <h3>Forks: </h3>
        <p>{this.props.details.forks}</p>
      </article>
    );
  }
}

Reposdetails.propTypes = {
  details: React.PropTypes.any.isRequired
};
