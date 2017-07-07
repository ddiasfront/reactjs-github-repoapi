import React, {Component} from 'react';

export class Commits extends Component {
  render() {
    return (
      <div>
        <h4>Commits</h4>
        <ul>
          {this.props.commits.slice(0, this.props.limit).map((commit, i) => (
            <li key={i}className="commit">
              <a id={i} value={i} >{i + 1}. {commit.commit.message}</a>
            </li>
          ))}
        </ul>
        {this.props.showLoad && <button onClick={this.props.onClick}>CARREGAR MAIS COMMITS </button>}
      </div>
    );
  }
}

Commits.propTypes = {
  commits: React.PropTypes.any.isRequired,
  onClick: React.PropTypes.func.isRequired,
  showLoad: React.PropTypes.any.isRequired,
  limit: React.PropTypes.any.isRequired
};
