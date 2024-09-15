class Meal {
  /**
   * @param {string} name - Meal name.
   * @param {number} calories - Amount of calories.
   */
  constructor(name, calories) {
    /** @type {string} */
    this.id = Math.random().toString(16).slice(2);

    /** @type {string} */
    this.name = name;

    /** @type {number} */
    this.calories = calories;
  }
}

class Workout {
  /**
   * @param {string} name - Meal name.
   * @param {number} calories - Amount of calories.
   */
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

export { Meal, Workout };
