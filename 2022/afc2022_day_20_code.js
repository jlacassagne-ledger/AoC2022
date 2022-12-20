with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var file = [];
    
    on('line', (line) =>
    {
	file.push({
	    x: file.length,
	    v: parseInt(line)
	});
    });
    once('close', () => {
	for (var x = 0; x < file.length; ++x)
	    for (var s = 0; s < file.length; ++s)
		if (file[s].x == x)
		{
		    var t = s + (file[s].v % (file.length - 1));
		    if (t < 0)
			t += file.length - 1;
		    else if (t >= file.length)
			t -= file.length - 1;
		    file.splice(t, 0, file.splice(s, 1)[0]);
		    break;
		}
	for (var s = 0, ans = 0; s < file.length; ++s)
	    if (file[s].v == 0)
	    {
		for (var count = 1, x = s + 1; count <= 3000; ++count, ++x)
		{
		    if (x == file.length)
			x = 0;
		    if (count % 1000 == 0)
			ans += file[x].v;
		}
		break;
	    }
	console.log(ans);
    });
};
