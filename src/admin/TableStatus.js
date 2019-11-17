import React, { Component } from 'react';
import "antd/dist/antd.css";

import { Form, Select, Table, Modal } from 'antd';
import firebase from '../firebase';
import axios from 'axios';
class TableStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],

    }

  }
  componentDidMount() {
    let wholeData = [];
    axios.get('/findAllStatus').then(resp => {
      resp.data.forEach(element => {
        var temp = {
          name: element.name,
          phoneNum: element.phoneNum,
          status: element.status,
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
    { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    return (
      <div>
        <div>
          <Table
            columns={columns}
            dataSource={this.state.allData}
          />
        </div>

      </div>
    )
  }
}

export default Form.create()(TableStatus);