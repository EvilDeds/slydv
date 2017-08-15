const React = require('react');
const Embed = require('react-runkit');

const helloSource = `function test(num){return 'Hi, '+num+1;}test(8);`;

// class Runkit extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       code: 'console.log("Hello, world")',
//     };
//   }
//
//   render() {
//     // const getSource = node => {
//     //   setInterval(() => {
//     //     var iframe = document.getElementById('iframeId');
//     //    var innerDoc = iframe.contentDocument || iframe.contentWindow.document
//     // was trying to add in a reference to the iframe to access the underlying
//     // codemirror instance and use the codemirror values (or access the dom nodes)
//     //   }), 1000)
//     // } ref={getSource}
//     return (
//       <div>
//         <Embed source={this.state.code} readOnly={false} onURLChanged={console.log} />
//       </div>
//     );
//
//
//   }
// }

module.exports = class Runkit extends React.Component {
  constructor() {
    super();
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
    console.log('hi', /* this.source, event */);
    console.log('getURL', this.refs.embed.getURL());
    console.log('getSource',this.refs.embed.getSource());
    this.refs.embed.getSource((code) => this.setState({ code }));
  }
  render() {
    console.log(this.state.code);
    return <Embed source={ helloSource } readOnly={ false } onEvaluate={ this.alertEvaluated.bind(this) } ref="embed" />
  }
};

