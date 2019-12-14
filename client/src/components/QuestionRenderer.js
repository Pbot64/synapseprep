// @flow
import React, { Component } from 'react';
import 'katex/dist/katex.css';
import 'perseus-configured/lib/lib/perseus.css';
import Perseus from 'perseus-configured';

export default class QuestionRenderer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.question !== this.props.question || nextProps.readOnly !== this.props.readOnly;
  }

  render() {
    const { question, setRef, readOnly, isMobile } = this.props;
    const questionContents =
      Perseus !== null ? (
        <Perseus.ServerItemRenderer
          controlPeripherals={false}
          item={question}
          apiOptions={{
            isMobile: isMobile,
            staticRender: !!readOnly,
            readOnly: !!readOnly,
            customKeypad: !readOnly
          }}
          problemNum={0}
          hintsVisible={0}
          ref={n => (setRef ? setRef(n) : null)}
        />
      ) : (
        <div>Loading...</div>
      );
    return (
      <div className={'framework-perseus' + (isMobile ? ' perseus-mobile' : '')}>
        <div>{questionContents}</div>
      </div>
    );
  }
}
