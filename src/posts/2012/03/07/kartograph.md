---
layout: post
title: Kartograph mapping framework
image: kartograph.png
link: https://kartograph.org
images:
    - kartograph-big.jpg
tags: software,map,library,js,code
---

My now discontinued mapping-framework, based on jQuery and Raphael.js. I worked on Kartograph at a time where [d3.geo](https://github.com/mbostock/d3/wiki/Geo-Projections) was still in its infancy, and [mapshaper](https://mapshaper.org/) was a closed-source Flash application. Also I had to support crappy Internet Explorer versions without SVG support.

Kartograph used SVG as map container format, but preserved the projection in a special `<proj>` tag under `<defs>`.

-   [blog post](https://vis4.net/blog/posts/introducing-kartograph/)
-   [examples](https://kartograph.org/showcase/)
-   [github repo ](https://github.com/kartograph)
