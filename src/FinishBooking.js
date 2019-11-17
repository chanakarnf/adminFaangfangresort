import React ,{Component} from 'react';
import "antd/dist/antd.css";
import { Result, Icon, Button, Alert, Comment, List } from "antd";

class FinishBooking extends React.Component{ 
    render(){
    const data = [
        {
        avatar:
            "https://kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png",
        content: (
            <p>
            ธนาคารกสิกรไทย ชื่อบัญชี : วิไรพร ภูษณะภัทระ เลขที่บัญชี : 280-2-888-999 
            </p>
        )
        },
        {
        avatar:
            "http://op.mahidol.ac.th/orpr/newhr/wp-content/uploads/2017/05/scb-logo.jpg",
        content: (
            <p>
            ธนาคารไทยพาณิชย์ ชื่อบัญชี : บิวตี้คูล เลขที่บัญชี : 628-2-30511-7 สาขา
            : พาราไดซ์ พาร์ค
            </p>
        )
        },
        {
        avatar:
            "https://image.makewebeasy.net/makeweb/0/vE1Q2luWq/Bank_Logo/krungsri__1_.png",
        content: (
            <p>
            {" "}
            ธนาคารกรุงศรีอยุธยา ชื่อบัญชี : บิวตี้คูล เลขที่บัญชี : 628-2-30511-7
            สาขา : พาราไดซ์ พาร์ค
            </p>
        )
        },
    ];
  
        return (
            <Result
            icon={<Icon type="smile" theme="twoTone" />}
            title="ขั้นตอนการชำระเงิน"
            extra={[
              <Alert
                style={{ margin: "16px 0" }}
                message="การจองที่พักจะเสร็จสิ้นหลังจากที่ท่านทำการชำระเงิน โปรดทำการชำระเงินหลังการจองที่พักภายใน 3 วัน"
              />,
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <li>
                    <Comment avatar={item.avatar} content={item.content} />
                  </li>
                )}
              />,
              <Button type="primary" key="backhome">
                ไปที่หน้าแจ้งโอน
              </Button>,
              <Button type="primary" key="backhome">
                กลับหน้าหลัก
              </Button>
            ]}
          />
        );
    }
}
export default FinishBooking;