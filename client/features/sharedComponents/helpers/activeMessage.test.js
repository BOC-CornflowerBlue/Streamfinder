import activeMessage from './activeMessage.js';
import 'regenerator-runtime/runtime';

describe('Test activeMessage.js', () => {
  it('Should callback within 400ms', async () => {
    const mockFn1 = jest.fn(() => {});
    const mockFn2 = jest.fn(activeMessage('test', mockFn1, 200, 400));
    await new Promise((r) => setTimeout(r, 1000));
    expect(mockFn1).toHaveBeenCalled();
  });
});
