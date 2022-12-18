with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var cubes = new Array();

    on('line', (line) =>
    {
	cubes.push(line.split(','));
    });
    once('close', () => {
	for (var i = 0, faces = 0; i < cubes.length; ++i, faces += 6)
	    for (var j = 0; j < i; ++j)
	    {
		for (var c = 0, common = 0, save = 0; c <= 2 && common < 2; ++c)
		    if (cubes[i][c] == cubes[j][c])
		    {
			common++;
			save += c;
		    }
		if (common == 2 && Math.abs( cubes[i][3 - save] - cubes[j][3 - save] ) <= 1)
		    faces -= 2;
	    }
	console.log(faces);
    });
};
