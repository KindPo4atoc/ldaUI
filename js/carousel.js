window.onload = function(){
// Инициализация карусели
    let currentSlide = 0;
    let objCharts = null;
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalSlides = items.length;
    var dataUsers;
    const charts = [["loan_term", "income_annum"], ["income_annum","cibil_score"],["loan_amount","cibil_score"],["loan_term","loan_amount"] ];
    const chartContainer = document.querySelector('.chart-container');
    chartContainer.innerHTML = '<div class="loading-chart">Загрузка данных...</div>';

    fetch('http://localhost:8000/selectLearnData')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(responseData => {
        // Проверяем структуру ответа
        
        dataUsers = responseData.users_data;
        chartContainer.innerHTML = '<canvas id="loanCharts"></canvas>';
        objCharts = createChart(charts[currentSlide][0],charts[currentSlide][1]);
    })
    .catch(error => {
        console.error('Error:', error);
        chartContainer.innerHTML = `
            <div class="error">
                Ошибка загрузки данных: ${error.message}
                <button onclick="location.reload()">Обновить</button>
            </div>
        `;
    });


    document.querySelector('.next').addEventListener('click', () => {
        currentSlide += 1
        if (currentSlide > charts.length-1){
            currentSlide = 0;
        }
        console.log(currentSlide)
        if(objCharts){
            objCharts.destroy();
            chartContainer.innerHTML = '<canvas id="loanCharts"></canvas>';   
        }
        objCharts = createChart(charts[currentSlide][0],charts[currentSlide][1]);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentSlide -= 1;
        
        if(currentSlide < 0){
            currentSlide = charts.length-1;
        }
        console.log(currentSlide)
        if(objCharts){
            objCharts.destroy();
            chartContainer.innerHTML = '<canvas id="loanCharts"></canvas>';   
        }
        objCharts = createChart(charts[currentSlide][0],charts[currentSlide][1]);
    });

    function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Инициализация графиков Chart.js

    function createChart(x,y) {
        console.log(dataUsers)
        const chartData = {
            datasets: [{
                label: "Одобрено",
                data: dataUsers?.filter(item => item.loan_status === "Approved") 
                            .map(item => ({ x: item[x], y: item[y] })),
                backgroundColor: '#6e45e2',
                borderColor: '#88d3ce',
                pointRadius: 2,
                pointHoverRadius: 2,
                radius: [5, 10],
            }, {
                label: 'Отклонено',
                data: dataUsers?.filter(item => item.loan_status ==="Rejected") 
                            .map(item => ({ x: item[x], y: item[y] })),
                backgroundColor: '#F44336',
                borderColor: '#ff8a80',
                pointRadius: 2,
                pointHoverRadius: 7,
                radius: [5, 10],
            }]
        };
        return new Chart(document.getElementById('loanCharts').getContext('2d'), {
                type: 'scatter',
                data: chartData,
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'linear',
                            title: {
                                display: true,
                                text: x,
                                color: '#b8f2e6'
                            },
                            grid: {
                                color: 'rgba(136, 211, 206, 0.1)'
                            },
                            ticks: {
                                color: '#88d3ce'
                            }
                        },
                        y: {
                            type: 'linear',
                            title: {
                                display: true,
                                text: y,
                                color: '#b8f2e6'
                            },
                            grid: {
                                color: 'rgba(136, 211, 206, 0.1)'
                            },
                            ticks: {
                                color: '#88d3ce'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#fff',
                                font: {
                                    size: 9
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(26, 26, 46, 0.9)',
                            titleColor: '#6e45e2',
                            bodyColor: '#88d3ce',
                            borderColor: '#88d3ce',
                            borderWidth: 1
                        }
                    }
                }
            }
        );
    }
}
