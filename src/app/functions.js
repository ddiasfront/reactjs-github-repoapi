  {this.state.showLoad && <button onClick={this.handleLoadMore}>W00T</button>}

 getCommits() {
    const allCurrentCommits = this.state.currentRep.url + '/commits';
    axios
    .get(allCurrentCommits)
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
  renderCommits() {
    return this.state.currentCommits.slice(0, this.state.limit).map((commit, i) => (
      <div key={i}>
        <ul>
          <li>
            <a id={i} value={i} >{commit.commit.message}</a>
          </li>
        </ul>
      </div>
    ));
  }