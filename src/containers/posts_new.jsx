import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
        <div className={className}>
          <label>{field.label}</label>
          <input
            className="form-control"
            type={field.type}
            {...field.input}
          />
          <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>
        </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field 
          label="Title"
          name="title"
          type="text"
          component={this.renderField}
        />
        <Field 
          label="Categories"
          name="categories"
          type="text"
          component={this.renderField}
        />
        <Field 
          label="Post Content"
          name="content"
          type="text"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  // validate the inputs from 'values'
  // if (!values.title || !values.categories || !values.content) {
  //   errors.complete = "Please fill out the entire form!";
  // }

  if (!values.title) {
    errors.title = "Please fill out the title!";
  }
  if (!values.categories) {
    errors.categories = "Please add some categories!!";
  }
  if (!values.content) {
    errors.content = "Please include some content!";
  }

  // if errors is empty, form is fine to submit
  // if errors has any properties, assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);