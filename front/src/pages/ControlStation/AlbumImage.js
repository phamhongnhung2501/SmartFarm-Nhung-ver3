import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col, Table } from "reactstrap";
import "./AlbumImage.css";
import { CustomImg } from "../../components/CustomTag";

class AlbumImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            t: 0,
            p: 0,
            f: 0,
        };
    }

    render() {
        const { send } = this.props;
        return (
            <div className="div-album">
                <Row>
                    <Col xs="4">
                        <img
                            className="float-center control__item"
                            src={
                                this.state.t
                                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsdRoiavKQDNnuVep9DY3wtdtCbkgSi4IGYTVJ3ChdEnrjvdpZFg&s"
                                    : "http://bestanimations.com/HomeOffice/Lights/Bulbs/animated-light-bulb-gif-30.gif"
                            }
                            alt="Card image cap"
                        />                   
                    </Col>
                    <Col xs="4">
                        <img
                            className="float-center  control__item"
                            src={
                                this.state.p
                                    ? "https://www.pngtube.com/myfile/detail/200-2007798_cooling-pump-icon-water-cooling-system-icon.png"
                                    : "https://images.techxlab.org/ast/37-waterpumpanimation.gif"
                            }
                            alt="Card image cap"
                        />
                    </Col>
                    <Col xs="4">
                        <img
                            className="float-center control__item"
                            src={
                                this.state.f
                                    ? "https://sc01.alicdn.com/kf/HTB1uuhzKpXXXXbHaXXXq6xXFXXXl/12-16-color-table-fan-desk-top.jpg_350x350.jpg"
                                    : "https://thumbs.gfycat.com/DiligentNearDuckling-small.gif"
                            }
                            alt="Card image cap"
                        />
                     
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs="4" className="control__button-size">
                        <Button className="control__button bg-success  !important"
                            onClick={() => {
                                this.setState({ t: this.state.t == 1 ? 1 : this.state.t + 1 });
                                send("00");
                            }}
                        >
                            Tắt đèn
                        </Button>
                        <Button className="control__button"
                            onClick={() => {
                                this.setState({ t: this.state.t == 0 ? 0 : this.state.t - 1 });
                                send("01");
                            }}
                        >
                            Bật đèn
                        </Button>
                    </Col>
                    <Col xs="4" className="control__button-size">
                        <Button className="control__button bg-success !important"
                            onClick={() => {
                                this.setState({ p: this.state.p == 1 ? 1 : this.state.p + 1 });
                                send("10");
                            }}
                        >
                            Tắt máy
                        </Button>
                        <Button className=" control__button"
                            onClick={() => {
                                this.setState({ p: this.state.p == 0 ? 0 : this.state.p - 1 });
                                send("11");
                            }}
                        >
                            Bật máy
                        </Button>
                    </Col>
                    <Col xs="4" className="control__button-size">
                        <Button className="control__button bg-success  !important"
                            onClick={() => {
                                this.setState({ f: this.state.f == 1 ? 1 : this.state.f + 1 });
                                send("20");
                            }}
                        >
                            Tắt quạt
                        </Button>
                        <Button className=" control__button"
                            onClick={() => {
                                this.setState({ f: this.state.f == 0 ? 0 : this.state.f - 1 });
                                send("21");
                            }}
                        >
            
                            Bật quạt
                        </Button>
                    </Col>
                </Row>
               
            </div>
        );
    }
}

export default AlbumImage;
