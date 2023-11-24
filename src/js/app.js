const inputItems = document.querySelectorAll('.input__item')
const btnConvert = document.querySelector('.btn__convert')
const yearsAnswer = document.getElementById('years-answer')
const mouthsAnswer = document.getElementById('mouths-answer')
const daysAnswer = document.getElementById('days-answer')
const daysMouth = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
}

btnConvert.addEventListener('click', () => {
    reset()
    let response = checkTypeInput()
    if (response){
        calculate()
    }
})


inputItems.forEach(item => {
    item.addEventListener('input', (e) => {
        if(isNaN(e.target.value)){
            e.target.value = e.target.value.replace(/[^0-9]/g, '')
        }
    })
})


function checkTypeInput(){
    let isError = false
    inputItems.forEach(item => {
        if (item.value === ''){
            addError(item, 'This flies is required')
            isError = true
            return false
        }
        let response = checkCurrentItem(item)
        if (!response){
            isError = true
            return response
        }
    })
    if (!(isError)) return true
}


function checkCurrentItem(item){
    switch (item.id){
        case 'day-input':
            const day = new Date(Number(inputItems[2].value), 1, 29).getDate()
            if (!(Number(item.value) > 0 && Number(item.value) <= ((Number(inputItems[1].value) === 2 &&  day === 29) ? 29 : daysMouth[Number(inputItems[1].value)]))){
                addError(item, 'Invalid format type')
                return false
            }else{
                return true
            }
        case 'mouth-input':
            if (!(Number(item.value) > 0 &&  Number(item.value) <= 12)){
                addError(item, 'Invalid format type')
                return false
            }else{
                return true
            }
        case 'year-input':
            const year = new Date().getFullYear()
            if (!(Number(item.value) <= year)){
                addError(item, 'Invalid format type')
                return false
            }else{
                return true
            }
    }
}


function addError(item, message){
    const parent = item.parentNode
    const errorMessage = parent.querySelector('.error-message')
    parent.classList.add('error')
    errorMessage.innerHTML = message
}


function reset(){
    const data__items = document.querySelectorAll('.data__item')
    data__items.forEach(item => {
        item.classList.remove('error')
    })
    yearsAnswer.innerHTML = '- -'
    mouthsAnswer.innerHTML = '- -'
    daysAnswer.innerHTML = '- -'
}

function calculate(){
    const currentDate = new Date()
    const date = new Date(Number(inputItems[2].value), Number(inputItems[1].value), Number(inputItems[0].value))
    let answer = currentDate - date
    yearsAnswer.innerHTML = `${Math.floor(answer / (1000 * 60 * 60 * 24 * 30 * 12)) >= 0 ? Math.floor(answer / (1000 * 60 * 60 * 24 * 30 * 12)) : 0}`
    mouthsAnswer.innerHTML = `${Math.floor(answer / (1000 * 60 * 60 * 24 * 30) % 12) >= 0 ? Math.floor(answer / (1000 * 60 * 60 * 24 * 30) % 12) : 0}`
    daysAnswer.innerHTML = `${Math.floor(answer / (1000 * 60 * 60 * 24) % 30) >= 0 ? Math.floor(answer / (1000 * 60 * 60 * 24) % 30) : 0}`
}