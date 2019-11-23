import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import "./bootstrap.min.css";
import "./sensor.css";
import "./switch.css";
import WetherStation from "./WetherStation";
import AlbumImage from "./AlbumImage";
import ModalCamera from "./ModalCamera";
const config_socket = require("../../config/config").config_socket;

let socket;
class Controlstation extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            endpoint: config_socket.ip,
            data:{
                id: JSON.parse(localStorage.getItem("project")).sub_id,
                status: "O"
            }
        };
        socket = socketIOClient(this.state.endpoint);
    }

    send = (status) => {
        this.state.data.status = status;
        socket.emit('controller', this.state.data)
    }

    render() {
        let location = JSON.parse(localStorage.getItem("project")).sub_id;
        console.log(localStorage.getItem("project"));

        return (
            <Container>
                <Row>
                  
                    <Col >
                        <Card className="flex-fill card--border  ">
                            <CardHeader className="border border-primary ">
                                <h2 className="card-title mb-0 font-weight-bolder text__head--item">Thời tiết</h2>
                            </CardHeader>
                            <CardBody className="border border-primary bg-control pd-1">
                                <WetherStation />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="flex-fill card--border  ">
                        <CardHeader className="border border-primary ">
                                <h2 className="card-title mb-0 font-weight-bolder text__head--item">Điều khiển thiết bị</h2>
                            </CardHeader>
                            <CardBody className="border border-primary bg-control  ">
                                <AlbumImage className="mb-5 mt-5" send={this.send} />
                            
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* <ModalCamera /> */}
            </Container>
        );
    }
}

export default Controlstation;
