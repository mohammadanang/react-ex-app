import React from "react"
import Auth from "services/Auth"

import {
  Button,
  Col,
  Card, 
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap"

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      formError: "",
      isSubmitting: false
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true, formError: "" });
    const { email, password } = this.state;

    Auth.login({ 
      email, 
      password
    }).then((result) => {
      this.props.history.push("/app")
    }).catch(error => {
      let formError = "Error"
      if (error.status === 401 || error.status === 422) {
        formError = "Username atau password tidak benar"
      } else if (!error.status) {
        formError = "Silahkan periksa koneksi Internet"
      }

      this.setState({ isSubmitting: false, formError });
    })
  }

  render() {
    const { email, password, formError, isSubmitting } = this.state;
    return (
      <div className="login">
        <Card>
          <CardHeader>
            <CardTitle tag="h3">
              <img className="logo" src={require("assets/img/liki_logo.png")} alt="Liki logo" />
              Masuk ke aplikasi
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <p className="text-danger form-error">
                {formError}
              </p>
              <Row>
                <Col className="px-3" md="12">
                  <FormGroup>
                    <label>Email</label>
                    <Input
                      placeholder="Email"
                      type="text"
                      value={email}
                      onChange={(event) => this.setState({email: event.target.value})}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col className="px-3" md="12">
                  <FormGroup>
                    <label>Password</label>
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(event) => this.setState({password: event.target.value})}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Button className="btn-login btn-fill" color="primary" type="submit" disabled={isSubmitting}>
                Masuk
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Login
