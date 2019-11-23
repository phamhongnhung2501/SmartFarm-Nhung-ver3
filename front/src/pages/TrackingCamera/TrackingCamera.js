import React, { Component } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import "./TrackingCamera.css";
class TrackingCamera extends Component {
    render() {
        return (
          <Col>
            <Row>
              <h4 className="text-center camera__notify text-primary !important">Nhấn vào webcam để theo dõi cây trồng! </h4>
            </Row>
            <Row>
                  <a href="http://lophocvui.ddns.net/doc/page/login.asp?_1574329102388" target="_blank">
                      <img
                          className="camera__camera"
                          src="https://www.a4tech.com/alanUpload/colorImg/img/201803/0203101147364114.jpg"
                          alt="Card image cap"

                      />
                      </a>

            </Row>
          </Col>
          
        );
    }
}

export default TrackingCamera;
