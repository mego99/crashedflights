var width = 960,
height = 500;

var svg = d3.select("body").append("svg")
  .attr("width",width)
  .attr("height",height);

var parseDate = d3.timeParse("%m/%d/%Y");

var x = d3.scaleTime().range([0,width]),
y = d3.scaleLinear().range([height,0]);

var xaxis = d3.axisBottom(x),
yaxis = d3.axisLeft(y);

svg.append("defs").append("clipPath")
  .append("rect")
    .attr("width",width)
    .attr("height",height);

svg.append("g")
  .attr("class","axis")
  // .attr("transform","translate(0," + height + ")")
  .call(xaxis);

svg.append("g")
  .attr("class","axis")
  .call(yaxis);

function row(d) {
  return {
    date: d.Date,
    deaths: d.Fatalities
  }
};

d3.csv("crashes.csv", row, function(error, data) {
  if (error) return console.error(error);

  x.domain([d3.extent(data, function(d) { return d.date; })])

});
