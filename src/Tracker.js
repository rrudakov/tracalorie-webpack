import TrackerStorage from './Storage';

class CalorieTracker {
  constructor() {
    this._calorieLimit = TrackerStorage.getCalorieLimit();
    this._totalCalories = TrackerStorage.getTotalCalories(0);

    /** @type {Array<Meal>} */
    this._meals = TrackerStorage.getMeals();

    /** @type {Array<Workout>} */
    this._workouts = TrackerStorage.getWorkouts();

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    document.getElementById('limit').value = this._calorieLimit;
  }

  /**
   * @param {Meal} meal - Meal to add.
   */
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    TrackerStorage.updateTotalCalories(this._totalCalories);
    TrackerStorage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }

  /**
   * @param {Workout} workout - Workout to add.
   */
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    TrackerStorage.updateTotalCalories(this._totalCalories);
    TrackerStorage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  /**
   * @param {string} id - Meal ID.
   */
  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      TrackerStorage.updateTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
      TrackerStorage.removeMeal(id);
      this._render();
    }
  }

  /**
   * @param {string} id - Workout ID.
   */
  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      TrackerStorage.updateTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      TrackerStorage.removeWorkout(id);
      this._render();
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    TrackerStorage.clearAll();
    this._render();
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    TrackerStorage.setCalorieLimit(calorieLimit);
    this._displayCaloriesLimit();
    this._render();
  }

  // Private methods.

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0,
    );
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0,
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const caloriesProgressEl = document.getElementById('calorie-progress');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light',
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger',
      );
      caloriesProgressEl.classList.remove('bg-success');
      caloriesProgressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger',
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      caloriesProgressEl.classList.remove('bg-danger');
      caloriesProgressEl.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const caloriesProgressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.max(0, Math.min(percentage, 100));
    caloriesProgressEl.style.width = `${width}%`;
  }

  /**
   * @param {Meal} meal - Meal to display.
   */
  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    mealsEl.appendChild(mealEl);
  }

  /**
   * @param {Workout} workout - Workout to display.
   */
  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    workoutsEl.appendChild(workoutEl);
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

export default CalorieTracker;
