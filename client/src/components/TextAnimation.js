

import MovingText from 'react-moving-text'



const TextAnimation= ({text})=>{

   

return(
    
    <MovingText
    type="fadeInFromLeft"
    duration="1000ms"
    delay="0s"
    direction="normal"
    timing="ease-in"
    iteration="1"
    fillMode="backwards">
   {text}
  </MovingText>
)

}



export default TextAnimation;

