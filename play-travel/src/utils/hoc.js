import React from 'react';


export function withStorage(InnerComponent) {
    let token = { isLogin: false };
    if (localStorage.getItem('TOKEN')) {
        token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    return class OuterComponent extends React.Component {
        render() {
            return <InnerComponent {...this.props} token={token} />
        }
    }
}