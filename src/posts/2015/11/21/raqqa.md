---
layout: post
title: Inside Raqqa, the Capital of ISIS
link: https://www.nytimes.com/interactive/2015/11/21/world/middleeast/inside-raqqa-capital-of-isis.html
image: raqqa.png
images:
    - raqqa-big.jpg
    - raqqa-big-2.jpg
    - raqqa-ai.png
tags: map, interactive, stepper, terrorism, foreign, ai2html
publication: NYT
coauthors: <a href="https://twitter.com/kkrebeccalai">K.K. Lai</a>, <a href="https://twitter.com/wallacetim">Tim Wallace</a>, <a href="https://twitter.com/archietse">Archie Tse</a>, <a href="http://www.sarahalmukhtar.com/">Sarah Almukhtar</a> & <a href="https://twitter.com/giratikanon">Tom Giratikanon</a>
---

This [interactive tour]({{ link }}) through the city of Raqqa in Syria was also an experiment for a new way of creating pan & zoom slideshows in Illustrator.

Starting from a huge overview artboard, in this case a satellite image of the entire city, you define your 'scenes' using Illustrator artboards, in which you then add annotations and texts.

A slightly modified version of [ai2html](http://ai2html.org/) then exports the artboard background images, the HTML layer for all texts plus an SVG layer for vector content for each scene.

Some JavaScript code was then put together to animate through the scenes just using [CSS keyframe animations and transforms](http://jsfiddle.net/bcj2qn4f/).
