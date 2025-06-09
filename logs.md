# GSoC 2025 Daily Logs

## PRs

1. [PR#59](https://github.com/BRL-CAD/arbalest/pull/59) = Removed using directives in header files
2. [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) = Reverted the hacks done to create a personalized title bar and restored the "standard Qt" look for the title bar

## Logs

- **Community Bonding Period**:
    - *05/08 Thu*: Discovered that my project got accepted! 😊🎉
    - *05/09 Fri*: Dealt with all the GSoC-related bureaucratic stuff
    - *05/10 Sat*: Created [this repo](https://github.com/LorenzoPegorari/GSoC25-report) to share with my mentors what I am working / have worked on
    - *05/12 Mon*: Made a quick fix to <ins>revert the hacks done to create a personalized title bar and restore the "standard Qt" look</ins><sup>2</sup>. I tested this code only on Ubuntu 24.04.1 LTS
    - *05/13 Tue*: Started working on <ins>prototyping a basic CLI</ins><sup>4</sup> in order to try to identify possible issues that could arise (so that I can discuss them with the mentors before the Coding Period starts)
    - *05/14 Wed*: Participated in the "*Welcome 2025 Contributor talk and Q&A*" by the GSoC team
    - *05/15 Thu*: Kept working on the <ins>CLI prototype</ins><sup>4</sup>
    - *05/19 Mon*: Tried all day to build and compile brlcad, MOOSE and arbalest on Windows 11, but without any luck (for some reason arbalest cannot execute properly because it does not find `Qt6OpenGLWidgets`). Although, I think that I did spot a bug that can be easily solved: when compiling arbalest, I got the error `rpcndr.h: 'byte': ambiguous symbol` (this is a [known issue with Windows headers](https://developercommunity.visualstudio.com/t/93889)). To fix it, I simply <ins>removed the `using namespace std;` in `Utils.h`, and I then changed all the few instances where this statement was meaningful by manually adding `std::`</ins><sup>1</sup>
    - *05/20 Tue*: A storm caused a problem with my Internet Service Provider in my local area, so I basically didn't have Internet all day... I kept trying to build arbalest though, but with no success unfortunately
    - *05/22 Thu*: Internet got fixed finally. Also I kept working on the <ins>CLI prototype</ins><sup>4</sup>, particularly exploring how to use the already created `QgConsole` (in `qtcad`)
    - *05/23 Fri*: Worked on the <ins>CLI prototype</ins><sup>4</sup>
    - *05/25 Sun*: Started working on the <ins>new theme creator feature</ins><sup>3</sup>, focusing on how to make it so that themes can be changed at runtime (without closing and reopening the application)
    - *05/26 Mon*: Kept working on the <ins>new theme creator feature</ins><sup>3</sup>
    - *05/27 Tue*: Found a way to make it so that <ins>themes can change at runtime without restarting the application</ins><sup>3</sup>. I need to make it sure that it works correctly in all possible cases
    - *05/29 Thu*: Worked on the <ins>CLI prototype</ins><sup>4</sup>, focusing on the best way to bridge or reuse qtcad’s `Qt Widgets` without breaching arbalest’s clean and easy-to-scale implementation
    - *06/01 Sun*: Video chat with BRL-CAD's old and new GSoC contributors and mentors before the *Coding Period* officially begins
- **Coding Period (1st half)**:
    - Week 1:
        - *06/02 Mon*: Prepared [PR#59](https://github.com/BRL-CAD/arbalest/pull/59)<sup>1</sup> and [PR#60](https://github.com/BRL-CAD/arbalest/pull/60)<sup>2</sup> that I will do after I can test them on Windows 11. Kept trying to build arbalest on Windows 11
        - *06/03 Tue*: Worked on <ins>fixing how arbalest themes appear on Linux</ins><sup>3</sup>. Kept trying to build arbalest on Windows 11
        - *06/04 Wed*: Finally built arbalest on Windows 11! Opened [PR#59](https://github.com/BRL-CAD/arbalest/pull/59)<sup>1</sup>. Tested on Windows 11 [PR#60](https://github.com/BRL-CAD/arbalest/pull/60)<sup>2</sup>
        - *06/05 Thu*: Participated in the "*Special Q&A session regarding the Coding Period*" by the GSoC team. Opened [PR#60](https://github.com/BRL-CAD/arbalest/pull/60)<sup>2</sup>
        - *06/06 Fri*: Worked on <ins>standardizing how themes look on Linux and Windows 11</ins><sup>3</sup>
        - *06/07 Sat*: **[PR#59](https://github.com/BRL-CAD/arbalest/pull/59)<sup>1</sup> and [PR#60](https://github.com/BRL-CAD/arbalest/pull/60)<sup>2</sup> got merged!**
    - Week 2:
        - *06/09 Mon*: <ins>Worked on standardizing how themes look on Linux and Windows 11</ins><sup>3</sup>
    - Week 3:
        - ...
    - Week 4:
        - ...
    - Week 5:
        - ...
    - Week 6:
        - ...
    - *Midterm evaluation*:
        - ...
- **Coding Period (2nd half)**:
    - Week 7:
        - ...
    - Week 8:
        - ...
    - Week 9:
        - ...
    - Week 10:
        - ...
    - Week 11:
        - ...
    - Week 12:
        - ...
    - *Final evaluation*:
        - ...

