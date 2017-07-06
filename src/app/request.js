import React, {Component} from 'react';

export class ListItem extends Component {

  handleClick() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <a onClick={this.handleClick} value={this.props.request.name}>{this.props.request.name}</a>
      </div>
    );
  }
}

Request.propTypes = {
  request: React.PropTypes.object.isRequired
};
