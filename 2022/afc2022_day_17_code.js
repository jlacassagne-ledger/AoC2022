with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var inp;
    var shapes = [
        [ ['#', '#', '#', '#']                                        ],
        [ [' ', '#', ' '],     ['#', '#', '#'], [' ', '#', ' ']       ],
        [ [' ', ' ', '#'],     [' ', ' ', '#'], ['#', '#', '#']       ],
        [ ['#'],               ['#'],           ['#'],          ['#'] ],
        [ ['#', '#'],          ['#', '#']                             ]
    ];

    on('line', (line) =>
    {
	inp = line;
    });
    once('close', () => {
      console.log(main([ new Array(7).fill(' ') ], shapes, inp, 2022));
      console.log(main([ new Array(7).fill(' ') ], shapes, inp, Math.pow(10, 3 * 4), true));
    });
};

function main(map, shapes, input, limit, p2 = false)
{
    for (var c = 1, loc = 0, hist = [], max = [], win = false; c <= limit; ++c)
    {
	while (map.length > 100)
	    hist.push(parseInt(map.shift().join('').replace(/ /g, 0).replace(/#/g, 1), 2));

	if (p2 && !win)
	    max.push(longest_occ(hist));
	if (p2 && !win && max.length >= 2 && max[max.length - 2][0] != max[max.length - 1][0])
	{
	    max[max.length - 1][2] = i + 1 + hist.length;
	    if (max[max.length - 1][0] > 2000 && (win = search_repeat(max)))
	    {
		var batch = Math.floor((limit - win[0]) / win[1] - 1);
		c += batch * win[1];
		win[2] *= batch;
	    }
	}
	process.stdout.write("\r" + Math.floor(c/8000*100) + "%");

	var current_rock = new_rock(map, shapes[(c - 1) % shapes.length]);
	for (var rock_can_fall = true; rock_can_fall; )
	{
	    if (input.charAt(loc++ % input.length) === '<')
		rock_move_left(map, current_rock);
	    else
		rock_move_right(map, current_rock);
	    if ((rock_can_fall = can_rock_fall(map, current_rock)))
		current_rock.sort((a, b) => a[0] - b[0]).forEach(function(c)
		{
		    map[c[0] - 1][c[1]] = '#';
		    map[c[0]][c[1]] = ' ';
		    c[0] -= 1;
		});
	}
    }
    process.stdout.write("\r    \r");
    return map_highest_point(map) + 1 + hist.length + (p2 ? win[2] : 0);
}

function search_repeat(a)
{
    for (var i = 0; i < a.length - 2; ++i)
    {
	if (a[i][0] * 2 == a[a.length - 1][0]
	 && a[i][1][1]  == a[a.length - 1][1][0])
	    return [ i, a.length - 1 - i, a[a.length - 1][2] - a[i][2] ];
    }
    return false;
}

function longest_occ(arr)
{
    var len = arr.length;

    for (var l = Math.floor(len / 2), max = 0; l >= 1; --l)
	for (var i = 0, found = true; i < len - l; ++i, found = true)
	{
	    for (var c = 0; c < l; ++c)
	    {
		if (arr[i + c] != arr[i + l + c])
		{
		    found = false;
		    break;
		}
		if (c + 1 > max)
		{
		    max = c + 1;
		    index = [i + c, i + l + c];
		}
	    }	    
	    if (found)
		return [ max, index ];
	}
    return false;
}
     
function can_rock_fall(map, coords)
{
    if (Math.min(...coords.map(k => k[0])) == 0)
        return false;
    for (var i = 0; i < coords.length; ++i)
        if (map[coords[i][0] - 1][coords[i][1]] != ' ')
        {
            var is_this_also_one_of_my_spots = false;
            for (var j = 0; j < coords.length; ++j)
                if (coords[i][0] - 1 == coords[j][0] && coords[i][1] == coords[j][1])
                {
                    is_this_also_one_of_my_spots = true;
                    break ;
                }
            if (map[coords[i][0] - 1][coords[i][1]] != ' ' && !is_this_also_one_of_my_spots)
                return false;
        }
    return true;
}

function rock_move_left(map, coords)
{
    if (Math.min(...coords.map(k => k[1])) == 0)
	return false;
    for (var i = 0; i < coords.length; ++i)
	if (map[coords[i][0]][coords[i][1] - 1] != ' ')
        {
	    var is_this_also_one_of_my_spots = false;
	    for (var j = 0; j < coords.length; ++j)
		if (coords[i][0] == coords[j][0] && coords[i][1] - 1 == coords[j][1])
		{
		    is_this_also_one_of_my_spots = true;
		    break ;
		}
	    if (map[coords[i][0]][coords[i][1] - 1] != ' ' && !is_this_also_one_of_my_spots)
		return false;
	}
    coords.sort((a, b) => a[1] - b[1] ).forEach(function(c)
    {
	map[c[0]][c[1] - 1] = '#';
	map[c[0]][c[1]] = ' ';
	c[1] -= 1;
    });
    return true;
}

function rock_move_right(map, coords)
{
    if (Math.max(...coords.map(k => k[1])) == map[0].length - 1)
	return false;
    for (var i = 0; i < coords.length; ++i)
	if (map[coords[i][0]][coords[i][1] + 1] != ' ')
        {
	    var is_this_also_one_of_my_spots = false;
	    for (var j = 0; j < coords.length; ++j)
		if (coords[i][0] == coords[j][0] && coords[i][1] + 1 == coords[j][1])
		{
		    is_this_also_one_of_my_spots = true;
		    break ;
		}
	    if (map[coords[i][0]][coords[i][1] + 1] != ' ' && !is_this_also_one_of_my_spots)
		return false;
	}
    coords.sort((a, b) => b[1] - a[1] ).forEach(function(c)
    {
	map[c[0]][c[1] + 1] = '#';
	map[c[0]][c[1]] = ' ';
	c[1] += 1;
    });
    return true;
}

function new_rock(map, shape)
{
    var coords = new Array();
    var needed_size = map_highest_point(map) + shape.length + 3 + 1;

    for (var y = map.length; y < needed_size; ++y)
	map[y] = new Array(7).fill(' ');
    for (y = needed_size - 1, i = 0; i < shape.length; ++i, --y)
	for (var j = 0; j < shape[i].length; ++j)
        {
	    map[y][2 + j] = shape[i][j];
	    if (shape[i][j] == '#')
		coords.push([y, 2 + j]);
	}
    return coords;
}

function map_highest_point(map)
{
    for (var y = map.length - 1; y >= 0; --y)
	for (var x = 0; x < map[y].length; ++x)
	    if (map[y][x] == '#')
		return y;
    return -1;
}
