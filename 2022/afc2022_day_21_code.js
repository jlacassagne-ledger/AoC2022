with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var md = {};
    var mw = [];

    on('line', (line) =>
    {
	var monkey = line.split(':');
	monkey[1] = monkey[1].trim().split(' ');
	if (monkey[1].length == 1)
	    md[monkey[0]] = parseInt(monkey[1]);
	else
	    mw.push(monkey);
    });
    once('close', () => {
	console.log(p1(JSON.parse(JSON.stringify(md)), JSON.parse(JSON.stringify(mw))));
	console.log(p2(JSON.parse(JSON.stringify(md)), JSON.parse(JSON.stringify(mw))));
    });
};

function p2(md, mw)
{
    for (var it = 1, i = 1, diff = Infinity; diff; i += it)
        {
            new_md = JSON.parse(JSON.stringify(md));
            new_md['humn'] += i;
            ans = p1(new_md, JSON.parse(JSON.stringify(mw)), true);
	    if (Math.abs(ans[0] - ans[1]) > Math.abs(diff))
            {
                i -= it;
                it *= -0.1;
            }
            else if (Math.abs(diff) / Math.abs(Math.abs(ans[0] - ans[1]) - Math.abs(diff)) > 10)
                it *= 10;

            diff = ans[0] - ans[1];
        }
    return new_md['humn'];
}

function p1(md, mw, p2 = false)
{
    for (var i = 0; mw.length; ++i)
        {
            if (i == mw.length)
                i = 0;
            if (typeof md[mw[i][1][0]] !== 'undefined' &&
                typeof md[mw[i][1][2]] !== 'undefined')
            {
                if (mw[i][0] === 'root' && p2)
                    return [ md[mw[i][1][0]], md[mw[i][1][2]] ];
                md[mw[i][0]] = eval(md[mw[i][1][0]] + mw[i][1][1] + '(' + md[mw[i][1][2]] + ')' );
                mw.splice(i--, 1);
            }
        }
    return md['root'];
}
