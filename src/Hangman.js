import React from 'react';
import { VelocityComponent } from "velocity-react";

function HangMan(props)
{
  return (
    <svg height="30vh" width="30vh">
      <VelocityComponent animation={props.tries === 8 ? {translateY: "50%"} : {translateY: "0%"}} duration={500} delay={1000}>
        <g id="body">
          <g id="head" className={props.tries >= 6 ? "" : "hide"}>
            <circle cx="50%" cy="20%" r="5%" stroke="black" strokeWidth="1" fill="white"/>
              <g id="rEyes" className={ props.tries === 8 ? "hide" : ""}>
                <circle cx="48.25%" cy="20%" r="1%"/>
                <circle cx="51.75%" cy="20%" r="1%"/>
              </g>
              <g id="xEyes" className={ props.tries === 8 ? "" : "hide"}>
                <line x1="47.5%" y1="19.5%" x2="49%" y2="21%"/>
                <line x1="51%" y1="19.5%" x2="52.5%" y2="21%"/>
                <line x1="47.5%" y1="21%" x2="49%" y2="19.5%"/>
                <line x1="51%" y1="21%" x2="52.5%" y2="19.5%"/>
              </g>
          </g>
          <line x1="50%" y1="25%" x2="50%" y2="37.5%" className={props.tries >= 6 ? "" : "hide"}/>
          <VelocityComponent animation={props.tries === 8 ? {y2: "+= 15%"} : {y2: "35%"} } duration={500} >
            <VelocityComponent animation={props.tries === 8 ? {y2: "-= 15%"} : {y2: "35%"} } duration={500} delay={1000}>
              <line id="armL" x1="50%" y1="30%" x2="42.5%" y2="35%" className={props.tries >= 7 ? "" : "hide"}/>
            </VelocityComponent>
          </VelocityComponent>
          <VelocityComponent animation={props.tries === 8 ? {y2: "+= 15%"} : {y2: "35%"} } duration={500} >
            <VelocityComponent animation={props.tries === 8 ? {y2: "-= 15%"} : {y2: "35%"} } duration={500} delay={1000}>
              <line id="armR" x1="50%" y1="30%" x2="57.5%" y2="35%" className={props.tries >= 7 ? "" : "hide"}/>
            </VelocityComponent>
          </VelocityComponent>
          <line id="legL" x1="50%" y1="37.5%" x2="45%" y2="47.5%" className={props.tries === 8 ? "" : "hide"}/>
          <line id="legR" x1="50%" y1="37.5%" x2="55%" y2="47.5%" className={props.tries === 8 ? "" : "hide"}/>
        </g>
      </VelocityComponent>
      <line x1="2.5%" y1="62.5%" x2="37.5%" y2="62.5%" className={props.tries >= 1 ? "" : "hide"}/>
      <VelocityComponent animation={props.tries === 8 ? {rotateZ: "90deg"} : {rotateZ: "0deg"} } duration={1000}>
        <line id="door1" x1="37.5%" y1="62.5%" x2="50%" y2="62.5%" className={props.tries >= 1 ? "" : "hide"}/>
      </VelocityComponent>
      <VelocityComponent animation={props.tries === 8 ? {rotateZ: "-90deg"} : {rotateZ: "0deg"} } duration={1000}>
        <line  id="door2" x1="50%" y1="62.5%" x2="62.5%" y2="62.5%" className={props.tries >= 1 ? "" : "hide"}/>
      </VelocityComponent>
      <line x1="62.5%" y1="62.5%" x2="97.5%" y2="62.5%" className={props.tries >= 1 ? "" : "hide"}/>
      <line x1="25%" y1="62.5%" x2="25%" y2="5%" className={props.tries >= 2 ? "" : "hide"}/>
      <line x1="25%" y1="5%" x2="50%" y2="5%" className={props.tries >= 3 ? "" : "hide"}/>
      <VelocityComponent animation={props.tries === 8 ? {y2: "+= 50%"} : {y2: "15%"} } duration={500} delay={1000}>
        <line id="rope" x1="50%" y1="5%" x2="50%" y2="15%" className={props.tries >= 4 ? "" : "hide"}/>
      </VelocityComponent>
    </svg>
  );
}

export default HangMan;