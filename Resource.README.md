hello UDACITY

This was a fun project.  I enjoyed the gulp part of this project.

from gulp I can't even start to list the number of places and resourced I used ,  I was not able to get gulp to automaticly inline css which is a matter of personal anoyance.  I tried a few things and from the npm var declarations at the top of the gulpfile.js you will get the picture.  

1. This project is up on https://github.com/jhirley/udportfolio.git 
2. The build is on http://jhirley.github.io/
3. If you download the git repo for the whole project just run gulp
	3a.before gulp, I resized views/images/pizzeria.jpg to 360 x 270
	3b.Before gulp, I edited the html files to add async / inline / media='print' to all the css and js.  inline did not work for css, had to do that by hand
	3. gulp default will min css/html/js and inline some js the rest is async
4. Page speed scores are mobile 91 and desktop 92
5. For Pizza the resize speed is at about 3.7 ms
	5. For changePizzaSizes I pulled dx and newwidth our of the loop
6. For total FPS the average is at between .3 to .7 ms
	6. In updatePositions I created phasedata as an array and pulled it our the for loop starting line 516.  I left the comments in
