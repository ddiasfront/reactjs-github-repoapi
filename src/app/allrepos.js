import React, {Component} from 'react';
import {Repos} from './repos';
import {Reposdetails} from './reposdetails';
import {Commits} from './commits';
import axios from 'axios';

// VARIAVEL URL REQUEST
const allRepos = 'https://api.github.com/users/globocom/repos?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258';
const commitSecureurl = '/commits?client_id=64d7b668317a1949cd57&client_secret=551f8cb1a1118dd2df05d943343efd4c5980c258';

export class Allrepos extends Component {

  constructor() {
    super();
    this.state = {primeiroRequest: [], requestOrganizado: [], detalhesAtual: [], limit: 5, showLoad: true, commitsUrl: []};
    this.requestOrganizado = this.requestOrganizado.bind(this);
    this.getRepos = this.getRepos.bind(this);
    this.handleRepoDetail = this.handleRepoDetail.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.renderinitialCommits = this.renderinitialCommits.bind(this);
  }

  componentWillMount() {
    this.getRepos();
  }
  render() {
    return (
      <div className="maincontainer">
        <aside className="lista">
          <div className="bgfixxer"/>
          <h1>Repositórios</h1>
          {this.state.requestOrganizado.map((repo, i) => (
            <Repos key={i} index={i} repo={repo} onClick={this.handleRepoDetail}/>
          ))}
        </aside>
        <div className="description">
          <div className="descontainer">
            <h2>Detalhes</h2>
            <Reposdetails details={this.state.detalhesAtual}/>
            <Commits showLoad={this.state.showLoad} commits={this.state.commitsUrl} onClick={this.handleLoadMore} limit={this.state.limit}/>
          </div>
        </div>
      </div>
    );
  }
  getRepos() {
    // PRIMEIRO REQUEST PARA A API
    axios
    .get(allRepos)
    .then(response => {
      // SETAR O STATE PARA O PRIMEIRO REQUEST COM TODOS OS REPOSITORIOS
      this.setState({primeiroRequest: response.data});
      // SETAR O STATE DO OBJETO PARA ESTE ARRAY REORGANIZADO POR ESTRELAS
      this.setState({requestOrganizado: this.state.primeiroRequest.sort((a, b) => b.stargazers_count - a.stargazers_count)});
      // CHAMAR FUNCAO ORGANIZADORA PARA ORGANIZAR O PRIMEIRO REQUEST
      this.requestOrganizado();
      // CHAMAR COMMITS DO ROTEADOR AO MUDAR AO MUDAR O STATE
      this.getCommits();
    });
  }
  getCommits() {
    // SE O PARAMETRO NAO FOR PASSADO PELO ROTEADOR REQUEST COM OS COMMITIS INICIAIS
    // A FUNCAO DE RENDERIZAR OS COMMITS INICIAIS CASO CONTRARIO RENDERIZAR OS COMMITS RELACIONADOS AO PARAMETRO ENVIADO
    if (this.props.params.repoId === undefined) {
      this.renderinitialCommits();
    } else {
      axios
      .get('https://api.github.com/repos/globocom/' + this.props.params.repoId + commitSecureurl)
      .then(response => {
        this.setState({commitsUrl: response.data});
      });
    }
  }
  renderinitialCommits() {
    // FUNCAO PARA RENDERIZAR OS COMMITS INICIAIS ESPERANDO NAO RECEBER NENNHUM VALOR DO ROTEADOR E FILTRANDO O REQUEST PARA RECEBER ITEM INICIAL
    axios
    .get('https://api.github.com/repos/globocom/' + this.state.detalhesAtual.name + commitSecureurl)
    .then(response => {
      this.setState({commitsUrl: response.data});
    });
  }
  requestOrganizado() {
    // SETAR OS DETALHES PARA O PRIMEIRO ITEM DO REQUEST ORGANIZADO OU ENTAO FILTRAR A ARRAY ORGANIZADA COM O PARAMETRO DO ROUTER
    if (this.props.params.repoId === undefined) {
      this.setState({detalhesAtual: this.state.requestOrganizado[0]});
    } else {
      const renderRepo = this.state.requestOrganizado.filter(repo => repo.name === this.props.params.repoId);
      this.setState({detalhesAtual: renderRepo[0]});
    }
  }
  handleRepoDetail(e) {
    // HANDLER DO BOTAO CARREGAR SHOW E HIDE COM TRUE E FALSE
    if (this.state.showLoad === false) {
      this.setState({showLoad: !this.state.showLoad});
    }
    // HANDLER DO CLICK DOS REPOSITORIOS
    const repoIndex = e.target.getAttribute('id');
    this.setState({detalhesAtual: this.state.requestOrganizado[repoIndex]});
    axios
    .get(this.state.requestOrganizado[repoIndex].url + commitSecureurl)
    .then(response => {
      this.setState({commitsUrl: response.data, limit: 5});
    });
  }
  handleLoadMore() {
    // HANDLER DO BOTAO CARREGAR MAIS SE FOR MAIOR = QUE O NUMERO DE REPOS HIDE CARREGAR MAIS 20 NO CLICK
    if (this.state.limit >= this.state.commitsUrl.length) {
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
