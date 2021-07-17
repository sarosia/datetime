const chai = require('chai');
const {
  Duration,
  MilliSeconds,
  Seconds,
  Minutes,
  Hours,
  Days,
  Weeks,
} = require('../lib/duration');
chai.should();

describe('Duration', () => {
  it('MilliSeconds', () => {
    new MilliSeconds(10).toMillis().should.equal(10);
    new MilliSeconds(1000).toString().should.equal('1s');
    new MilliSeconds(60 * 1000).toString().should.equal('1m');
    new MilliSeconds(60 * 60 * 1000).toString().should.equal('1h');

    (new MilliSeconds(10) < new MilliSeconds(20)).should.equal(true);
    (new MilliSeconds(10) > new MilliSeconds(20)).should.equal(false);
    (new MilliSeconds(10) - new MilliSeconds(10)).should.equal(0);
  });

  it('Seconds', () => {
    new Seconds(10).toMillis().should.equal(10 * 1000);
    new Seconds(10).toString().should.equal('10s');
    new Seconds(60).toString().should.equal('1m');
    new Seconds(60 * 60).toString().should.equal('1h');
  });

  it('Minutes', () => {
    new Minutes(10).toMillis().should.equal(10 * 60 * 1000);
    new Minutes(10).toString().should.equal('10m');
    new Minutes(60).toString().should.equal('1h');
  });

  it('Hours', () => {
    new Hours(10).toMillis().should.equal(10 * 60 * 60 * 1000);
    new Hours(10).toString().should.equal('10h');
  });

  it('Days', () => {
    new Days(10).toMillis().should.equal(10 * 24 * 60 * 60 * 1000);
    new Days(10).toString().should.equal('10d');
  });

  it('Weeks', () => {
    new Weeks(10).toMillis().should.equal(7 * 10 * 24 * 60 * 60 * 1000);
    new Weeks(10).toString().should.equal('10w');
  });

  it('sleep', async () => {
    await (new Seconds(1)).sleep();
  });

  it('parse', async () => {
    Duration.parse('20ms').should.eql(new MilliSeconds(20));
    Duration.parse('20s').should.eql(new Seconds(20));
    Duration.parse('20m').should.eql(new Minutes(20));
    Duration.parse('20h').should.eql(new Hours(20));
    Duration.parse('20d').should.eql(new Days(20));
    Duration.parse('20w').should.eql(new Weeks(20));
  });
});
