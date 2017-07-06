import React, {Component} from 'react';
import {Repos} from './repos';
import {Reposdetails} from './reposdetails';
import {Commits} from './commits';
import axios from 'axios';

const allRepos = 'https://api.github.com/users/globocom/repos?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258';

export class Allrepos extends Component {

  constructor() {
    super();
    this.state = {allReps: [], reorderRepo: [], currentCommits: [], currentRep: []};
    this.reorderRepo = this.reorderRepo.bind(this);
    this.getRepos = this.getRepos.bind(this);
    this.handleRepoDetail = this.handleRepoDetail.bind(this);
  }

  componentWillMount() {
    this.getRepos();
  }

  render() {
    return (
      <div>
        {this.state.reorderRepo.map((repo, i) => (
          <Repos key={i} index={i} repo={repo} onClick={this.handleRepoDetail}/>
        ))}
        <Reposdetails details={this.state.currentRep}/>
        <Commits commits={this.state.currentCommits}/>
      </div>
    );
  }
  getRepos() {
    axios
    .get(allRepos)
    .then(response => {
      this.setState({allReps: response.data});
      this.reorderRepo();
    });
  }
  reorderRepo() {
    const repoStars = this.state.allReps.sort((a, b) => b.stargazers_count - a.stargazers_count);
    this.setState({reorderRepo: repoStars});
    this.setState({currentRep: this.state.reorderRepo[0]});
    axios
    .get(this.state.reorderRepo[0].url + '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258')
    .then(response => {
      this.setState({currentCommits: response.data, limit: 5});
    });
  }
  handleRepoDetail(e) {
    const repoIndex = e.target.getAttribute('id');
    this.setState({currentRep: this.state.reorderRepo[repoIndex]});
    axios
    .get(this.state.reorderRepo[repoIndex].url + '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258')
    .then(response => {
      this.setState({currentCommits: response.data, limit: 5});
    });
  }
}
