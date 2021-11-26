import React from 'react';
import {Card} from './card';
import {Modal} from './modal';
import {Pagination} from 'antd';
import './App.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,  // 当前页数
      minValue: 0,  // 当前页面展示的第一条数据
      maxValue: 25,  // 当前页面展示的最后一条数据
      isShow: false, // 是否展示详细信息界面
      showId: undefined,  // 展示每条数据详细信息
      list: []
    }
  }

  componentDidMount() {
    // 在画完界面后调用getTicketsList接口,结果存在list里
    fetch('https://zendesk-ticket-viewer-robin.herokuapp.com:443/zendesk/ticket/viewer/ticket/list', {
      method:'GET',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      mode:'cors',
      cache:'default'
    })
    .then(res => res.json())
    .catch(err => alert('wow! api err!', err))
    .then((res => {
      this.setState({list: res.result || []})
    })
    )
  }

  handleChange = (value) => {
    if(value <= 1) {
      this.setState({
        current: value,
        minValue: 0,
        maxValue: 25
      })
    } else {
      this.setState({
        current: value,
        minValue: (value - 1) * 25,
        maxValue: (value - 1) * 25 + 25
      })
    }
  }

  handleClick = (id) => {
    this.setState({
      isShow: true,
      showId: id
    })
  }

  handleCancel = () => {
    this.setState({
      isShow: false,
      showId: undefined
    })
  }

  render () {
    const {current, minValue, maxValue, isShow, showId} = this.state; // list从state括号里取出

    return (
      <section className='app'>
        <header className='app-header'>
          <h1>Ticket Viewer</h1>
          <h3> {this.state.list.length} tickets in total</h3>
        </header>
          {(this.state.list.slice(minValue, maxValue) || []).map((d, index) => {  // mockData换成list
          return (
            <div className='app-block' title='click to review details' key={index} onClick={() => this.handleClick(d.id)}>
              <Card num={minValue + index + 1}>
                {d.subject}
              </Card>
            </div>
          )
        })}
        <Pagination 
          defaultPageSize={25}
          current={current}
          className='app-page'
          total={this.state.list.length}
          onChange={this.handleChange}
          showSizeChanger={false}
        />
        {isShow && 
        <Modal
          id={showId}
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />}
      </section>
    );
  }
}
