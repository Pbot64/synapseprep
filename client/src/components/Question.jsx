// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
	blackSquare: {
		backgroundColor: '#000000',
		color: '#FFFFFF',
		textAlign: 'center',
	},
	greyRectangle: {
		backgroundColor: '#c6c9cc',
		color: '#FFFFFF',
		fontSize: 10,
		height: 21,
	},
});

const Question = (props) => {
  const { classes } = props;
  return (
    <div>
      <Grid container  className = {classes.container}>
			<Grid item xs = {1}>
						<Typography className = {classes.blackSquare} >
							3
						</Typography>
				</Grid>
				<Grid item xs = {11}>
				<div  className = {classes.greyRectangle}></div>
				</Grid>

					<Grid item xs = {12}>
					<Typography variant="body1" gutterBottom>
					The author’s (Synapse Prep) attitude toward the SAT is best described as  
					</Typography>
					<Grid item xs = {12}>
      		<Typography variant="body1" gutterBottom>
						 A) Hateful 
						 </Typography>
						 <Typography variant="body1" gutterBottom>	 
						B)  Ambivalent 
						</Typography>

						<Typography variant="body1" gutterBottom>
						C)    Adoring
						</Typography>

						<Typography variant="body1" gutterBottom>
						D)    Critical      
						</Typography>
						</Grid>
						</Grid>
      
    	</Grid>
    
    
    
    
    
    </div>
  )
}

export default withStyles(styles)(Question);
