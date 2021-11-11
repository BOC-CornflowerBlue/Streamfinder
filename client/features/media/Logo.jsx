import React, { useState } from 'react';
import MediaModal from './MediaModal.jsx';

const Logo = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <div>
      <a
        href={`//${props.website}`}
        target='_blank'>
        <img
          className='streamingLogo'
          src={`${props.logo}`}
          key={`logo-${props.i}`}
          alt={`${props.name} logo`}
          onClick={(e) => setShow(true) }
        />
      </a>
      <MediaModal onClose={handleClose} show={show} title={props.title} name={props.name}
      // also pass media id prop
      />
    </div>
  );
};

export default Logo;
