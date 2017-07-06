import React, {Component} from 'react';

export class Commits extends Component {
  render() {
    return (
      <div>
        <h1>Commits</h1>
        {this.props.commits.slice(0, this.props.limit).map((commit, i) => (
          <div key={i}>
            <ul>
              <li>
                <a id={i} value={i} >{commit.commit.message}</a>
              </li>
            </ul>
          </div>
        ))}
        {this.props.showLoad && <button onClick={this.props.onClick}>W00T</button>}
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
