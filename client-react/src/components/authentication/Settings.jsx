import React from 'react';
import {Link} from 'react-router-dom';

class Settings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            settings: []
        }
    }
    render(){
        return(
            <div>
                <h2>Settings</h2>
                <Link to='/logout'>Logout</Link>
            </div>
        )
    }
}
export default Settings;