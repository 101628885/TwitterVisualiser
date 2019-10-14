var businessChart = new Chart(document.getElementById('crimes'), {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Number of crimes',
            data: data,
            backgroundColor: [
                'rgba(67, 150, 233, 0.3)',
            ],
            borderWidth: 2
        },
    ]},
});