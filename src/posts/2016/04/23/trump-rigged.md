---
layout: post
title: 'Why Trump Is Calling the G.O.P. Delegate System Rigged'
link: https://www.nytimes.com/interactive/2016/04/24/us/elections/trump-gop-delegate-system-rigged.html
image: trump-rigged.png
images:
    - trump-rigged-big.png
    - trump-rigged-gdoc.png
tags: politics,elections,us
type: chart,d3,isotope,static
publication: NYT
coauthors: <a href="https://aparlapiano.wordpress.com/">Alicia Parlapiano</a> & <a href="https://larrybuch.com">Larry Buchanan</a>
---

For Alicia Parlapiano's [explainer]({link}) on Trump's perception of the unfairness of the Republican's nomination process I re-purposed Larry's hand-drawn [voter illustrations](https://www.nytimes.com/interactive/2016/04/15/upshot/republican-voting-power.html) and dynamically arranged and re-colored them into groups based on numbers parsed from a Google doc using [ArchieML](https://archieml.org/).

For arranging the delegates I used D3.js and [Poisson-Disc Sampling](https://www.jasondavies.com/poisson-disc/).
