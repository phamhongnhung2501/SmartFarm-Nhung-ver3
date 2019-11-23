import React from "react";

import {
    CardBody, Card,
    Row,
    Col,
    Container,
    Button,
    ModalHeader,
    ModalFooter,
    Modal,
    ModalBody,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, 
} from "reactstrap";
import {
    Tabs, Tab
  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGlobeAmericas,
    faKey,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { XSquare } from "react-feather";
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TableProject from "./StationsTable";
import Notification from "../../components/Notification";
import Maps from "./Maps";
import utils from "../../utils/utils";
const api = require("./api/api");
const ValidInput = require("../../utils/ValidInput");


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
        this.props.handleDate(day)
      }
    
      render() {
        const { selectedDay } = this.state;

        return (
          <div>
            {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
            {!selectedDay && <p>Ngày bắt đầu gieo trồng</p>}
            <DayPickerInput onDayChange={this.handleDayChange} />
          </div>
        );
      }
}
class Project extends React.Component {
    constructor(props) {
        super(props);
        const { seed } = this.props;
        const {sub_id} = this.props;
        this.state = {
            data: [],
            
            showModal: {
                create_project: false
            },
            temp: {
                name: "",
                sub_id: "G00",
                manager: null,
                seed: "",
                started_plant: "",
                stage_1: {
                    stage_1_days: "",
                    min_temp: "",
                    max_temp: "",
                    min_light: "",
                    max_light: "",
                    min_PH: "",
                    max_PH: "",
                    min_soil_moisture: "",
                    max_soil_moisture: "",
                    min_hum: "",
                    max_hum: "",
                },
                stage_2: {
                    stage_2_days: null,
                    min_temp:  null,
                    max_temp: null,
                    min_light:  null,
                    max_light:  null,
                    min_PH:  null,
                    max_PH:  null,
                    min_soil_moisture:  null,
                    max_soil_moisture:  null,
                    min_hum:  null,
                    max_hum:  null,
                },
                stage_3: {
                    stage_3_days: "",
                    min_temp: "",
                    max_temp: "",
                    min_light: "",
                    max_light: "",
                    min_PH: "",
                    max_PH: "",
                    min_soil_moisture: "",
                    max_soil_moisture: "",
                    min_hum: "",
                    max_hum: "",
                },
                stage_4: {
                    stage_4_days: "",
                    min_temp: "",
                    max_temp: "",
                    min_light: "",
                    max_light: "",
                    min_PH: "",
                    max_PH: "",
                    min_soil_moisture: "",
                    max_soil_moisture: "",
                    min_hum: "",
                    max_hum: "",
                }
            },
            listGateWay: [],
            listSeed: [],
            submitted: false,
            isLoaderAPI: false,
            keyWord: null,
            type: "list"
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateProject = this.handleCreateProject.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeSearchChars = this.changeSearchChars.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    handleDate(date){
        this.setState({
            temp: {
                name: "",
                sub_id: "G00",
                manager: null,
                seed: "",
                started_plant: date,
                stage_1: {
                    stage_1_days: "",
                    min_temp: "",
                    max_temp: "",
                    min_light: "",
                    max_light: "",
                    min_PH: "",
                    max_PH: "",
                    min_soil_moisture: "",
                    max_soil_moisture: "",
                    min_hum: "",
                    max_hum: "",
                },
                stage_2: {
                    stage_2_days: null,
                    min_temp:  null,
                    max_temp: null,
                    min_light:  null,
                    max_light:  null,
                    min_PH:  null,
                    max_PH:  null,
                    min_soil_moisture:  null,
                    max_soil_moisture:  null,
                    min_hum:  null,
                    max_hum:  null,
                },
                stage_3: {
                    stage_3_days: "",
                    min_temp: "",
                    max_temp: "",
                    min_light: "",
                    max_light: "",
                    min_PH: "",
                    max_PH: "",
                    min_soil_moisture: "",
                    max_soil_moisture: "",
                    min_hum: "",
                    max_hum: "",
                },
                stage_4: {
                    stage_4_days: "",
                    min_temp: "",
                    max_temp: "",
                    min_light: "",
                    max_light: "",
                    min_PH: "",
                    max_PH: "",
                    min_soil_moisture: "",
                    max_soil_moisture: "",
                    min_hum: "",
                    max_hum: "",
                }
            }
        })
    }
    componentDidMount() {
        const that = this;
        api.getInfoProjectAll((err, result) => {
            if (err) {
                Notification(
                    "error",
                    "Error",
                    err.data === undefined ? err : err.data._error_message
                );
            } else {

                that.setState({ data: result, isLoaderAPI: true });
            }
        });
        api.getListSeed((err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message);
            } else {
                console.log(result);

                that.setState({ listSeed: result });
            }
        });
        api.getListGateWay((err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message);
            } else {
                console.log(result);

                that.setState({ listGateWay: result });
            }
        });

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state === nextState) {
            return false;
        }
        return true;
    }
    handleChange(event) {
        // console.log(this.state.temp.stage_1.min_hum);
        
        let temp = Object.assign({}, this.state.temp, this.state.temp.stage_1, this.state.temp.stage_2, this.state.temp.stage_3, this.state.temp.stage_4);
        console.log(temp);
        let obj = event.target.name.split(".")[0]
        let key = event.target.name.split(".")[1]
        console.log(obj)
        console.log(key)
        
        if(obj === 'stage_1')
            temp.stage_1[key] = event.target.value;
        else if(obj === 'stage_2')
            temp.stage_2[key] = event.target.value;
        else if(obj === 'stage_3')
            temp.stage_3[key] = event.target.value;
        else if(obj === 'stage_4')
            temp.stage_4[key] = event.target.value;
        else
            temp[event.target.name] = event.target.value;
        this.setState({ temp: temp });
    }

    handleShow() {
        let state = Object.assign({}, this.state);
        state.showModal.create_project = true;
        this.setState(state);
    }

    handleClose() {
        let state = Object.assign({}, this.state);
        state.submitted = false;
        state.temp.name = "";
        state.is_private = false;
        state.showModal.create_project = false;
        this.setState(state);
    }

    handleSearch(event) {
        this.changeSearchChars(event.target.value);
    }

    changeSearchChars(chars) {
        let state = Object.assign({}, this.state);
        state.keyWord = chars;
        this.setState(state);
    }

    handleChangeType(event) {
        this.setState({
            type: event.target.value
        });
    }

    handleCreateProject() {
        const that = this;
        this.setState({ submitted: true });
        console.log(this.state.temp);

        // stop here if form is invalid
        const { name } = this.state.temp;
        if (!name) {
            return;
        }
        api.createProject(this.state.temp, (err, result) => {
            if (err) {
                Notification(
                    "error",
                    "Error",
                    err.data === undefined ? err : err.data._error_message
                );
            } else {
                this.state.data.push(result);
                Notification("success");
                this.handleClose();
            }
        });
    }

    render() {
        const { seed, sub_id} = this.state;
        // console.log(this.state.listGateWay);
        console.log(this.state.temp.started_plant);
        
        return (
            <React.Fragment>
                <Modal 
                    size="lg"
                    isOpen={this.state.showModal.create_project}
                    className="modal-project"
                >
                    <ModalHeader >
                        Tạo vườn ươm mới
                        {/* <XSquare size='25' className="bg-danger float-right modal-project__header  !important" /> */}
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Row>
                                <Col xs="6">
                                   
                                    <DateTimePicker handleDate={this.handleDate} />
                                </Col>
                                <Col xs="6" >
                                <Label>Gateway</Label>
                                    <div className="station--overflow">
                                        <Input type="select" width="10px" height="3px" onChange={this.handleChange} name="sub_id" className="station__input-gateway">

                                            {
                                                this.state.listGateWay.map((sub_id, index) => {                                       
                                                    return (
                                                        <option 
                                                            className="d-inline station__gateway " 
                                                            value={sub_id} >{sub_id}
                                                        </option>
                                                                                                    
                                                    )
                                                })
                                                
                                            }
                                        </Input>
                                    </div>
                                </Col>
                            </Row>
                            
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="6">
                                    <Label for="name_of_project">Tên vườn ươm</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Tên trạm"
                                        value={this.state.temp.name}
                                        onChange={this.handleChange}
                                        invalid={
                                            this.state.submitted && !this.state.temp.name ? true : false
                                        }
                                    />
                                    <FormFeedback invalid>
                                        Tên vườn ươm là một trường bắt buộc!
                                    </FormFeedback>
                                   
                                </Col>
                                <Col xs="6">
                                    <Label>Giống cây trồng</Label>
                                    <Input
                                        type="text"
                                        name="seed"
                                        placeholder="Giống cây trồng"
                                        value={this.state.temp.seed}
                                        onChange={this.handleChange}
                                        invalid={
                                            this.state.submitted && !this.state.temp.seed ? true : false
                                        }
                                    />
                                    <FormFeedback invalid>
                                        Tên giống cây trồng là một trường bắt buộc!
                                    </FormFeedback>
                                </Col>
                            </Row>
                        </FormGroup>
                        {/* <FormGroup>
                            <Label>Giống cây trồng</Label>

                            <Input type="select" width="10px" onChange={this.handleChange} name="seed">
                                {
                                    this.state.listSeed.map((seed, index) => {
                                        
                                        return (
                                            <option className="d-inline" value={seed} >{seed}</option>
                                                                                        
                                        )
                                    })
                                    
                                }
                                
                            </Input>
                        </FormGroup> */}
                       
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
                                                type="number"
                                                name="stage_1.stage_1_days"
                                                placeholder="Nhập tổng số ngày trồng"
                                                value={this.state.temp.stage_1.stage_1_days}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.stage_1_days ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Tổng số ngày là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_1.min_temp"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_1.min_temp}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.min_temp ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_1.max_temp"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_1.max_temp}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.max_temp ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_1.min_hum"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_1.min_hum}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.min_hum ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_1.max_hum"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_1.max_hum}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.max_hum ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_1.min_soil_moisture"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_1.min_soil_moisture}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.min_soil_moisture ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                        <Input
                                                type="number"
                                                name="stage_1.max_soil_moisture"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_1.max_soil_moisture}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.max_soil_moisture ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_1.min_light"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_1.min_light}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.min_light ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_1.max_light"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_1.max_light}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.max_light ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_1.min_PH"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_1.min_PH}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.min_PH ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_1.max_PH"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_1.max_PH}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_1.max_PH ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
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
                                                type="number"
                                                name="stage_2.stage_2_days"
                                                placeholder="Nhập tổng số ngày trồng"
                                                value={this.state.temp.stage_2.stage_2_days}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2_days ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Tổng số ngày là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_2.min_temp"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_2.min_temp}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.min_temp ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_2.max_temp"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_2.max_temp}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.max_temp ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_2.min_hum"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_2.min_hum}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.min_hum ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_2.max_hum"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_2.max_hum}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.max_hum ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_2.min_soil_moisture"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_2.min_soil_moisture}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.min_soil_moisture ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                        <Input
                                                type="number"
                                                name="stage_2.max_soil_moisture"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_2.max_soil_moisture}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.max_soil_moisture ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_2.min_light"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_2.min_light}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.min_light ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_2.max_light"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_2.max_light}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.max_light ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_2.min_PH"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_2.min_PH}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.min_PH ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_2.max_PH"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_2.max_PH}
                                                onChange={this.handleChange}
                                                // invalid={
                                                //     this.state.submitted && !this.state.temp.stage_2.max_PH ? true : false
                                                // }
                                            />
                                            {/* <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback> */}
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
                                                type="number"
                                                name="stage_3.stage_3_days"
                                                placeholder="Nhập tổng số ngày trồng"
                                                value={this.state.temp.stage_3.stage_3_days}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.stage_3_days ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Tổng số ngày là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_3.min_temp"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_3.min_temp}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.min_temp ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_3.max_temp"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_3.max_temp}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.max_temp ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_3.min_hum"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_3.min_hum}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.min_hum ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_3.max_hum"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_3.max_hum}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.max_hum ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_3.min_soil_moisture"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_3.min_soil_moisture}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.min_soil_moisture ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                        <Input
                                                type="number"
                                                name="stage_3.max_soil_moisture"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_3.max_soil_moisture}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.max_soil_moisture ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_3.min_light"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_3.min_light}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.min_light ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_3.max_light"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_3.max_light}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.max_light ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_3.min_PH"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_3.min_PH}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.min_PH ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_3.max_PH"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_3.max_PH}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_3.max_PH ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
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
                                                type="number"
                                                name="stage_4.stage_4_days"
                                                placeholder="Nhập tổng số ngày trồng"
                                                value={this.state.temp.stage_4.stage_4_days}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.stage_4_days ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Tổng số ngày là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_4.min_temp"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_4.min_temp}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.min_temp ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_4.max_temp"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_4.max_temp}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.max_temp ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_4.min_hum"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_4.min_hum}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.min_hum ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_4.max_hum"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_4.max_hum}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.max_hum ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_4.min_soil_moisture"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_4.min_soil_moisture}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.min_soil_moisture ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                        <Input
                                                type="number"
                                                name="stage_4.max_soil_moisture"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_4.max_soil_moisture}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.max_soil_moisture ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_4.min_light"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_4.min_light}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.min_light ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_4.max_light"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_4.max_light}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.max_light ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="3" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number"
                                                name="stage_4.min_PH"
                                                placeholder="nhỏ nhất"
                                                value={this.state.temp.stage_4.min_PH}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.min_PH ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number"
                                                name="stage_4.max_PH"
                                                placeholder="lớn nhất"
                                                value={this.state.temp.stage_4.max_PH}
                                                onChange={this.handleChange}
                                                invalid={
                                                    this.state.submitted && !this.state.temp.stage_4.max_PH ? true : false
                                                }
                                            />
                                            <FormFeedback invalid>
                                                Đây là một trường bắt buộc!
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                    </ModalBody>
                    <ModalFooter className="mt-3">
                        <Button className="station__button-back" onClick={this.handleClose.bind(this)}>
                            Quay lại
            </Button>
                        <Button
                            className="station__button-create"
                            onClick={this.handleCreateProject.bind(this)}
                        >
                            Tạo vườn ươm mới
            </Button>
                    </ModalFooter>
                </Modal>
                 
                <img src="http://www.konyaseker.com.tr/Upload/Contents/3900560_banner17.jpg" width="100%" height={170}>
                   
                </img> 
                <h1 className="text-center text-primary station__title m-5">DANH SÁCH CÁC VƯỜN ƯƠM</h1>
                <Container className="mt-2">
                    <Row>
                        <Col xs="3">
                            <Input
                                className="width-percent-40 ml-3 station--input-search-size"
                                id="inputSearch"
                                placeholder="Tìm kiếm vườn ươm"
                                onKeyUp={this.handleSearch.bind(this)}
                            />
                        </Col>
                        <Col xs="1" ></Col>
                        <Col xs="2" className="pr-4">
                            <Input
                                type="select"
                                onChange={this.handleChangeType}
                                value={this.state.type}
                            >
                                <option value="list">Danh sách</option>
                                <option value="map">Bản đồ</option>
                            </Input>
                        </Col>
                        <Col xs="3"></Col>
                        <Col xs="3" className="pr-4">
                            <Button
                                className="float-right mr-3 station--button-new station__create-garden "
                                onClick={this.handleShow.bind(this)}
                            > 
                                <FontAwesomeIcon icon={faPlus} width={3} height={2} /> Tạo vườn ươm mới
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.type === "list" ? (
                            <Col>
                                {this.state.isLoaderAPI ? (
                                    this.state.data.map(
                                        (
                                            {
                                                manager,
                                                name,
                                                seed,
                                                days,
                                                sub_id,
                                                address,
                                                started_plant
                                            },
                                            index
                                        ) => {
                                            if (ValidInput.isEmpty(this.state.keyWord)) {
                                                return (
                                                    <TableProject
                                                        key={index}
                                                        index={index + 1}
                                                        manager={manager}
                                                        name={name}
                                                        sub_id={sub_id}
                                                        seed={seed}
                                                        days={days}
                                                        started_plant={started_plant}
                                                        address={address}
                                                    />
                                                );
                                            } else {
                                                if (name.indexOf(this.state.keyWord) !== -1) {
                                                    return (
                                                        <TableProject
                                                            key={index}
                                                            index={index + 1}
                                                            manager={manager}
                                                            name={name}
                                                            sub_id={sub_id}
                                                            seed={seed}
                                                            days={days}
                                                            address={address}
                                                            started_plant={started_plant}
                                                        />
                                                    );
                                                }
                                            }
                                        }
                                    )
                                ) : (
                                        <div className=" mt-6 station-loading bg-danger ">
                                            <h1 className="text-center pt-3 text-white !important station__loading--text-size" >
                                            Vui lòng đăng nhập trước khi vào trang Web
                                            </h1>
                                        </div>
                                        
                                    )}
                            </Col>
                        ) : (
                                <Col>
                                    <Maps data={this.state.data} />
                                </Col>
                            )}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Project;
