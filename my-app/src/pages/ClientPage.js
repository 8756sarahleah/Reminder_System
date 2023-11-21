import * as React from 'react';

import {Box,Divider,Tab,Tabs,Typography} from '@mui/material';
import PropTypes from 'prop-types';

import ViewMedicineUsages from '../components/VeiwMedicneUsages'
import VeiwProfile from '../components/ViewProfile';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 300 ,paddingTop:10}}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        centered
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Medicine Usages" {...a11yProps(0)} />
        <Tab label="Profile" {...a11yProps(1)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <ViewMedicineUsages/>
      </TabPanel>
      <Divider />
      <TabPanel value={value} index={1}>
        <VeiwProfile/>
      </TabPanel>

    </Box>
  );
} 

