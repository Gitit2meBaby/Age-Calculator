const userDay = document.querySelector('#day')
const userMonth = document.querySelector('#month')
const userYear = document.querySelector('#year')
const button = document.querySelector('#button')
const allInputs = document.querySelectorAll('.input-fields')
const dateTitles = document.querySelectorAll('.date-titles')
const errorContainer = document.querySelector("#error")

const dayDisplay = document.querySelector('#displayDay')
const monthDisplay = document.querySelector('#displayMonth')
const yearDisplay = document.querySelector('#displayYear')
const currentYear = new Date().getFullYear();

let error = document.createElement('p');


button.addEventListener('click', () => {
    let day = parseInt(userDay.value)
    let month = parseInt(userMonth.value)
    let year = parseInt(userYear.value)

    let birthDatejoin = [year, month, day].join('-')


    function returnState() {
        if (errorContainer.contains(error)) {
            errorContainer.removeChild(error);
        }
        allInputs.forEach((input) => {
            input.style.borderColor = "";
            input.value = ""
        });
        dateTitles.forEach((h3) => {
            h3.style.color = "";
        });
        yearDisplay.innerHTML = '--'
        monthDisplay.innerHTML = '--'
        dayDisplay.innerHTML = '--'
        button.style.cssText = ''
    }

    allInputs.forEach((input) => {
        input.addEventListener('click', () => {
            returnState();
        });
    });


    function calculateAge(birthdate) {
        const today = new Date();
        const birth = new Date(birthdate);

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        //validate inputs
        if (day > 31 || month > 12 || year > currentYear || isNaN(day) || isNaN(month) || isNaN(year)) {

            allInputs.forEach((input) => {
                input.style.borderColor = "hsl(0, 100%, 67%)";
                error.classList.add('error');
            });

            dateTitles.forEach((h3) => {
                h3.style.color = "hsl(0, 100%, 67%)";
            });


            error.textContent = "Must be a valid date";
            errorContainer.appendChild(error);
        }

        else {
            // If the birthdate's month and day are after today's month and day, subtract a year
            if (months < 0 || (months === 0 && days < 0)) {
                years--;
            }
            // Adjust months and days if negative
            if (months < 0) {
                months += 12;
            }
            if (days < 0) {
                const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                days += prevMonthLastDay;
                months--;

                // Adjust months again if it became negative after subtracting days
                if (months < 0) {
                    months += 12;
                }
            }

            return {
                years: years,
                months: months,
                days: days
            };

        }

    }

    const age = calculateAge(birthDatejoin); // Format: "YYYY-MM-DD"
    if (age) {
        yearDisplay.innerHTML = `${age.years}`;
        monthDisplay.innerHTML = `${age.months}`;
        dayDisplay.innerHTML = `${age.days}`;
        button.style.cssText = 'background-color: hsl(259, 100%, 65%);'
    }

});
