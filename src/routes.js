import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from "./Components/Auth"
import Home from "./Components/Home"
import AddNew from "./Components/AddNew"
import Instructions from "./Components/Instructions"

export default(
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path="/home" component={Home}/>
        <Route path="/addnew" component={AddNew}/>
        <Route path="/instructions" component={Instructions}/>
    </Switch>
)