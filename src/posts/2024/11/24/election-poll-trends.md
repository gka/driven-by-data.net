---
layout: post
link: https://www.zeit.de/politik/deutschland/umfragen-bundestagswahl-neuwahl-wahltrend
title: German Election poll tracker
tags: elections,germany,data
type: chart,table,svelteplot
publication: zeit
image: 2024/11-poll-tracker-light.png
coauthors:
  - name: Paul Blickle
  - name: Christian Endt
  - name: David Schach
  - name: Julian Stahnke
images: 
  - 2024/11-poll-tracker-big-light.png
---

Election polls are an important part of data journalism, but we often get comments from readers who are concerned about the quality of the polls. And rightfully so! That's why  the US election we already published a chart comparing previous polls with election results as part of our poll tracker

For our German poll tracker we just added a similar chart, so you can see how close the average polls have been to the result in past elections. But another aspect of polling quality that is worth discussing further is how good the individual pollster have performed

To compute our polling average, we're weighting polls by pollster quality. So far you could read about this in the methodology or if you're brave enough to study the #Rstats code we published alongside. 

With this update we improved this metric by including another crucial factor: party bias!