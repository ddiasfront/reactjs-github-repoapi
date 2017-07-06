import React, {Component} from 'react';
import axios from 'axios';

export class Repos extends Component {
  render() {
    return (
      <div>
        <a id={this.props.index} onClick={this.props.onClick}>{this.props.repo.name}</a>
      </div>
    );
  }
  reloadDetails(repoIndex) {
    this.setState({currentRep: this.state.reorderRepo[repoIndex]});
    axios
    .get(this.state.reorderRepo[repoIndex].url + '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258')
    .then(response => {
      console.log(response.data);
      this.setState({currentCommits: response.data, limit: 5});
    });
  }
}

Repos.propTypes = {
  repo: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired
};
