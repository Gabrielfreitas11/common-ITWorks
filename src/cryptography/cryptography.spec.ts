import { encrypt, decrypt } from './index';

describe('Encryption and Decryption functions', () => {
  test('should encrypt and decrypt correctly', () => {
    //Arrange

    //Act

    //Assert
    expect(encrypt('world')).not.toBeNull();
    expect(encrypt('world')).not.toEqual('world');
    expect(encrypt('openai')).toBe('¼Ä´¯ª·');

    // Test cases for decryption
    expect(decrypt('¼Ä´¯ª·')).toBe('openai');
  });
});
