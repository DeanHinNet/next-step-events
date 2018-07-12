import React from 'react';

class ShowMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
    }
    render(){
        return (
            <div>
                <h3>Members</h3>
                <ul>
                {this.props.members.map((member, index)=>{
                    return <li key={index}>{member.name}</li>
                })}
                </ul>
            </div>
        )
    }
}
export default ShowMembers;