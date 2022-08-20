const calculator = document.querySelector('.calculator')
let resultScreen = document.getElementById('calc-screen');
resultScreen.textContent = `0`
const btn = document.querySelector('.calc-buttons')

btn.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNumber = resultScreen.textContent
        const prevKeyType = calculator.dataset.prevKeyType

        if (!action) {
            if (displayedNumber === '0' || prevKeyType === 'operator') {
                resultScreen.textContent = keyContent
            } else {
                resultScreen.textContent = displayedNumber + keyContent
            }
        }

        if (action === 'decimal') {
            // resultScreen.textContent = displayedNumber + '.'
            if (!displayedNumber.includes('.')) {
                resultScreen.textContent = displayedNumber + '.'
            } else if (prevKeyType === 'operator') {
                resultScreen.textContent = '0.'
            }

            calculator.dataset.prevKeyType = 'decimal'
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            key.classList.add('is-depressed')
            calculator.dataset.number1 = displayedNumber
            calculator.dataset.prevKeyType = 'operator'
            calculator.dataset.operator = action
        }

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

        if (action === 'calculate') {
            const number1 = calculator.dataset.number1
            const operator = calculator.dataset.operator
            const number2 = displayedNumber
            resultScreen.textContent = operation(number1, operator, number2)
        }

        if (action === 'clear') {
            resultScreen.textContent = 0
            key.textContent = 'AC'
            calculator.dataset.prevKeyType = 'clear'
        }

        if (action === 'percentage') {
            const number = resultScreen.textContent / 100
            resultScreen.textContent = number
        }

    }
})

const operation = (number1, operator, number2) => {
    let result = " ";

    console.log(number1)
    console.log(operator)
    console.log(number2)
    if (operator === 'add') {
        result = parseFloat(number1) + parseFloat(number2);
    }
    else if (operator === 'subtract') {
        result = parseFloat(number1) - parseFloat(number2);
    }
    else if (operator === 'multiply') {
        result = parseFloat(number1) * parseFloat(number2);
    }
    else if (operator === 'divide') {
        result = parseFloat(number1) / parseFloat(number2);
    }

    console.log(result)
    return result
}