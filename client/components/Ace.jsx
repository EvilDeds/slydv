import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

export default class Ace extends Component {
  constructor() {
    super();
    this.state = {
      aceEditorValue: 'function test(num) {\n  return num++;\n}\ntest(8);',
      resultPane: 'blob',
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.aceEditorValue !== nextState.aceEditorValue) {
      return false;
    }

    return true;
  }

  onChange(newValue) {
    // console.log('change', newValue, this.state);
    this.setState({
      aceEditorValue: newValue,
    });
  }

  onClick() {
    // console.log('result',eval(this.state.aceEditorValue));
    const results = eval(this.state.aceEditorValue);
    this.setState({
      resultPane: JSON.stringify(results),
    });
  }

  // Render editor
  render() {
    return (
      <div>
        <h1>HELLO</h1>
        <div className="row">
          <div className="col-sm-6">
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={this.onChange}
              name="CodePane"
              editorProps={{ $blockScrolling: true }}
              value={this.state.aceEditorValue}
            />
          </div>
          <div className="col-sm-6">
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={this.onChange}
              name="ResultPane"
              editorProps={{ $blockScrolling: true }}
              value={this.state.resultPane}
            />
          </div>
        </div>
        <button onClick={this.onClick}>Run</button>
      </div>
    );
  }
}
