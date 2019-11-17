import React ,{Component} from 'react';
import "antd/dist/antd.css";
import {  Form,Result, Button, Icon, Typography } from "antd";


const { Paragraph } = Typography;

class FinishPayment extends React.Component{ 
    render(){
        return (
            
                <Result
                status="success"
                title="การจองเสร็จสิ้น"
                subTitle="ระบบจะทำการเก็บข้อมูลการจองที่พักของท่าน ขอบคุณที่เลือกใช้บริการรีสอร์ทของเรา "
                extra={[
                <Paragraph>
                    <Icon type="info-circle"/> ท่านสามารถเช็คอินในวันที่ได้ทำการจองไว้ตั้งแต่เวลา 12:00 น. เป็นต้นไป
                </Paragraph>,
                <Paragraph>
                    <Icon type="info-circle"/> ในกรณีที่ท่านไม่มาเช็คอิน การจองของท่านจะถูกยกเลิก
                    และท่านไม่สามารถขอรับเงินคืนได้
                </Paragraph>,
                <Button type="primary" key="backhome">
                    กลับหน้าหลัก
                </Button>,
                <Button key="addmore">จองที่พักเพิ่ม</Button>
                ]}
            />
            
        );
    }
}
export default FinishPayment;