// wwwroot/js/graficoGlicemia.js

export function criarGrafico(canvasId, graficoNome, valores, limiteSuperior, limiteInferior) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    const labels = valores.map(g => new Date(g.dataHora).toLocaleDateString());
    const dados = valores.map(g => g.valor);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: graficoNome,
                    data: dados,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Limite Inferior',
                    data: new Array(dados.length).fill(limiteInferior),
                    borderColor: 'rgba(0, 255, 0, 1)',                    
                    borderWidth: 1,
                    type: 'line'
                },
                {
                    label: 'Limite Superior',
                    data: new Array(dados.length).fill(limiteSuperior),
                    borderColor: 'rgba(255, 0, 0,1)',
                    borderWidth: 1,
                    type: 'line'
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor'
                    },
                    suggestedMin: Math.min(...dados, limiteInferior) - 10,
                    suggestedMax: Math.max(...dados, limiteSuperior) + 10
                }
            }
        }
    });
}
