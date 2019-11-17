import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../firebase';
import { Form, Select, Table, Modal } from 'antd';
import firebase from '../firebase';
import axios from 'axios';
const { Option } = Select;
const { confirm } = Modal;
const db = firebase.firestore();
class TableHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
    }

  }
  componentDidMount() {

    let wholeData = [];
    axios.get('/findAllHistory').then(resp => {
      resp.data.forEach(element => {
        var temp = {
          name: element.name,
          phoneNum: element.phoneNum,
          status: element.status,
          dateCheckIn: element.dateCheckIn,
          dateCheckOut: element.dateCheckOut,
          status: element.status,
          assignRoom: element.assignRoom,
        }
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });
    })
    console.log(wholeData)
  }
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'Name' },
      { title: 'Tell', dataIndex: 'phoneNum', key: 'Tell' },
      { title: 'วันที่เช็คอิน', dataIndex: 'dateCheckIn', key: 'dateCheckIn'},
      { title: 'วันที่เช็คเอ้าท์', dataIndex: 'dateCheckOut', key: 'datecheckOut' },
    //   { title: 'เวลาที่โอนมัดตำ', dataIndex: 'timePayment', key: 'timePayment' },
      { title: 'status', dataIndex: 'status', key: 'status' },
      { title: 'assign room', dataIndex: 'assignRoom', key: 'assignRoom' }, 

    ];

    return (
      <div>
        <div>
          <Table
            columns={columns}
            // expandedRowRender={(allData) =>
            //   <img src={allData.url} ></img>
            // }
            dataSource={this.state.allData}
          />


        </div>

      </div>
    )
  }
}

export default Form.create()(TableHistory);