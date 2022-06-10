---
layout: post
title: Wind Speed Map of Hurricane Patricia
link: http://www.nytimes.com/interactive/2015/10/23/world/americas/hurricane-patricia.html#wind-speed
image: windmap.png
classes:
screenshot: windmap-1.png
images:
  - windmap-1.png
  - windmap-2.png
tags: interactive map, breaking, environment, climate/weather
---

In light of the strongest hurricane in the history of North America I used the open source code of Cameron Beccario's [EarthWindMap](http://earth.nullschool.net/#current/wind/surface/level/orthographic=-98.67,16.82,2048) (a project inspired by the famous [U.S. wind map](http://hint.fm/wind/) made by Fernanda Viegas and Martin Wattenberg) to create a fixed-view version that shows the [Hurricane Patricia]({{ link }}) at the time it entered Mexico.

Besides working my way through Cameron's code base and disabling things we didn't need, my only contribution to this map was changing the color scheme, using a dark blue to purple/orange scale instead of the rainbow colors used in the orignal map.

I suggest you check out the [code on Github](https://github.com/cambecc/earth) yourself and [follow Cameron on Twitter](https://twitter.com/cambecc). Apparently he talked a bit about how he made the WindMap at [OpenVisConf](https://www.youtube.com/watch?v=OLSmNZm1e0k) and [The Graphical Web](https://www.youtube.com/watch?v=QXNODLWhSbw).
