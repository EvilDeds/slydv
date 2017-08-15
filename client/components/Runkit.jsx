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
    console.log('embed method getURL',this.refs.embed.getURL());
    console.log('embed method getSource',this.refs.embed.getSource());
    console.log('hi blarg', this.source, event);
  }
  render() {
    return <Embed source={helloSource} readOnly={false} ref="embed" onEvaluate={this.alertEvaluated.bind(this)} />;
  }
};
