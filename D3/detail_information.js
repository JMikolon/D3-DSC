function alertOne(){
    console.log('zweite file')
   
}

function delete_viz(){
    d3.select("#the_SVG_ID").remove()
    document.getElementById('toolbar').style.visibility='hidden';
}



function run_cluster(){
    //delete_viz()
    var width = 500,
    height = 900,
    margin = 100,
    padding = 2, 
    radius = 8;

var n = 100, 
    m = 5; 


var clusters = new Array(m);

const nodes = d3.range(n).map(function() {
  var i = Math.floor(Math.random() * m),
      r = radius,
      d = {
        cluster: i,
        radius: r,
        x: Math.cos(i / m * 2 * Math.PI) * 100 + width / 2 + Math.random(),
        y: Math.sin(i / m * 2 * Math.PI) * 100 + height / 2 + Math.random()
      };
  
  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
  return d;
});
  

var force = d3.forceSimulation()

  .force('center', d3.forceCenter(width/2, height/2))

  // cluster by section
  .force('cluster', cluster().strength(0.9))

  // apply collision with padding
  .force('collide', d3.forceCollide(d => d.radius + padding).strength(1))

  .on('tick', layoutTick)
	.nodes(nodes);
  
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id","the_SVG_ID")
    ;

var node = svg.selectAll("circle")
    .data(nodes)
	  .enter().append("circle")
    .style("fill", function(d) { return 'blue'; });
  
function layoutTick() {
  node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.radius; });
}

function cluster () {

  var nodes,
    strength = 0.1;

  function force (alpha) {
    // scale + curve alpha value
    alpha *= strength * alpha;

    nodes.forEach(function(d) {
			var cluster = clusters[d.cluster];
    	if (cluster === d) return;
      
      let x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;

      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    });
  }

  force.initialize = function (_) {
    nodes = _;
  }

  force.strength = _ => {
    strength = _ == null ? strength : _;
    return force;
  };

  return force;
}

}