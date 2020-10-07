import React from 'react'
import Header from '../Header'
/**
* @author
* @function LayoutPage
**/

const LayoutPage = (props) => {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    )

}

export default LayoutPage