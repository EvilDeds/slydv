const React = require('react');
const Embed = require('react-runkit');

export default class Runkit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log('blargh',event.target.value);
  }
  alertEvaluated(event) {
    // (this.source and event are undefined, but we can update state in the callback below)
    this.refs.embed.getSource((code) => this.setState({ code }));

  }

  render() {
    console.log("CODE ON STATE",this.state.code);
    return <Embed source={ this.props.codeText  } readOnly={ false } onEvaluate={this.alertEvaluated.bind(this)} ref="embed" />;
  }
};
