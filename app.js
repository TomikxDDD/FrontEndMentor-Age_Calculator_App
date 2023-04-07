import { validateMonth, validateYear, validateDay, formatNumberToTwoDigits } from "./functions/Functions.js";
// Select all necessary HTML elements
const inputFieldDay = document.querySelector("#input-day");
const inputFieldMonth = document.querySelector("#input-month");
const inputFieldYear = document.querySelector("#input-year");
const inputDayContainer = document.querySelector(".input-day-container");
const inputMonthContainer = document.querySelector(".input-month-container");
const inputYearContainer = document.querySelector(".input-year-container");
const outputYearsSpan = document.querySelector(".output-years__number");
const outputMonthsSpan = document.querySelector(".output-months__number");
const outputDaysSpan = document.querySelector(".output-days__number");
const btn = document.querySelector(".btn");
// Initiate variables
let dateValid;
let dayValid;
let monthValid;
let yearValid;
// Event listeners
inputFieldDay.addEventListener("change", (e) => {
    inputFieldDay.value = formatNumberToTwoDigits(inputFieldDay.valueAsNumber);
});
inputFieldMonth.addEventListener("change", (e) => {
    inputFieldMonth.value = formatNumberToTwoDigits(inputFieldMonth.valueAsNumber);
});
btn.addEventListener("click", (e) => {
    const currentDate = new Date();
    const inputDate = new Date();
    inputDate.setFullYear(inputFieldYear.valueAsNumber);
    inputDate.setMonth(inputFieldMonth.valueAsNumber - 1);
    inputDate.setDate(inputFieldDay.valueAsNumber - 1);
    yearValid = validateYear(inputFieldYear.valueAsNumber, currentDate.getFullYear(), inputYearContainer);
    monthValid = validateMonth(inputFieldMonth.valueAsNumber, currentDate.getMonth(), inputMonthContainer);
    dayValid = validateDay(inputFieldDay.valueAsNumber, currentDate.getDay(), inputDayContainer);
    dateValid = dayValid && monthValid && yearValid;
    if (dateValid) {
        let dateDifferenceInMilliseconds = currentDate.getTime() - inputDate.getTime();
        let dateDifferenceDate = new Date(dateDifferenceInMilliseconds);
        let dateOrigin = new Date(0);
        let days = dateDifferenceDate.getDate() - dateOrigin.getDate();
        let months = dateDifferenceDate.getMonth() - dateOrigin.getMonth();
        let years = dateDifferenceDate.getFullYear() - dateOrigin.getFullYear();
        outputDaysSpan.innerText = days.toString();
        outputMonthsSpan.innerText = months.toString();
        outputYearsSpan.innerText = years.toString();
    }
});
