---
layout: post
title: Incomes of Parliament Members
info: Here I got into interactive map zooming in Flash. Map shows estimated incomes of members of the German parliament.
images:
    - nebeneinkuenfte-1.png
    - nebeneinkuenfte-2.png
height: 700
type: interactive
link: https://vis4.net/labs/nebeneinkuenfte/
image: nebeneinkuenfte.png
tags: politics,germany
---

This zoomable map shows the estimated additional income of all members of the German Bundestag. Each Member is represented by a circle at the location of his home constituency.

I think it's worth noting that when I created this map in 2010, D3.js did not exist, yet (and D3.js [version 3](https://github.com/d3/d3/releases/tag/v3.0.0), which introduced geo-projections, was not released until 2013!). So I had to build my own mapping framework for this, using ActionScript, including the geo projections and zooming!

Since the Flash player is no longer around, the map looks a bit broken now that the [Ruffle Flash emulator](https://ruffle.rs/) runtime is replacing it, but you can still see it in action.
