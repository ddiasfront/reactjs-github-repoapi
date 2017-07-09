
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
      this.setState({detalhesAtual: this.state.todosRepositorios[0]});
    } else {
      const renderRepo = this.state.todosRepositorios.filter(repo => repo.name === this.props.params.repoId);
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
    this.commitCounter();
    if ((this.state.limit + 5) >= (this.state.commitsUrl.length)) {
      this.setState({showLoad: !this.state.showLoad});
    }
  }
  commitCounter() {
    if ((this.state.limit) >= (this.state.commitsUrl.length)) {
      this.setState({showLoad: !this.state.showLoad});
    } else {
      this.setState({
        limit: this.state.limit + 20
      });
    }
  }