const React = require('react');
const Embed = require('react-runkit');

// const helloSource = `function test(num){return 'Hi, '+num+1;}test(8);`;

class Runkit extends React.Component {
  constructor() {
    super();
    this.state = {
      code: 'console.log("Hello, world")',
    };
  }

  render() {
    // const getSource = node => {
    //   setInterval(() => {
    //     var iframe = document.getElementById('iframeId');
    //    var innerDoc = iframe.contentDocument || iframe.contentWindow.document
    // was trying to add in a reference to the iframe to access the underlying
    // codemirror instance and use the codemirror values (or access the dom nodes)

    //   }), 1000)
    // } ref={getSource}
    return (
      <div>
        <Embed source={this.state.code} readOnly={false} onURLChanged={console.log} />
      </div>
    );
  }
}

export default Runkit;
