import { price } from './index';

describe('price function', () => {
  test('should format number into Brazilian currency', () => {
    //Arrange

    //Act

    //Assert
    expect(price(1000)).toBe('R$ 1.000,00');
    expect(price(1234.56)).toBe('R$ 1.234,56');
    expect(price(999999.99)).toBe('R$ 999.999,99');
    expect(price(0)).toBe('R$ 0,00');
    expect(price(-50)).toBe('-R$ 50,00');
  });
});
