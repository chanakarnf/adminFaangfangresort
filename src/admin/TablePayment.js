import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../firebase';
import { Form, Select, Table, Modal } from 'antd';
import firebase from '../firebase';
import axios from 'axios';
const { Option } = Select;
var delayInMilliseconds = 4000; 
const { confirm } = Modal;
const db = firebase.firestore();
class TablePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      assignRoom: "",


    }

  }
  componentDidMount() {

    let wholeData = [];
    axios.get('/findAllReceiptInfo').then(resp => {
      resp.data.forEach(element => {
        var temp = {
          name: element.name,
          phoneNum: element.phoneNum,
          price: element.price,
          datePayment: element.datePayment,
          timePayment: element.timePayment,
          status: element.status,
          url: element.url,
        }
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });
    })
    console.log(wholeData)
  }
  onChangeSelect = (value, record) => {
    confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => {
        return new Promise((resolve, reject) => {
          const phoneNum = record.phoneNum;
          const status = value;
          if (value === "ชำระมัดจำแล้ว") {
            axios.put(`/updateStatusReceipt/${phoneNum}`, ({ status }))
            axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))
            axios.put(`/updateStatusCus/${phoneNum}`, ({ status })).then(resp => {
              console.log(resp);
              if (resp.status === 200) {
                resolve();
              }
            }).catch(e => {
              reject(value = e)
            })
            window.location.reload()
          }
          else if (value === "check-in") {
            axios.get(`/findCustomerByPhone/${phoneNum}`).then(resp => {
              console.log(resp);
                const name = resp.data.name;
                const email = resp.data.email;
                const details = resp.data.details;
                const dateCheckIn = resp.data.dateCheckIn;
                const dateCheckOut = resp.data.dateCheckOut;
                const { assignRoom } = this.state;
                axios.post('/AddCheckInInfo', ({ name, phoneNum, email, details, dateCheckIn, dateCheckOut, status,assignRoom }))
              });
              axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))
              axios.delete(`/deleteReceiptInfoByPhone/${phoneNum}`)
              axios.delete(`/deleteCustomerByPhone/${phoneNum}`).then(resp => {
                console.log("delay");
                if (resp.status === 200) {
                  resolve();
                  setTimeout(function() {
                    window.location.reload()
                  }, delayInMilliseconds);
                  
                }
              }).catch(e => {
                reject(value = e)
              })
              
            }
            

          else if (value === "ไม่เข้าพัก") {
            //axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))
            axios.get(`/findCustomerByPhone/${phoneNum}`).then(resp => {
              console.log(resp);
                const name = resp.data.name;
                const phoneNum = resp.data.phoneNum;
                const dateCheckIn = resp.data.dateCheckIn;
                const dateCheckOut = resp.data.dateCheckOut;
                const { assignRoom } = this.state;
                axios.post('/AddHistory', ({ name, phoneNum, status, dateCheckIn, dateCheckOut, assignRoom }))
              });
              axios.delete(`/deleteReceiptInfoByPhone/${phoneNum}`)
              axios.delete(`/deleteCustomerByPhone/${phoneNum}`).then(resp => {
                if (resp.status === 200) {
                  resolve();
                  setTimeout(function() {
                    window.location.reload()
                  }, delayInMilliseconds);
                }
              }).catch(e => {
                reject(value = e)
              })
              
        }else if (value === "การชำระเงินไม่ถูกต้อง") {
          axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))
          axios.put(`/updateStatusCus/${phoneNum}`, ({ status }))
          axios.delete(`/deleteReceiptInfoByPhone/${phoneNum}`).then(resp => {
              if (resp.status === 200) {
                resolve();
                setTimeout(function() {
                  window.location.reload()
                }, delayInMilliseconds);
              }
            }).catch(e => {
              reject(value = e);
            })
           
          
      }
          // const tmpAllData = this.state.allData;
          //   tmpAllData.map(element => {
          //     if (element.name === record.name) {
          //       element.status = value
          //     }
          //     return element
          //   })
          //   this.setState({ allData: tmpAllData })
          
          // 
        }).catch((e) => console.log('ERROR', e));
      },
      onCancel: () => {
        window.location.reload()
      },
    });
  };
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'Name' },
      { title: 'Tell', dataIndex: 'phoneNum', key: 'Tell' },
      { title: 'จำนวนเงินที่โอน', dataIndex: 'price', key: 'Price' },
      { title: 'วันที่โอนมัดจำ', dataIndex: 'datePayment', key: 'datePayment' },
      { title: 'เวลาที่โอนมัดตำ', dataIndex: 'timePayment', key: 'timePayment' },
      //{ title: 'Status', dataIndex: 'status', key: 'status' },
      {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => <Select showSearch
          style={{ width: 200 }}
          placeholder={text}
          optionFilterProp="children"
          onChange={(value) => this.onChangeSelect(value, record)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >

          <Option value="ชำระมัดจำแล้ว">ชำระมัดจำแล้ว</Option>
          <Option value="check-in">check-in</Option>
          <Option value="การชำระเงินไม่ถูกต้อง">การชำระเงินไม่ถูกต้อง</Option>
          <Option value="ไม่เข้าพัก">ไม่เข้าพัก</Option>
        </Select>


      },


    ];

    return (
      <div>
        <div>
          <Table
            columns={columns}
            expandedRowRender={(allData) =>
              <img src={allData.url} ></img>
            }
            dataSource={this.state.allData}
          />


        </div>

      </div>
    )
  }
}

export default Form.create()(TablePayment);