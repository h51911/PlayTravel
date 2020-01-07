import React, { Component } from 'react';
import My from '../api/myweb';

class DesList extends Component{
    constructor(props) {
        super(props);

        this.toList = this.toList.bind(this);
    }
    state = {
        city: [],
        pid:''
    }
    componentDidMount() {
        let {
            pid
        } = this.props.match.params
        this.changeType(pid);
    }

    componentDidUpdate() {
        let {
            pid
        } = this.props.match.params
        this.changeType(pid);
    }

    toList(activeKey) {
        this.props.history.push('/list/' + activeKey)
    }

    async changeType(pid) {
        let {
            data
        } = await My.get('/area/city', {
                pid: pid
            });
        // console.log(data);
            this.setState({
                city: data,
                pid
        })
    }

    render() {
        return (
            <>
                {this.state.city.map((item, idx) => {
                    return <div className="town" key={item.cid}>
                        <h3>{item.title}</h3>
                        <div className="citytown">
                        {
                            item.subs.map((ite,ind) => {
                                return <p key={ite.code}
                                onClick={this.toList.bind(this,ite.code)}>{ite.title}</p>
                            })
                            }
                        </div>
                    </div>
                })}
                
            </>
        )
    }
}
export default DesList;