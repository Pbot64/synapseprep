/* eslint-disable react-hooks/exhaustive-deps */
// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import JsxParser from 'react-jsx-parser';

// Material UI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import classNames from 'classnames';

// Local Components
import T from './Text';

// Local Assets

//  Style Overrides
const styles = theme => ({
  dialogContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  dialog: {
    padding: '40px',
    cursor: 'move',
    paddingBottom: '20px',
    paddingRight: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    flexGrow: '1',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '600px',
      paddingTop: '35px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '60px',
      paddingTop: '70px',
      paddingBottom: '20px',
      margin: '75px',
      maxWidth: '900px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  questionRange: {
    fontSize: '0.9375rem',
    fontWeight: '600',
    maxWidth: '350px',
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
      maxWidth: '350px'
    }
  },
  blurb: {
    fontSize: '0.875rem',
    maxWidth: '350px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '330px'
    }
  },
  writingTitle: {
    fontWeight: '500',
    fontSize: '0.9375rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem'
    }
  },
  passage: {
    fontSize: '0.9375rem',
    columns: '1',
    maxWidth: '350px',
    '-webkit-column-gap': '80px',
    columnGap: '80px',
    '-webkit-column-rule': '1px dotted',
    columnRule: '1px dotted',
    [theme.breakpoints.up('md')]: {
      maxWidth: 'none',
      columns: '2'
    }
  },
  writingPassage: {
    counterReset: 'line',
    lineHeight: '2'
  },
  textContainer: {},
  numbers: {
    width: '50%',
    marginTop: '0px',
    fontStyle: 'italic',
    fontSize: '0.8125rem',
    margin: '0px',
    lineHeight: '16px',
    paddingBottom: '74px',
    color: 'grey',
    [theme.breakpoints.up('md')]: {
      fontSize: '0.875rem'
      // lineHeight: '19px',
      // paddingBottom: '76px'
    }
  },
  numbersContainer: {
    counterReset: 'line',
    position: 'absolute',
    left: '-35px',
    height: '100%',
    overflow: 'hidden',
    columns: '1',
    width: '108%',
    '& p:not(:first-child):before': {
      counterIncrement: 'line+5',
      content: 'counter(line)',
      display: 'inline-block',
      padding: '0 .5rem',
      marginRight: '.5rem'
    },
    [theme.breakpoints.up('md')]: {
      columns: '2'
    }
  },
  testWrapper: {
    position: 'relative'
  }
});

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

const DialogCustom = props => {
  const { classes, assignment, currentQuestion } = props;

  const { passageId, content, title, questionRange } = currentQuestion.passage;

  let [divHeight, setDivHeight] = useState(0);

  const textContainer = useRef(null);
  let paragraphHeight;
  if (textContainer.current !== null) {
    paragraphHeight = textContainer.current.clientHeight;
  }

  let test = [];

  useEffect(() => {
    window.addEventListener('resize', updateHeight);

    console.log('paragraphHeight', paragraphHeight);
    drawNumbers();
  }, []);
  // useEffect(() => {
  //   var lines = paragraphHeight / 16;
  //   var lineHeight = paragraphHeight / lines;

  //   if (lineNumbers.length !== 0) {
  //     setLineNumbers([]);
  //   }
  //   for (let i = 0; i < paragraphHeight; i += lineHeight * 5) {
  //     setLineNumbers([
  //       ...lineNumbers,
  //       <p style={{ marginBottom: lineHeight * 5 }} className={classes.test}></p>
  //     ]);
  //     console.log('lineNumbers', lineNumbers);
  //   }
  // }, [paragraphHeight]);

  const updateHeight = () => {
    if (textContainer.current !== null) {
      if (divHeight !== textContainer.current.clientHeight)
        setDivHeight(textContainer.current.clientHeight);
    }
  };

  const test2 = () => {
    setTimeout(() => {
      setDivHeight(textContainer.current.clientHeight);
    }, 100);
  };
  test2();

  function drawNumbers() {
    var lines = paragraphHeight / 19;
    var lineHeight = paragraphHeight / lines;
    console.log('paragraphHeight', paragraphHeight);

    if (test.length !== 0) {
      test = [];
    }
    for (let i = 0; i < paragraphHeight; i += lineHeight * 4) {
      test.push(<p className={classes.numbers}></p>);
    }
  }
  if (assignment === 1) {
    drawNumbers();
  }
  //   const text = `Akira came directly, breaking all tradition.
  //     Was that it? Had he followed form—had he
  //     asked his mother to speak to his father to approach a go-between—would Chie have been
  //     more receptive?
  //     \\n
  // He came on a winter’s eve.
  //  He pounded on the door while a cold
  //     rain beat on the shuttered veranda, so at first Chie thought him only the wind. The
  //     maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then
  //     the maid brought a calling card to the drawing room, for Chie.
  //     \\n
  //     Chie was reluctant to
  //     go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low
  //     table set atop a charcoal brazier. A thick quilt spread over the sides of the table so
  //     their legs were tucked inside with the heat.
  //     \\n
  //     “Who is it at this hour, in this
  //     weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.
  //     \\n
  //     “Shinoda, Akira. Kobe Dental College,” she read. Naomi recognized the name. Chie heard
  //     a soft intake of air.
  //     \n
  //     “I think you should go,” said Naomi.
  //     \n
  //     Akira was waiting in the
  //     entry. He was in his early twenties, slim and serious, wearing the black
  //     military-style uniform of a student. As he bowed—his hands hanging straight down, a
  //     black cap in one, a yellow oil-paper umbrella in the other—Chie glanced beyond him. In
  //     the glistening surface of the courtyard’s rain-drenched paving stones, she saw his
  //     reflection like a dark double.
  //     \n
  //     “Madame,” said Akira, “forgive my disruption, but I
  //     come with a matter of urgency.”
  //     \newline
  //     His voice was soft, refined. He straightened and stole
  //     a deferential peek at her face.

  //     In the dim light his eyes shone with sincerity. Chie
  //     felt herself starting to like him.

  //     “Come inside, get out of this nasty night. Surely
  //     your business can wait for a moment or two.”
  //     \n
  //     “I don’t want to trouble you. Normally I
  //     would approach you more properly but I’ve received word of a position. I’ve an
  //     opportunity to go to America, as dentist for Seattle’s Japanese community.”
  //     \n
  //     “Congratulations,” Chie said with amusement. “That is an opportunity, I’m sure. But
  //     how am I involved?”
  //     \n
  //     Even noting Naomi’s breathless reaction to the name card, Chie had
  //     no idea. Akira’s message, delivered like a formal speech, filled her with maternal
  //     amusement. You know how children speak so earnestly, so hurriedly, so endearingly
  //     about things that have no importance in an adult’s mind? That’s how she viewed him, as
  //     a child.
  //     \n
  //     It was how she viewed Naomi. Even though Naomi was eighteen and training
  //     endlessly in the arts needed to make a good marriage, Chie had made no effort to find
  //     her a husband.
  //     \n
  //     Akira blushed.
  //     \n
  //     “Depending on your response, I may stay in Japan. I’ve
  //     come to ask for Naomi’s hand.”
  //     \n
  //     Suddenly Chie felt the dampness of the night.
  //     \n
  //     “Does
  //     Naomi know anything of your... ambitions?”
  //     \n
  //     “We have an understanding. Please don’t
  //     judge my candidacy by the unseemliness of this proposal. I ask directly because the
  //     use of a go-between takes much time. Either method comes down to the same thing: a
  //     matter of parental approval. If you give your consent, I become Naomi’s yoshi.* We’ll
  //     live in the House of Fuji. Without your consent, I must go to America, to secure a new
  //     home for my bride.”
  //     \n
  //     Eager to make his point, he’d been looking her full in the face.
  //     Abruptly, his voice turned gentle. “I see I’ve startled you. My humble apologies. I’ll
  //     take no more of your evening. My address is on my card. If you don’t wish to contact
  //     me, I’ll reapproach you in two weeks’ time. Until then, good night.”
  //     \n
  //     He bowed and
  //     left. Taking her ease, with effortless grace, like a cat making off with a fish.

  //     \n
  //     “Mother?” Chie heard Naomi’s low voice and turned from the door. “He has asked you?”
  //     \n
  //     The sight of Naomi’s clear eyes, her dark brows gave Chie strength. Maybe his hopes
  //     were preposterous.
  //     \n
  //     “Where did you meet such a fellow? Imagine! He thinks he can marry
  //     the Fuji heir and take her to America all in the snap of his fingers!”
  //     \n
  //     Chie waited for
  //     Naomi’s ripe laughter.
  //     \n
  //     Naomi was silent. She stood a full half minute looking straight
  //     into Chie’s eyes. Finally, she spoke. “I met him at my literary meeting.”
  //     \n
  //     Naomi turned
  //     to go back into the house, then stopped.
  //     \n
  //     “Mother.”
  //     \n
  //     “Yes?”
  //     \n
  //     “I mean to have him.”`;

  // const text2 = (
  //   <T passage>
  //     Akira came directly, breaking all tradition. Was that it? Had he followed form—had he asked
  //     his mother to speak to his father to approach a go-between—would Chie have been more
  //     receptive? \\l He came on a winter’s eve. He pounded on the door while a cold rain beat on the
  //     shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie
  //     heard her soft scuttling footsteps, the creak of the door. Then the maid brought a calling
  //     card to the drawing room, for Chie.
  //   </T>
  // );

  // const text2 = (
  //   <T passage>
  //     Akira came directly, breaking all tradition. Was that it? Had he followed form—had he asked
  //     his mother to speak to his father to approach a go-between—would Chie have been more
  //     receptive? \\l He came on a winter’s eve. He pounded on the door while a cold rain beat on the
  //     shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie
  //     heard her soft scuttling footsteps, the creak of the door. Then the maid brought a calling
  //     card to the drawing room, for Chie.
  //     <T passage highlight top>
  //       Chie was reluctant
  //     </T>
  //     <T inline>
  //       to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low
  //       table set
  //     </T>
  //     <T passage highlight>
  //       atop a charcoal brazier.
  //     </T>
  //     <T passage highlight end>
  //       A thick quilt spread over the sides of the table so their legs were tucked inside with the
  //       heat.
  //     </T>
  //     <T passage numberedParagraph>
  //       “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off
  //       the maid’s lacquer tray. \l “Shinoda, Akira. Kobe Dental College,” she read. Naomi
  //       recognized the name. Chie heard a soft intake of air. \l “I think you should go,” said
  //       Naomi.
  //       <T passage inline indent numberedParagraphConnect>
  //         Akira was waiting in the entry.
  //       </T>
  //     </T>
  //     <T passage highlight>
  //       He was in his early twenties,
  //     </T>
  //     <T passage inline>
  //       slim and serious, wearing the black military-style uniform of a student. As he bowed—his
  //       hands hanging straight down, a black cap in one, a yellow oil-paper umbrella in the
  //       other—Chie glanced beyond him. In the glistening surface of the courtyard’s rain-drenched
  //       paving stones, she saw his reflection like a dark double.
  //     </T>
  //     \l “Madame,” said Akira, “forgive my disruption, but I come with a matter of urgency.” \l His
  //     voice was soft, refined. He straightened and stole a deferential peek at her face. \l In the
  //     dim light his eyes shone with sincerity. Chie felt herself starting to like him. \l “Come
  //     inside, get out of this nasty night. Surely your business can wait for a moment or two.” \l “I
  //     don’t want to trouble you. Normally I would approach you more properly but I’ve received word
  //     of a position. I’ve an opportunity to go to America, as dentist for Seattle’s Japanese
  //     community.” \l “Congratulations,” Chie said with amusement. “That is an opportunity, I’m sure.
  //     But how am I involved?” \l Even noting Naomi’s breathless reaction to the name card, Chie had
  //     no idea. Akira’s message, delivered like a formal speech, filled her with maternal amusement.
  //     You know how children speak so earnestly, so hurriedly, so endearingly about things that have
  //     no importance in an adult’s mind? That’s how she viewed him, as a child. \l It was how she
  //     viewed Naomi. Even though Naomi was eighteen and training endlessly in the arts needed to make
  //     a good marriage, Chie had made no effort to find her a husband. \l Akira blushed. \l
  //     “Depending on your response, I may stay in Japan. I’ve come to ask for Naomi’s hand.” \l
  //     Suddenly Chie felt the dampness of the night. \l “Does Naomi know anything of your...
  //     ambitions?” \l “We have an understanding. Please don’t judge my candidacy by the unseemliness
  //     of this proposal. I ask directly because the use of a go-between takes much time. Either
  //     method comes down to the same thing: a matter of parental approval. If you give your consent,
  //     I become Naomi’s yoshi.* We’ll live in the House of Fuji. Without your consent, I must go to
  //     America, to secure a new home for my bride.” \l Eager to make his point, he’d been looking her
  //     full in the face. Abruptly, his voice turned gentle. “I see I’ve startled you. My humble
  //     apologies. I’ll take no more of your evening. My address is on my card. If you don’t wish to
  //     contact me, I’ll reapproach you in two weeks’ time. Until then, good night.” \l He bowed and
  //     left. Taking her ease, with effortless grace, like a cat making off with a fish. \l “Mother?”
  //     Chie heard Naomi’s low voice and turned from the door. “He has asked you?” \l The sight of
  //     Naomi’s clear eyes, her dark brows gave Chie strength. Maybe his hopes were preposterous. \l
  //     “Where did you meet such a fellow? Imagine! He thinks he can marry the Fuji heir and take her
  //     to America all in the snap of his fingers!” \l Chie waited for Naomi’s ripe laughter. \l Naomi
  //     was silent. She stood a full half minute looking straight into Chie’s eyes. Finally, she
  //     spoke. “I met him at my literary meeting.” \l Naomi turned to go back into the house, then
  //     stopped. \l “Mother.” \l “Yes?” \l “I mean to have him.”
  //   </T>
  // );

  return (
    <Dialog
      open={props.open}
      PaperComponent={PaperComponent}
      onClose={props.handleClose}
      scroll="body"
      maxWidth={false}
      aria-labelledby="scroll-dialog-title"
      classes={{
        paper: classes.dialog,
        container: classes.dialogContainer
      }}
    >
      {/* <div className={classes.testContainer}>{lineNumbers}</div> */}
      <Grid container justify="center">
        <Grid item className={classes.textContainer}>
          <Typography variant="inherit" paragraph className={classes.questionRange}>
            {questionRange}
          </Typography>

          <Typography
            variant="inherit"
            paragraph
            className={classNames(classes.blurb, {
              [classes.writingTitle]: assignment === 2
            })}
          >
            {title}
          </Typography>
          <Grid item container justify="center" className={classes.testWrapper}>
            <div className={classes.numbersContainer}>{test}</div>
            {console.log('paragraphHeight2', paragraphHeight)}
            {/* <Grid item className={classes.writingNumberContainer}>
              <p> </p>
            </Grid> */}
            <Grid
              item
              className={classNames(classes.passage, {
                [classes.writingPassage]: assignment === 2
              })}
            >
              <div ref={textContainer}>
                {currentQuestion.questionId === passageId && (
                  <JsxParser
                    disableFragments={true}
                    components={{ Grid, Typography, T }}
                    jsx={content}
                  />
                )}
              </div>
              {console.log('content', content)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default withStyles(styles)(DialogCustom);
