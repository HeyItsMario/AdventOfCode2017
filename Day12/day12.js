let data = require("./input").split("\n");

let Graph = function(size) {
	this.nodes = [];
	this.explored = [];
	for(let i = 0; i < size; i++){
		this.explored.push(false);
	}
}

let graff = new Graph(data.length);
initializeGraph(graff, data);

let search = [true, true];
let cnt = bfs(graff,0,0);
console.log(cnt);

// rough initialization!
function initializeGraph(graph, data) {
	data.forEach((node,index) => {
		let neighbors = node.match(/\d+/g).slice(1).map(val => parseInt(val));		
		graph.nodes.push(neighbors);
	});
}

function bfs(graph,v,gc){
	// create empty list l0
	let l0 = [];
	let count = 1;

	// mark v as explored
	graph.explored[v] = true;
	// insert v into l0
	l0.push(v);
	gc++;

	while(l0.length != 0){
		// create an empty list li + 1;
		let li = [];
		l0.forEach((vertex) => {
			graph.nodes[vertex].forEach(neigh => {
				if(graph.explored[neigh] === false){
					graph.explored[neigh] = true;
					count++;
					li.push(neigh);
				}
			});
		});
		l0 = li;
	}
	
	if(graph.explored.indexOf(false) !== -1){
		return bfs(graph,graph.explored.indexOf(false), gc);
	}else{
		return gc;
	}	

}