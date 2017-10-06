import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

export const JsonDropZone = (props) => {  
  const style = classNames(
    'dropzone', 
    props.dragDiabled ? 'dropzone-disable': 'dropzone-enable'
  );

  const dropMsg = <p className="dropzone-message">Drop your KEY FILE here. (JSON file only)</p>;

  return props.dragDiabled
    ? null
    : (
      <Dropzone 
        className={style} 
        disabled={props.dragDiabled}
        multiple={false} 
        onDrop={props.onDrop}>
        {dropMsg}
      </Dropzone>
    );
};