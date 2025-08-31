function appendToDisplay(value) {
    if (document.form1.answer.value === "Error") {
        document.form1.answer.value = "";
    }
    document.form1.answer.value += value;
}

function Calculate() {
    let expression = document.form1.answer.value

    if (!expression.trim()) {
        document.form1.answer.value = ""
        return;
    }

    try {
        if (/^[0-9+\-*/(). ]+$/.test(expression)) {
            expression = expression.replace(/([+*/]{1,})(?=[+*/])/g, '')

            expression = expression.replace(/^([+*/]+)/, '')

            expression = expression.replace(/([+\-*/.])$/, '')
            document.form1.answer.value = eval(expression)
        } else {
            document.form1.answer.value = "Error"
        }
    } catch {
        document.form1.answer.value = "Error"
    }
}

