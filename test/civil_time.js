const {CivilTime, Duration} = require('../index');
const {expect} = require('chai');

describe('CivilTime', () => {
  const datetime = new CivilTime(1989, 6, 4, 22, 55, 55);

  it(`CivilTime.now()`, () => {
    CivilTime.now();
  });

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
    [["1989/06/04"], new Date(1989, 5, 4)],
  ]) {
    it(`Create CivilTime with ${args.join(',')}`, () => {
      expect(new CivilTime(...args).toDate()).eql(expected);
    });
  }

  for (const [args, error] of [
    [[{}], 'Unsupported arguments for CivilTime(): [object Object]'],
    [[1, 'x'], 'CivilTime accepts list of numbers, but got 1,x.'],
  ]) {
    it(`Throw an error when new CivilTime with ${args.join(',')}`, () => {
      expect(() => {
        new CivilTime(...args);
      }).to.throw(error);
    });
  }

  for (const [addition, expected] of [
    [Duration.seconds(10), new CivilTime(1989, 6, 4, 22, 56, 5)],
    [Duration.minutes(10), new CivilTime(1989, 6, 4, 23, 5, 55)],
    [Duration.hours(10), new CivilTime(1989, 6, 5, 8, 55, 55)],
    [Duration.days(10), new CivilTime(1989, 6, 14, 22, 55, 55)],
    [Duration.weeks(10), new CivilTime(1989, 8, 13, 22, 55, 55)],
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
});
