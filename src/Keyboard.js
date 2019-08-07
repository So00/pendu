import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

/**
 * Change layout of the keyboard because we only need a-z letter
 */
let layoutKeyboard = {
    "default": [
      'a z e r t y u i o p',
      'q s d f g h j k l',
      'w x c v b m n',
    ],
    "shift": [
      'a z e r t y u i o p',
      'q s d f g h j k l m',
      'w x c v b n',
    ]
};

function KeyboardHangMan(props)
{
  return (
    <Keyboard
      layout={layoutKeyboard}
      onKeyPress={props.onKeyPress}
      buttonTheme={[
          {
            class: "played",
            buttons: props.played.join(" ")
          }
      ]}
  />
  );
}

export default KeyboardHangMan;