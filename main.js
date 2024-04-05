const input=document.querySelector('.calculator-input')
const keys=document.querySelector('.calculator-keys')

let inputValue='0'
let firstValue=null
let operator=null
let waitingForSecondvalue=false

updateInput()
function updateInput() {
    input.value=inputValue
}


keys.addEventListener('click', function (e) {
    const sayi=e.target
   const value=sayi.value
    
    if (!sayi.matches('button')) return
    
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value)
            break;
    
            case '.':
                inputDecimal()
                break
            case 'clear':
                clear()
                break
        default:
            inputNumber(sayi.value)

            break;
    }


    // if (sayi.classList.contains('operator')) {
    //     handleOperator(sayi.value)
    //     updateInput()
    //     return
    // }
    
    // if (sayi.classList.contains('decimal')) {
    //     inputDecimal()
    //     updateInput()
    //     return
    // }
    
    // if (sayi.classList.contains('clear')) {
    //     clear()
    //     updateInput()
    //     return
    // }
    
    // inputNumber(sayi.value)
    updateInput()
})

function handleOperator(nextOperator) {
    const value=parseFloat(inputValue)

    if (operator&&waitingForSecondvalue) {
        operator=nextOperator
        return
    }

    if (firstValue===null) {
        firstValue=value
    }else if (operator) {
        const result= calculate(firstValue, value, operator)
        inputValue=String(result)
        firstValue=result

    }
    waitingForSecondvalue=true
    operator=nextOperator
}

function calculate(first, second, operator) {
    if (operator==='+') {
        return first+second
    }else if (operator==='-') {
        return first-second
    }else if (operator==='*') {
        return first*second
    }else if (operator==='/') {
        return first/second
    }
    return second
}

function inputNumber(num) {

    if (waitingForSecondvalue) {
        inputValue=num
        waitingForSecondvalue=false
    } else {
         inputValue= inputValue==='0' ? num: inputValue+num
    }
   
}

function inputDecimal() {
    if ( ! inputValue.includes('.')) {
        inputValue += '.'
    }
}

function clear() {
    inputValue='0'
}