import React from "react";
import { Link } from 'react-router-dom';

import {Typography, AppBar, Toolbar, ButtonGroup, Button} from '@material-ui/core';


function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
            <Link to="/home">
                <Typography variant="h6" color="inherit">
                    Dashboard
                </Typography>
            </Link>

            <ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
                <Button component={Link} to="/expenses">
                    Expenses
                </Button>
                <Button component={Link} to="/nutrition">
                    Nutrition
                </Button>
                <Button component={Link} to="/mood">
                    Mood
                </Button>
            </ButtonGroup>
            </Toolbar>
        </AppBar>
    ); 
}

export default Header;