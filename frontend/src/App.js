
import React from "react"
import Routes from "./routes"
import "./styles/global"
import {LoadingComponent} from "./components/LoadingComponent";
import { MessageComponent } from "./components/MessageComponent";
import 'pretty-checkbox'

const App = () =>  {
    return (
        <div>
          <Routes />
            <MessageComponent></MessageComponent>
          <LoadingComponent type="spin" color="#000"></LoadingComponent>
        </div>
    )
}

export default App;
