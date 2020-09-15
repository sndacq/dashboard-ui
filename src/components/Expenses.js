import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Paper, Tabs, Tab, Grid, Box, Typography} from '@material-ui/core';

import ListIcon from '@material-ui/icons/List';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { getExpense } from '../api/ExpenseApi'
import ListTable from './ListTable';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function Expenses () {
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
      };

    // TODO: handle failed api call

    const [state, setState] = useState([]);
    useEffect(() => {
        getExpense()
        .then(data => {
            if ( Array.isArray(data) ) {
                setState(data);
            } else {
                catchError(data)
            }
        })
        .catch(err => catchError(err));
    }, []);

    const catchError = message => {
        setState([]);
        console.log(message);
    }

    return (
        // TODO: add react router
        <div>
            <Grid container>
                <Grid xs={9}/>
                <Grid xs={3} className="header-tab">
                <Paper square>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="icon tabs example"
                    >
                        <Tab icon={<ListIcon />} aria-label="list" />
                        <Tab icon={<CalendarTodayIcon />} aria-label="calendar" />
                    </Tabs>
                </Paper>
                </Grid>
        </Grid>
            <TabPanel value={tabValue} index={0}>
                <ListTable data={state}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                Calendar View
            </TabPanel>
        </div>
    );
}

export default Expenses;