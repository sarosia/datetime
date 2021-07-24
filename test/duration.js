const chai = require('chai');
const expect = chai.expect;
chai.should();
const Duration = require('../lib/duration');

describe('Duration', () => {
  it('milliSeconds', () => {
    Duration.milliSeconds(10).toMillis().should.equal(10);
    Duration.milliSeconds(1000).toString().should.equal('1s');
    Duration.milliSeconds(60 * 1000).toString().should.equal('1m');
    Duration.milliSeconds(60 * 60 * 1000).toString().should.equal('1h');

    (Duration.milliSeconds(10) < Duration.milliSeconds(20)).should.equal(true);
    (Duration.milliSeconds(10) > Duration.milliSeconds(20)).should.equal(false);
    (Duration.milliSeconds(10) - Duration.milliSeconds(10)).should.equal(0);
  });

  it('seconds', () => {
    Duration.seconds(10).toMillis().should.equal(10 * 1000);
    Duration.seconds(10).toString().should.equal('10s');
    Duration.seconds(60).toString().should.equal('1m');
    Duration.seconds(60 * 60).toString().should.equal('1h');
  });

  it('minutes', () => {
    Duration.minutes(10).toMillis().should.equal(10 * 60 * 1000);
    Duration.minutes(10).toString().should.equal('10m');
    Duration.minutes(60).toString().should.equal('1h');
  });

  it('hours', () => {
    Duration.hours(10).toMillis().should.equal(10 * 60 * 60 * 1000);
    Duration.hours(10).toString().should.equal('10h');
  });

  it('days', () => {
    Duration.days(10).toMillis().should.equal(10 * 24 * 60 * 60 * 1000);
    Duration.days(10).toString().should.equal('10d');
  });

  it('weeks', () => {
    Duration.weeks(10).toMillis().should.equal(7 * 10 * 24 * 60 * 60 * 1000);
    Duration.weeks(10).toString().should.equal('10w');
  });

  it('sleep', async () => {
    const startTime = Date.now();
    await (Duration.seconds(1)).sleep();
    const endTime = Date.now();
    expect(endTime - startTime).to.be.gt(1000);
  });

  for (const [str, duration] of [
    ['20ms', Duration.milliSeconds(20)],
    ['20s', Duration.seconds(20)],
    ['20m', Duration.minutes(20)],
    ['20h', Duration.hours(20)],
    ['20d', Duration.days(20)],
    ['20w', Duration.weeks(20)],
  ]) {
    it(`parse ${str} into Duration`, async () => {
      expect(Duration.parse(str).valueOf()).to.be.equal(duration.valueOf());
    });
  }
  it('parse', async () => {
    Duration.parse('20ms').should.eql(Duration.milliSeconds(20));
    Duration.parse('20s').should.eql(Duration.seconds(20));
    Duration.parse('20m').should.eql(Duration.minutes(20));
    Duration.parse('20h').should.eql(Duration.hours(20));
    Duration.parse('20d').should.eql(Duration.days(20));
    Duration.parse('20w').should.eql(Duration.weeks(20));
  });
});
