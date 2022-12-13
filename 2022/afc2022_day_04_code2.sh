#!/bin/bash

SCORE=0;

while read LINE;
do
    SEC11=$(echo $LINE | cut -f1 -d, | cut -f1 -d- );
    SEC12=$(echo $LINE | cut -f1 -d, | cut -f2 -d- );
    SEC21=$(echo $LINE | cut -f2 -d, | cut -f1 -d- );
    SEC22=$(echo $LINE | cut -f2 -d, | cut -f2 -d- );
    if [ $SEC12 -lt $SEC21 -a $SEC11 -lt $SEC21  ];
    then
	SCORE=$(( $SCORE + 1 ));
    elif [ $SEC21 -lt $SEC11 -a $SEC22 -lt $SEC11 ];
    then
	SCORE=$(( $SCORE + 1 ));
    fi;
done;

echo $SCORE;

