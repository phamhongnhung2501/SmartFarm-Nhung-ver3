import React from "react";


import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    UncontrolledAlert
  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
const colors = [ "success", "danger", "warning", "info"];


class Notice extends React.Component {
    render() {
        return (
            <Card className="flex-fill w-100">
                <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                    Notification
                </CardTitle>
                </CardHeader>
                <CardBody className="p-2">
                <CardBody>
                    {colors.map((color, key) => (
                        <UncontrolledAlert
                        color={color}
                        className="alert-outline-coloured"
                        key={key}
                        >
                        <div className="alert-icon">
                            <FontAwesomeIcon icon={faBell} fixedWidth />
                        </div>
                        <div className="alert-message">
                            <strong>Hello there!</strong> A simple {color} alert—check it out!
                        </div>
                        </UncontrolledAlert>
                    ))}
                    </CardBody>
                </CardBody>
            </Card>
           
        );
    }
}


export default Notice;
