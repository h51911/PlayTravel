import React, { Component } from 'react';
import Advertisement from '../components/Advertisement';


import '../css/base.css';
import '../scss/List.scss';
import {Icon,Tabs} from 'antd';
import 'antd/dist/antd.css'
import myweb from '../api/myweb';

const {TabPane} = Tabs;



class List extends Component{
    constructor(props){
        super(props);
        this.state={
            data:"",
            products:[]
        }

        this.toDiscover=this.toDiscover.bind(this)
        this.toDestination=this.toDestination.bind(this)
        this.toDetail=this.toDetail.bind(this)
    }

    async componentDidMount(){
        
        //获取路由的参数（保留）
        let {match:{params}} = this.props;

        let {data} = await myweb.get('/list',{
            city_code:params.code
        })
        if(data){
            let digi = data[0]
            let products = digi.products
                this.setState({
                    data:digi,
                    products
                })
        }else{
            this.setState({
                data:"",
                products:[]
            })
            }
    }
    
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }

    //跳转到首页
    toDiscover(){
        this.props.history.push('/discover')
    }

    //跳转到目的地
    toDestination(){
        this.props.history.push('/destination')
    }
    //跳转到详情页
    toDetail(id){
        this.props.history.push('/detail/' + id)
        // console.log(id);
    }

    render(){
        
        let {data} = this.state;
        let {products} = this.state;
        return(
            <div className="listBox">
                <header className="header">
                    {data.h5_image_url?<img className="listBanner" src={data.h5_image_url} alt=""></img>:<div className="noBanner"></div>}
                    
                    <div className="search">
                            <div className="title">
                                <a href="###" className="logo" onClick={this.toDiscover}>
                                    <img alt="" src="data:image/png;base64,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"></img>
                                </a>
                                <div className="site">
                                    |
                                    <span>
                                        {data.cn_name}
                                    </span>
                                    <Icon type="down" />     
                                </div>
                            </div>
                            <div className="searchIcon">
                            <Icon type="search" onClick={this.toDestination}/>
                            </div>
                        </div>
                    <p className="align">
                    <span>{data.cn_name}</span>
                    <span>{data.en_name}</span>
                    </p>
                </header>
                {products?<section   className="section">
                <Tabs defaultActiveKey="1" className="tabs">
                    <TabPane tab="周边游" key="1">
                      <ul className="li">
                          {
                              products.length?
                              products.map(item=>(item.alias? <li key={item.product_id} onClick={this.toDetail.bind(this,item.product_id)}>
                                <div>
                                    {item.images?<img src={item.images[0].image_url} alt=""></img>:''}
                                </div>
                                <div>
                                    <p>{item.alias}</p>
                                    <p>
                                        <span>热门推荐</span>
                                        <span>自然景观</span>
                                    </p>
                                    <p>{item.min_price}</p>
                                </div>
                            </li>:<div  className="noData">
                    无数据
                </div> )):<div  className="noData">
                    无数据
                </div>
                          }
                      </ul>
                    </TabPane>
                    <TabPane tab="机票" key="2">
                      <div className="ticket">
                          <div>添加具体信息就可以帮您查询合适的航班</div>
                          <div>
                              <div>航班查询</div>
                          </div>
                      </div>
                    </TabPane>
                </Tabs>
                </section>:<div  className="noData">
                    无数据
                </div>}
                
                
                <Advertisement />
            </div>
        )
    }
}

export default List