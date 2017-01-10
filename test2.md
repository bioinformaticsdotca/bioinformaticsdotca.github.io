---
layout: tutorial_page
permalink: /test2
title: HT-Biology Lab 4
header1: Workshop Pages for Students
header2: High-Throughput Biology - From Sequence to Networks Module 4 Lab
image: /site_images/CBW-CSHL-graphic-square.png
home: https://bioinformaticsdotca.github.io/high-throughput_biology_2017
---

This lab was created by Guillaume Bourque.

## Table of contents
1. [Introduction](#introduction)
2. [Calling Variants with GATK](#variants)
3. [Investigating the SNP calls](#investigating)
4. [Filter the variants](#filter)
5. [Adding functional consequence](#function)
6. [Investigating the functional consequence of variants](#consequence)
7. [Adding dbSNP annotations](#dbSNP)
8. [Overall script](#script)
9. [(Optional) Investigating the trio](#trio)
10. [Acknowledgements](#ackno)

## Introduction
<a name="introduction"></a>

In one of the previous modules, we have aligned the reads from NA12878 (daughter) in a small region on chromosome 1. In this module, we will use the data in the BAM files to call variants and then we'll perform some annotation and filtration.

As a brief reminder, these are the IDs for each member in the trio:

| Mother | Father | Child |
| --- | --- | --- |
| NA12892 | NA12891 | NA12878 |

Our read were extracted from the following regions:


| Chromosome | Start | End |
| --- | --- | --- |
| chr1 | 17704860 | 18004860 |

### Preliminaries

#### Amazon node

Read these [directions](http://bioinformaticsdotca.github.io/AWS_setup) for information on how to log in to your assigned Amazon node. 

#### Work directory

Create a new directory that will store all of the files created in this lab.

<pre><code>rm -rf ~/workspace/module5
mkdir -p ~/workspace/module5
cd ~/workspace/module5
ln -s ~/CourseData/HT_data/Module5/* .
</code></pre> 

***Note:***
    The `ln -s` command adds symbolic links of all of the files contained in the (read-only) `~/CourseData/HT_data/Module5` directory.
    
#### Input files

Our starting data set consists of 100 bp paired-end Illumina reads from the child (NA12878) that have been aligned to hg19 during one of the previous modules (NA12878.bwa.sort.bam). We also have the same data after duplicate removal and realignment around indels NA12878.bwa.sort.rmdup.realign.bam.

If you type ls, you should have something like:

<pre><code>ubuntu@ip-10-182-231-187:~/workspace/module5$ ls
NA12878.bwa.sort.bam      NA12878.bwa.sort.rmdup.realign.bai  other_files
NA12878.bwa.sort.bam.bai  NA12878.bwa.sort.rmdup.realign.bam
</code></pre>
`other_files` is a directory that contains additional reference files and scripts that we will need during the module.

***Do you know what are the*** `.bai` ***files?***

If you're interested, you can also look at the fastQC reports for the original fastq files in the directory:

`~workspace/module5/other_files/fastQC_reports`

You can view these reports at http://cbw##.dyndns.info/module5/other_files/fastQC_reports/.

***Note:*** You need to replace ## by your student number. 

## Calling variants with GATK
<a name="variants"></a>

If you recall from the previous module, we first mapped the reads to hg19 and then we removed duplicate reads and realigned the reads around the indels.

Let's call SNPs in NA12878 using both the original and the improved bam files:

<pre><code>java -Xmx2g -jar /usr/local/GATK/GenomeAnalysisTK.jar -T UnifiedGenotyper -l INFO \
 -R other_files/hg19.fa -I NA12878.bwa.sort.bam -stand_call_conf 30 -stand_emit_conf 10 \
 -o NA12878.bwa.sort.bam.vcf -nt 4 -glm BOTH -L chr1:17704860-18004860
java -Xmx2g -jar /usr/local/GATK/GenomeAnalysisTK.jar -T UnifiedGenotyper -l INFO \
-R other_files/hg19.fa -I NA12878.bwa.sort.rmdup.realign.bam -stand_call_conf 30 \
-stand_emit_conf 10 -o NA12878.bwa.sort.rmdup.realign.bam.vcf -nt 4 \
-glm BOTH -L chr1:17704860-18004860
</code></pre>

`-Xmx2g` instructs java to allow up 2 GB of RAM to be used for GATK.
 
`-l` INFO specifies the minimum level of logging. 
 
`-R` specifies which reference sequence to use. 
 
`-I` specifies the input BAM files. 

`-stand_call_conf` is the minimum phred-scaled Qscore threshold to separate high confidence from low confidence calls (that aren't at 'trigger' sites). Only genotypes with confidence >= this threshold are emitted as called sites. A reasonable threshold is 30 (this is the default). 

`-stand_emit_conf` is the minimum phred-scaled Qscore threshold to emit low confidence calls (that aren't at 'trigger' sites). Genotypes with confidence >= this but less than the calling threshold are emitted but marked as filtered. The default value is 30. 

`-L` indicates the reference region where SNP calling should take place 

`-nt` 4 specifies that GATK should use 4 processors. 

`-glm` BOTH instructs GATK that we want to use both the SNP and INDEL genotype likelihoods models 

#### File check

At this point, you should have the following result files 

<pre><code>ubuntu@ip-10-182-231-187:~/workspace/module5$ ls
NA12878.bwa.sort.bam      NA12878.bwa.sort.bam.vcf.idx        NA12878.bwa.sort.rmdup.realign.bam.vcf
NA12878.bwa.sort.bam.bai  NA12878.bwa.sort.rmdup.realign.bai  NA12878.bwa.sort.rmdup.realign.bam.vcf.idx
NA12878.bwa.sort.bam.vcf  NA12878.bwa.sort.rmdup.realign.bam  other_files
</code></pre>

## Investigating the SNP calls
<a name="investigating"></a>

Use less to take a look at the vcf files:

<pre><code>less NA12878.bwa.sort.bam.vcf
less NA12878.bwa.sort.rmdup.realign.bam.vcf
</code></pre>

A bit hard to read... Better with the `-S` option?

vcf is a daunting format at first glance, but you can find some basic information about the format [here](http://www.1000genomes.org/wiki/Analysis/vcf4.0) or [here](http://bioinformatics.ca/workshop_wiki/images/f/ff/VcfInfoFields_2013.pdf).

***How do you figure out what the genotype is for each variant?***

***Do we have any annotation information yet?***

***How many SNPs were found?***

***Did we find the same number of variants using the files before and after duplicate removal and realignment?***

### Looking for differences between the two vcf files

Use the following command to pull out differences between the two files: 
<pre><code>diff <(grep ^chr NA12878.bwa.sort.bam.vcf | cut -f1-2 | sort) \
<(grep ^chr NA12878.bwa.sort.rmdup.realign.bam.vcf | cut -f1-2 | sort)
</code></pre>

### Use IGV to investigate the SNPs

The best way to see and understand the differences between the two vcf files will be to look at them in IGV.

If you need, the IGV color codes can be found here: [IGV color code](https://www.broadinstitute.org/igv/interpreting_insert_size)


**Option 1:** You can view your files (bam and vcf files) in the IGV browser by using the URL for that file from your Cloud instance. We have a web server running on the Amazon cloud for each instance.

In a browser, like Firefox, type in your server name (cbw#.dyndns.info) and all files under your workspace will be shown there. Find your bam and your vcf files, right click it and 'copy the link location'.

Next, open IGV and select hg19 as the reference genome as you did in the visualization module.

In IGV, load both the original and the realigned bam files (NA12878.bwa.sort.bam and NA12878.bwa.sort.rmdup.realign.bam) using (File->Load from URL...).

After you have loaded the two bam files, load the two vcf files (NA12878.bwa.sort.bam.vcf and NA12878.bwa.sort.rmdup.realign.bam.vcf) in the same way.


**Option 2:** Alternatively, you can download all the NA12878.* files in the current directory to your local computer:

<pre><code>NA12878.bwa.sort.bam      NA12878.bwa.sort.bam.vcf.idx        NA12878.bwa.sort.rmdup.realign.bam.vcf
NA12878.bwa.sort.bam.bai  NA12878.bwa.sort.rmdup.realign.bai  NA12878.bwa.sort.rmdup.realign.bam.vcf.idx
NA12878.bwa.sort.bam.vcf  NA12878.bwa.sort.rmdup.realign.bam
</code></pre>

To do this you can use the procedure that was described previously.

After that you need to follow the steps as in Option 1 except that you need to load the files in IGV using (File->Load from File...).


Finally, go to a region on chromsome 1 with reads and spend some time SNP gazing...

***Do the SNPs look believable?***

***Are there any positions that you think should have been called as a SNP, but weren't?***

***Did you find positions where the two files lead to different SNP calls?***

Go back to some of the positions that were listed as different from the previous section, for instance: 

`chr1	17791668`

You should see something like:

<img src="https://github.com/bioinformaticsdotca/HT-Biology_2017/blob/master/HtSeq/img/Igv_indel.jpg?raw=true" alt="IGV_indel" width="750" /> 

In the rest of this module we will focus on the SNPs calls found after duplicate removal and realignment.

### Looking for INDELs

INDELs can be found by looking for rows where the reference base column and the alternate base column are different lengths. It's slightly more complicated than that since, you'll also pick up the comma delimited alternate bases.

Here's an awk expression that almost picks out the INDELs: 

<pre><code>grep -v "^#" NA12878.bwa.sort.rmdup.realign.bam.vcf \
| awk '{ if(length($4) != length($5)) { print $0 } }' \
| less -S
</code></pre>

You can find a slightly more advanced awk script that separates the SNPs from the INDELs [here](https://www.biostars.org/p/7403/).

***Did you find any INDELs?***

***Can you find the largest INDEL?***

## Filter the variants
<a name="filter"></a>

Typically variant callers will only perform a minimal amount of filtering when presenting variant calls. In the case of GATK, we are actively removing any variant with score less than 10. Any variant with a score less than 30 is labeled with the filter "LowQual".

To perform more rigorous filtering, another program must be used. In our case, we will use the *VariantFiltration* tool in GATK.

**NOTE:** The best practice when using GATK is to use the *VariantRecalibrator*. In our data set, we had too few variants to accurately use the variant recalibrator and therefore we used the *VariantFiltration* tool instead. 

<pre><code>java -Xmx2g -jar /usr/local/GATK/GenomeAnalysisTK.jar -T VariantFiltration \
-R other_files/hg19.fa --variant NA12878.bwa.sort.rmdup.realign.bam.vcf \
-o NA12878.bwa.sort.rmdup.realign.bam.filter.vcf --filterExpression "QD < 2.0" \
--filterExpression "FS > 200.0" --filterExpression "MQ < 40.0" \
--filterName QDFilter --filterName FSFilter --filterName MQFilter
</code></pre>

