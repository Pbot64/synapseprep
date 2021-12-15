// Node Modules
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
// import { withRouter } from 'react-router-dom';

// Material UI Components

// Local Assets

//  Style Overrides
const styles = theme => ({
  ruleRoot: {
    width: '100%',
    '& > div': {
      marginBottom: '20px'
    },
    '&> :last-child': {
      marginBottom: '0px'
    }
  },
  textRoot: {
    marginBottom: '20px',
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '30px'
    }
  },
  extraContent: {
    fontSize: '0.8125rem',
    borderRadius: '10px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9375rem'
    },
    '&> div': {
      marginBottom: '15px',
      [theme.breakpoints.up('sm')]: {
        marginBottom: '20px'
      }
    },
    '&> :last-child': {
      marginBottom: '0px'
    }
  },
  expand: {},
  half: {
    marginBottom: '5px'
  },
  large: {
    fontSize: '1.25rem',
    fontWeight: '300',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
    }
  },
  small: {
    fontSize: '0.8125rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9375rem'
    }
  },
  bold: {
    fontWeight: '500',
    display: 'inline'
  },
  italic: {
    fontStyle: 'italic',
    display: 'inline'
  },
  underline: {
    borderBottom: '1px solid #343e4d',
    display: 'inline'
  },
  inline: {
    display: 'inline'
  },
  block: {
    display: 'block'
  },
  table: {
    display: 'table'
  },
  center: {},
  indent: {
    marginLeft: '25px'
  },
  quote: {
    marginLeft: '25px',
    display: 'block',
    fontStyle: 'italic',
    fontSize: '0.8125rem',
    backgroundColor: 'white',
    padding: '10px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9375rem'
    }
  },
  define: {
    color: '#2980ba',
    display: 'inline',
    cursor: 'pointer'
  },
  column: {
    columnCount: 2
  },
  blue: {
    color: theme.palette.blue,
    display: 'inline'
  },
  green: {
    color: theme.palette.green,
    display: 'inline'
  },
  purple: {
    color: theme.palette.purple,
    display: 'inline'
  },
  red: {
    color: 'red',
    display: 'inline'
  }
});

const TextBase = props => {
  const {
    children,
    className,
    classes,
    bold,
    half,
    italic,
    inline,
    block,
    center,
    indent,
    underline,
    rule,
    extra,
    quote,
    large,
    small,
    expanded,
    define,
    column,
    blue,
    green,
    purple,
    red,
    ...rest
  } = props;

  // let daRef = useRef();

  // const [testText, setTestText] = useState(children);
  useEffect(() => {
    // handleClick(() => {
    // thisRef = useRef();
    // })
  });

  // const handleChange = e => {
  //   console.log('e.target.value', e.target.value);
  // };

  // useEffect(() => {
  //   console.log('dispatch', dispatch(updateText(text)));
  // }, [text]);

  // contentEditable={history.location.pathname === '/testing'}

  return (
    <div
      className={classNames(
        rule ? classes.ruleRoot : extra ? classes.extraContent : classes.textRoot,
        {
          [classes.bold]: bold,
          [classes.italic]: italic,
          [classes.underline]: underline,
          [classes.inline]: inline,
          [classes.block]: block,
          [classes.table]: underline && block,
          [classes.half]: half,
          [classes.quote]: quote,
          [classes.center]: center,
          [classes.indent]: indent,
          [classes.expand]: expanded,
          [classes.define]: define,
          [classes.small]: small,
          [classes.large]: large,
          [classes.column]: column,
          [classes.blue]: blue,
          [classes.green]: green,
          [classes.purple]: purple,
          [classes.red]: red
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

TextBase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextBase);
