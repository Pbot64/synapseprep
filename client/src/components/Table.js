import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const CustomTableCell = withStyles(theme => ({
  head: {
    padding: '0px',
    color: theme.palette.text.lightGrey,
    height: '48px',
    [theme.breakpoints.up('sm')]: {
      padding: '5px 0px'
    }
  },
  body: {
    fontSize: 14,
    padding: '0px',
    [theme.breakpoints.up('sm')]: {
      padding: '5px 0px'
    }
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: 'none'
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      cursor: 'pointer'
    }
  },
  head: {
    height: '48px',

    [theme.breakpoints.up('sm')]: {
      height: '56px'
    }
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Linear Equations', '4/5', 'Low'),
  createData('Parabolas', '2/5', 'High'),
  createData('Inequalities', '3/5', 'Medium'),
  createData('Right Angles', '5/5', 'Defeated'),
  createData('Graphing Lines', '5/5', 'Defeated')
];

const CustomizedTable = props => {
  const { classes, profile } = props;
  // State Declarations
  // const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState('');
  console.log({ selected: selected });
  console.log('profile', profile);

  const handleClick = name => {
    if (selected === name) {
      setSelected('');
    } else {
      setSelected(name);
    }
  };
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow classes={{ head: classes.head }}>
            <TableCell padding="checkbox" />
            <CustomTableCell>
              <Typography variant="body1" color="inherit">
                Task Name
              </Typography>
            </CustomTableCell>
            <CustomTableCell align="right">
              <Typography variant="body1" color="inherit">
                Score
              </Typography>
            </CustomTableCell>
            <CustomTableCell align="right">
              <Typography variant="body1" color="inherit">
                Priority
              </Typography>
            </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              selected={row.id === selected}
              onClick={() => {
                handleClick(row.id);
              }}
              className={classes.row}
              classes={{ selected: classes.selected }}
              key={row.id}
            >
              {console.log('row.id', row.id)}
              <CustomTableCell>
                <Checkbox color="primary" checked={row.id === selected} />
              </CustomTableCell>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.calories}</CustomTableCell>
              <CustomTableCell align="right">{row.fat}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
