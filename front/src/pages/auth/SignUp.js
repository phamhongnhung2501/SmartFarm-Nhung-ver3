import React from "react";
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import { LoadingSprinner } from "../../components/CustomTag";
import "./SignUp.css"
import {
    Button,
    Card, CardBody,
    Form, FormGroup, FormFeedback,
    Label,
    Input, CustomInput,
    Alert,
    Container,
} from "reactstrap";

const api = require("./api/api");

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.term = React.createRef()
        this.textInput = React.createRef();
        this.state = {
            email: "",
            full_name: "",
            password: "",
            phone_number: "",
            terms: false,
            submitted: false,
            loading: false,
            phone_number: "",
            error: "",
            success: "",
            confirm_password: "",
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.statusTerms = this.statusTerms.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = Object.assign(this.state);

        this.setState({ submitted: true });
        const { email, password, confirm_password, phone_number } = this.state;

        // stop here if form is invalid
        if (!(email && password && phone_number && confirm_password && password === confirm_password && !this.validatePhoneNumber(phone_number) && !this.validatePassword(password))) {
            return;
        }

        this.setState({ loading: true });
        setTimeout(() => {
            api.register(data, (err, response) => {
                console.log(response);

                if (err) {
                    this.setState({ error: err.data === undefined ? err : err.data._error_message, loading: false })
                } else {
                    this.setState({ success: "Your account has been successfully created, Please check your email to activate your account", loading: false });
                    window.location.replace("/auth/verify-account?email=" + this.state.email);
                }
            }
            )
        }, 500);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    statusTerms(event) {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    validateEmail(value) {
        let error;
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = false;
        } else {
            error = true;
        }
        return error;
    }

    validatePassword(value) {
        let error;
        if (/(?=^.{8,}$).*$/i.test(value)) {
            error = false;
        } else {
            error = true;
        }
        return error;
    }

    validatePhoneNumber(value) {
        let error;
        if (/^\d{10,11}$/i.test(value)) {
            error = false;
        } else {
            error = true;
        }
        return error;
    }

    render() {
        const { email, password, phone_number, full_name, terms, confirm_password, submitted, loading, error, success } = this.state;

        return (
            <React.Fragment>
                <Container className="signup-container">
                    {success &&
                        <Alert className="p-2" color="success">{success}</Alert>
                    }
                    {error &&
                        <Alert className="p-2" color="danger" isOpen={success ? false : true}>{error}</Alert>
                    }
                    <Card className="signup-card">
                        <h1 className="text-center signup-text-register mt-3">Register</h1>
                        <CardBody className="signup-card-body">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label className="text-primary">Email</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder="Email"
                                        invalid={submitted && this.validateEmail(this.state.email) ? true : false}
                                    />
                                    {!email &&
                                        <FormFeedback invalid>
                                            Email s a required field!
                                    </FormFeedback>
                                    }
                                    {email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) &&
                                        <FormFeedback invalid>
                                            Email is not valid!
                                    </FormFeedback>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary">Full Name</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="text"
                                        name="full_name"
                                        value={this.state.full_name}
                                        onChange={this.handleChange}
                                        placeholder="full name"
                                        invalid={submitted && !full_name ? true : false}
                                    />
                                    <FormFeedback invalid>
                                        Full name is a required field!
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary ">Password</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        placeholder="password"
                                        invalid={submitted && this.validatePassword(this.state.password) ? true : false}
                                    />
                                    {!password &&
                                        <FormFeedback invalid>
                                            Password is a required field!
                                    </FormFeedback>
                                    }

                                    {password && (!/(?=^.{8,}$).*$/i.test(password)) &&
                                        <FormFeedback invalid>
                                            Your password must contain at least 8 or more characters
                                    </FormFeedback>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary">Confirm Password</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="password"
                                        name="confirm_password"
                                        value={this.state.confirm_password}
                                        onChange={this.handleChange}
                                        placeholder="confirm password"
                                        invalid={submitted && password !== confirm_password ? true : false}
                                    />
                                    <FormFeedback invalid>
                                        Confirm password incorrect. Please retype the password
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary">Phone Number</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="number"
                                        name="phone_number"
                                        value={this.state.phone_number}
                                        onChange={this.handleChange}
                                        placeholder="phone number"
                                        invalid={submitted && this.validatePhoneNumber(this.state.phone_number) ? true : false}
                                    />
                                    {!phone_number &&
                                        <FormFeedback invalid>
                                            Phone number s a required field!
                                    </FormFeedback>
                                    }
                                    {phone_number && (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(phone_number)) &&
                                        <FormFeedback invalid>
                                            Phone number is not valid!
                                    </FormFeedback>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <CustomInput type="checkbox" name="terms" id="term" onChange={this.statusTerms} />
                                    </Label>
                                    <small>
                                        <NavLink to="/term" target="_blank" className="mt-1">
                                            You agree to our terms of service
                                        </NavLink>
                                    </small>
                                </FormGroup>
                                <div className="text-center mt-3">
                                    {loading === false ?
                                        <Button
                                            color="primary"
                                            size="mb-3"
                                            disabled={!terms ? true : false}>
                                            Sign up
                                    </Button>
                                        :
                                        <LoadingSprinner />
                                    }
                                </div>
                            </Form>
                            {/* <div className="text-center mt-2"> */}
                            {/* <NavLink to="/auth/sign-in" >Already have an account. Signin?</NavLink> */}
                            {/* <NavLink to="/auth/verify-account" >-> Next to the Verify Account page</NavLink> */}
                            {/* </div> */}
                        </CardBody>
                    </Card>
                </Container>

            </React.Fragment>
        );
    }
}


export default SignUp;

