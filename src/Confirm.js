import React , {Component} from 'react';
import "antd/dist/antd.css";
import {storage} from './firebase';
import firebase from './firebase'
import axios from 'axios';
import { Form,  Input, Button, Select, Upload , Icon,message } from 'antd';
const { Option } = Select;
const db = firebase.firestore();
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Confirm extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name : "",
      phoneNum : "",
      datePayment : "",
      timePayment : "",
      price :"",
      url: "",
      loading: false,
      progress: 0,
      status : "รอการตรวจสอบ"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
                const {image} = this.state;
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on('state_changed', 
                (snapshot) => {
                  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                  this.setState({progress});
                }, 
                (error) => {
                  console.log(error);
                }, 
              () => {
                  // complete function ....
                  storage.ref('images').child(image.name).getDownloadURL().then(url2 => {
                      console.log("url",url2);
                      this.setState({url : url2});
                      const name = values.name ;
                      const phoneNum = values.phone;
                      const datePayment =values.datePayment;
                      const timePayment = values.timePayment;
                      const price = values.Price;
                      const {url,status} = this.state
                      axios.post('/addReceiptInfo',({name,phoneNum,datePayment,timePayment,price,url,status})).then(resp => {
                        console.log(resp);
                      })
                     
                      axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))
                      axios.put(`/updateStatusCus/${phoneNum}`, ({ status }))
                  })
              });
          }       
        });

    };
    handleChange = e => {
      console.log(e)
      if (e.fileList[0]) {
          const image = e.fileList[0].originFileObj;
          this.setState(() => ({ image }));
      }
      if (e.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (e.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(e.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
      
      
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7 },
          };
          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+66',
          })(
            <Select style={{ width: 70 }}>
              <Option value="08">+66</Option>
            </Select>,
          );
          const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const { imageUrl } = this.state;
        return (
            <div>
                <div> ยืนยันการชำระเงิน </div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="ชื่อผู้จอง :" hasFeedback >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(<Input />)}
                        </Form.Item>
                
                <Form.Item label="เบอร์ติดต่อ :" hasFeedback>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item> 
                <Form.Item label="จำนวนเงินที่โอน :" hasFeedback>
                        {getFieldDecorator('Price', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item> 
                <Form.Item label="วันที่โอนมัดจำ :" hasFeedback >
                            {getFieldDecorator('datePayment', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(<Input />)}
                </Form.Item>
                <Form.Item label="เวลาที่โอนมัดจำ :" hasFeedback >
                            {getFieldDecorator('timePayment', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(<Input />)}
                </Form.Item>

                <Form.Item label="อัพโหลดหลักฐานการชำระเงิน :" hasFeedback></Form.Item> 
                <Upload
                        name="avatar"
                        // type="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                      >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                </Form.Item>
                </Form>
              
               
            </div>    
            )
        }
    }
export default Form.create()(Confirm);