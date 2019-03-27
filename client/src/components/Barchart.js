// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BarChart, Bar, Cell, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text, ResponsiveContainer } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

// Material UI Components
import Grid from '@material-ui/core/Grid';

// Local Components

// Local Assets

//  Style Overrides 
const styles = theme => ({
});

const data = [
  {
    name: 'Reading', Difference: 50, Current: 700,
  },
  {
    name: 'Writing', Difference: 30, Current: 750,
  },
  {
    name: 'Math', Difference: 100, Current: 550,
  },
  {
    name: 'Essay', Difference: 100, Current: 600,
  },
];

const CustomTooltip = props => {
  // payload[0] doesn't exist when tooltip isn't visible
  if (props.payload[0] != null) {
    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    const newPayload = [
      {
        value: '+30',
        name: 'Difference',
        value: props.payload[0].payload.Difference,
        // all your data which created the tooltip is located in the .payload property
        // you can also add "unit" here if you need it
      },
    ];
    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }
  // we just render the default
  return <DefaultTooltipContent {...props} />;
};

const valueAccessor = (entry) => {
  return entry ? (entry.Current) : 0;
};

const valueAccessorAdd = (entry) => {
  return entry ? (entry.Current + entry.Difference) : 0;
};

// const renderColorfulLegendText = (value, entry) => {
//   return <span style={{ color: 'white' }}>{value}</span>
// };

const gradientTransform = 'rotate(10)'
const colors = ['url(#0)', 'url(#1)', 'url(#2)', 'url(#3)'];
const gradient = [
  {
    startColor: '#ee5087',
    endColor: '#ffbe5f',
  },
  {
    startColor: '#b465da',
    endColor: '#ee609c',
  },
  {
    startColor: '#17ab5d',
    endColor: '#2980ba',
  },
  {
    startColor: '#209cff',
    endColor: '#68e0cf',
  },
];

const gradients = gradient.map((item, index) => {
  const stringIndex = index.toString()
  return (
    <svg style={{ height: 0, width: 0, position: 'absolute' }}>
      <defs>
        <linearGradient
          id={stringIndex}
          gradientTransform={gradientTransform}
        >
          <stop offset="20%" stopColor={item.startColor} />
          <stop offset="100%" stopColor={item.endColor} />
        </linearGradient>
      </defs>
    </svg>
  )
})

const Barchart = (props) => {
    const { classes } = props;
    return (
      <React.Fragment>
        {gradients}
        <Grid container item xs={12}>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart className={classes.barchartContainer}
                barCategoryGap={8}
                layout='vertical'
                height={200}
                data={data}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <XAxis type="number" domain={[200, 800]} allowDataOverflow />
                <YAxis dataKey="name" type="category" />
                <Tooltip
                  cursor={{ fill: 'grey', fillOpacity: 0.05 }}  labelStyle={{
                    fontWeight: '500',
                    paddingBottom: '5px',
                    borderBottom: '1px solid black',
                    margin: '0px',
                    fontSize: '15px',
                    marginBottom: '3px',
                  }}
                  coordinate={{ x: 500, y: 140 }}
                  contentStyle={{ borderRadius: '6px', fontSize: '15px', marginTop: '0px', }}
                  content={CustomTooltip}
                />
                <Legend iconSize={20} classes={{ 'recharts-legend-icon': classes.rounded }} />
                <Bar dataKey='Current' stackId="a" className={classes.test} fill={'url(#2)'} >
                  {
                    data.map((entry, index) => {
                      return <Cell key = {entry.name} fill={colors[index]} />;
                    })
                  }
                </Bar>
                <Bar name='Goal' dataKey='Difference' stackId="a" fill={'rgba(0, 0, 0, 0.08)'} >
                  <LabelList position="left" style={{ color: 'white', fontWeight: 600 }} valueAccessor={valueAccessor}>
                  </LabelList>
                  <LabelList datakey='Difference' position="right" style={{ fontWeight: 600 }} valueAccessor={valueAccessorAdd} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </React.Fragment>
  )
}
export default withStyles(styles)(Barchart);