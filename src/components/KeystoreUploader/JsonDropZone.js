import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

export const JsonDropZone = (props) => {  
  const style = classNames(
    'dropzone', 
    props.dragDisabled ? 'dropzone-disable': 'dropzone-enable'
  );

  const dropMsg = 
    <div className="dropzone-message">
      <p>Drop your KEY FILE here. </p>
      <p><span>( JSON file only )</span></p>
    </div>;

  return props.dragDisabled
    ? null
    : (
      <Dropzone 
        className={style} 
        disabled={props.dragDisabled}
        multiple={false} 
        onDrop={props.onDrop}>
        {dropMsg}
      </Dropzone>
    );
};