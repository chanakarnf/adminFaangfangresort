import React, { Component } from 'react';
import firebase from '../firebase'
import 'antd/dist/antd.css';
import { Form,Table,Tag,Spin,TreeSelect,InputNumber,Select,Popconfirm,Modal } from 'antd';
import axios from 'axios';
const { Option } = Select;
const db = firebase.firestore();
const { confirm } = Modal;
class TableBooking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allData : [] ,
            details:"หวัดดี"

        }
    }
    componentDidMount() {
        let wholeData = [];
        axios.get('/findAllCustomer').then(resp => {
            resp.data.forEach(element => {
                var str = ""
                if (element.reserveA>0){
                    str+= '  [ห้อง A '+ element.reserveA + ' ห้อง]  ';
                }
                if (element.reserveB>0){
                    str+= "  [ห้อง B " + element.reserveB + " ห้อง]  ";
                }
                if (element.reserveC>0){
                    str+= "  [ห้อง C " + element.reserveC + " ห้อง]  ";
                }
                if (element.reserveD>0){
                    str+= "  [ห้อง D " + element.reserveD + " ห้อง]  ";
                }
                if (element.reserveD>0){
                    str+= "  [ห้อง D " + element.reserveD + " ห้อง]  ";
                }
                if (element.reserveE>0){
                    str+= "  [ห้อง E " + element.reserveE + " ห้อง]  ";
                }
                if (element.reserveF>0){
                    str+= "  [ห้อง F " + element.reserveF + " ห้อง]  ";
                }
                var temp = {
                    name: element.name,
                    phoneNum: element.phoneNum,
                    email: element.email,
                    cost: element.cost,
                    dateCheckIn: element.dateCheckIn,
                    dateCheckOut: element.dateCheckOut,
                    status: element.status,
                    details: str
                }
                wholeData.push(temp);
            });
            this.setState({ allData: wholeData});
        })  
        console.log(wholeData)
    }
    onChangeSelect = (value, record) => {
        
        confirm({
            title: 'Do you want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk: () => {
                return new Promise((resolve, reject) => {
                    const tmpAllData = this.state.allData;
                    tmpAllData.map(element => {
                        if(element.name === record.name) {
                            element.status = value
                        }
                        return element
                    })
                this.setState({allData: tmpAllData})
                const phoneNum = record.phoneNum;
                const status = value;
                axios.put(`/updateStatus/${phoneNum}`,({status})).then(resp => {
                    if (resp.status === 200) {
                        resolve();
                    }
                }).catch(e => {
                    reject(value = e)
                })
                
              }).catch((e) => console.log('ERROR', e));
            },
            onCancel: () => {
                window.location.reload()
            },
          });
      };
    render() {
        
          const columns = [
            { title: 'Name', dataIndex: 'name', key: '0' },
            { title: 'Tell', dataIndex: 'phoneNum', key: '1' }, 
            { title: 'Email', dataIndex: 'email', key: 'Email' },
            { title: 'DateCheckIn', dataIndex: 'dateCheckIn', key: 'DateCheckIn' },
            { title: 'DateCheckOut', dataIndex: 'dateCheckOut', key: 'DateCheckOut', },
            // { title: 'Type', dataIndex: 'Type', key: 'Type' },
            { title: 'Price', dataIndex: 'cost', key: 'Price' },
            //{ title: 'Earnest', dataIndex: 'Earnest', key: 'Earnest' },
            {
              title: 'status',
              dataIndex: 'status',
              key: 'status',
              render: (text,record) => <Select showSearch
              style={{ width: 200 }}
              placeholder={text}
              onChange={(value) => this.onChangeSelect(value, record)}
              optionFilterProp="children"
            //   onChange={onChange}
              //onFocus={onFocus}
            //   onBlur={onBlur}
            //   onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {/* <Option value="จองที่พัก">จองที่พัก</Option> */}
              {/* <Option value="ชำระมัดจำ">ชำระมัดจำ</Option> */}
              {/* <Option value="check-in">check-in</Option>
              <Option value="check-out">check-out</Option> */}
              <Option value="ไม่เข้าพัก">ไม่เข้าพัก</Option>
            </Select>
        
            
            },
        
            
        ];
        
        return (
            <div>
                <Table 
                    columns = {columns} 
                    expandedRowRender={(allData) => 
                    <p style={{ margin: 10 }}>{allData['details']} </p>
                
                }
                    dataSource={this.state.allData}
                />
               
            </div>

        );
    }
    
        


  

}


export default Form.create()(TableBooking);