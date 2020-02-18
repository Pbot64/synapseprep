// Editable.js
import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import JsxParser from 'react-jsx-parser';

// Material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RootRef from '@material-ui/core/RootRef';

// Local Components
import E from './Equation';
import T from './Text';
import CardCustom from '../assets/jss/components/CardCustom';

const styles = theme => ({
  textOutputContainerTop: {
    minHeight: '480px',
    background: 'none',
    boxShadow: 'none'
  },
  textOutputWrapper: {
    minWidth: 'none',
    marginTop: '30px',
    [theme.breakpoints.up('md')]: {
      minWidth: '500px',
      marginTop: '0px'
    }
  }
});

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({ text, type, placeholder, children, classes, editable, ...props }) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  //   const [isEditing, setEditing] = useState(false);
  const myRef = useRef();
  let textarea = document.getElementById(props.id);

  const handleClick = e => {
    textarea = document.getElementById(props.id);
    if (textarea) {
      console.log('textarea', textarea);
      console.log('selectionStart', textarea.selectionStart);
    }
    //     console.log('myRef', myRef);
    //     if (myRef.current && !myRef.current.contains(e.target)) {
    //       console.log('You clicked outside of me!');
    //     }

    //     console.log('e.target', e.target);
    //     console.log(myRef.current.contains(e.target));
    //     if (myRef.current && myRef.current.contains(e.target)) {
    //       setEditing(true);
    //     } else {
    //       setEditing(false);
    //     }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick);
    };
  });

  //   // Event handler while pressing any key while editing
  //   const handleKeyDown = (event, type) => {
  //     // Handle when key is pressed
  //   };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <RootRef rootRef={myRef}>
      <Grid item xs={12} sm={12} md={6}>
        {editable ? (
          <CardCustom
            padding
            title="Raw Input Text"
            borderBottom
            className={classes.textInputContainerTop}
          >
            {children}
          </CardCustom>
        ) : text ? (
          <Grid item className={classes.textOutputWrapper}>
            <CardCustom
              padding
              title="Compiled Output Text"
              borderBottom
              className={classes.textOutputContainerTop}
            >
              <Typography key={text} variant="body2" component="div">
                <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={text} />
              </Typography>
            </CardCustom>
          </Grid>
        ) : placeholder ? (
          <div>{placeholder}</div>
        ) : (
          <div>Editable content</div>
        )}
      </Grid>
    </RootRef>
  );
};

export default withStyles(styles)(Editable);
