import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Textfield from '@material-ui/core/TextField';
import {Select, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    dense: {
        marginTop: 19,
      }
}));
const formMargin = {
    margin: '10px'
}

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            loginType: "", //Setting default login option
            password: "",
        }
       
        // will check the query param to see if there is something that has failed. 
        let params = new URLSearchParams(window.location.search)
        if(params.get('failed')){ //if the query param 'failed' is true
            alert("Incorrect login information");
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(this.state);
    }
    handleSubmit(event){
    }

    /** TODO Use material UI select in form
     *  <Select id="loginType" value={this.state.loginType} displayEmpty onChange={this.handleChange}>
                    <MenuItem value="Customers"> Customer login</MenuItem>
                    <MenuItem value="Restaurants">Restaurant login </MenuItem>
                </Select> */

    render(){ //move login post into handlesubmit form is not properly handling the select value
        return    <Container maxWidth="sm">
        <Paper id="signup-paper" className="text-center">
        <Grid container alignItems="center" direction="column">
            <Grid item sm={12}>
            <i className="material-icons large-icon d-block">lock</i>
                <h1>{this.state.loginType} login </h1>
            </Grid>
            <form className="login" onSubmit={this.handleSubmit} action="https://localhost:3000/login" method="post"> 
            <Grid item sm={12} style={formMargin}>
                <label htmlFor="loginType">Login type: </label>
                <select id="loginType" name="loginType" value={this.state.loginType} displayEmpty onChange={this.handleChange}>
                    <option value="Customers"> Customer login</option>
                    <option value="Restaurants">Restaurant login </option>
                </select>
            </Grid>
            <Grid item sm={12} style={formMargin}>
                <Textfield value={this.state.value} type="text" onChange={this.handleChange} variant="outlined" id="email" name="email" label="Email" maxWidth="lg" margin="dense" ></Textfield>
            </Grid>
            <Grid item sm={12} style={formMargin}>
                <Textfield value={this.state.value} type="password" onChange={this.handleChange} variant="outlined" id="password" name="password" label="Password" maxWidth="lg" margin="dense" ></Textfield>
            </Grid>
            <Grid item sm={12} style={formMargin}>
                <Button type="submit" color="primary" variant="contained">Log in</Button>
            </Grid>
            </form>
        </Grid>
        
        </Paper>
        </Container>;
    }
    
}

export default LoginComponent;