---
layout: post
title: 'Interactive G.O.P. Nomination Delegate Calculator'
link: https://www.nytimes.com/interactive/2016/02/27/upshot/republican-delegate-calculator-how-trump-can-win.html
image: delegate-calc.png
# nytprint: February 16, 2016, on page A3
screenshot: delegate-calc-1.png
images:
    - delegate-calc-1.png
    - delegate-calc-2.png
publication: NYT
tags: chart,politics,elections,d3,simulations,linechart,interactive
coauthors: <a href="https://twitter.com/jshkatz">Josh Katz</a> & <a href="https://larrybuch.com/">Larry Buchanan</a>
---

A week before Super Tuesday, Donald Trump wins his third primary state and invokes questions about if and when it will be to late to stop his nomination.

To find out when exactly the G.O.P. front-runner might reach the majority of 1237 delegates we had to implement the specific delegate allocation rules of each state into a JavaScript calculator.

Since delegates are allocated both per state-wide level and per congressional district, we had to simulate election results for each district in order to calculate the accumulation of delegates.

To get these simulated results closer to reality we computed a predictive model based on variables such as income, race and past election results. The model data then gets adjusted so that the average results per candate match the input scenario.
