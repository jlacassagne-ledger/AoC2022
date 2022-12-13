const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class Directory
{
    constructor(name, parent)
    {
	this.name = name;
	this.parent = parent;
	this.size = 0;
	this.dirs = new Object();
	this.files = new Object();
    }
}

var root = new Directory("/", null);
var cdir = root;

rl.on('line', (line) => {
    if (/^\$ c/.test(line))
	change_dir(line.split(" ")[2]);
    else if (!(/^\$/.test(line)))
    {
	if (/^dir/.test(line))
	    create_folder(line.split(" ")[1]);
	else
	    create_file(line);
    }
});

rl.once('close', () => {
    console.log(runtree(root)); // recursion from root dir
});

function runtree(tree) // recursively go through tree to count stuff
{
    if (typeof this.lvl1 === 'undefined')
	this.lvl1 = 0;
    if (typeof this.lvl2 === 'undefined')
	this.lvl2 = Infinity;
    this.lvl1 += (tree.size <= 100000) ? tree.size : 0;
    this.lvl2  = (tree.size >= root.size - 40000000 && this.lvl2 > tree.size) ? tree.size : this.lvl2;
    Object.keys(tree.dirs).forEach(key => {
	runtree(tree.dirs[key]);
    });
    return [this.lvl1, this.lvl2];
}

function create_file(line)
{
    if (typeof cdir.files[line.split(" ")[1]] !== 'undefined') // file already exists
	return ;
    cdir.files[line.split(" ")[1]] = line.split(" ")[0];
    for (var parent = cdir; parent; parent = parent.parent) // update all parent directories
	parent.size += +line.split(" ")[0];
}

function create_folder(dir_name)
{
    if (typeof cdir.dirs[dir_name] !== 'undefined') // folder already exists
	return ;
    cdir.dirs[dir_name] = new Directory(dir_name , cdir);
}

function change_dir(dir_name)
{
    switch (dir_name)
    {
	case '..': cdir = cdir.parent; break;
	case '/': cdir = root; break;
	default: cdir = cdir.dirs[dir_name]; break;
    }
}
