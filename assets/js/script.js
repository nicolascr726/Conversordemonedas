
async function getValue(infoValues){
    var res,resultDivisas
    try{
    res = await fetch( "https://mindicador.cl/api/" + infoValues);
    resultDivisas = await res.json();
    if(!res.ok){
        throw new Error('Ha ocurrido un error', response.status);
    }
    }catch(e){
        const errorSpan = document.getElementById("errorSpan");
        errorSpan.innerHTML = `Algo salió mal! Error: ${e.message}`;
    }
    return resultDivisas
}

async function calculate(){
    let amount          = document.getElementById("amount").value;
    let typeCurrency    = document.getElementById('divisa').value
    let valores         =  await getValue(typeCurrency)
    let divisaHoy        = Math.round(valores.serie[0].valor)
    let total           = amount / divisaHoy
    document.getElementById('resultado').innerHTML = '<p> Resultado: ' + total + '<p>'
    renderGrafica(valores,typeCurrency);
}
async function renderGrafica(valores,typeCurrency) {
    const arrSeries = valores.serie.slice(0,10)
    let fechas = Array();
    let values = Array()
    arrSeries.forEach(a => {
        fechas.push(a.fecha.substring(0, 10))
        values.push(Math.round(a.valor))
    });
    const tipoDeGrafico = 'line'
    const colorDeLinea = 'red'
    const titulo = typeCurrency
    const config = {
        type: tipoDeGrafico,
        borderWidth: 1,
        data: {
            labels:fechas,
            datasets: [
                    {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: values
                    }
                ]}
            }


    const myChart = document.getElementById("myChart")
    myChart.style.backgroundColor = "white"
    new Chart(myChart, config)
}

