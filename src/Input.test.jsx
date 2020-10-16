import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (infoValue = {}) => render((
    <Input
      onChange={handleChange}
      onClick={handleClick}
      infoValue={infoValue}
    />
  ));

  context('when typing text with typed text', () => {
    it('render typed text', () => {
      const infoValue = {
        nameTitle: '치킨',
        classification: '천상계',
        location: '헤븐',
      };

      const { getByDisplayValue } = renderInput(infoValue);

      expect(getByDisplayValue('치킨')).not.toBeNull();
      expect(getByDisplayValue('천상계')).not.toBeNull();
      expect(getByDisplayValue('헤븐')).not.toBeNull();
    });

    it('calls onChange function', () => {
      const { getByPlaceholderText } = renderInput();

      const placeHolders = ['이름', '분류', '장소'];

      placeHolders.forEach((placeholder) => {
        fireEvent.change(getByPlaceholderText(`${placeholder}`),
          { target: { value: 'randomText' } });

        expect(handleChange).toBeCalled();

        expect(getByPlaceholderText(`${placeholder}`)).toHaveValue('randomText');
      });
    });
  });

  context('when typing text with not typed text', () => {
    it('not render any text', () => {
      const infoValue = {};

      const placeHolders = ['이름', '분류', '장소'];

      const { getByPlaceholderText } = renderInput(infoValue);

      placeHolders.forEach((placeholder) => {
        expect(getByPlaceholderText(`${placeholder}`)).toHaveValue('');
      });
    });
  });

  context('when one is being typed', () => {
    it('The other value does not change', () => {
      const infoValue = {
        nameTitle: '치킨',
        classification: '천상계',
        location: '헤븐',
      };

      const { getByPlaceholderText } = renderInput(infoValue);

      fireEvent.change(getByPlaceholderText('이름'), { target: { value: '피자' } });

      expect(getByPlaceholderText('분류')).toHaveValue('천상계');
      expect(getByPlaceholderText('장소')).toHaveValue('헤븐');
    });
  });

  describe('등록 button', () => {
    context('when click', () => {
      it('calls onClick function', () => {
        const { getByText } = renderInput();

        const button = getByText('등록');

        fireEvent.click(button);

        expect(handleClick).toBeCalled();
      });

      it('Empty all input value', () => {
        const { getByText, getByPlaceholderText } = renderInput();

        const button = getByText('등록');

        fireEvent.click(button);

        const placeHolders = ['이름', '분류', '장소'];

        placeHolders.forEach((placeholder) => {
          expect(getByPlaceholderText(`${placeholder}`)).toHaveValue('');
        });
      });
    });
  });
});
