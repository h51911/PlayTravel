import React, { Component } from 'react';
import {
    Route
} from 'react-router-dom'
import {
    Input,
    Tooltip,
    Icon,
    Divider,
    Menu
} from 'antd';
import City from '../components/DestinationList';
import My from '../api/myweb';
import '../scss/destination.css';
import 'antd/dist/antd.css';

const {
    SubMenu
} = Menu;

class Destination extends Component {
    constructor(props) {
        super(props);
        this.changeType = this.changeType.bind(this);
        this.changeDip = this.changeDip.bind(this);
        this.Search = this.Search.bind(this);
    }
    state = {
        currentIdx: 0, //高亮索引值
        activeKey: '',
        dip:1,
        menu: [],
        hots: [],
        citysearch:[]
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

    changecity(hots) {
        this.setState({
            hots
        })
    }

    changeType = (object) => {
        let { activeKey, index } = object;
        this.props.history.replace('/destination/' + activeKey);
        this.state.currentIdx = index;
        let hots = this.state.menu[index].hots;
        this.setState({
            currentIdx: index,
            activeKey
        });
        this.changecity(hots);
    }

    changeDip() {
        let { dip } = this.state;
        this.setState({
            dip: !dip
        })
       
    }

    async Search(value) {
        console.log(666);
        let {
            data
        } = await My.get('/area/search', {
            title: value.target.value
        });
        console.log(data);

    }

    render() {
        let {
            match
        } = this.props;
        let { citysearch } = this.state.menu;
        return <div id = "destination" >
            <header>
                <h2>下一次您想去哪里玩？</h2>
                <Input
                    onFocus={this.changeDip}
                    onBlur={this.changeDip}
                    onChange={this.Search.bind(this)}
                    placeholder="输入一个目的地"
                    prefix={<Icon type="environment" style={{ color: 'rgba(240,47,69,1)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                        </Tooltip>
                    }
                />
                <ul className={this.state.dip?"dip":''}><li ></li>
                   
                    </ul>
                        
               
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
                                return <p className="hots" style={{backgroundImage:`url(${item.image_url})`}} key={item.code}>
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