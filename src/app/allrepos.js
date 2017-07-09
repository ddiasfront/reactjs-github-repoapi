import React, {Component} from 'react';
import {Repos} from './repos';
import {Reposdetails} from './reposdetails';
import {Commits} from './commits';
import {githubService} from './actions/githubservice';
// VARIAVEL URL REQUEST
const commitSecureurl = '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258';

export class Allrepos extends Component {

  constructor() {
    super();
    this.state = {
      commitsRender: [],
      todosRepositorios: [],
      detalhesAtual: [],
      limit: 5,
      showLoad: true
    };
    this.handleRepoDetail = this.handleRepoDetail.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }
  render() {
    return (
      <div className="maincontainer">
        <aside className="lista">
          <div className="bgfixxer"/>
          <h1>Repositórios</h1>
          {this.state.todosRepositorios.map((repo, i) => (
            <Repos key={i} index={i} repo={repo} onClick={this.handleRepoDetail}/>
          ))}
        </aside>
        <div className="description">
          <div className="descontainer">
            <Reposdetails details={this.state.detalhesAtual}/>
            <Commits showLoad={this.state.showLoad} commits={this.state.commitsRender} onClick={this.handleLoadMore} limit={this.state.limit}/>
          </div>
        </div>
      </div>
    );
  }
  getData() {
    githubService.getGithubdata(this.props.params.repoId)
    .then(response => {
      this.setState({
        todosRepositorios: response.allRepos,
        detalhesAtual: response.firstDetails
      });
      return response;
    })
    .then(response => {
      githubService.getCommitsdata(response.repoName)
      .then(response => {
        this.setState({
          commitsRender: response.commitsRenderer
        });
      });
    });
  }
  handleRepoDetail(e) {
    // HANDLER DO BOTAO CARREGAR SHOW E HIDE COM TRUE E FALSE
    if (this.state.showLoad === false) {
      this.setState({showLoad: !this.state.showLoad});
    }
    // HANDLER DO CLICK DOS REPOSITORIOS
    const repoIndex = e.target.getAttribute('id');
    this.setState({detalhesAtual: this.state.todosRepositorios[repoIndex]});
    githubService.simpleReq(this.state.todosRepositorios[repoIndex].url + commitSecureurl)
    .then(response => {
      this.setState({commitsRender: response.data, limit: 5});
    });
  }
  handleLoadMore() {
    // HANDLER DO BOTAO CARREGAR MAIS SE FOR MAIOR = QUE O NUMERO DE REPOS HIDE CARREGAR MAIS 20 NO CLICK
    this.commitCounter();
    if ((this.state.limit + 5) >= (this.state.commitsRender.length)) {
      this.setState({showLoad: !this.state.showLoad});
    }
  }
  commitCounter() {
    if ((this.state.limit) >= (this.state.commitsRender.length)) {
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
