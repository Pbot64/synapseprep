// Node Modules
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components

// Local Components
import EquationBase from './EquationBase';
// import AccordionCustom from '../Text/AccordionCustom';
// import AccordionStep from '../Text/AccordionStep';

// Local Assets

//  Style Overrides
const styles = theme => ({});

const E = props => {
  const { children, accordion, accordionStep, ...rest } = props;

  return (
    <>
      {/* {accordion ? (
        <AccordionCustom />
      ) : accordionStep ? (
        <AccordionStep {...rest}>{children}</AccordionStep>
      ) : ( */}
      <EquationBase {...rest}>{children}</EquationBase>
      {/* )} */}
    </>
  );
};

export default withStyles(styles)(E);
