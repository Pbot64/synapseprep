// Node Modules
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components

// Local Components
import Expansion from './Expansion';
import TextBase from './TextBase';
import TooltipCustom from './TooltipCustom';
import Curriculum from './Curriculum';

// Local Assets

//  Style Overrides
const styles = theme => ({});

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
    ...rest
  } = props;
  return (
    <React.Fragment>
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
      ) : (
        <TextBase {...rest}>{children}</TextBase>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(T);
