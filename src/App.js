
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
        const jsKey = "f69b9018b87e6802464a4c8c3dd936da";

        // SDK는 한 번만 초기화해야 한다.
        // 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
        if (!window.Kakao.isInitialized()) {
            // JavaScript key를 인자로 주고 SDK 초기화
            window.Kakao.init(jsKey);
            // SDK 초기화 여부를 확인하자.
            console.log(window.Kakao.isInitialized());
        }
    }

    handleChange = (e) => {
        this.setState({searchField:e.target.value})
    }

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response=>response.json())
        //     .then(users=>this.setState({monsters:users}))
    }

    kakaoLogin(){
        window.Kakao.Auth.login({
            success: function (response) {
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (response) {
                        console.log(response)
                    },
                    fail: function (error) {
                        console.log(error)
                    },
                })
            },
            fail: function (error) {
                console.log(error)
            },
        })
    }
    kakaoLogOut(){

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
            <ul>
                <button onClick={this.kakaoLogin}>
                    <a href="javascript:void(0)">
                        <span>카카오 로그인</span>
                    </a>
                </button>
                <button onClick={this.kakaoLogOut}>
                    <a href="javascript:void(0)">
                        <span>카카오 로그아웃</span>
                    </a>
                </button>
            </ul>
        </div>
    );
  }
}

export default App;
