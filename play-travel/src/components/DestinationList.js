import React, { Component } from 'react';
import My from '../api/myweb';

class DesList extends Component{
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
                                return <p key={ite.code}>{ite.title}</p>
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