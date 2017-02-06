import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flashMessages';
import TextFieldGroup from '../common/TextFieldGroup';
import RequestButton from '../common/RequestButton';
import withHandlers from '../../utils/withHandlers';
import { validateLogin } from '../../validators/authValidator';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        id: '',
        password: '',
      },
      isSubmit: false,
      errors: {},
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = props.handleChange.bind(this);
    this.handleSubmitError = props.handleSubmitError.bind(this);
    this.resetErrorsRequest = props.resetErrorsRequest.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.resetErrorsRequest();

    validateLogin(this.state.form).then(
      data => {
        this.props.login(data).then(null,
          errors => {
            this.handleSubmitError(errors);
            if(errors.general) {
              this.props.addFlashMessage({
                type: "danger",
                strong: "Error!",
                text: errors.general,
                duration: 5000,
                timeout: false,
              });
            }
          },
        );
      },
      errors => this.handleSubmitError(errors),
    );
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit } className="LoginForm_form">
        <TextFieldGroup
          name="id"
          placeholder="Username"
          value={ this.state.form.id }
          onChange={ this.handleChange }
          errors={ this.state.errors.id }
        />

        <TextFieldGroup
          name="password"
          type="password"
          placeholder="Password"
          onChange={ this.handleChange }
          value={ this.state.form.password }
          errors={ this.state.errors.password }
        />
        <RequestButton
          className="btn btn-primary LoginForm_submit"
          request={ this.state.isSubmit }
        >
          Submit
        </RequestButton>
      </form>
    );
  }
}

export default connect(
  null,
  { login, addFlashMessage }
)(withHandlers(LoginForm));
