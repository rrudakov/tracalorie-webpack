class TrackerStorage {
  /**
   * @param {number} [defaultLimit=2000] - Default calorie limit.
   * @returns {number}
   */
  static getCalorieLimit(defaultLimit = 2000) {
    const storageLimit = localStorage.getItem('calorieLimit');

    if (storageLimit === null) {
      return defaultLimit;
    } else {
      return parseInt(storageLimit);
    }
  }

  /**
   * @param {number} calorieLimit - Calories number to save.
   */
  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  /**
   * @param {number} defaultCalories - Default amount of total calories.
   * @returns {number}
   */
  static getTotalCalories(defaultCalories = 0) {
    const storageTotal = localStorage.getItem('totalCalories');

    if (storageTotal === null) {
      return defaultCalories;
    } else {
      return parseInt(storageTotal);
    }
  }

  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }

  /**
   * @returns {Array<Meal>}
   */
  static getMeals() {
    const storageMeals = localStorage.getItem('meals');

    if (storageMeals === null) {
      return [];
    } else {
      return JSON.parse(storageMeals);
    }
  }

  /**
   * @param {Meal} - Meal to save.
   */
  static saveMeal(meal) {
    const meals = TrackerStorage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  /**
   * @param {string} id - Meal ID to remove.
   */
  static removeMeal(id) {
    const updatedMeals = TrackerStorage.getMeals().filter(
      (meal) => meal.id !== id,
    );
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
  }

  /**
   * @returns {Array<Workout>}
   */
  static getWorkouts() {
    const storageWorkouts = localStorage.getItem('workouts');

    if (storageWorkouts === null) {
      return [];
    } else {
      return JSON.parse(storageWorkouts);
    }
  }

  /**
   * @param {Workout} workout - Workout to save.
   */
  static saveWorkout(workout) {
    const workouts = TrackerStorage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  /**
   * @param {string} id - Workout ID to remove.
   */
  static removeWorkout(id) {
    const updatedWorkouts = TrackerStorage.getWorkouts().filter(
      (workout) => workout.id !== id,
    );
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  }

  static clearAll() {
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');
  }
}

export default TrackerStorage;
