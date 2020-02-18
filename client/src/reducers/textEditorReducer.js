import { UPDATE_TEXT } from '../actions/types';

const initialState = {
  text: `<T>Use algebra to translate and solve!</T><T>Any 3 consecutive integers can be expressed as <E>{'x'}</E>, <E>{'x + 1'}</E>, and <E>{'x + 2'}</E>.</T>  
              
  <T>In this case, we’re told the sum of the 3 integers is 30, so we can write,</T>  
  
  <E block>{'x + (x + 1) + (x + 2) = 30'}</E>  
  
  <T>Translated! Now let's solve it.</T> 
  
  <T>First, combine like terms.</T>  
  
  <E block>{'\\\\begin{aligned} \\\\blue x + (\\\\blue x \\\\green{+ 1}) + (\\\\blue x  \\\\green{+ 2}) & = 30 \\\\\\\\ \\\\blue{3x} \\\\green{+ 3} & = 30 \\\\end{aligned}'}</E>
  
  <T>Then subtract 3 from each side.</T>   
  
  <E block>{'\\\\hphantom{x + (x + 1) + (} \\\\begin{aligned} 3x + 3 \\\\red{ - 3} & = 30 \\\\red{ - 3} \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>   
  
  <T>Finally, divide each side by 3.</T>   
  
  <E block>{'\\\\begin{aligned} \\\\hphantom{.............................} \\\\dfrac{3x}{\\\\red 3} & = \\\\dfrac{27}{\\\\red 3} \\\\\\\\[10pt] x & = 9 \\\\end{aligned}'}</E>
  
  <T>Thus, if <E>{'x'}</E> is 9, then the greatest integer, <E>{'x + 2'}</E>, is <E>{'\\\\boxed{11}'}</E></T>`
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.payload
      };
    default:
      return state;
  }
}
