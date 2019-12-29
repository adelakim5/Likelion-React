import React, { Component } from 'react'

// const dummy_prop = {
//     title: '테스트용 제목',
//     content: '테스트용 내용',
// }

export default class PostView extends Component{
    render(){
        const {id, title, content} = this.props
        return (
            <div>
                {id}
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        )
    }
}