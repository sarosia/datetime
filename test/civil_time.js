const {CivilTime, Seconds, Minutes, Hours, Days, Weeks} = require('../index');
const {expect} = require('chai');

describe('CivilTime', () => {
  const datetime = new CivilTime(1989, 6, 4, 22, 55, 55);

  for (const [args, expected] of [
    [[], new Date(0)],
    [[new Date(1989, 5, 4)], new Date(1989, 5, 4)],
    [[new CivilTime(1989, 6, 4)], new Date(1989, 5, 4)],
    [[1989], new Date(1989, 0)],
    [[1989, 6], new Date(1989, 5)],
    [[1989, 6, 4], new Date(1989, 5, 4)],
    [[1989, 6, 4, 22], new Date(1989, 5, 4, 22)],
    [[1989, 6, 4, 22, 55], new Date(1989, 5, 4, 22, 55)],
    [[1989, 6, 4, 22, 55, 55], new Date(1989, 5, 4, 22, 55, 55)],
  ]) {
    it(`Create CivilTime with ${args.join(',')}`, () => {
      expect(new CivilTime(...args).toDate()).eql(expected);
    });
  }

  for (const [args, error] of [
    [['x'], 'Unsupported arguments for CivilTime(): x'],
    [[1, 'x'], 'CivilTime accepts list of numbers, but got 1,x.'],
  ]) {
    it(`Throw an error when new CivilTime with ${args.join(',')}`, () => {
      expect(() => {
        new CivilTime(...args);
      }).to.throw(error);
    });
  }

  for (const [addition, expected] of [
    [new Seconds(10), new CivilTime(1989, 6, 4, 22, 56, 5)],
    [new Minutes(10), new CivilTime(1989, 6, 4, 23, 5, 55)],
    [new Hours(10), new CivilTime(1989, 6, 5, 8, 55, 55)],
    [new Days(10), new CivilTime(1989, 6, 14, 22, 55, 55)],
    [new Weeks(10), new CivilTime(1989, 8, 13, 22, 55, 55)],
  ]) {
    it(`Adding ${addition} to ${datetime}`, () => {
      const actual = datetime.add(addition);
      expect(actual.valueOf()).eql(expected.valueOf());
    });
  };

  for (const [field, expected] of [
    ['year', 1989],
    ['month', 6],
    ['day', 4],
    ['hour', 22],
    ['minute', 55],
    ['second', 55],
    ['dayOfWeek', 0],
  ]) {
    it(`Getting ${field} from ${datetime}`, () => {
      expect(datetime[field]).equal(expected);
    });
  };

  it('Sub', () => {
  });
});
