/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const ItemDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  flex: 0 0 49%;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Details = styled.div`
  font-size: 0.7rem;
  > * {
    margin: 0;
    padding: 0 0 0 10px;
  }
  ${(props) =>
    props.showFullScreen &&
    css`
      font-size: 1rem;
    `};
`;

const Image = styled.img`
  height: 40px;
  ${(props) =>
    props.showFullScreen &&
    css`
      height: 60px:
    `};
`;

export default function Item({ itemData, showFullScreen }) {
  const { price: total, quantity, gtin } = itemData;
  const { name, brand } = itemData.product;
  const [imagePath, setImagePath] = useState('');
  const [itemPrice, setItemprice] = useState(0);

  const getProductImage = async () => {
    const { data } = await axios.get(`/api/products/${gtin}`);
    setImagePath(data.path);
  };

  useEffect(() => {
    getProductImage();
    setItemprice((Math.round(total * 100) / 100).toFixed(2));
  }, []);

  return (
    <>
      <ItemDiv>
        <Image src={imagePath} alt={name} />
        <Details showFullScreen={showFullScreen}>
          <p className="title">{name}</p>
          <p className="brand">{brand}</p>
          <p className="data">
            {quantity} st &bull; {itemPrice} kr
          </p>
        </Details>
      </ItemDiv>
    </>
  );
}
