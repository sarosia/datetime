class Duration {
  static milliSeconds(millis) {
    return new DurationImpl(millis);
  }

  static seconds(seconds) {
    return Duration.milliSeconds(seconds * 1000);
  }

  static minutes(minutes) {
    return Duration.seconds(minutes * 60);
  }

  static hours(hours) {
    return Duration.minutes(hours * 60);
  }

  static days(days) {
    return Duration.hours(days * 24);
  }

  static weeks(weeks) {
    return Duration.days(weeks * 7);
  }

  static parse(str) {
    const matches = str.match(/^([0-9]+)([a-z]+)$/);
    if (matches) {
      const num = parseInt(matches[1]);
      const suffix = matches[2];
      switch (suffix) {
        case 'ms':
          return Duration.milliSeconds(num);
        case 's':
          return Duration.seconds(num);
        case 'm':
          return Duration.minutes(num);
        case 'h':
          return Duration.hours(num);
        case 'd':
          return Duration.days(num);
        case 'w':
          return Duration.weeks(num);
      }
    }
    throw new Error(`Cannot parse "${str}" into duration.`);
  }

  constructor() {
    if (this.constructor === Duration) {
      throw new Error('Duration is not instantiatable.');
    }
  }
}

class DurationImpl extends Duration {
  #millis = 0;

  constructor(millis) {
    super();
    this.#millis = millis;
  }

  toMillis() {
    return this.#millis;
  }

  add(d) {
    return new Duration(this.#millis + d.toMillis());
  }

  substract(d) {
    return new Duration(this.#millis - d.toMillis());
  }

  compare(d) {
    return this.#millis - d.toMillis();
  }

  equals(d) {
    return this.#millis === d.toMillis();
  }

  valueOf() {
    return this.#millis;
  }

  toString() {
    let num = this.#millis;
    if (num % 1000 !== 0) {
      return `${num}ms`;
    }
    num = num / 1000;
    if (num % 60 !== 0) {
      return `${num}s`;
    }
    num = num / 60;
    if (num % 60 !== 0) {
      return `${num}m`;
    }
    num = num / 60;
    if (num % 24 !== 0) {
      return `${num}h`;
    }
    num = num / 24;
    if (num % 7 !== 0) {
      return `${num}d`;
    }
    num = num / 7;
    return `${num}w`;
  }

  async sleep() {
    return new Promise((resolveFunc, rejectFunc) => {
      setTimeout(resolveFunc, this.toMillis()).unref();
    });
  }
}

module.exports = Duration;
