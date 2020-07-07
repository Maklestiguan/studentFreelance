import React, { useState, useReducer, useEffect } from 'react';
import { MDBAlert, MDBAnimation } from 'mdbreact';
import { connect } from 'react-redux';
import './commonStyles.css';


const Messages = props => {
  const [isVisible, setVisible] = useState(false);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if (props.messages.color) {
      setVisible(true);
    }
    setTimeout(setVisible, 9500, false)
  }, [props.messages]);

  let message;
  let messages = [];
  if (Object.keys(props.messages).length) {
    if (typeof props.messages.message === 'string') {
      message = props.messages.message;
      messages.push(message)
    }
    if (typeof props.messages.message === 'object') {
      for (const [key, value] of Object.entries(props.messages.message)) {
        message = `${key}: ${value}`;
        messages.push(message)
      }
      // console.log(messages);
    }
  }

  return (
    <>
      {
        isVisible &&
          messages.map((message, index) => (
            <MDBAnimation delay="5s" type="fadeOut" duration="2s" >
              <MDBAlert color={props.messages.color} dismiss className="text-center" key={message.split(":")[0]}>
                {message}
              </MDBAlert>
            </MDBAnimation>
          ))
      }
    </>
  )
};


const mapStateToProps = state => ({ messages: state.messages });


export default connect(mapStateToProps)(Messages);
