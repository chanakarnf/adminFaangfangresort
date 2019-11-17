import React from 'react';
import logo from './logo.svg';
import './App.css';


import TableStatus from './admin/TableStatus';
import TableHistory from './admin/TableHistory';
import TableBooking from './admin/TableBooking';
import TableCheckIn from './admin/TableCheckIn';
import TablePayment from './admin/TablePayment';
import FinishBooking from './FinishBooking';
import Confirm from './Confirm';

function App() {
  return (
    <div className="App">
       {/* <div>confirm</div> */}
      <Confirm/> 
      <div>status</div>
       <TableStatus/>
      <div>history</div>
      
      <TableHistory/> 
      <div>payment</div>
      <TablePayment/> 
      <div>Booking</div>
      <TableBooking/>
      
      {/* <TableBooking/> */}
      {/* <TablePayment/>  */}
      <TableCheckIn/>
      {/* <FinishBooking/>  */}
      {/* <ConfirmBooking/> */}
      {/* <HomePage/> */}
      {/* {<BookingPage/> } */}
      {/* <Signin/> */}
      {/* <Booking/> */}
      {/* <ImageUpload/>*/}
    
    </div>
  );
}

export default App;
