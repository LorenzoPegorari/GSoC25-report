# GSoC 2025 Daily Logs

> **Tips on how to read the logs**:
>
> In the "*PRs*" section you will find all the pull requests (PRs) related to my *Google Summer of Code 2025* project. 
>
> In the "*Logs*" section instead you will find what I worked on each day. Most of the features/bugs I worked on each day are <ins>underlined</ins> and have a superscript number <sup>#n</sup>. This number is equivalent to the number of the PR in which these features/bugs that I have worked on were merged into the code. This was done to show in which PR my work went each day.

## PRs

- [PR#59](https://github.com/BRL-CAD/arbalest/pull/59) = Removed using directives in header files
- [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) = Reverted the hacks done to create a personalized title bar and restored the "standard Qt" look for the title bar
- [PR#61](https://github.com/BRL-CAD/arbalest/pull/61) = Removed some superfluous `MainWindow`'s methods and icon memory waste
- [PR#62](https://github.com/BRL-CAD/arbalest/pull/62) = Standardized the `QStyleSheet` "arbalest_simple.qss" to appear the same way on Windows (Windows 11) and Linux (Ubuntu 24.04.1 LTS)
- [PR#63](https://github.com/BRL-CAD/arbalest/pull/63) = Added a dedicated method that sets UI elements icons and added more theme variables for icon colors
- [PR#64](https://github.com/BRL-CAD/arbalest/pull/64) = Added support for changing themes at runtime (without having to reopen arbalest)

## Logs

- **Community Bonding Period**:
    - *05/08 Thu*: Discovered that my project got accepted! 😊🎉
    - *05/09 Fri*: Dealt with all the GSoC-related bureaucratic stuff
    - *05/10 Sat*: Created [this repo](https://github.com/LorenzoPegorari/GSoC25-report) to share with my mentors what I am working / have worked on
    - *05/12 Mon*: Made a quick fix to <ins>revert the hacks done to create a personalized title bar and restore the "standard Qt" look</ins><sup>#60</sup>. I tested this code only on Ubuntu 24.04.1 LTS at the moment
    - *05/13 Tue*: Started working on prototyping a basic CLI in order to try to identify possible issues that could arise (so that I can discuss them with the mentors before the Coding Period starts)
    - *05/14 Wed*: Participated in the "*Welcome 2025 Contributor talk and Q&A*" by the GSoC team
    - *05/15 Thu*: Kept working on the CLI prototype
    - *05/19 Mon*: Tried to build and compile brlcad, MOOSE and arbalest on Windows 11, but without any luck (for some reason arbalest cannot execute properly because it does not find `Qt6OpenGLWidgets`). Although, I spotted a bug that can be easily solved: when compiling arbalest, I got the error `rpcndr.h: 'byte': ambiguous symbol` (this is a [known issue with Windows headers](https://developercommunity.visualstudio.com/t/93889)). To fix it, I simply <ins>removed the `using namespace std;` in `Utils.h`, and I then changed all the few instances where this statement was meaningful by manually adding `std::`</ins><sup>#59</sup>
    - *05/20 Tue*: A storm caused a problem with my Internet Service Provider in my local area, so I didn't have Internet. Anyway, I kept trying to build arbalest on Windows 11, but with no success unfortunately
    - *05/21 Wed*: Still no Internet. I kept working on the CLI prototype
    - *05/22 Thu*: Internet got fixed finally. Also I kept working on the CLI prototype, particularly exploring how to use the already created `QgConsole` (in `libqtcad`)
    - *05/23 Fri*: Kept working on the CLI prototype and exploring `libqtcad`
    - *05/25 Sun*: Started working on the <ins>new theme creator feature</ins><sup>x</sup>, focusing on how to make it so that themes can be changed at runtime (without closing and reopening the application)
    - *05/26 Mon*: Kept working on the <ins>new theme creator feature</ins><sup>x</sup>
    - *05/27 Tue*: Found a way to make it so that <ins>themes can change at runtime without restarting the application</ins><sup>#64</sup>. I need to make it sure that it works correctly in all possible cases
    - *05/29 Thu*: Worked on the <ins>CLI prototype</ins><sup>?</sup>, focusing on the best way to bridge or reuse qtcad’s Qt Widgets without breaching arbalest’s clean and easy-to-scale implementation
    - *06/01 Sun*: Video chat with BRL-CAD's old and new GSoC contributors and mentors before the *Coding Period* officially begins
- **Coding Period (1st half)**:
    - Week 1:
        - *06/02 Mon*: Prepared [PR#59](https://github.com/BRL-CAD/arbalest/pull/59) and [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) that I will do after I can test them on Windows 11. Kept trying to build arbalest on Windows 11
        - *06/03 Tue*: Worked on <ins>fixing how arbalest themes appear on Linux</ins><sup>#62</sup>. Kept trying to build arbalest on Windows 11
        - *06/04 Wed*: Finally built arbalest on Windows 11! Tested and opened [PR#59](https://github.com/BRL-CAD/arbalest/pull/59). Tested [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) on Windows 11 
        - *06/05 Thu*: Participated in the "*Special Q&A session regarding the Coding Period*" by the GSoC team. Opened [PR#60](https://github.com/BRL-CAD/arbalest/pull/60)
        - *06/06 Fri*: Worked on <ins>standardizing how themes look on Linux and Windows 11</ins><sup>#62</sup>
        - *06/07 Sat*: **[PR#59](https://github.com/BRL-CAD/arbalest/pull/59) and [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) got merged!**
    - Week 2:
        - *06/09 Mon*: Worked on <ins>standardizing how themes look on Linux and Windows 11</ins><sup>#61,#62</sup>
        - *06/11 Wed*: Finished <ins>standardizing how themes look on Linux and Windows 11</ins><sup>#62,#63</sup>
        - *06/12 Thu*: Worked on a few bugs related to <ins>how themes look on Linux and Windows 11</ins><sup>#61,#62#,#63,#64</sup> (e.g: icons colors, refreshing icons at runtime, refreshing properties at runtime, refreshing viewports background colors at runtime, ...)
        - *06/13 Fri*: Fully implemented support for <ins>changing themes at runtime</ins><sup>#64</sup>!
        - *06/14 Sat*: Ironed out the new <ins>style and themes</ins><sup>#62</sup> and the new feature for <ins>changing themes at runtime</ins><sup>#64</sup>
        - *06/15 Sun*: Opened [PR#61](https://github.com/BRL-CAD/arbalest/pull/61), [PR#62](https://github.com/BRL-CAD/arbalest/pull/62) and [PR#63](https://github.com/BRL-CAD/arbalest/pull/63). **[PR#61](https://github.com/BRL-CAD/arbalest/pull/61) got merged!**
    - Week 3:
        - *06/16 Mon*: Opened [PR#64](https://github.com/BRL-CAD/arbalest/pull/64). **[PR#62](https://github.com/BRL-CAD/arbalest/pull/62) and [PR#63](https://github.com/BRL-CAD/arbalest/pull/63) got merged!**
        - *06/17 Tue*: **[PR#64](https://github.com/BRL-CAD/arbalest/pull/64) got merged!**
        - *06/19 Thu*: Started working again on the <ins>CLI prototype</ins><sup>x</sup>. The first goal is to find the best way to use MOOSE to connect arbalest and `libqtcad`
        - *06/22 Sun*: Tried building a <ins>MOOSE module that will act as a C++ layer for `libqtcad`</ins><sup>x</sup>
    - Week 4:
        - *06/23 Mon*: Kept exploring the best way to have a <ins>MOOSE module that will act as a C++ layer for `libqtcad`</ins><sup>x</sup>
        - *06/24 Tue*: Worked on the <ins>new CLI, focusing especially on the `QWidget` side of the CLI</ins><sup>?</sup>
        - *06/26 Thu*: Studied how `libqtcad` is implemented as deeply as possible, in order to understand how it can be connect with MOOSE and arbalest
        - *06/28 Sat*: Kept studing how the `libqtcad` library works, focusing on understanding if it is possible to use its contents for arbalest
    - Week 5:
        - *06/30 Mon*: After more testing, and after confronting my mentors, I came to the conclusion that there is no way to connect the `libqtcad` library to MOOSE. This is because there is no way to connect them while preserving the main idea behind MOOSE, that is to be "a thin layer on top of BRL-CAD's core libraries". Maybe directly accessing the `libqtcad` library from arbalest could be a good temporary solution?
        - *07/01 Tue*: Explored a way to <ins>improve the current `ObjectTree` class</ins><sup>?</sup>, which handles the creation of a tree data structure that represents the opened database. The `ObjectTree` needs to be improved to support the GED commands that the new CLI will execute
        - *07/03 Thu*: Finalized a <ins>plan for how to insert a functioning CLI inside of arbalest, that can handle 99% of the GED commands</ins><sup>?</sup> (MOOSE will handle the execution of commands, while the `QgConsole` defined inside `libqtcad` will be used to create the actual `QWidget` console)
        - *07/04 Fri*: Submitted my plan to the mentors and <ins>started working on it</ins><sup>?</sup>
        - *07/05 Sat*: Discovered, with the help of my mentors, a problem regarding how "in-memory databases" are handled by `libged` (some GED commands do not work with "in-memory databases" yet, as they are a recent addition). In the mean time, I worked on <ins>implementing the `QgConsole` (defined inside `libqtcad`) into arbalest, and got it to work</ins><sup>x</sup>
    - Week 6:
        - *07/07 Mon*: Worked on <ins>improving the current `ObjectTree` class</ins><sup>?</sup>. Finding a lot of issues to fix. The main one is having a way of knowing which objects in the database were added/modified/killed by a CLI command, without having to rewrite a GED parser
        - *07/08 Tue*: Showed a prototype of the CLI to my mentors, and discussed with them how to tackle the many issues that come with supporting all GED commands
        - *07/09 Wed*: In order to know which objects in the database were added/modified/killed by a CLI command, <ins>MOOSE should be expanded so that it can support the usage of `dbi_changed_clbks` and `dbi_update_nref_clbks`</ins><sup>?</sup> (these are `librt` method that call a specified function when an object in the database changes)
        - *07/10 Thu*: Kept working on <ins>improving the current `ObjectTree` class, so that it can support many situations that are now buggy</ins><sup>?</sup> (eg: killed objects inside a database, combinations that reference items that do not exists)
        - *07/11 Fri*: <ins>Modified the `ObjectTree` so that now, instead of using a bunch of hashmaps and sets to represent all the items of the tree, it uses the 2 classes `ObjectTreeItem` (used for items in the tree) and `ObjectTreeItemData` (used for objects in the database)</ins><sup>?</sup>. Now the `ObjectTree` is clearer and more efficient
        - *07/12 Sat*: <ins>Increased the amount of informations that the `ObjectTree` can store about the database objects, so that it can support killed objects and combinations that reference non-existent object in the database</ins><sup>?</sup> (and, maybe in the future, support more advanced features)
    - *Midterm evaluation*:
        - ...
- **Coding Period (2nd half)**:
    - Week 7:
        - *07/14 Mon*: <ins>Improved the building time of the `ObjectTree` significantly</ins><sup>?</sup>. [My calculations](https://docs.google.com/spreadsheets/d/1iniV33pwGcnrZ0X1PnutxBAxStYU5JF5IMBf1cFWUAc/edit?usp=sharing), from a pool of 39 generic databases, show that the new building time decreased by around 66.4% (by 24.3% in the worst case, and by 97.8% in the best case)
        - *07/15 Tue*: <ins>Created a first connection from the new `ObjectTree` to the actual GUI widgets</ins><sup>?</sup>
        - *07/16 Wed*: <ins>Added a method to the new `ObjectTree` that can remove items from the tree</ins><sup>?</sup>
        - *07/17 Thu*: <ins>Fixed a few bugs related to the new `ObjectTree`</ins><sup>?</sup>
        - *07/18 Fri*: ...
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

## Resources

### Videos

**New Arbalest style and themes on Linux (Ubuntu 24.04.1 LTS)** *with theme change at runtime*:

<video controls>
  <source src="assets/arbalest-linux-new.mp4" type="video/mp4">
</video>

**Old Arbalest style and themes on Linux (Ubuntu 24.04.1 LTS)**

<video controls>
  <source src="assets/arbalest-linux-old.mp4" type="video/mp4">
</video>

### Images

**New Arbalest style and light theme on Windows (Windows 11)** *with theme change at runtime*:

![](assets/arbalest-windows-light-new.png)

**Old Arbalest style and light theme on Windows (Windows 11)**:

![](assets/arbalest-windows-light-old.png)

**New Arbalest style and dark theme on Windows (Windows 11)** *with theme change at runtime*:

![](assets/arbalest-windows-black-new.png)

**Old Arbalest style and dark theme on Windows (Windows 11)**:

![](assets/arbalest-windows-black-old.png)

