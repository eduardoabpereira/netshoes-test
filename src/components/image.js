import React from 'react';

const Image = ({
  image,
  alt,
  className,
  ...props
}) => (
  <img src={image} alt={alt} className={className} {...props} />
);

export default Image;