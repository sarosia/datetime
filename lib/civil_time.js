const {Duration} = require('./duration');

function newDateFromArguments(...value) {
  if (value.length === 0) {
    return new Date(0);
  }
  if (value[0] instanceof Date) {
    return new Date(value[0].getTime());
  }
  if (value[0] instanceof CivilTime) {
    return new Date(value[0].valueOf());
  }
  if (typeof value[0] == 'number' || value[0] instanceof Number) {
    for (const v of value) {
      if (typeof v != 'number' && !(v instanceof Number)) {
        throw new TypeError(
            `CivilTime accepts list of numbers, but got ${value.join(',')}.`);
      }
    }
    if (value.length == 1) {
      value[1] = 0;
    } else {
      value[1] = value[1] - 1;
    }
    return new Date(...value);
  }
  throw new TypeError(
      `Unsupported arguments for CivilTime(): ${value.join(',')}`);
}

/*
 * A CivilTime represents a DateTime, but follow the behavior of the C++
 * version of absl::CivilTime. CivilTime is not accessible outside of this
 * module, users should create an instance of one of its subclasses instead.
 *
 * There are a few major differences between CivilTime and javascript builtin
 * DateTime, namely,
 *
 * 1. The constructor takes only a CivilTime, or a list of argument from year,
 *    month, day, hour, minute to second. If only one number is provided to the
 *    ctor, it is treated as the year instead of an epoch.
 * 2. Month is starting from 1 instead of 0. For example, CivilDay(1989, 6, 4)
 *    means 1989/6/4 instead of 1989/7/4.
 */
class CivilTime {
  #date;

  static now() {
    return new CivilTime(new Date());
  }

  constructor(...value) {
    this.#date = newDateFromArguments(...value);
  }

  add(value) {
    if (value instanceof Duration) {
      return new CivilTime(new Date(this + value));
    }
    throw new Error(`Cannot add a ${value.constructor.name} to a DateTime.`);
  }

  sub(value) {
    if (value instanceof Duration) {
      return new DateTime(new Date(this - value));
    }
    if (value instanceof DateTime) {
      return new Duration(this - value);
    }
    throw new Error(
        `Cannot substract a ${value.constructor.name} from a DateTime.`);
  }

  get year() {
    return this.#date.getFullYear();
  }

  get month() {
    return this.#date.getMonth() + 1;
  }

  get dayOfWeek() {
    return this.#date.getDay();
  }

  get day() {
    return this.#date.getDate();
  }

  get hour() {
    return this.#date.getHours();
  }

  get minute() {
    return this.#date.getMinutes();
  }

  get second() {
    return this.#date.getSeconds();
  }

  toDate() {
    return new Date(this.#date);
  }

  valueOf() {
    return this.#date.getTime();
  }

  toString() {
    return this.#date.toISOString();
  }
}

module.exports = CivilTime;
