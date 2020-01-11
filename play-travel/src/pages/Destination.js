import React, { Component } from 'react';
import {
    Route
} from 'react-router-dom'
import {
    Input,
    Tooltip,
    Icon,
    Divider
} from 'antd';
import City from '../components/DestinationList';
import My from '../api/myweb';
import '../scss/destination.css';


class Destination extends Component {
    constructor(props) {
        super(props);
        this.changeType = this.changeType.bind(this);
        this.changeDip = this.changeDip.bind(this);
        this.Search = this.Search.bind(this);
        this.getsearch = this.getsearch.bind(this);
        this.setsearch = this.setsearch.bind(this);
        this.stop = this.stop.bind(this);
        this.lift = this.lift.bind(this);
        this.toList = this.toList.bind(this);
    }
    state = {
        currentIdx: 0, //高亮索引值
        activeKey: '',
        dip:1,
        menu: [],
        hots: [],
        citysearch:[]
    }

    toList(activeKey) {
        this.props.history.push('/list/' + activeKey)
    }

    async componentDidMount() {
        let { currentIdx } = this.state;
        let { data } = await My.get('/area');
        // console.log(data);
        let hots = data[currentIdx].hots;
        let activeKey = data[currentIdx].aid
        this.setState({
            menu: data,
            activeKey
        });
        let obj = {
            activeKey,
            index: currentIdx
        }
        this.changeType(obj);
        this.changecity(hots);
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    stop(e) {
        e.stopPropagation();
    }

    changecity(hots) {
        this.setState({
            hots
        })
    }

    changeType = (object) => {
        let { activeKey, index } = object;
        this.props.history.replace('/destination/' + activeKey);
        let hots = this.state.menu[index].hots;
        this.setState({
            currentIdx: index,
            activeKey
        });
        this.changecity(hots);
    }

    changeDip(value) {
        let { dip } = this.state;
        let val = value.target.value;
        this.getsearch(val);
        this.setState({
            dip:!dip
        })
    }

    lift() {
        this.setState({
            dip:1
        })
    }

    async getsearch(val) {
        if (val) {
            let {
                data
            } = await My.get('/area/search', {
                title: val
            });
            this.setState({
                citysearch: data ? data : []
            })
        } else {
             let data = JSON.parse(localStorage.getItem("searchname"));
            //  console.log(data);
             this.setState({
                 citysearch: data ? data : []
             })
        }
    }

    Search(value) {
        let val = value.target.value;
        this.getsearch(val);
    }

    setsearch(obj) {
        // console.log(obj);
        if (obj.title) {
            let isok = true;
            let data = JSON.parse(localStorage.getItem("searchname"));
            console.log(data);
            data.forEach(item => {
                if (item.title === obj.title) {
                    isok = false;
                }
            });
            if (isok) {
                let searchobj = {
                    name: obj.title,
                    code: obj.code,
                    type:'city'
                }
                data.push(searchobj);
                console.log(data);
                let str = JSON.stringify(data);
                localStorage.setItem("searchname", str);
            }
        }
        this.toList(obj.code)
    }

    render() {
        let {
            match
        } = this.props;
        let { citysearch } = this.state;
        return <div id = "destination" onClick={this.lift} >
            <header>
                <h2>下一次您想去哪里玩？</h2>
                <Input
                    onFocus={this.changeDip}
                    onClick={this.stop}
                    onChange={this.Search.bind(this)}
                    placeholder="输入一个目的地"
                    prefix={<Icon type="environment" style={{ color: 'rgba(240,47,69,1)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                        </Tooltip>
                    }
                />
                {
                    citysearch.length?
                    <ul className={this.state.dip ? "dip" : ''}>
                            {citysearch.map((item, idx) => {
                                return <li
                                    onClick={this.setsearch.bind(this,{title:item.title,code:item.code})}
                                    key={item.code}>{item.title ? item.title : item.name}</li>
                        })}                   
                    </ul>:''
                }
                
                        
               
            </header>
            < Divider />
            <main className={this.state.dip?'':"dip"}>
                <ul className="nav">
                    {this.state.menu.map((item,index) => {
                        return <li
                            onClick = {
                                this.changeType.bind(this, {
                                    activeKey: item.aid,
                                    index:index
                                })
                            }
                            className={index === this.state.currentIdx ? 'action' : ''} key={item.aid}>
                            <p>{item.title}</p>
                        </li>
                        })}
                </ul>
                <div className="city">
                    <div className="top">
                        {
                            this.state.hots.map((item, index) => {
                                return <p className="hots" style={{ backgroundImage: `url(${item.image_url})` }} key={item.code}
                                onClick={this.toList.bind(this,item.code)}>
                                    <span>{item.title}</span>
                                    <span>{item.code}</span>
                                </p>
                            })
                        }
                    </div>
                    < Divider />
                    <div className="bottom">
                        <Route path={match.path+"/:pid"} component={City} />
                    </div>
                </div>
            </main>
        </div>
    }
}

export default Destination