import { Link, withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Form, Container } from "./styles";


import api from "../../services/api";

class SignUp extends Component {
    state = {
      username: "",
      email: "",
      password: "",
      error: "",
      firstName: '',
      lastName: ''
    };

    handleSignUp = async e => {
        e.preventDefault();
        const { username, email, password, firstName, lastName } = this.state;
        if (!username || !email || !password) {
            this.setState({ error: "Fill all fields" });
        } else {
            api.post("authentication/sign-up", { username, email, password, firstName, lastName }).then(response => {
                alert('account created')
                this.props.history.push("/");
            }, error => {
                console.log(error);
                this.setState({ error: "Erro while trying to create account" });
            });
        }
    };

    render() {
        return (
        <Container>
            <Form onSubmit={this.handleSignUp}>
            {this.state.error && <p>{this.state.error}</p>}
            <input
                className="form-control"
                type="text"
                placeholder="Username"
                onChange={e => this.setState({ username: e.target.value })}
            />
            <input
                className="form-control"
                type="email"
                placeholder="E-mail adress"
                onChange={e => this.setState({ email: e.target.value })}
            />
            <input
                className="form-control"
                type="password"
                placeholder="password"
                onChange={e => this.setState({ password: e.target.value })}
            />
            <input
                className="form-control"
                type="text"
                placeholder="First name"
                onChange={e => this.setState({ firstName: e.target.value })}
            />
            <input
                className="form-control"
                type="test"
                placeholder="Last name"
                onChange={e => this.setState({ lastName: e.target.value })}
            />
            <button type="submit">Create account</button>
            <hr />
            <Link to="/">Login</Link>
            </Form>
        </Container>
        );
    }
}

export default withRouter(SignUp);