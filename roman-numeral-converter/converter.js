const romanMap = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

function numberToRoman(num) {
    if (num < 1 || num > 3999) {
        return 'Invalid number, please enter a number from (1-3999)'
    }

    const values = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ]

    let result = ''
    for (let [value, symbol] of values) {
        while (num >= value) {
            result += symbol
            num -= value
        }
    }
    return result
}

function romanToNumber(roman) {
    roman = roman.toUpperCase()

    let total = 0
    for (let i = 0; i < roman.length; i++) {
        if (!romanMap[roman[i]]) return 'Invalid Roman numeral'
        if (i + 1 < roman.length && romanMap[roman[i]] < romanMap[roman[i + 1]]) {
            total -= romanMap[roman[i]]
        } else {
            total += romanMap[roman[i]]
        }
    }
    if (numberToRoman(total) !== roman) return 'Invalid Roman numeral'
    return total
}

document.getElementById('toRomanButton').addEventListener('click', () => {
    const num = parseInt(document.getElementById('numberInput').value)
    const result = numberToRoman(num)
    document.getElementById('romanResult').textContent = result
})

document.getElementById('toNumberButton').addEventListener('click', () => {
    const roman = document.getElementById('romanInput').value.trim()
    const result = romanToNumber(roman)
    document.getElementById('numberResult').textContent = result
})