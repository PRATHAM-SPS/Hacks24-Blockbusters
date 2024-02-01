import React from 'react';
import domtoimage from 'dom-to-image';
import { v4 as uuidv4 } from 'uuid';

const Dom_To_Image = ({ state }) => {
  const capture = () => {
    const node = document.getElementById('captureMe');

    domtoimage.toPng(node)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'captured-image.png';
        link.click();
      })
      .catch(function (error) {
        console.error('Error capturing the DOM to image:', error);
      });
  };

  return (
    <div>
      <div id="captureMe">
        <h1>Hello, DOM to Image in React!</h1>
        <p>This is a sample DOM element to be captured.</p>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${uuidv4()}`} alt="" srcset="" />
      </div>

      <button onClick={capture}>Capture and Download</button>
    </div>
  );
};

export default Dom_To_Image;
