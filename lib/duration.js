class Duration {
  #millis = 0;

  constructor(millis) {
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

  static parse(str) {
    const matches = str.match(/^([0-9]+)([a-z]+)$/);
    if (matches) {
      const num = parseInt(matches[1]);
      const suffix = matches[2];
      switch (suffix) {
        case 'ms':
          return new MilliSeconds(num);
        case 's':
          return new Seconds(num);
        case 'm':
          return new Minutes(num);
        case 'h':
          return new Hours(num);
        case 'd':
          return new Days(num);
        case 'w':
          return new Weeks(num);
      }
    }
    throw new Error(`Cannot parse "${str}" into duration.`);
  }

  async sleep() {
    return new Promise((resolveFunc, rejectFunc) => {
      setTimeout(resolveFunc, this.toMillis()).unref();
    });
  }
}

class MilliSeconds extends Duration {
  constructor(milliSeconds) {
    super(milliSeconds);
  }
}

class Seconds extends Duration {
  constructor(seconds) {
    super(seconds * 1000);
  }
}

class Minutes extends Duration {
  constructor(minutes) {
    super(minutes * 60 * 1000);
  }
}

class Hours extends Duration {
  constructor(hours) {
    super(hours * 60 * 60 * 1000);
  }
}

class Days extends Duration {
  constructor(days) {
    super(days * 24 * 60 * 60 * 1000);
  }
}

class Weeks extends Duration {
  constructor(weeks) {
    super(weeks * 7 * 24 * 60 * 60 * 1000);
  }
}

module.exports = {
  Duration,
  MilliSeconds,
  Seconds,
  Minutes,
  Hours,
  Days,
  Weeks,
};
