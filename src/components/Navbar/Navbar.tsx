import React from "react";
import classes from "./Navbar.module.css";

// let s = {
//     'nav': 'Navbar_nav__i5XzG',
//     'item': 'Navbar_item__ZL7iE',
//     'active': 'classactive'
// }

// let c1 = "item";
// let c2 = "active";
// //item active (если класс: .item.active)
// let classesOld = c1 + " " + c2; //обычный код
// let classesNew = `${classes.item} ${classes.active}`: // ES6


function Navbar () {
    return <nav className={classes.nav}>
        <div className={classes.item}>
            <a>
                Profile
            </a>
        </div>
        <div className={classes.item}>
            <a>
                Messages
            </a>
        </div>
        <div className={classes.item}>
            <a>
                News
            </a>
        </div>
        <div className={classes.item}>
            <a>
                Musics
            </a>
        </div>
        <div className={classes.item}>
            <a>
                Settings
            </a>
        </div>
    </nav>
}

export default Navbar;