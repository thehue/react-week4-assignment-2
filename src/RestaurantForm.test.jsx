import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { render, fireEvent } from '@testing-library/react';

import RestaurantForm from './RestaurantForm';

test('RestaurantForm', () => {
  const restaurant = {
    name: '마법사주방',
    category: '이탈리안',
    address: '서울시 강남구',
  };

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { getByText, getByDisplayValue } = render((
    <RestaurantForm
      restaurant={restaurant}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  fireEvent.change(getByDisplayValue('서울시 강남구'), {
    target: { value: '서울시 강남구 역삼동' },
  });

  expect(handleChange).toBeCalledWith({
    name: 'address',
    value: '서울시 강남구 역삼동',
  });

  expect(getByDisplayValue('마법사주방')).not.toBeNull();
  expect(getByDisplayValue('이탈리안')).not.toBeNull();
  expect(getByDisplayValue('서울시 강남구')).not.toBeNull();
  expect(getByText(/등록/)).not.toBeNull();

  fireEvent.click(getByText(/등록/));

  expect(handleClick).toBeCalled();
});