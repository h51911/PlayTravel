import React, { Component } from 'react';
import {
    Input,
    Tooltip,
    Icon,
    Divider,
    Carousel,
    Menu
} from 'antd';
import My from '../api/myweb';
import Advertisement from '../components/Advertisement';
import '../scss/discover.css';
import 'antd/dist/antd.css';

class Discover extends Component {
    constructor(props) {
        super(props);

        this.toDestination = this.toDestination.bind(this);
        this.toDetail = this.toDetail.bind(this);
        this.toList = this.toList.bind(this);
    }
    
    state = {
        bannerimg: [],
        hots: [],
        groups: [],
        block: [],
        four:[1,2,3,4],
        recommens: [{
            title: '周边游',
            content: '国内城市周边',
            bag: '/bag1.png',
            color: '#e96a65'
        }, {
            title: '机票预订',
            content: '国际国内机票',
            bag: '/bag2.png',
            color: '#2f7d9a'
        }, {
            title: '海外吃喝玩乐',
            content: '海外自由行',
            bag: '/bag3.png',
            color: '#20c5ae'
        }, {
            title: '你未曾感受的日本',
            content: '玩途 X 星野',
            bag: '/bag4.png',
            color: '#2d384c'
        }, {
            title: '旅行通票',
            content: '省钱旅行通行证',
            bag: '/bag5.png',
            color: '#f6a736'
        }]
    }

    toDestination() {
        this.props.history.push('/destination')
    }

    toList(activeKey) {
        this.props.history.push('/list/' + activeKey)
    }

    toDetail(activeKey) {
        this.props.history.push('/detail/' + activeKey)
    }

    async componentDidMount() {
            // console.log(666);
        let {
            data
        } = await My.get('/home');
        this.setState({
            bannerimg: data.bannerimg,
            hots: data.hots,
            groups: data.groups,
            block: data.block
        })
        // console.log(data);
    }

    render() {
        return <div id="discover">
            
            <main>
                <header>
                <h1>玩途旅行</h1>
                    <Input
                    onFocus={this.toDestination}
                    placeholder="输入一个目的地"
                    prefix={<Icon type="search" style={{ color: '#fff' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                        </Tooltip>
                    }
                />
            </header>
                <div className="banner">
                    <Carousel autoplay>
                        {
                            this.state.bannerimg.map((item) => {
                                return <div key={item.banner_id}>
                                    <img src={item.h5_image_url} title={item.title} />
                                </div>
                            })
                        }
                    </Carousel>
                </div>
                <div className="plan">
                    <h2>开始计划下一次出行</h2>
                    <div className="recommend"
                    onClick={this.toDestination}>
                        {
                            this.state.recommens.map((item, idx) => {
                                return <div className="recombag" key={item.title}>
                                    < img src = {
                                        process.env.PUBLIC_URL + item.bag
                                    }
                                    />
                                    <p className="recommart" style={{backgroundColor:item.color,opacity:.93}}>
                                        <span className="recomtitle">{item.title}</span>
                                        <span className="recomcontent">{item.content}</span>
                                    </p>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="gift" onClick={this.toDestination}>
                    <div className="left giftcon">
                        <h2>新人好礼</h2>
                        <p>88元礼券立即领取</p>
                    </div>
                    <div className="right giftcon">
                        <h2>旅行+</h2>
                        <p>5折特权天天抢</p>
                    </div>
                </div>
                <div className="bourn">
                    <h2>十一大非常目的地</h2>
                    <p className="bourncon">Super自由行精选目的地</p>
                    <div className="bournlist">
                        <div className="bournlife">
                        {
                            this.state.hots.map((item, idx) => {
                                return <div className="bourncity" key={item.code}
                                    onClick={this.toList.bind(this,item.code)}>
                                    <img src={item.image_url} title={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>{item.code}</p>
                                </div>
                            })
                        }
                        </div>
                        </div>
                </div>
                <div className="groups">
                    {
                        this.state.groups.map((item, idx) => {
                            return <div className="grouplist" key={item.item.group_id}>
                                <h2>{item.item.title}</h2>
                                <p className="groupcon">{item.item.short_desc}</p>
                                <div className="groupcity">
                                    <div className="grouplift">
                                        {
                                            item.item.products.map((ite,ind)=>{
                                                return <div className="grouptown" key={ite.product_id}
                                                onClick={this.toDetail.bind(this,ite.product_id)}>
                                                    <img src={ite.image_url} title={ite.name} />
                                                    <h3>{ite.name}</h3>
                                                    <p className="groupprice">{ite.min_price}</p>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="tokyo">
                    
                        {this.state.block.map((item) => {
                            return < div className="content" key={item.title}>
                                < h2 > {item.title} </h2>
                                <div className="tokyogroup" style={{backgroundImage:`url(${item.groups.h5_image_url})`}}>
                                    <h3>{item.groups.title}</h3>
                                    <p>{item.groups.sub_title}</p>
                                </div>
                                <div className="tokyolist">
                                    {
                                        this.state.four.map((ite) => {
                                            let ind = 'categories' + ite;
                                            return <div className="tokyoway" key={ite} onClick={this.toDestination}>
                                                <img src={item[ind].image_url} />
                                                <div className="tokyoright">
                                                    <p className="tokyoleft">
                                                        < span className = "tokyotitle" > {
                                                            `${item[ind].category_name}(${item[ind].products_count})`
                                                        } </span>
                                                        <span className="tokyocon">{item[ind].summary}</span>
                                                    </p>
                                                    <Icon type="right" style={{ color: '#999' }} />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>})}
    
                </div>
                <Advertisement/>
            </main>
        </div>
    }
}

export default Discover