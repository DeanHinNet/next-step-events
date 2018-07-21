import React from 'react';
import axios from 'axios';

class Logout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            response: ''
        }
    }
    loginUser(data){
        //Sets the state for 'isLoggedIn' once the user is authenticated
        this.setState({
            user: data.user,
            isLoggedIn: data.isLoggedIn
        });
        if(this.props.home){
            this.setState({
                toDashboard: true
            });
        }
    }
    componentDidMount(){
        console.log('logging user out...');
        axios.delete('/login')
        .then((results)=>{
            this.props.loginUser({
                user: '',
                isLoggedIn: false
            });
            this.setState({
                response: results.data
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    render(){
        if(this.state.toDashboard){
            console.log('returning to dashboard');
            return <Redirect to='/' />;
        }
        return(
            <div>
                {this.state.response ? this.state.response : ""}
            </div>
        )
    }
}
export default Logout;