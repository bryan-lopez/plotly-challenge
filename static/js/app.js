/* Read Data */

var names = json.names;
var metadata = json.metadata;
var samples = json.samples;

/* Functions */
function createOptions(listOfIds) {
  // Creates <option> tags in <select>
  // (#selDataset)

  var dropDown = d3.select("#selDataset");
  dropDown.selectAll("option")
    .data(names)
    .enter().append("option")
    .attr("value", d => d)
    .text(d => d);
};

function selectID(id) {
  // Selects data from metadata and samples
  // Returns: [meta, sample]

  var mData = metadata.filter( d => d.id == id);
  var sData = samples.filter( d => d.id == id);

  return [mData, sData];

};

function onSelect(event) {
  // Calls:
  // - selectID()
  // - createPage()

  var idValue = d3.select("#selDataset").node().value;

  var sampleArr = selectID(idValue);
  createPage(sampleArr);
};


function createBar(samples) {
  // Creates Horizontal Bar Chart using samples
  samples = samples[0];

  // Splice top 10
  var labels = samples['otu_ids'].slice(0,10);
  var values = samples['sample_values'].slice(0,10);
  var hoverText = samples['otu_labels'].slice(0,10);

  // Change Labels
  labels = labels.map(num => "OTU " + num);

  // Create Trace
  var trace = {
    type: 'bar',
    orientation: 'h',
    x: values.reverse(),
    y: labels.reverse(),
    text: hoverText
  };

  // Plot
  Plotly.newPlot("bar", [trace]);
};

function createBubbles(samples) {
  // Create Bubble Chart using samples
  samples = samples[0];

  var xValues = samples.otu_ids;
  var yValues = samples.sample_values;
  var markerSize = samples.sample_values;
  var markerColor = samples.otu_ids;
  var hoverText = samples.otu_labels;

  // Create Trace
  trace = {
    x: xValues,
    y: yValues,
    text: hoverText,
    mode: 'markers',
    marker: {
      color: markerColor,
      size: markerSize,
      colorscale: "Viridis"
    }
  };

  Plotly.newPlot("bubble", [trace]);
};

function createInfoTable(samples) {
  // Creates Demographic Info Table using samples
  samples = samples[0];

  var demoBox = d3.select("#sample-metadata");

  return true;

};

function createPage(sampleArr) {
  // Calls:
  // - createBar()
  // - createBubbles()
  // - createInfoTable()

  createBar(sampleArr[1]);
  createBubbles(sampleArr[1]);
  createInfoTable(sampleArr[0]);
};

/* Listening */
var selectDropdown = d3.select("#selDataset");
selectDropdown.on("input", onSelect);

createOptions(names);
createPage(selectID(940));
