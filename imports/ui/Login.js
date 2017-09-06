import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component{

  constructor(props){
    super(props);
    //state component to add custom states
    this.state = {
      count: this.props.count || 0,
      error: ''
    };
  }

  onSubmit(e){
    e.preventDefault();

    //this.refs ---> son las refs que ofrece REACT para recuperar cualquier element del DOM más facilmente.
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if(err){
        this.setState({error: 'Unable to login. Check email and password.'});
      }else{
        this.setState({error: ''});
      }
    });
  }

  render(){
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Login into Short Link</h1>

            {this.state.error ? <p> {this.state.error} </p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Login</button>
            </form>

            <Link to="/signup">Create a new account?</Link>
          </div>
        </div>
    );
  }
}
