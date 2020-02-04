#!/bin/bash
FOLDER_OUT="JoinedVideos"
mkdir -p $FOLDER_OUT
for folder in `ls -1 -d */`;
do
	if [[ $folder != *$FOLDER_OUT* ]]; then
		cd $folder;
	    number_VIDEO=`echo $folder | cut -d'_' -f1`
	    let number_VIDEO=$number_VIDEO+1
		# rename files (@author Patty)
		for i in `ls -1 *.mp4`;
		do
		    nro=`echo $i | cut -d'_' -f3 | cut -d'.' -f1`;
		    res=`echo "${nro}--${i}"`;
		    echo $i | grep -E "^[0-9]{1,3}--";
		    res1=`echo $?`
		    if [[ $res1 -eq 0 ]]
		    then
		    	echo "file in format"
		    else
		    	mv $i $res;
		    fi
		done

		# create temporal file list.txt
		rm -rf list.txt
		for file in `ls -1 *.mp4 | sort -n`;
		do
		    echo "file '$file'" >> list.txt;
		done

		# get name video
		VIDEO_NAME=`head -n 1 list.txt | cut -d'_' -f2 | sed  's/^[0-9]*-//g'`

		# merge function
		ffmpeg -f concat -safe 0 -i list.txt -c copy "${number_VIDEO}_${VIDEO_NAME}.mp4"

		rm -rf list.txt
		mv "${number_VIDEO}_${VIDEO_NAME}.mp4" "../${FOLDER_OUT}"
	    cd ..;
	fi
done

