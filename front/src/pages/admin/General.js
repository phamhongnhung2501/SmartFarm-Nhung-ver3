import React from "react";
import $ from "jquery";
import { 
    FormFeedback, 
    Badge, Button,
    Card, CardBody, CardHeader, CardTitle, 
    Col, 
    FormGroup,
    Input, Label, Row, 
    Modal, ModalHeader, ModalBody, ModalFooter,
    DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faKey, faTags } from "@fortawesome/free-solid-svg-icons";
import "./General.css";
import {
    Tabs, Tab
  } from "react-bootstrap";
import Notification from "../../components/Notification";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Moment from 'react-moment';
import 'moment-timezone';
const api = require("./api/api");
const utils = require("../../utils/utils");

class DateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
          selectedDay: undefined,
        };
      }
    
      handleDayChange(day) {
        this.setState({ selectedDay: day });
        const data = {
            created_date: day,
            manager: {
            },
            status: {

            },
            stage_1: {

            },
            stage_2: {

            },
            stage_3: {

            },
            stage_4: {

            }
        }
        this.props.handleChangeDate(data)
      }
    
      render() {
        const { selectedDay } = this.state;
        const { data } = this.props;
        console.log(data.created_date);
        
        return (
          <div>
            {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
            {!selectedDay && <p>Thay đổi ngày gieo trồng</p>}
            <DayPickerInput onDayChange={this.handleDayChange} />
          </div>
        );
      }
}
class General extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            full_name: "",

            data: {
                created_date: "",
                manager: {
                },
                status: {

                },
                stage_1: {

                },
                stage_2: {

                },
                stage_3: {

                },
                stage_4: {

                }
            },
            isLoaded: false,
            modal: false,
            modalInputPass: false,
            modalCloseAll: false,
            changeName: null,
            changeDescription: null,
            changeIsPrivate: null,
            changeLogo: null,
            tempLogo: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleInputPass = this.toggleInputPass.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
    }

    handleChangeDate(data){
        this.setState({
            data: data
        })
    }
    handleChange(event) {
        let data  = Object.assign({}, this.state.data, this.state.data.stage_1, this.state.data.stage_2, this.state.data.stage_3, this.state.data.stage_4);
        let obj = event.target.name.split(".")[0]
        let key = event.target.name.split(".")[1]
        console.log(obj)
        console.log(key)
        console.log(data);
        
        if(obj === 'stage_1')
            data.stage_1[key] = event.target.value;
        else if(obj === 'stage_2')
            data.stage_2[key] = event.target.value;
        else if(obj === 'stage_3')
            data.stage_3[key] = event.target.value;
        else if(obj === 'stage_4')
            data.stage_4[key] = event.target.value;
        else
            data[event.target.name] = event.target.value;
        this.setState({ data: data });
    }

    handleChangeType(type) {
        // let data = Object.assign({}, this.state.data);
        // data.is_private = type === "private";
        // this.setState({data: data})
        this.setState({
            changeIsPrivate: type === "private"
        });
    }


    handleSaveChange() {
        api.modifyStation(this.state.data.sub_id, this.state.data, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                console.log(result);
                localStorage.setItem('project', JSON.stringify(result));
                Notification("success", "Edit Station", "Edit station is successfully");
            }
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleInputPass() {
        this.setState({
            modalInputPass: !this.state.modalInputPass,
            modalCloseAll: false
        });
    }
    handleDelProject() {
        api.deleteStation(this.state.data.sub_id, (err, result) => {
            if (err) {
                console.log(err)
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                window.location.replace('/stations')
            }
        })
    }
    componentDidMount() {
        const that = this;
        api.getInfoProject(utils.getStationInfo().sub_id, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            } else {
                console.log(result);
                that.setState({
                    data: result
                })
                localStorage.setItem('project', JSON.stringify(result));
            }
        });
    }

    render() {
        let {manager} = this.state.data;
        return (
            // !this.state.isLoaded ? null :
            <Card className="admin__general__card">
                <CardBody>
                    <Row>
                        <Col md="8">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="inputStationName">Tên trang trại</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Station name"
                                            autoComplete="off"
                                            defaultValue={this.state.data.name}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_manager">Quản lý</Label>
                                        <Input
                                            type="text" name="manager"
                                            placeholder="Name of manager"
                                            defaultValue={this.state.data.manager.full_name}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_address">Địa chỉ</Label>
                                        <Input
                                            type="text" name="address"
                                            placeholder="Address station"
                                            defaultValue={this.state.data.address}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_address">Số điện thoại</Label>
                                        <Input
                                            type="text" name="phone_number"
                                            placeholder="Phone number"
                                            defaultValue={this.state.data.manager.phone_number}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="name_of_project">Cây Trồng</Label>
                                        <Input
                                            type="text" name="seed"
                                            placeholder="Tên cây trồng"
                                            defaultValue={this.state.data.seed}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <DateTimePicker 
                                            data = {this.state.data}
                                            handleChangeDate = {this.handleChangeDate}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <FormGroup>
                            
                        </FormGroup>
                       
                            </Row>
                        </Col>
                        <Col md="4" className="mt-3">
                            <Row>
                            <img
                                className="admin_image mb-4"
                                src= "https://making-the-web.com/sites/default/files/clipart/170069/agriculture-png-transparent-images-170069-7598577.png"
                            />
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Button type="button" color="primary" onClick={this.handleSaveChange.bind(this)}>Lưu thay đổi</Button>
                                </Col>
                                <Col md="6" className="pr-4">
                                    <Button type="button" color="danger" onClick={this.toggle}>Xóa dự án</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader>Confirm</ModalHeader>
                                        <ModalBody>Bạn có chắc chắn xóa trang trại này không?</ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.toggle}>Quay lại</Button>
                                            <Button color="success" onClick={this.handleDelProject.bind(this)}>Đồng ý</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Col>
                            </Row>
                           
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="9">
                        <Tabs defaultActiveKey="g1"  >
                            <Tab eventKey="g1" title="Giai đoạn ươm hạt " >
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="3" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                type="number" name="stage_1.stage_days"
                                                placeholder="Tổng số ngày"
                                                defaultValue={this.state.data.stage_1.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="stage_1.min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="stage_1.max_temp"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_1.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_1.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_1.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_1.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_1.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                            <Tab eventKey="g2" title="Giai đoạn ra hoa">
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="3" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                type="number" name="stage_days"                                            
                                                placeholder="Nhập tổng số ngày trồng"
                                                defaultValue={this.state.data.stage_2.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_2.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_temp"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_2.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_2.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_2.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_2.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_2.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_2.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_2.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_2.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_2.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                            <Tab eventKey="g3" title="Giai đoạn phát triển">
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="3" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                type="number" name="stage_days"                                            
                                                placeholder="Nhập tổng số ngày trồng"
                                                defaultValue={this.state.data.stage_3.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_3.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_temp"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_3.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_3.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_3.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_3.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_3.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_3.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_3.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_3.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_3.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                            <Tab eventKey="g4" title="Giai đoạn thu hoạch">
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="3" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                type="number" name="stage_days"                                            
                                                placeholder="Nhập tổng số ngày trồng"
                                                defaultValue={this.state.data.stage_4.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_4.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_temp"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_4.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_4.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_4.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_4.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_4.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_4.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_4.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_4.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_4.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col md="8"></Col>
                        <Col md="2">
                            <Button type="button" color="primary" onClick={this.handleSaveChange.bind(this)}>Lưu thay đổi</Button>
                        </Col>
                        <Col md="2" className="pr-4">
                            <Button type="button" color="danger" onClick={this.toggle}>Xóa trang trại</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader>Confirm</ModalHeader>
                                <ModalBody>Bạn có chắc chắn xóa trang trại này không?</ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggle}>Xóa</Button>
                                    <Button color="success" onClick={this.handleDelProject.bind(this)}>Đống ý</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row> */}
                </CardBody>
            </Card>
        )
    }
}

export default General;