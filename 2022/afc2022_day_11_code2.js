const monkeys = [
    {
	items: [57],
	inspect: function(level){ return level * 13; },
	mtest: function(level){ return (level % 11 == 0) ? 3 : 2; },
	inspections: 0
    },
    {
	items: [58, 93, 88, 81, 72, 73, 65],
	inspect: function(level){ return level + 2; },
	mtest: function(level){ return (level % 7 == 0) ? 6 : 7; },
	inspections: 0
    },
    {
	items: [65, 95],
	inspect: function(level){ return level + 6; },
	mtest: function(level){ return (level % 13 == 0) ? 3 : 5; },
	inspections: 0
    },
    {
	items: [58, 80, 81, 83],
	inspect: function(level){ return level * level; },
	mtest: function(level){ return (level % 5 == 0) ? 4 : 5; },
	inspections: 0
    },
    {
	items: [58, 89, 90, 96, 55],
	inspect: function(level){ return level + 3; },
	mtest: function(level){ return (level % 3 == 0) ? 1 : 7; },
	inspections: 0
    },
    {
	items: [66, 73, 87, 58, 62, 67],
	inspect: function(level){ return level * 7; },
	mtest: function(level){ return (level % 17 == 0) ? 4 : 1; },
	inspections: 0
    },
    {
	items: [85, 55, 89],
	inspect: function(level){ return level + 4; },
	mtest: function(level){ return (level % 2 == 0) ? 2 : 0; },
	inspections: 0
    },
    {
	items: [73, 80, 54, 94, 90, 52, 69, 58],
	inspect: function(level){ return level + 7; },
	mtest: function(level){ return (level % 19 == 0) ? 6 : 0; },
	inspections: 0
    }
];

for (var round = 1; round <= 10000; ++round)
    for (var mid = 0; mid < monkeys.length; ++mid)
	while (monkeys[mid].items.length)
	{
	    var new_worry = monkeys[mid].inspect(monkeys[mid].items[0]) % (11 * 7 * 13 * 5 * 3 * 17 * 2 * 19);
	    monkeys[monkeys[mid].mtest(new_worry)].items.push(new_worry);
	    monkeys[mid].items.splice(0, 1);
	    monkeys[mid].inspections++;
	}

var result_inspections = new Array();
for (var mid = 0; mid < monkeys.length; ++mid)
    result_inspections.push(monkeys[mid].inspections);
for (var i = 0; i < result_inspections.length - 1; ++i)
    for (var j = i + 1; j < result_inspections.length; ++j)
	if (result_inspections[j] > result_inspections[i])
        {
	    var tmp = result_inspections[j];
	    result_inspections[j] = result_inspections[i];
	    result_inspections[i] = tmp;
	}

console.log(result_inspections[0] * result_inspections[1]);
