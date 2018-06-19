import React from 'react';

class AddEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            event: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e){
        this.setState({
            event: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.event);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' onchange={this.handleInput} />
                </form>
            </div>
        )
    }
}

export default AddEvent;