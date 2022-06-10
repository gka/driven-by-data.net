---
layout: post
title: 'The Athletes at the Rio Olympics That Have Previously Been Suspended for Doping'
link: http://www.nytimes.com/interactive/2016/08/18/sports/olympics/athletes-at-the-rio-olympics-who-were-previously-suspended-for-doping-.html?smid=tw-share
image: doping.png
images:
  - doping-1.png
  - doping-2.png
tags: sports
classes:
_with: <a href="http://kkrebeccalai.com/">K.K. Lai</a>, Sarah Almukhtar, Jasmine C. Lee and Anjali Singhvi
---

Classic data journalism!

We were matching a list of [athletes that have been suspended for doping](http://www.dopinglist.com/) against a list of athletes that participate in the 2016 Rio Olympics. Then matching that against a list of all athletes that have won medals in previous Olympic games, and another list of [athletes that have been stripped of medals](http://www.nytimes.com/interactive/2016/08/14/sports/olympics-medal-doping.html) for doping.

Then every name and doping suspension in our spreadsheet got checked and double checked, and if possible, backed up by official documents such as newsletters from International Association of Athletics Federations.

To make the name matching more robust towards different spellings we used Pythons [SequenceMatcher](https://docs.python.org/2/library/difflib.html#difflib.SequenceMatcher) class.
