import {testFunction} from './test.import';


describe('Test component', () => {
  it('has a dummy test', () => {
    const result = testFunction();

    expect(result).toEqual(42);
  });
});
