import { Link, withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Form, Container } from "./styles";


import api from "../../services/api";

class SignUp extends Component {
    state = {
      username: "",
      email: "",
      password: "",
      error: ""
    };

    handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
        this.setState({ error: "Fill all fields" });
    } else {
        try {
        await api.post("/sign-up", { username, email, password });
        this.props.history.push("/");
        } catch (err) {
        console.log(err);
        this.setState({ error: "Erro while trying to create account" });
        }
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
            <button type="submit">Create account</button>
            <hr />
            <Link to="/">Login</Link>
            </Form>
        </Container>
        );
    }
}

export default withRouter(SignUp);