// metadata setup
function metadatafun(sample) {
    d3.json("samples.json").then((data) => {
        var metadata= data.metadata;
        var resultsarray= metadata.filter(sampleobj => sampleobj.id == sample);
        var result= resultsarray[0]
        var console = d3.select("#sample-metadata");
        console.html("");
        Object.entries(result).forEach(([key, value]) => {
            console.append("h6").text(`${key}: ${value}`);
        });
    });
}
// chart setup
function chartfun(sample) {
    d3.json("samples.json").then((data) => {
        var samples= data.samples;
        var resultsarray= samples.filter(sampleobj => sampleobj.id == sample);
        var result= resultsarray[0]
        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;

    // bubble chart
    var bubformat = {
        margin: { t: 0 },
        xaxis: { title: "Id's" },
        hovermode: "closest",
    };

    var bubdata = [
        {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
            }
        }
    ];

    Plotly.plot("bubble", bubdata, bubformat);

    // horizontal bar chart
    var bardata =[
        {
        y:ids.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
        }
    ];

    var barformat = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", bardata, barformat);
  });
}
   
// start setup
function startfun() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

    // create plots
    const first = sampleNames[0];
    chartfun(first);
    metadatafun(first);
  });
}

// new data setup
function newdatafun(newsample) {
    chartfun(newsample);
    metadatafun(newsample);
}

// start it up
startfun();