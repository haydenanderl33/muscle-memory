import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from "./Components/Auth/Auth"
import Home from "./Components/Home/Home"
import AddForm from "./Components/AddForm/AddForm"
import Instructions from "./Components/Instructions"
import Goals from "./Components/Goals"
import Success from "./Components/Success"
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/ForgotPassword/ResetPassword'

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path="/home" component={Home}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/resetPassword/:token" component={ResetPassword}/>
        {/* <Route path="/addnew" component={AddForm}/>
        <Route path="/instructions" component={Instructions}/>
        <Route path="/success" component={Success}/>
        <Route path="/goals" component={Goals}/> */}
    </Switch>
)