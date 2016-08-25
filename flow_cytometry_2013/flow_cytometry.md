---
layout: post2
permalink: /flow_cytometry_2013/
title: Flow Cytometry Data Analysis using R 2013 Student Page
header1: Flow Cytometry Data Analysis using R 2013
header2: Workshop pages for students
image: CBW_cancerDNA_icon-16.jpg
---

Laptop Setup Instructions
-------------------------

Instructions for setting up your laptop can be found here: [Laptop Setup Instructions\_FACS](Laptop_Setup_Instructions_FACS "wikilink")

Difference Between R and R Studio  

RStudio doesn't know where libraries are installed, when they are not installed through the RStudio package manager. To tell RStudio the location, you can define the path in a startup file. Create a file called `.Renviron` . Inside there:

```
R_LIBS=<R Library Path of other installed packages>
```

That was the problem when students installed things in R Studio at the command line using the **R** command `install.package()`.

... or you could use the package manger to install libraries.

Retaining unaltered versions of your variables in R Studio  

There may be some memory management issues with R Studio and flow cytometry data. If you encounter a scenario where you start with one variable (flowSet), then copy it into another and alter it (preprocess, transform) and find the original variable also altered, then consider saving and loading your flowSet variable at every stage of alteration that you wish to recall. For example:

``` r
fs <- read.flowSet(path = '/home/rguru/Documents/mydata/')

fs <- flowComp(fs) \# function 'flowComp' is provided by Radina in support\_functions.R

save(fs, '/home/rguru/Documents/my\_raw\_fs.RData')

fs.preprocessed <- fs
```

...

- Do a bunch of preprocessing to fs.preprocessed

- Try to plot fs and fs.preprocessed, find that your 'fs' appears to be altered also

- Instead, re-load the saved version:

`load('/home/rguru/Documents/my\_raw\_fs.RData')` (note that this will reload a variable called 'fs' and replace the current one in your workspace, thereby making the 'fs' you work with below the saved one you were hoping to get)

This issue should not occur if using R from a terminal. Also be careful that you did not accidentally re-execute some code a few times and unintentionally actually alter your flowSet.

<hr>
Pre-Workshop Tutorials
----------------------

1) **R Preparation tutorials**: You are expected to have completed the following tutorials in **R** beforehand. The tutorial should be very accessible even if you have never used **R** before.

* The [R Tutorial](http://www.cyclismo.org/tutorial/R/) up to and including 5. Basic Plots
* The [R command cheat sheet](../../resources/R_Short-refcard.pdf)

2) **UNIX Preparation tutorials**: 

* Tutorials #1-3 on [UNIX Tutorial for Beginners](http://www.ee.surrey.ac.uk/Teaching/Unix/)
* [Unix Cheat sheet](http://www.rain.org/~mkummel/unix.html) 

<hr>
Pre-Workshop Readings
---------------------

[FACS\_2013\_Torfs+Brauer-Short-R-Intro](Media:FACS_2013_Torfs+Brauer-Short-R-Intro.pdf "wikilink")

<hr>
Data Sets
---------

[SupportCode.zip](Media:SupportCode.zip "wikilink")

[Data.zip](Media:Data.zip "wikilink")

<hr>
Day 1
-----

<hr>
### Welcome

<font color="green">*Faculty: Michelle Brazas*</font>

<hr>
### Module 1: Introduction to Flow Cytometry Analysis in R

<font color="green">*Faculty: Ryan Brinkman*</font>

**Lecture:** 

[Module 1 pdf](https://bioinformatics.ca/flow2013module1-pdf) 
[Module 1 mp4](https://bioinformatics.ca/flow2013module1-mp4)  

<hr>
### Module 2: Exploring FCM data in R

<font color="green">*Faculty: Radina Droumeva*</font>

**Lecture:** 

[Module 2 pdf‎](https://bioinformatics.ca/flow2013module2-pdf)  
[Module 2‎ mp4](https://bioinformatics.ca/flow2013module2-mp4)  

**Lab Practical:**

[Module 2 Lab](Media:FACS_2013_Module2_Lab.R "wikilink")
[PlottingReference.R](Media:2013_PlottingReference.R‎ "wikilink") - reference, summary and tutorial for plot functions in **R**.

<hr>
### Module 3: Preprocessing and Quality Assurance of FCM Data

<font color="green">*Faculty: Radina Droumeva*</font>

**Lecture:** 

[Module 3‎ pdf](https://bioinformatics.ca/flow2013module3-pdf)  
[Module 3‎ mp4](https://bioinformatics.ca/flow2013module3-mp4)  


**Lab Practical:**

[Module 3 Lab](Media:FACS_2013_Module3_Lab.R "wikilink")

<hr>
### Integrated Assignment

<font color="green">*Faculty: Radina Droumeva*</font>

-   [ FACS Integrated Assignment](Media:FACS_2013_IntegratedAssignment.R "wikilink")

<!-- -->

-   [ FACS AnswerKey](Media:FACS_2013_AnswerKey.R "wikilink")

<hr>
Day 2
-----

<hr>
### Module 4: Automated Cell Population Identification

<font color="green">*Faculty: Ryan Brinkman*</font>

**Lecture:** 

[Module 4‎ pdf](https://bioinformatics.ca/flow2013module4-pdf)  
[Module 4‎ mp4](https://bioinformatics.ca/flow2013module4-mp4)  

<hr>
### Module 5: 1D Automated Gating

<font color="green">*Faculty: Radina Droumeva*</font>

**Lecture:** 

[Module 5‎ pdf](https://bioinformatics.ca/flow2013module5-pdf)  
[Module 5‎ mp4](https://bioinformatics.ca/flow2013module5-mp4)  

**Lab Practical:**
[Module 5 Lab](Media:FACS_2013_Module5_Lab.R "wikilink")

<hr>
### Module 6: Additional FCM Tools

<font color="green">*Faculty: Ryan Brinkman*</font>

**Lecture:** 

[Module 6 pdf‎](https://bioinformatics.ca/flow2013module6-pdf)  
[Module 6 mp4](https://bioinformatics.ca/flow2013module6-mp4)  

<hr>
Other (more advanced) resources:
--------------------------------

*Manuals:*

More detailed introduction to R. Not a basic tutorial, this is for people who really want to know more about R.

<http://cran.r-project.org/doc/manuals/R-intro.html>

*Books:*

1) "Introductory Statistics with R" by Peter Dalgaard. It is not required for this workshop but if you are interested in buying a good book and/or want to know more, you might want to consider getting a copy.

Section 1-5 give a very good (perhaps very detailed) idea of what I plan to discuss during the workshop.

2) Statistics for Biology and Health by Robert Gentleman, Vincent Carey, Wolfgang Huber, Rafael Irizarry and Sandrine Dudoit

3) Building Bioinformatics Solutions with Perl, R and MySQL by Conrad Bessant, Ian Shadforth and Darren Oakley

<hr>
