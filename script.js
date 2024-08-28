document.getElementById('equation').addEventListener('input', function(event) {
    const equationInput = document.getElementById('equation');
    const currentValue = equationInput.value;
    
    // Convertir la última letra a mayúscula si es una letra.
    if (currentValue.length > 0) {
        const lastChar = currentValue.slice(-1);
        if (/[a-z]/.test(lastChar)) {
            equationInput.value = currentValue.slice(0, -1) + lastChar.toUpperCase();
        }
    }
});

function generateTruthTable() {
    const equation = document.getElementById('equation').value.trim();
    
    // Extraer las variables, excluyendo operadores lógicos.
    const variables = [...new Set(equation.match(/\b[A-Z]\b/g))].sort();
    
    if (variables.length === 0) {
        alert("Por favor, ingrese una ecuación válida.");
        return;
    }
    
    const numRows = Math.pow(2, variables.length);
    let truthTableHTML = `<table><tr>`;
    
    variables.forEach(variable => {
        truthTableHTML += `<th>${variable}</th>`;
    });
    
    truthTableHTML += `<th>Resultado</th></tr>`;
    
    for (let i = 0; i < numRows; i++) {
        let binaryString = i.toString(2).padStart(variables.length, '0');
        let row = {};
        
        binaryString.split('').forEach((bit, index) => {
            row[variables[index]] = bit === '1' ? 'true' : 'false';
        });
        
        let result = evaluateLogic(equation, row);
        truthTableHTML += `<tr>`;
        
        variables.forEach(variable => {
            truthTableHTML += `<td>${row[variable] === 'true' ? 1 : 0}</td>`;
        });
        
        truthTableHTML += `<td>${result ? 1 : 0}</td></tr>`;
    }
    
    truthTableHTML += `</table>`;
    document.getElementById('truthTable').innerHTML = truthTableHTML;
}

function evaluateLogic(equation, values) {
    let evalEquation = equation;
    for (let variable in values) {
        evalEquation = evalEquation.replace(new RegExp(`\\b${variable}\\b`, 'g'), values[variable]);
    }
    
    try {
        return eval(evalEquation.replace(/AND/g, '&&').replace(/OR/g, '||').replace(/NOT/g, '!'));
    } catch (error) {
        console.error('Error al evaluar la expresión lógica:', error);
        return false;
    }
}

function insertSymbol(symbol) {
    const equationInput = document.getElementById('equation');
    let currentValue = equationInput.value.trim();
    
    if (symbol === ')') {
        // Inserta el paréntesis de cierre sin agregar un espacio
        equationInput.value += symbol;
    } else if (currentValue.length > 0 && !currentValue.endsWith('(')) {
        equationInput.value += ` ${symbol} `;
    } else {
        equationInput.value += symbol + ' ';
    }

    equationInput.value = equationInput.value.trim();
    equationInput.focus();
}

function deleteLastSymbol() {
    const equationInput = document.getElementById('equation');
    equationInput.value = equationInput.value.trim().slice(0, -1);
}
