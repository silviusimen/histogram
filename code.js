
var backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
];

var borderColors = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',

];

function plot(html_element, plot_labels, data_points, plot_label) {
    console.log(data_points);
    var ctx = document.getElementById(html_element).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: plot_labels,
            datasets: [{
                label: plot_label,
                data: data_points,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            events: [],
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function get_frequencies(data, num_bins) 
{
    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var delta = max-min;
    var bin_delta = (delta * 1.05)/num_bins; // slightly larger delta to include the interval ends
    //console.log("min=" + min);
    //console.log("max=" + max);
    //console.log("num_bins=" + num_bins);
    //console.log("bin_delta=" + bin_delta);
    var frequencies = [];
    var labels = [];
    for (var i=0;i<num_bins;i++) 
    {
        frequencies.push(0);
        var label = Math.round((min + bin_delta*i)*10);
        labels.push(label/10 );
    }
    console.log(frequencies);

    for(var i=0;i<data.length;i++){
        var value = data[i];
        var fvalue = (value - min) / bin_delta;
        var bin_id = Math.floor(fvalue);
        //console.log("Val=" + value + ", binid=" + bin_id + ", fval=" + fvalue);
        frequencies[bin_id] ++;
        //console.log(frequencies);
    }

    console.log("Frequencies:");
    console.log(frequencies);

    return {data: frequencies, labels:labels};
}

function get_data()
{
    var input_text = document.getElementById("myData").value;
    var data = input_text.trim().split(/\s+/);
    var fdata = [];

    for(var i=0;i<data.length;i++){
        var value = data[i];
        fdata.push(parseFloat(value));
    }

    return fdata;
}

function plot_data(bins)
{
    var data = get_data();
    plot("data_chart", data, data, "data graph");

    var frequency_data = get_frequencies(data,bins);
    plot("frequency_chart", frequency_data.labels, frequency_data.data, "frequency graph");
}


plot_data();
