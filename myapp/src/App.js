import logo from './logo.svg';
import './App.css';
import React from 'react';


function Header(props={}){
  console.log('header----')
  return <header>{props.name}</header>
}
function Footer(props){
  console.log('footer----')
  return <div>footer</div>
}
class App extends React.Component{
  state={name:1}

  render(){
      console.log('app----')
      return (
        <div className="App">
          <header className="App-header" onClick={()=>{
              this.setState({name:2})
          }}>
            <Header name={this.state.name}/>
          </header>
          <Footer />
        </div>
      );
  }
}

export default App;
