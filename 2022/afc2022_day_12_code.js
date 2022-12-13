class Node
{
    constructor(start_x, start_y)
    {
	this.location = { x: start_x, y: start_y }
	this.source_distance = 0;
	this.visited = 0;
	this.elevation = 0;
    }
}

with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var map = new Array(), start_node, end_node;

    on('line', (line) =>
    {
	map.push(new Array(line.length));
	for (var i = 0; i < line.length; ++i)
	{
	    map[map.length - 1][i] = new Node(i, map.length - 1);
	    map[map.length - 1][i].elevation = line.replace(/S/, 'a').replace(/E/, 'z').charCodeAt(i);
	    if (line.charAt(i) == 'S')
		start_node = map[map.length - 1][i];
	    else if (line.charAt(i) == 'E')
		end_node = map[map.length - 1][i];
	}
    });
    once('close', () => {
	console.log(bfs(start_node, 1));
	
	for (var i = 0, min = Infinity; i < map.length; ++i)
	    for (var j = 0; j < map[i].length; ++j)
		if (map[i][j].elevation == 'a'.charCodeAt(0))
		    if ((new_path = bfs(map[i][j], i * map.length + j + 2)) < min)
			min = new_path;
	console.log(min);
    });
};

function bfs(start, visited)
{
    const neighbors = [ [0, 1], [1, 0], [0, -1], [-1, 0] ];
    var queue = new Array();

    start.source_distance = 0;
    queue.push(start);
    while (queue.length)
    {
	if ((node = queue.shift()) == end_node)
	    return (end_node.source_distance);
	for (const idx in neighbors)
	{
	    child = { x: node.location.x + neighbors[idx][0], y: node.location.y + neighbors[idx][1] };
	    if (!(child.y >= 0 && child.y < map.length && child.x >= 0 && child.x < map[child.y].length))
		continue ;
	    childnode = map[child.y][child.x];
	    if (childnode.visited == visited || childnode.elevation > node.elevation + 1)
		continue ;
	    childnode.source_distance = node.source_distance + 1;
	    childnode.visited = visited;
	    queue.push(childnode);
	}
    }
}
