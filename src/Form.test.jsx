import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import fixture from '../__fixtuers__/fixture';

import Form from './Form';

const handleChangeInput = jest.fn();
const handleClickAddRestaurant = jest.fn();

describe('Form', () => {
  const { inputInfos } = fixture;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderForm() {
    return render((
      <Form
        inputInfos={inputInfos}
        onChangeInput={handleChangeInput}
        onClickAddRestautant={handleClickAddRestaurant}
      />
    ));
  }

  it('renders 3 inputs with different placeholder and name attirbute', () => {
    const { getByPlaceholderText } = renderForm();

    inputInfos.forEach(({ name, placeholder, value }) => {
      const input = getByPlaceholderText(placeholder);

      expect(input).toHaveDisplayValue(value);
      expect(input).toHaveAttribute('name', name);

      fireEvent.change(input,
        { target: { value: '쏘이연남' } });
    });

    expect(handleChangeInput).toBeCalledTimes(inputInfos.length);
  });

  it('renders add restaurant button', () => {
    const { getByText } = renderForm();

    fireEvent.click(getByText('등록'));

    expect(handleClickAddRestaurant).toBeCalled();
  });
});
