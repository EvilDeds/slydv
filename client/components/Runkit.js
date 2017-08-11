const React = require('react')
const Embed = require('react-runkit')

const helloSource = `function test(num){return 'Hi, '+num+1;}test(8);`

module.exports = class Runkit extends React.Component {
    constructor(){
        super();
        this.state={
            code:''
        };
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        console.log('blargh',event.target.value);
    }
    render() {
        return <Embed source={ helloSource } readOnly={ false } onChange={this.onChange} />
    }
}