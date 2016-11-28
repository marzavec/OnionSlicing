# Overview
A few friends and I were discussing Tor Onion crawling and indexing, I mentioned
iterative checking would be the most comprehensive method- since a hidden website
would likely not have any links to it.


I was told several times that method would take years, but I wanted to know
exactly what kind of time it would take!


So I built this to prove them wrong- and wrong they were!


It wouldn't take years. . .


It would take several hundred decades for a single computer! :D


Only 7,958,661,109,946,400,884,391,936 possible .onion domains and I was able to
get up to 2.53 domains per second!



# Usage
You will need to get Tor setup, not the browser bundle.



On Windows:

https://www.torproject.org/download/download.html

On Debian (etc):

apt-get install tor


On OSX:

brew install tor
tor & # run as background process



* `git clone https://github.com/marzavec/OnionSlicing.git`
* `cd OnionSlicing`
* `npm install`
* Edit line 13 of main.js to change child process count, if needed.
* `sudo node main.js`



#Screen Shots
![10 Threads](http://img.marzavec.com/onionSlicing_10thread.png)

![25 Threads](http://img.marzavec.com/onionSlicing_25thread.png)
