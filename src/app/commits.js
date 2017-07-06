import React, {Component} from 'react';
import axios from 'axios';

export class Commits extends Component {
  constructor() {
    super();
    this.state = {limit: 5, showLoad: false};
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  render() {
    return (
      <div>
        <h1>Commits</h1>
        {this.props.commits.slice(0, this.state.limit).map((commit, i) => (
          <div key={i}>
            <ul>
              <li>
                <a id={i} value={i} >{commit.commit.message}</a>
              </li>
            </ul>
          </div>
        ))}
        {this.state.showLoad && <button onClick={this.handleLoadMore}>W00T</button>}
      </div>
    );
  }
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
}

Commits.propTypes = {
  commits: React.PropTypes.any.isRequired
};
