import React from 'react'

/**
* @author
* @function LayoutPage
**/

const LayoutPage = (props) => {
    return (
        <div>
            <header>
                header{props.children}
            </header>
        </div>
    )

}

export default LayoutPage