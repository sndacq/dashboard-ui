import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Paper, Tabs, Tab, Grid, Box, Typography,
} from '@material-ui/core';

import ListIcon from '@material-ui/icons/List';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import ExpenseList from './ExpenseList';

function TabPanel(props) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
      )}
    </div>
  );
}

TabPanel.defaultProps = {
  children: {},
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Expenses() {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
  // TODO: add react router
    <div>
      <Grid container>
        <Grid xs={9} />
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
        <ExpenseList />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Calendar View
      </TabPanel>
    </div>
  );
}

export default Expenses;
