const v8 = require('v8');
v8.setFlagsFromString('--stack-size=1400');

with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var cubes = new Array();
    var aircubes = new Array();
    var outside_aircubes = new Array();

    on('line', (line) =>
    {
	cubes.push(line.split(',').map(Number).map(x => x + 1));
    });
    once('close', () => {
	max_x = Math.max(...cubes.map(k => k[0]));
	max_y = Math.max(...cubes.map(k => k[1]));
	max_z = Math.max(...cubes.map(k => k[2]));
	for (var z = 0; z <= max_z + 1; ++z)
	    for (var y = 0; y <= max_y + 1; ++y)
		for (var x = 0; x <= max_x + 1; ++x)
		    if (!is_lava(cubes, [x, y, z]))
			aircubes.push([x, y, z, false, 0]);
	find_outside_aircubes(cubes, aircubes, outside_aircubes, aircubes[aircubes.length - 1]);
	console.log(outside_aircubes.reduce((a, k) => a + k[4], 0));
    });
};

function find_outside_aircubes(cs, acs, oacs, ac)
{
    if (ac[3] === true)
	return ;
    ac[3] = true;
    oacs.push(ac);
    for (var i = 0; i < acs.length; ++i)
    {
        for (var c = 0, common = 0, save = 0; c <= 2 && common < 2; ++c)
            if (acs[i][c] == ac[c])
            {
		common++;
		save += c;
            }
        if (common == 2 && Math.abs(acs[i][3 - save] - ac[3 - save]) <= 1)
	    find_outside_aircubes(cs, acs, oacs, acs[i]);
    }
    for (var i = 0; i < cs.length; ++i)
    {
        for (var c = 0, common = 0, save = 0; c <= 2 && common < 2; ++c)
            if (ac[c] == cs[i][c])
            {
              common++;
              save += c;
            }
        if (common == 2 && Math.abs(ac[3 - save] - cs[i][3 - save]) <= 1)
            ac[4]++;
    }
}

function is_lava(cubes, c)
{
    for (var i = 0; i < cubes.length; ++i)
	if (cubes[i][0] == c[0] &&
	    cubes[i][1] == c[1] &&
	    cubes[i][2] == c[2])
	    return true;
    return false;
}
