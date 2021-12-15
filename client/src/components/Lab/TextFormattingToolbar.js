// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import JsxParser from 'react-jsx-parser';

import { TextField, RootRef, Tooltip, Divider, Grid, Typography, IconButton } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import BlockTextIcon from '@material-ui/icons/Notes';
import InlineTextIcon from '@material-ui/icons/ShortText';
import TrapIcon from '@material-ui/icons/ErrorOutline';
import IvyIcon from '@material-ui/icons/School';
import BuildIcon from '@material-ui/icons/FitnessCenter';
import StratIcon from '@material-ui/icons/VpnKey';
import HphantomIcon from '@material-ui/icons/SettingsEthernet';
import BoxedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import AlignedIcon from '@material-ui/icons/PlaylistAddCheck';
import ColorPaletteIcon from '@material-ui/icons/ColorLens';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
// import EditIcon from '@material-ui/icons/Edit';
import FormatHalfIcon from '@material-ui/icons/FormatLineSpacing';
import DefineTextIcon from '@material-ui/icons/ContactSupport';
import RuleIcon from '@material-ui/icons/PostAdd';
// import FormatSizeIcon from '@material-ui/icons/FormatSize';

// Local Components

import CardCustom from '../../assets/jss/components/CardCustom';
import ButtonCustom from '../Button/ButtonCustom';
import SpeedDialCustom from '../SpeedDialCustom';

// Local Assets

//  Style Overrides
const styles = theme => ({
  textInputContainerTop: {
    flexGrow: '1'
  },
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
  },
  purple: {
    color: theme.palette.purple
  },
  equationFormatsContainer: {
    padding: '10px'
  },
  textFormatsContainer: {
    padding: '10px'
  },
  speedDialFormatsContainer: {
    padding: '10px'
  },
  formControlRoot: {
    height: '100%'
  },
  formInputRoot: {
    height: '100%'
  },
  inputRoot: {
    height: '100%'
  }
});

const TextFormattingToolbar = ({ classes, inputTextArea, inputTextSelected, solutions }) => {
  // State

  const findSelectionRange = (openingTag, closingTag) => {
    console.log('inputTextArea', inputTextArea);
    if (inputTextArea && inputTextSelected && solutions) {
      var start = inputTextArea.selectionStart;
      var end = inputTextArea.selectionEnd;
      var sel = inputTextArea.value.substring(start, end);
      var finText =
        inputTextArea.value.substring(0, start) +
        openingTag +
        sel +
        closingTag +
        inputTextArea.value.substring(end);
      console.log('finText', finText);
      document.execCommand('insertText', false /*no UI*/, openingTag + sel + closingTag);
      // var tagLength = openingTag.length + closingTag.length;
      inputTextArea.selectionEnd = end + openingTag.length;
      // setText(finText);
    }
  };

  const addText = () => {
    findSelectionRange('<T>', '</T>');
  };
  const smallText = () => {
    findSelectionRange('<T small>', '</T>');
  };
  const largeText = () => {
    findSelectionRange('<T large>', '</T>');
  };
  const boldText = () => {
    findSelectionRange('<T bold>', '</T>');
  };
  const italicText = () => {
    findSelectionRange('<T italic>', '</T>');
  };
  const underlineText = () => {
    findSelectionRange('<T underline>', '</T>');
  };
  const centerText = () => {
    findSelectionRange('<T center>', '</T>');
  };
  const indentText = () => {
    findSelectionRange('<T indent>', '</T>');
  };
  const halfText = () => {
    findSelectionRange('<T half>', '</T>');
  };
  const inlineText = () => {
    findSelectionRange('<T inline>', '</T>');
  };
  const blockText = () => {
    findSelectionRange('<T block>', '</T>');
  };
  const quoteText = () => {
    findSelectionRange('<T quote>', '</T>');
  };
  const defineText = () => {
    findSelectionRange(`<T define='word to define'>`, '</T>');
  };
  const ruleText = () => {
    findSelectionRange(`<T rule title=''>`, '</T>');
  };
  const trap = () => {
    findSelectionRange(`<T curriculum trap title=''>`, '</T>');
  };
  const ivy = () => {
    findSelectionRange(`<T curriculum ivy title=''>`, '</T>');
  };
  const strat = () => {
    findSelectionRange(`<T curriculum strat title=''>`, '</T>');
  };
  const build = () => {
    findSelectionRange(`<T curriculum build title=''>`, '</T>');
  };
  const expand = () => {
    findSelectionRange('<T curriculum expand title="">', '</T>');
  };

  // Equation Icons
  const addEquation = () => {
    findSelectionRange("<E>{'", "'}</E>");
  };
  const blockEquation = () => {
    findSelectionRange("<E block>{'", "'}</E>");
  };
  const redColorEquation = () => {
    findSelectionRange('\\\\red{', '}');
  };
  const blueColorEquation = () => {
    findSelectionRange('\\\\blue{', '}');
  };
  const greenColorEquation = () => {
    findSelectionRange('\\\\green{', '}');
  };
  const purpleColorEquation = () => {
    findSelectionRange('\\\\purple{', '}');
  };
  const boxedEquation = () => {
    findSelectionRange('\\\\boxed{', '}');
  };
  const alignedEquation = () => {
    findSelectionRange('\\\\begin{aligned}', '\\\\end{aligned}');
  };
  const hphantomEquation = () => {
    findSelectionRange('\\\\hphantom{..................}', '');
  };

  const colorIcons = [
    {
      icon: <FormatColorTextIcon fontSize="small" color="error" />,
      name: 'Red',
      eventHandler: redColorEquation
    },
    {
      icon: <FormatColorTextIcon fontSize="small" color="secondary" />,
      name: 'Blue',
      eventHandler: blueColorEquation
    },
    {
      icon: <FormatColorTextIcon fontSize="small" color="primary" />,
      name: 'Green',
      eventHandler: greenColorEquation
    },
    {
      icon: <FormatColorTextIcon fontSize="small" className={classes.purple} />,
      name: 'Purple',
      eventHandler: purpleColorEquation
    }
  ];

  const curriculemIcons = [
    { icon: <TrapIcon fontSize="small" color="error" />, name: 'Trap Alert', eventHandler: trap },
    { icon: <IvyIcon fontSize="small" color="secondary" />, name: 'Ivy League', eventHandler: ivy },
    {
      icon: <StratIcon fontSize="small" color="primary" />,
      name: 'Key Strat',
      eventHandler: strat
    },
    {
      icon: <BuildIcon fontSize="small" className={classes.purple} />,
      name: 'Skill Builder',
      eventHandler: build
    }
  ];

  return (
    <Grid item id="text-formatting-toolbar">
      <Grid container item>
        <Grid container item className={classes.equationFormatsContainer}>
          <ButtonCustom size="small" onClick={addEquation}>
            Equation
          </ButtonCustom>
          <Tooltip title="Block Equation" enterDelay={500}>
            <IconButton aria-label="Block Equation" onClick={blockEquation}>
              <BlockTextIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Boxed Equation" enterDelay={500}>
            <IconButton aria-label="Boxed Equation" onClick={boxedEquation}>
              <BoxedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Auto Aligned Equation" enterDelay={500}>
            <IconButton aria-label="Aligned Environment" onClick={alignedEquation}>
              <AlignedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Manual Align Equation" enterDelay={500}>
            <IconButton aria-label="Manual Align" onClick={hphantomEquation}>
              <HphantomIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Divider />
        <Grid container item className={classes.textFormatsContainer}>
          <ButtonCustom onClick={addText}>Text</ButtonCustom>
          <IconButton aria-label="Bold Text" onClick={boldText}>
            <FormatBoldIcon fontSize="small" />
          </IconButton>

          <IconButton aria-label="Italic Text" onClick={italicText}>
            <FormatItalicIcon fontSize="small" />
          </IconButton>

          <IconButton aria-label="Underline Text" onClick={underlineText}>
            <FormatUnderlinedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Indent Text" onClick={indentText}>
            <FormatIndentIncreaseIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Center Text" onClick={centerText}>
            <FormatAlignCenterIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Quote Text" onClick={quoteText}>
            <FormatQuoteIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Inline Text" onClick={inlineText}>
            <InlineTextIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Block Text" onClick={blockText}>
            <BlockTextIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Half Text" onClick={halfText}>
            <FormatHalfIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Define Text" onClick={defineText}>
            <DefineTextIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Rule Text" onClick={ruleText}>
            <RuleIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Grid item xs className={classes.speedDialFormatsContainer}>
        <SpeedDialCustom mainIcon={<ColorPaletteIcon />} icons={colorIcons} />
        <SpeedDialCustom icons={curriculemIcons} />
      </Grid>
    </Grid>
  );
};

TextFormattingToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFormattingToolbar);
