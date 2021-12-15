// Node Modules
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Expansion from './Expansion';

import TextBase from './TextBase';
import TooltipCustom from './TooltipCustom';
import Curriculum from './Curriculum';
import TableCustom from '../TableCustom';
import { Typography } from '@material-ui/core';

// Local Assets

//  Style Overrides
const styles = theme => ({
  centeringParent: {
    textAlign: 'center'
  }
});
const T = props => {
  const {
    children,
    className,
    classes,
    rule,
    title,
    define,
    curriculum,
    expansion,
    wrongChoice,
    table,
    tablefullWidth,
    ...rest
  } = props;

  return (
    <>
      {rule || wrongChoice ? (
        <Expansion wrongChoice={wrongChoice} rule={rule} top={title}>
          <TextBase rule={rule} {...rest}>
            {children}
          </TextBase>
        </Expansion>
      ) : curriculum ? (
        <Curriculum title={title} {...rest}>
          {children}
        </Curriculum>
      ) : define ? (
        <TooltipCustom title={children} hasQuestionMark>
          <TextBase define {...rest}>
            {define}
          </TextBase>
        </TooltipCustom>
      ) : table ? (
        <TableCustom fullWidth={tablefullWidth} {...rest}>
          {children}
        </TableCustom>
      ) : props.center ? (
        <div className={classes.centeringParent}>
          <TextBase {...rest}>{children}</TextBase>
        </div>
      ) : (
        <TextBase {...rest}>{children}</TextBase>
      )}
    </>
  );
};

export default withStyles(styles)(T);
