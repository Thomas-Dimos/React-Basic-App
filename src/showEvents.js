import React from 'react';
import HTTPRequest from './HTTPRequest';

//REDUX IS NEEDED IN ORDER TO REFRESH THE PAGE AND CONTINUES TO SHOW EVENTS

export default class showEvents extends React.Component{

    constructor (props){
        super(props);
        this.state = {
            eventsFetched: false
        }
    }

    componentDidMount (){
        HTTPRequest.sendHTTPRequest('GET','http://localhost:9999/User/Events',this.props.location.data,'')
        .then((res) => {
            if (res.status === 200){
                this.events = res.response;
                this.events = JSON.parse(this.events);
                this.setState({eventsFetched: true});
            }
        }).catch((rej) => {
            console.log(rej.response);
            return;
        });
    }

    render(){
        return(
            <div>
                <div style = {{display: "flex",flexDirection: "column",alignItems: "center",marginTop: "2%", fontSize: 22,color: "#458B74",fontFamily: "sans-serif"}}>
                    {this.props.match.params.user}'s events:
                </div>
                {
                    this.state.eventsFetched ? (
                        <ul>
                            {
                                this.events.map((event,index) =>
                                (
                                <li key = {index} style = {{marginTop: '1%'}}>
                                    {JSON.stringify(event)}
                                </li>

                                ))
                            }
                        </ul>
                        
                    ) : null
                }
            </div>
           

        )
    }
}