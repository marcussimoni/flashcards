import React from "react"


const main = {
    width: '100%',
    height: '80px',
    backgroundColor: '#4f5d75',
    position: 'fixed',
    top: 0,
    boxShadow: '1px 5px 5px #aaa',
    zIndex: '1'
}



const Header = (props) => <div className="row" style={main}>{props.children}</div>

export default Header
