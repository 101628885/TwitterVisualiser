var annotationChart = new Chart(document.getElementById('crimes'), {
    type: 'bar',
    data: {
        labels: manualLabels,
        datasets: [{
            label: 'Number of crimes',
            data: manualData,
            backgroundColor: [
                'rgba(67, 150, 233, 0.3)',
            ],
            borderWidth: 2
        },
    ]},
});

var labelChart = new Chart(document.getElementById('labels'), {
    type: 'bar',
    data: {
        labels: objectLabels,
        datasets: [{
            label: 'Number of crimes',
            data: objectData,
            backgroundColor: [
                'rgba(67, 150, 233, 0.3)',
            ],
            borderWidth: 2
        },
    ]},
});