import React, { Component } from 'react';


class Mine extends Component {
    componentDidMount() {
        console.log(this);
        // localStorage.setItem('play-tracel', `{"isLogin":"true"}`)
        console.log(JSON.parse(localStorage.getItem("play-tracel")));
        if (JSON.parse(localStorage.getItem("play-tracel")) === null) {
            this.props.history.push('/login-phone');
        }
    }
    render() {
        return <div>
            Mine
        </div>
    }
}

export default Mine