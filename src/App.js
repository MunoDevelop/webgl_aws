
import './App.css';
import {Component} from "react";
//import {CardList} from "./Components/card-list/card-list.component";
//import {SearchBox} from "./Components/search-box/search-box.component";
//import * as THREE from "three";
import ToonKagura from "./ToonKagura";
import DevName from "./DevName";

class App extends Component{
    constructor() {
        super();

        this.state = {
           // monsters:[],
        //    searchField:''
        }
    //this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (e) => {
        this.setState({searchField:e.target.value})
    }

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response=>response.json())
        //     .then(users=>this.setState({monsters:users}))
    }


    render(){
        // const{ monsters,searchField} = this.state;
        // const filteredMonsters = monsters.filter(monster=>monster.name.toLowerCase().includes(searchField.toLowerCase()))
/*
*  <SearchBox placeholder='search monsters'
            handleChange={this.handleChange}/>
            <CardList monsters={filteredMonsters}>
            </CardList>
* */

    return (
        <div className="App">
            <DevName></DevName>

            <ToonKagura></ToonKagura>
        </div>
    );
  }
}

export default App;
