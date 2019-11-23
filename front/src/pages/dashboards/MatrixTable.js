
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import {Col, Card, CardBody} from "reactstrap";

import data from '../components/Dulieubang.json';
import { link } from 'fs';
import DomCssTable from './DomCssTable.js';

class MatrixTable extends Component {
    render() {
       return(
         <div>
           <h1>Soil Moisture</h1>
           <Row className="row-2">
               {
                 data.map((value, key)=>{
                     function ConvertCSS(){

                        console.log(value.sm)
         
                        if((value.sm) == 20)
                        {
                            return "bgmedium";
                        }
                          else if ((value.sm) <20)
                          {
                              return "bglow";
                          }
                          else {
                              return "bghigh";
                          }
                     }
                return(
                    <Col  className="col-2dot4" >
                    <Card>
                    <CardBody className ={ConvertCSS()}>
                        
                                       
                    <div className=" font-weight-bolder h4 text-center ">{value.local}</div>
                    <div className=" font-weight-bolder h4 text-center ">{value.sm}</div>
                                        
                    </CardBody>
                    </Card>
                    </Col>
                        )
                    })
                  
               }

           </Row>
           </div>
       );
       
    }
}

export default MatrixTable;