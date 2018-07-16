import React from 'react';
import axios from 'axios';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import Html from 'slate-html-serializer';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: ''
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

const BLOCK_TAGS = {
    blockquote: 'quote',
    p: 'paragraph',
    pre: 'code'
}
// Add a dictionary of mark tags.
const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline'
}
const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                object: 'block',
                type: type,
                data: {
                    className: el.getAttribute('class'),
                },
                nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object == 'block') {
                switch (obj.type) {
                case 'code':
                    return (
                    <pre>
                        <code>{children}</code>
                    </pre>
                    )
                case 'paragraph':
                    return <p className={obj.data.get('className')}>{children}</p>
                case 'quote':
                    return <blockquote>{children}</blockquote>
                }
            }
        },
    },
    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                object: 'mark',
                type: type,
                nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object == 'mark') {
                switch (obj.type) {
                case 'bold':
                    return <strong>{children}</strong>
                case 'italic':
                    return <em>{children}</em>
                case 'underline':
                    return <u>{children}</u>
                }
            }
        }
    }
];
const html = new Html({ rules });
class AddMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            thread_id: '',
            parent_id: '',
            content: '',
            error: '',
            value: html.deserialize(initialValue)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        // this.onChange = (editorState) => this.setState({editorState});
        this.onChange = this.onChange.bind(this);
        this.renderNode = this.renderNode.bind(this);
        this.renderMark = this.renderMark.bind(this);
    }
    componentDidMount(){
        console.log('initial value', initialValue);
        console.log('deserialized', html.deserialize(initialValue))
    }
    renderNode(props){
        switch (props.node.type) {
          case 'code':
            return (
              <pre {...props.attributes}>
                <code>{props.children}</code>
              </pre>
            )
          case 'paragraph':
            return (
              <p {...props.attributes} className={node.data.get('className')}>
                {props.children}
              </p>
            )
          case 'quote':
            return <blockquote {...props.attributes}>{props.children}</blockquote>
        }
    }
      // Add a `renderMark` method to render marks.
    renderMark(props) {
        const { mark, attributes } = props;
        switch (mark.type) {
            case 'bold':
            return <strong {...attributes}>{props.children}</strong>
            case 'italic':
            return <em {...attributes}>{props.children}</em>
            case 'underline':
            return <u {...attributes}>{props.children}</u>
        }
    }
    onChange({value}){
        this.setState({
            thread_id: this.props.thread_id,
            value: value
        })
    }
    handleInput(e){
        this.setState({
            thread_id: this.props.thread_id,
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e, {value}){
        e.preventDefault();
        console.log('posting to messages, addMessages', this.state);
        console.log('here is data',  html.serialize(value));
        // this.setState({
        //     // content: JSON.stringify(value.toJSON())
        //     content: html.serialize(value)
        // },()=>{
        //     console.log('this is state after conversion', this.state);
        //     axios.post('/api/messages', this.state)
        //     .then((results)=>{
        //         this.props.updateThread(results.data.messages);
        //         this.setState({
        //             content: ''
        //         });
        //     })
        //     .catch((err)=>{
        //         console.log('An error has occurred.', err.response);
        //         this.setState({
        //             error: err.response.data
        //         });
        //     });
        // });
       
    }
    render(){
        return(
            <div id='message-add'>
                <h3>Message:</h3>
                <p> {this.state.error ? this.state.error : ""}</p>
                <form onSubmit={(e)=>this.handleSubmit(e, this.state)}>
                    <textarea id='message-input' name='content' type='textarea' value={this.state.content} onChange={this.handleInput} />
                    <input id='message-submit' type='submit' id='submit' value='Submit Message'/>
                </form>
                <h3>NEW EDITOR</h3>
                <Editor value={this.state.value} onChange={this.onChange} renderNote={this.renderNote} renderMark={this.renderMark}/>
                <button onClick={(e)=>this.handleSubmit(e, this.state)}>Submit</button>
            </div>
        )
    }
}
export default AddMessage;