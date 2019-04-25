import React from 'react';
import HTTPRequest from './HTTPRequest';

export default class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonsColor: '#458B74'
        }
    }

    login = () => {
        const userInfo = {username: this.state.username, password: this.state.password};
        HTTPRequest.sendHTTPRequest('POST','http://localhost:9999/User/log-in','',userInfo).then((res) => {
        if (res.status === 200){
            const tokens = JSON.parse(res.response);
            const user = this.state.username;
            this.clearInputFields();
            this.props.history.push({pathname: `/User/${user}/Events`,data: tokens.accessToken});
            
        }
        }).catch((rej) => {
            console.log(rej.response);
            return;
        });
      }
    
    clearInputFields = () => {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        this.setState({username: '',password: ''});
    }

    render() {
        return(

            <div className = "mainContainer">

                <div className = "title">
                    Login
                </div>

                <div className = "inputs">
                    <div>
                        Username:
                        <input id = "username" ref = {input => {this.textInputUsername = input}} className = "input1" type = "text" onChange = {(e) => {this.setState({username : e.target.value})}}/>
                    </div>

                    <div>
                        Password:
                        <input id = "password" ref = {input => {this.textInputPassword = input}} className = "input2" type = "password" onChange = {(e) => {this.setState({password : e.target.value})}}/>
                    </div>
                
                </div>
                <button style = {{backgroundColor: this.state.buttonsColor}} className = "button" onClick = {() => {this.setState({buttonsColor: '#66CDAA'});this.login()}} >
                        Login
                </button>
            </div>
        )
    }
}

