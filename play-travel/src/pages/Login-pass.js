import React, { Component } from 'react';

// import '../css/login.scss';

class LoginPass extends Component {
    render() {
        return <div class="page-login">
            <header class="login-header">
                <p class="link">&lt;</p>
                <h1 class="h1">手机号快捷登录</h1>
            </header>
            <main class="login-info">
                <div class="text-field">
                    <label class="label">
                        <p class="text">手机号</p>
                        <input type="text" class="input"></input>
                    </label>
                </div>

            </main>

        </div>
    }
}

export default LoginPass;