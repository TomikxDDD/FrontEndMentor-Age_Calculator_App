import { Color } from "../enums/Color.js";
const MIN_DAY = 1;
const MAX_DAY = 31;
const MIN_MONTH = 1;
const MAX_MONTH = 12;
let currentYearSelected;
let leapYear;
let months30DaysMonths = [4, 6, 9, 11]; // 1... January, 12.. December
let monthWith30DaysSelected;
let monthWith29DaysSelected;
let monthWith28DaysSelected;
const destructContainer = (HTMLContainer) => {
    let inputField = HTMLContainer.querySelector('[id*="input"]');
    let inputLabel = HTMLContainer.querySelector('[class*="label"]');
    let inputHint = HTMLContainer.querySelector('[class*="hint"]');
    return [inputField, inputLabel, inputHint];
};
export const formatNumberToTwoDigits = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
};
export const validateYear = (year, currentYear, InputContainer) => {
    const [inputField, inputLabel, inputHint] = destructContainer(InputContainer);
    leapYear = year % 4 === 0 ? true : false;
    currentYearSelected = year === currentYear ? true : false;
    if (year > currentYear) {
        inputField.style.borderColor = Color.RED;
        inputLabel.style.color = Color.RED;
        inputHint.innerText = "Must be in the past";
        inputHint.style.display = "block";
        return false;
    }
    else {
        inputField.style.borderColor = Color.LIGHTGRAY;
        inputLabel.style.color = Color.BLACK;
        inputHint.style.display = "none";
        return true;
    }
};
export const validateMonth = (month, currentMonth, formInputContainer) => {
    const [inputField, inputLabel, inputHint] = destructContainer(formInputContainer);
    monthWith30DaysSelected = months30DaysMonths.indexOf(month) !== -1 ? true : false;
    console.log(month, leapYear);
    monthWith29DaysSelected = month === 2 && leapYear ? true : false;
    monthWith28DaysSelected = month === 2 && !leapYear ? true : false;
    console.log(`index of the month: ${month}; 30 days: ${monthWith30DaysSelected}, 29 days: ${monthWith29DaysSelected}, 28 days: ${monthWith28DaysSelected}; \n leap year: ${leapYear}`);
    if (currentYearSelected) {
        if (month > currentMonth) {
            inputField.style.borderColor = Color.RED;
            inputLabel.style.color = Color.RED;
            inputHint.innerText = "Must be in the past";
            inputHint.style.display = "block";
            return false;
        }
        else {
            inputField.style.borderColor = Color.LIGHTGRAY;
            inputLabel.style.color = Color.BLACK;
            inputHint.style.display = "none";
        }
    }
    if (month > MAX_MONTH || month < MIN_MONTH) {
        inputField.style.borderColor = Color.RED;
        inputLabel.style.color = Color.RED;
        inputHint.innerText = "Must be a valid month";
        inputHint.style.display = "block";
        return false;
    }
    else {
        inputField.style.borderColor = Color.LIGHTGRAY;
        inputLabel.style.color = Color.BLACK;
        inputHint.style.display = "none";
        return true;
    }
};
export const validateDay = (day, currentDay, formInputContainer) => {
    const [inputField, inputLabel, inputHint] = destructContainer(formInputContainer);
    if (day > MAX_DAY || day < MIN_DAY || (monthWith28DaysSelected && day > 28) || (monthWith29DaysSelected && day > 29) || (monthWith30DaysSelected && day > 30)) {
        inputField.style.borderColor = Color.RED;
        inputLabel.style.color = Color.RED;
        inputHint.innerText = "Must be a valid day";
        inputHint.style.display = "block";
        return false;
    }
    else {
        inputField.style.borderColor = Color.LIGHTGRAY;
        inputLabel.style.color = Color.BLACK;
        inputHint.style.display = "none";
        return true;
    }
};
