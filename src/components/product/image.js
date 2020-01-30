import React from 'react';


/**
 * @method Image
 * @param {*} image caminho da imagem do produto
 * @param {*} alt texto alternativo
 * @param {*} className class de estilos do componente
 * @param {*} props rest props
 * @description componente de imagem do produto
 */
const Image = ({
  image,
  alt,
  className,
  ...props
}) => (
  <img src={image} alt={alt} className={className} {...props} />
);

export default Image;