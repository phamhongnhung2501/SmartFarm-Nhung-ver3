import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

const data = [
  {"time":1568716646,"id":"abcde","UA":23,"UB":4,"UC":7,"IA":0,"IB":0,"IC":0,"PA":0,"PB":0,"PC":0,"QA":0,"QB":0,"QC":0,"CosA":0,"CosB":0,"CosC":0,"Pgiao":366,"Freq":5000,"Oil":3132,"Humi":5600,"Temp":3590,"Fault":"0000000000"}
]
const Orders = () => (
  <Row>
    <Col>
      <Card className="flex-fill">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">History</CardTitle>
        </CardHeader>
        <Table size="sm" striped className="my-0 text-center">
          <thead>
            <tr>
              <th>Time</th>
              <th>ID</th>
              <th className='text-primary'>UA</th>
              <th className='text-primary'>UB</th>
              <th className='text-primary'>UC</th>  
              <th>IA</th>
              <th>IB</th>
              <th>IC</th> 
              <th>PA</th>
              <th>PB</th>
              <th>PC</th>  
              <th>QA</th>
              <th>QB</th>
              <th>QC</th>
              <th>cosA</th>
              <th>cosB</th>
              <th>cosC</th>  
              <th>Pgiao</th>
              <th>Hum</th>
              <th>Temp</th>
              <th>Freq</th>   
              <th>Oil</th>
              <th>Fault</th> 
              {/* <th className="d-none d-xl-table-cell">ETH</th>
              <th className="d-none d-xl-table-cell">BTC</th>
              <th>Sum(BTC)</th> */}
            </tr>
          </thead>
          <tbody >
              {
                data.map(({time, id, UA, UB, UC, IA, IB, IC, PA, PB, PC, QA, QB, QC, CosA, CosB, CosC, Pgiao, Humi, Temp, Freq, Oil, Fault}, index) => {
                  return (
                      <tr key = {index} >
                          <td>{time}</td>
                          <td>{id}</td>
                          <td>{UA}</td>
                          <td>{UB}</td>
                          <td>{UC}</td>
                          <td>{IA}</td>
                          <td>{IB}</td>
                          <td>{IC}</td>
                          <td>{PA}</td>
                          <td>{PB}</td>
                          <td>{PC}</td>
                          <td>{QA}</td>
                          <td>{QB}</td>
                          <td>{QC}</td>
                          <td>{CosA}</td>
                          <td>{CosB}</td>
                          <td>{CosC}</td>
                          <td>{Pgiao}</td>
                          <td>{Humi}</td>
                          <td>{Temp}</td>
                          <td>{Freq}</td>
                          <td>{Oil}</td>
                          <td>{Fault}</td>                           
                      </tr>
                  );
                })
              }
          </tbody>
        </Table>
      </Card>
    </Col>
  </Row>
);

export default Orders;
