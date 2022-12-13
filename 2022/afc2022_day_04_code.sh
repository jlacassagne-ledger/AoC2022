#!/bin/bash

SCORE=0;

while read LINE;
do
    SEC11=$(echo $LINE | cut -f1 -d, | cut -f1 -d- );
    SEC12=$(echo $LINE | cut -f1 -d, | cut -f2 -d- );
    SEC21=$(echo $LINE | cut -f2 -d, | cut -f1 -d- );
    SEC22=$(echo $LINE | cut -f2 -d, | cut -f2 -d- );
    if [ $SEC11 -eq $SEC21 -a $SEC12 -eq $SEC22 ];
    then
	SCORE=$(( $SCORE + 1 ));
    elif [ $SEC11 -le $SEC21 -a $SEC12 -ge $SEC22 ];
    then
	#	echo 1--- $SEC11-$SEC12,$SEC21-$SEC22
	SCORE=$(( $SCORE + 1 ));
    elif [ $SEC11 -ge $SEC21 -a $SEC12 -le $SEC22 ];
    then
	#	echo 2--- $SEC11-$SEC12,$SEC21-$SEC22
	SCORE=$(( $SCORE + 1 ));
    fi;
done;

echo $SCORE;

