import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  BarChart, Bar, Cell, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text, ResponsiveContainer
} from 'recharts';
import wavePattern from '../assets/images/wavePattern.png'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  main: {
      
  },
    barchartContainer: {
      maxWidth: '80%',
    }
  
});



const data = [
  {
    name: 'Math', Difference: 50, Current: 700,
  },
  {
    name: 'Reading', Difference: 30, Current: 750,
  },
  {
    name: 'Writing', Difference: 100, Current: 550,
  },
  {
    name: 'Essay', Difference: 50, Current: 600,
  },


];


const CustomTooltip = props => {
  
  // payload[0] doesn't exist when tooltip isn't visible
  if (props.payload[0] != null) {
    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    console.log(props.payload[0])
    const newPayload = [
      {
      
       value: '+30',
       name: 'Difference',
        value: props.payload[0].payload.Difference,
       
        
        
       
        
        // all your data which created the tooltip is located in the .payload property
        
        // you can also add "unit" here if you need it
      },
      
    ];
console.log(newPayload)
    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }

  // we just render the default
  return <DefaultTooltipContent {...props} />;
};

const valueAccessor = (entry) => {
  return entry ? (entry.Current) : 0;
};

const valueAccessor2 = (entry) => {
  return entry ? (entry.Current + entry.Difference) : 0;
};

class Barchart extends Component {
 
  

 
 

 

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

  render() {
    const { classes, percentage,
      endColor,
      startColor,
      gradientId,
      children } = this.props;
  
    const gradientTransform = `rotate(10)`



    
    const colors = [`url(#${'math'})`, `url(#${'reading'})`, `url(#${'writing'})`, `url(#${'essay'})`];
    return (
      <React.Fragment>


        <svg style={{ height: 0, width: 0, position: 'absolute'}}>
          <defs>
            <linearGradient
              id={'reading'}
              gradientTransform={gradientTransform}
            >
              <stop offset="20%" stopColor={'#ee5087'} />
              <stop offset="100%" stopColor={'#ffbe5f'} />
            </linearGradient>
          </defs>
        </svg>

        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <defs>
            <linearGradient
              id={'writing'}
              gradientTransform={gradientTransform}
            >
              <stop offset="0%" stopColor={'#b465da'} />
              <stop offset="100%" stopColor={'#ee609c'} />
            </linearGradient>
          </defs>
        </svg>

        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <defs>
            <linearGradient
              id={'math'}
              gradientTransform={gradientTransform}
            >
              <stop offset="0%" stopColor={'#2980ba'} />
              <stop offset="120%" stopColor={'#17ab5d'} />
            </linearGradient>
          </defs>
        </svg>

        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <defs>
            <linearGradient
              id={'essay'}
              gradientTransform={gradientTransform}
            >
              <stop offset="0%" stopColor={'#209cff'} />
              <stop offset="100%" stopColor={'#68e0cf'} />
            </linearGradient>
          </defs>
        </svg>
       <Grid item container xs = {12} className = {classes.main}>
    
        <BarChart className = {classes.barchartContainer}

          barCategoryGap={5}
          layout='vertical'
          width={800}
          height={200}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >

          <XAxis type="number" domain={[200, 800]} allowDataOverflow />
          <YAxis dataKey="name" type="category" />
          <Tooltip cursor={{ fill: 'grey', fillOpacity: 0.05 }} itemStyle={{ color: '#000', padding: '1px' }} labelStyle={{
            fontWeight: '500',
            paddingBottom: '5px',
            borderBottom: '1px solid black',
            margin: '0px',
            fontSize: '15px',
            marginBottom: '3px',
        
          }}
            contentStyle={{ borderRadius: '6px', fontSize: '15px', marginTop: '0px', }} 
            content = {CustomTooltip}
            
            
            />
          <Legend
          />
          <Bar dataKey='Current' stackId="a" className={classes.test}  fill = {`url(#${'math'})`} >
            {
              data.map((entry, index) => {
                return <Cell fill={colors[index]} />;
              })
            }
          </Bar>
          <Bar name = 'Goal' dataKey='Difference' stackId="a" fill={'#d3d3d3'} >
          <LabelList position="left" style = {{color: 'white', fontWeight: 600}} valueAccessor={valueAccessor}>
          </LabelList>
            <LabelList datakey = 'Difference' position="right" style = {{fontWeight: 600}}  valueAccessor={valueAccessor2} />
          </Bar>

        </BarChart>
       
      </Grid>
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(Barchart);