import React, {Component} from 'react';
import {Repos} from './repos';
import {Reposdetails} from './reposdetails';
import {Commits} from './commits';
import axios from 'axios';
import {browserHistory} from 'react-router';

const allRepos = 'https://api.github.com/users/globocom/repos?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258';

export class Allrepos extends Component {
  constructor() {
    super();
    this.state = {allReps: [], reorderRepo: [], currentCommits: [], currentRep: [], limit: 5, showLoad: true, repoState: []};
    this.reorderRepo = this.reorderRepo.bind(this);
    this.getRepos = this.getRepos.bind(this);
    this.handleRepoDetail = this.handleRepoDetail.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  componentWillMount() {
    this.getRepos();
  }
  render() {
    return (
      <div className="maincontainer">
        <div className="lista">
          {this.state.reorderRepo.map((repo, i) => (
            <Repos key={i} index={i} repo={repo} onClick={this.handleRepoDetail}/>
          ))}
        </div>
        <div className="detalhes">
          <Reposdetails details={this.state.currentRep}/>
          <Commits showLoad={this.state.showLoad} commits={this.state.currentCommits} onClick={this.handleLoadMore} limit={this.state.limit}/>
        </div>
      </div>
    );
  }
  onNavigation() {
    browserHistory.push(this.state.repoState[0].name);
  }
  getRepos() {
    axios
    .get(allRepos)
    .then(response => {
      this.setState({allReps: response.data});
      this.setState({repoState: this.state.allReps.filter(repo => repo.name === this.props.params.repoId)});
      console.log(this.state.repoState[0]);
      this.reorderRepo();
    });
  }
  reorderRepo() {
    const repoStars = this.state.allReps.sort((a, b) => b.stargazers_count - a.stargazers_count);
    this.setState({reorderRepo: repoStars});
    this.setState({repoState: this.state.reorderRepo.filter(person => person.name === this.props.params.repoId)});
    this.setState({currentRep: this.state.repoState[0]});
    axios
    .get(this.state.repoState[0].url + '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258')
    .then(response => {
      this.setState({currentCommits: response.data});
    });
  }
  handleRepoDetail(e) {
    if (this.state.showLoad === false) {
      this.setState({showLoad: !this.state.showLoad});
    }
    this.onNavigation();
    const repoIndex = e.target.getAttribute('id');
    this.setState({currentRep: this.state.reorderRepo[repoIndex]});
    axios
    .get(this.state.reorderRepo[repoIndex].url + '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258')
    .then(response => {
      this.setState({currentCommits: response.data, limit: 5});
    });
  }
  handleLoadMore() {
    if (this.state.limit >= this.state.currentCommits.length) {
      this.setState({showLoad: !this.state.showLoad});
    } else {
      this.setState({
        limit: this.state.limit + 20
      });
    }
  }
}

Allrepos.propTypes = {
  params: React.PropTypes.node
};
