import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Fill e-mail and password to procced" });
    } else {
      try {
        const response = await api.post("/authentication/sign-in", { email, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Invalid credentials"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="E-mail adress"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Login</button>
          <hr />
          <Link to="/signup">Create account</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);