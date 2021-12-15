import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const SwitchCustom = ({ label, checked, setChecked, testFunc }) => {
  const handleChange = e => {
    setChecked(!checked);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={handleChange} value={checked} color="primary" />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default SwitchCustom;
