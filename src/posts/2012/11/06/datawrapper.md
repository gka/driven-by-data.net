---
layout: post
title: Datawrapper
link: https://www.datawrapper.de
image: datawrapper.png
tags: software,js,
type: linechart,barchart,piechart
screenshot: datawrapper-big.png
images:
    - datawrapper-big.png
    - datawrapper-data.png
    - datawrapper-visualize.png
coauthors: Mirko Lorenz and Nicolas Kayser-Bril
---

Datawrapper is a tool that lets users create charts and maps they can embed into other websites.

I started working on Datawrapper in summer 2012. At that time, [Nicolas Kayser-Bril](https://blog.nkb.fr/) and [Mirko Lorenz](https://mirkolorenz.com/) had launched a first public beta, and my task was to build the version 1.0.

One of my decisions at the time was to replace the third-party charting [library](https://www.highcharts.com/) we had used in the beta with hand-crafted visualization templates written in [Raphaël.js](https://github.com/DmitryBaranovskiy/raphael). This allowed me to divert from the "standard" look and feel of the typical off-the-shelv charts and turn [best-practices into rendering code](https://www.vis4.net/blog/2012/06/doing-the-line-charts-right/).

Over ten years later, Datawrapper is now a self-sustaining software company employing 20+ people!
