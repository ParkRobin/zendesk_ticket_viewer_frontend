import React from "react";
import {Modal as OriginModal} from 'antd';
import './style.css';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: '',
      create_time: '',
      update_time: '',
      status: '',
      description: '',
      requester_id: '',
      requester_name: '',
      subject: ''
    }
  }
  componentDidMount () {
    const {id} = this.props;
    this.getDetails(id);
  }

  componentWillReceiveProps(next) {
    const {id} = this.props;
    // 每次传入的id改变时，重新调用details接口
    if(id !== next.id && next.id) {
      this.getDetails(next.id);
    }
 
  }

  getDetails = (id) => {
    fetch(`https://zendesk-ticket-viewer-robin.herokuapp.com:443/zendesk/ticket/viewer/ticket?id=${id}`, {
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
      this.setState(
          {description: res.result.description,
            status: res.result.status,
            requester_id: res.result.requester_id,
            create_time: res.result.created_at,
            update_time: res.result.updated_at,
            subject: res.result.subject
          }
      )
            fetch(`https://zendesk-ticket-viewer-robin.herokuapp.com:443/zendesk/ticket/viewer/user/name?id=${this.state.requester_id}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                },
                mode:'cors',
                cache:'default'
            }).then(res => res.json())
                .catch(err => alert('wow! api err!', err))
                .then((res => {
                    this.setState(
                        {
                            requester_name: res.result,
                        }
                    )
                }))
    })
    )
  }

  render() {
    const {id, onCancel} = this.props;
    const {details} = this.state;
    const style = {fontSize: 20 + 'px'};
    return (
      <OriginModal 
        className='tic-modal' 
        onCancel={onCancel}
        footer={<></>}
        {...this.props}>
          <h1><center>{` ${this.state.subject}` }</center></h1>
          <div style={style}>{`ticket id: ${id}`}</div>
          <div style={style}>{`requester name: ${this.state.requester_name}`}</div>
          <div style={style}>{`create time: ${new Date(this.state.create_time).toUTCString()}`}</div>
          <div style={style}>{`update time: ${new Date(this.state.update_time).toUTCString()}`}</div>
          <div style={style}>{`status: ${this.state.status}`}</div>
          <div style={style}>{`description: ${this.state.description}`}</div>

      </OriginModal>
    );
  }
}
