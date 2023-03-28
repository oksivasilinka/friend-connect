import React from "react";
import classes from './Header.module.css';

// let s = {
//     'header': 'Header_header__DB\+yH'
// }

function Header () {
    return <header className={classes.header}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyg6D46rycYNRiLV7xW_1Dt_pOBie445Pgjg&usqp=CAU" alt="logo"/>
    </header>
}

export default Header;