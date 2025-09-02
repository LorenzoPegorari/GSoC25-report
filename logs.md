<h1 align="center">Google Summer of Code 2025 - Daily logs</h1>

<img align="center" src="assets/imgs/logos/logos.png" alt="GSoC_BRLCAD_arbalest_logo">

---

> _**Tips on how to read the logs**_:
>
> In the "**PRs**" section you will find all the pull requests (PRs) related to my *Google Summer of Code 2025* project. 
>
> In the "**Logs**" section instead you will find what I worked on each day. Most of the features/bugs I worked on each day are <ins>underlined</ins> and have a superscript number <sup>#n</sup>. This number is equivalent to the id of the PR that contains the underlined features/bugs. This was done to show in which PR my work went each day.
>
> If the superscript number is <sup>x</sup>, it means that the feature that I worked on was discarded etiher to focus on more important features or because my idea/approach was wrong.

## PRs

### [arbalest](https://github.com/BRL-CAD/arbalest)

- [PR#59](https://github.com/BRL-CAD/arbalest/pull/59) = Removed `using` directives in header files, in order to do fix the error `rpcndr.h: 'byte': ambiguous symbol` when building on Windows
- [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) = Reverted the hacks done to create a personalized title bar, and went back to using the default Qt title bar for portability and maintainability reasons
- [PR#61](https://github.com/BRL-CAD/arbalest/pull/61) = Standardized how the document area buttons' icons look on different OSs, and removed some useless memory allocation
- [PR#62](https://github.com/BRL-CAD/arbalest/pull/62) = Standardized the `Qt Style Sheet` "*arbalest_simple.qss*" to appear the same way on Windows and Linux.
- [PR#63](https://github.com/BRL-CAD/arbalest/pull/63) = Added more theme variables to define icon colors, and a dedicated method to set UI element icons
- [PR#64](https://github.com/BRL-CAD/arbalest/pull/64) = Added support for changing themes at runtime (without requiring the application to be restarted)
- [PR#66](https://github.com/BRL-CAD/arbalest/pull/66) = Replaced the old `ObjectTree`, which was based on `QHash`es that connect an id to one of the geometry object properties, with a new `ObjectTree`, in which a single `QHash` connects an id to an actual object that contains all the properties of a geometry object
- [PR#67](https://github.com/BRL-CAD/arbalest/pull/67) = Created the `QWidget` `Console`, heavily based on `libqtcad`'s `QgConsole`, but without having direct connections to **BRL-CAD**'s internal libraries, and connecting instead only to **MOOSE** functions
- [PR#68](https://github.com/BRL-CAD/arbalest/pull/68) = Modified `ObjectTreeWidget` in order to handle non-existent geometry objects
- [PR#69](https://github.com/BRL-CAD/arbalest/pull/69) = Added methods to `ObjectTree` that allow it to update itself when a **GED** command that modified the geometry database was executed
- [PR#70](https://github.com/BRL-CAD/arbalest/pull/70) = Heavily reworked `ObjectTreeWidget` to fix a segmentation fault that occurred when an object was selected (a consequence of the modifications made to `ObjectTree`)
- [PR#71](https://github.com/BRL-CAD/arbalest/pull/71) = Modified `databaseChangeHandler` to support the new `ChangeType::References`

### [MOOSE](https://github.com/BRL-CAD/MOOSE)

- [PR#3](https://github.com/BRL-CAD/MOOSE/pull/3) = Modified the `Parse` method (which handles the execution of **GED** commands) so that it returns additional information about the execution result
- [PR#5](https://github.com/BRL-CAD/MOOSE/pull/5) = Modified the `ChangeSignalHandler` callback function so that one of its arguments is the name of the object that triggered the callback, instead of a reference to the actual object. This avoids issues related to referencing a not-fully-constructed object

## Logs

- **Community Bonding Period**:
    - *05/08 Thu*: Discovered that my project got accepted! 😊🎉
    - *05/09 Fri*: Dealt with all the GSoC-related bureaucratic stuff
    - *05/10 Sat*: Created [this repo](https://github.com/LorenzoPegorari/GSoC25-report) to share with my mentors what I am working / have worked on
    - *05/12 Mon*: Made a quick fix to <ins>revert the hacks done to create a personalized title bar and restore the "standard Qt" look</ins><sup>#60</sup>. For now I tested this code only on Ubuntu 24.04.1 LTS
    - *05/13 Tue*: Started working on <ins>prototyping a basic CLI in order to try to identify possible issues that could arise</ins><sup>#67</sup> (so that I can discuss them with the mentors before the Coding Period starts)
    - *05/14 Wed*: Participated in the "*Welcome 2025 Contributor talk and Q&A*" by the GSoC team
    - *05/15 Thu*: Kept working on the <ins>CLI prototype</ins><sup>#67</sup>
    - *05/19 Mon*: Tried to build and compile **BRL-CAD**, **MOOSE** and **arbalest** on Windows 11, but without any luck (for some reason **arbalest** cannot execute properly because it does not find `Qt6OpenGLWidgets`). Although, I spotted a bug that can be easily solved: when compiling **arbalest**, I got the error `rpcndr.h: 'byte': ambiguous symbol` (this is a [known issue with Windows headers](https://developercommunity.visualstudio.com/t/93889)). To fix it, I simply <ins>removed the `using namespace std;` in `Utils.h`, and I then changed all the few instances where this statement was meaningful by manually adding `std::`</ins><sup>#59</sup>
    - *05/20 Tue*: A storm caused a problem with my Internet Service Provider in my local area, so I didn't have Internet. Anyway, I kept trying to build **arbalest** on Windows 11, but with no success unfortunately
    - *05/21 Wed*: Still no Internet. I kept working on the <ins>CLI prototype</ins><sup>#67</sup>
    - *05/22 Thu*: Internet got fixed finally. Also I kept working on the <ins>CLI prototype, particularly exploring if it is possible to use the already created `QgConsole` (in `libqtcad`)</ins><sup>x</sup>
    - *05/23 Fri*: Kept working on the <ins>CLI prototype and kept exploring `libqtcad`'s `QgConsole`</ins><sup>x</sup>
    - *05/25 Sun*: Started working on the <ins>new theme creator feature</ins><sup>x</sup>, focusing on how to make it so that themes can be changed at runtime (without closing and reopening the application)
    - *05/26 Mon*: Kept working on the <ins>new theme creator feature</ins><sup>x</sup>
    - *05/27 Tue*: Found a way to make it so that <ins>themes can change at runtime without restarting the application</ins><sup>#64</sup>. I need to make sure that it works correctly in all possible cases
    - *05/29 Thu*: Worked on the <ins>CLI prototype</ins><sup>#67</sup>, focusing on the best way to bridge or reuse qtcad’s Qt Widgets without breaching **arbalest**’s clean and easy-to-scale implementation
    - *06/01 Sun*: Video chat with **BRL-CAD**'s old and new GSoC contributors and mentors before the *Coding Period* officially begins
- **Coding Period (1st half)**:
    - Week 1:
        - *06/02 Mon*: Prepared [PR#59](https://github.com/BRL-CAD/arbalest/pull/59) and [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) that I will do after I can test them on Windows 11. Kept trying to build **arbalest** on Windows 11.
        - *06/03 Tue*: Worked on <ins>fixing how **arbalest** themes appear on Linux</ins><sup>#62</sup>. Kept trying to build **arbalest** on Windows 11
        - *06/04 Wed*: Finally built **arbalest** on Windows 11! Tested and opened [PR#59](https://github.com/BRL-CAD/arbalest/pull/59). Tested [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) on Windows 11 
        - *06/05 Thu*: Participated in the "*Special Q&A session regarding the Coding Period*" by the GSoC team. Opened [PR#60](https://github.com/BRL-CAD/arbalest/pull/60)
        - *06/06 Fri*: Worked on <ins>standardizing how themes look on Linux and Windows 11</ins><sup>#62</sup>
        - *06/07 Sat*: **[PR#59](https://github.com/BRL-CAD/arbalest/pull/59) and [PR#60](https://github.com/BRL-CAD/arbalest/pull/60) got merged!**
    - Week 2:
        - *06/09 Mon*: Worked on <ins>standardizing how themes look on Linux and Windows 11</ins><sup>#61,#62</sup>
        - *06/11 Wed*: Finished <ins>standardizing how themes look on Linux and Windows 11</ins><sup>#62,#63</sup>
        - *06/12 Thu*: Worked on a few bugs related to <ins>how themes look on Linux and Windows 11</ins><sup>#61,#62#,#63,#64</sup> (e.g: icons colors, refreshing icons at runtime, refreshing properties at runtime, refreshing viewports background colors at runtime, ...)
        - *06/13 Fri*: Fully implemented support for <ins>changing themes at runtime</ins><sup>#64</sup>
        - *06/14 Sat*: Ironed out the new <ins>style and themes</ins><sup>#62</sup> and the new feature for <ins>changing themes at runtime</ins><sup>#64</sup>
        - *06/15 Sun*: Opened [PR#61](https://github.com/BRL-CAD/arbalest/pull/61), [PR#62](https://github.com/BRL-CAD/arbalest/pull/62) and [PR#63](https://github.com/BRL-CAD/arbalest/pull/63). **[PR#61](https://github.com/BRL-CAD/arbalest/pull/61) got merged!**
    - Week 3:
        - *06/16 Mon*: Opened [PR#64](https://github.com/BRL-CAD/arbalest/pull/64). **[PR#62](https://github.com/BRL-CAD/arbalest/pull/62) and [PR#63](https://github.com/BRL-CAD/arbalest/pull/63) got merged!**
        - *06/17 Tue*: **[PR#64](https://github.com/BRL-CAD/arbalest/pull/64) got merged!**
        - *06/19 Thu*: Started working again on the <ins>CLI prototype</ins><sup>x</sup>. The first goal is to find the best way to use **MOOSE** to connect **arbalest** and `libqtcad`
        - *06/22 Sun*: Tried building a <ins>**MOOSE** module that will act as a C++ layer for `libqtcad`</ins><sup>x</sup>
    - Week 4:
        - *06/23 Mon*: Kept exploring the best way to have a <ins>**MOOSE** module that will act as a C++ layer for `libqtcad`</ins><sup>x</sup>
        - *06/24 Tue*: Worked on the <ins>new CLI, focusing especially on the `QWidget` side of the CLI</ins><sup>#67</sup>
        - *06/26 Thu*: Studied how `libqtcad` is implemented as deeply as possible, in order to understand how it can be connect with **MOOSE** and **arbalest**
        - *06/28 Sat*: Kept studing how the `libqtcad` library works, focusing on understanding if it is possible to use its contents for **arbalest**
    - Week 5:
        - *06/30 Mon*: After more testing, and after talking with my mentors, I came to the conclusion that there is no way to connect the `libqtcad` library to **MOOSE**. This is because there is no way to connect them while preserving the main idea behind **MOOSE**, that is to be "a thin layer on top of **BRL-CAD**'s core libraries". Maybe directly accessing the `libqtcad` library from **arbalest** could be a good temporary solution?
        - *07/01 Tue*: Explored a way to <ins>improve the current `ObjectTree` class</ins><sup>#66</sup>, which handles the creation of a tree data structure that represents the opened database. The `ObjectTree` needs to be improved to support the **GED** commands that the new CLI will execute
        - *07/03 Thu*: Finalized a <ins>plan for how to insert a functioning CLI inside of **arbalest**, that can handle 99% of the **GED** commands</ins><sup>#66,#67</sup> (**MOOSE** will handle the execution of commands, while the `QgConsole` defined inside `libqtcad` will be used to create the actual `QWidget` console)
        - *07/04 Fri*: Submitted my plan to the mentors and <ins>started working on it</ins><sup>#66,#67</sup>
        - *07/05 Sat*: Discovered, with the help of my mentors, a problem regarding how "in-memory databases" are handled by `libged` (some **GED** commands do not work with "in-memory databases" yet, as they are a recent addition). In the mean time, I tried to see if <ins>implementing the `QgConsole` (defined inside `libqtcad`) directly into **arbalest** (without passing through **MOOSE**) would make sense, but it doesn't</ins><sup>x</sup>. This means that there is no way to reuse the already created `QgConsole`: a new `Console` `QWidget` specific for **arbalest** needs to be created.
    - Week 6:
        - *07/07 Mon*: Worked on <ins>improving the current `ObjectTree` class</ins><sup>#66</sup>. Finding a lot of issues to fix. The main one is having a way of knowing which objects in the database were added/modified/killed by a CLI command, without having to rewrite a **GED** parser
        - *07/08 Tue*: Showed a prototype of the CLI to my mentors, and discussed with them how to tackle the many issues that come with supporting all **GED** commands
        - *07/09 Wed*: In order to know which objects in the database were added/modified/killed by a CLI command, **MOOSE** should be expanded so that it can support the usage of `dbi_changed_clbks()` (a `librt` method that calls a specified function when an object in the database changes). These features will be implemented by my mentor Daniel Rossberg
        - *07/10 Thu*: Kept working on <ins>improving the current `ObjectTree` class, so that it can support many situations that are now buggy</ins><sup>#66</sup> (eg: killed objects inside a database, combinations that reference items that do not exists)
        - *07/11 Fri*: <ins>Modified the `ObjectTree` so that now, instead of using a bunch of hashmaps and sets to represent all the items of the tree, it uses the 2 classes `ObjectTreeItem` (used for items in the tree) and `ObjectTreeItemData` (used for objects in the database)</ins><sup>#66</sup>. Now the `ObjectTree` is clearer and more efficient
        - *07/12 Sat*: <ins>Increased the amount of information that the `ObjectTree` can store about the database objects, so that it can support killed objects and combinations that reference non-existent object in the database</ins><sup>#66</sup> (and, maybe in the future, support more advanced features)
    - **Midterm evaluation: Passed!**
- **Coding Period (2nd half)**:
    - Week 7:
        - *07/14 Mon*: <ins>Improved the building time of the `ObjectTree` significantly</ins><sup>#66</sup>. [My calculations](https://lorenzopegorari.github.io/GSoC25-report/#:~:text=Finally%2C%20I%20also,found%20here), from a pool of 39 generic databases, show that the new building time decreased by around 66.4% (by 24.3% in the worst case, and by 97.8% in the best case)
        - *07/15 Tue*: <ins>Created a first connection from the new `ObjectTree` to the actual GUI widgets</ins><sup>#66</sup>
        - *07/16 Wed*: Opened [PR#66](https://github.com/BRL-CAD/arbalest/pull/66), <ins>showing how the new `ObjectTree` builds, how it works, and how it connects to the GUI (used the `ObjectTreeWidget` as an example)</ins><sup>#66</sup>
        - *07/17 Thu*: <ins>Fixed a few bugs related to the new `ObjectTree`</ins><sup>#66</sup>, and pushed these changes to the [PR#66](https://github.com/BRL-CAD/arbalest/pull/66)
        - *07/20 Sun*: My mentors created a way for **MOOSE** to signal database changes. I'm working on <ins>using these methods to check when the new `ObjectTree` gets changed, and update the GUI accordingly</ins><sup>#69</sup>. My mentor Daniel Rossberg finished implementing `ChangeSignalHandler`s inside of **MOOSE**, which are a way to define a callback function that will be called after an object in the database is changed (it uses `librt`'s `dbi_changed_clbks()`)
    - Week 8:
        - *07/21 Mon*: <ins>Copied **qged**'s `QgConsole`, and started making some modifications to adapt it to **arbalest** and **MOOSE**</ins><sup>#67</sup>
        - *07/22 Tue*: Kept working on the <ins>console `QWidget`</ins><sup>#67</sup>
        - *07/23 Wed*: <ins>Made the CLI able to execute commands using the correct `Database` (the one of the currently active `Document`)</ins><sup>#67</sup>
        - *07/24 Thu*: <ins>Worked on how the console and completer look</ins><sup>#67</sup> (eg: `QStyleSheet`, events, how the results of commands are printed in the console)
        - *07/25 Fri*: Finished working on the <ins>new CLI</ins><sup>#67</sup> (ironed out the last things)
        - *07/26 Sat*: Tried working on <ins>implementing `ged_cmd_completions()` and `ged_geom_completions()` into `CommandString`</ins><sup>x</sup>, but my solution was not good enough, so my mentor Daniel Rossberg took care of it by implementing `CompleteCommand` and `CompleteObject`
    - Week 9:
        - *07/28 Mon*: Finished working on the <ins>new CLI (made it so that the command/objects completer works and ironed out the last things)</ins><sup>#67</sup>
        - *07/29 Tue*: Opened [PR#67](https://github.com/BRL-CAD/arbalest/pull/67), containing a <ins>`QWidget` for a CLI. The console is a simplified clone of `QgConsole`, the console defined in `libqtcad` and used by **qged**. It uses **MOOSE** instead of calling **BRL-CAD**'s libraries directly, and it supports command completion, geometry object names completion, and obviously the execution of commands</ins><sup>#67</sup>
        - *07/30 Wed*: Opened [PR#3](https://github.com/BRL-CAD/MOOSE/pull/3), containing a <ins>new method for **MOOSE**'s `CommandString` module, that enables `Parse()` to give more information regarding the execution of a **GED** command</ins><sup>#3</sup>. <ins>Added license, copyright notice and support for multi inputs commands</ins><sup>#67</sup> to [PR#67](https://github.com/BRL-CAD/arbalest/pull/67)
        - *07/31 Thu*: Reworked [PR#3](https://github.com/BRL-CAD/MOOSE/pull/3), <ins>following the directions of my mentors</ins><sup>#3</sup>. Participated in "*GSoC Final Submission Guidelines Info Session*" by the GSoC team
        - *08/01 Fri*: Went back on <ins>implementing the database change callbacks `ChangeSignalHandler`</ins><sup>#69</sup> (added to **MOOSE** previously by my mentors), in order to update the GUI when the database gets changed. 
        - *08/02 Sat*: Kept working on <ins>implementing the database change callbacks `ChangeSignalHandler`</ins><sup>#69</sup>. Also had a discussion with my mentors regarding [PR#3](https://github.com/BRL-CAD/MOOSE/pull/3)
        - *08/03 Sun*: Made <ins>some small fixes</ins><sup>#3</sup> to [PR#3](https://github.com/BRL-CAD/MOOSE/pull/3). Finalized [PR#66](https://github.com/BRL-CAD/arbalest/pull/66) by <ins>moving the entire logic to the new `ObjectTree`</ins><sup>#66</sup>
    - Week 10:
        - *08/04 Mon*: <ins>Added support for commands that request to close the opened document to the console</ins><sup>#67</sup> in [PR#67](https://github.com/BRL-CAD/arbalest/pull/67)
        - *08/05 Tue*: <ins>Added support for non-existent objects to `ObjectTreeWidget`</ins><sup>#68</sup>
        - *08/06 Wed*: Worked on <ins>implementing `ChangeSignalHandler` to the new `ObjectTree`</ins><sup>#69</sup>
        - *08/08 Fri*: Found 2 big issues related to using the new **MOOSE**'s `ChangeSignalHandler`, particularly regarding the usage of `rt_db_get_internal()` inside a callback function. My mentors suggest that maybe `ChangeSignalHandler` should take `const char* objectName` as an argument instead of `const Object& object` (to avoid getting the reference of a non-existent object). **[PR#3](https://github.com/BRL-CAD/MOOSE/pull/3) got merged!**
        - *08/09 Sat*: Proposed a solution to <ins>fix an issue regarding **MOOSE**'s `Parse()` new additional information causing problems with the execution of certain commands</ins><sup>x</sup>, but my solution was way too farfetched, and could have been solved in a much simpler way. My mentors took care of the issue instead. <ins>Made some adjustments to the console to adapt to the fixes made to **MOOSE**'s `Parse()`</ins><sup>#67</sup> in [PR#67](https://github.com/BRL-CAD/arbalest/pull/67)
        - *08/10 Sun*: **[PR#67](https://github.com/BRL-CAD/arbalest/pull/67) got merged!**

    - Week 11:
        - *08/11 Mon*: Found another issue related to using the new **MOOSE**'s `ChangeSignalHandler`, particularly regarding the usage of `rt_db_get_internal()` inside a callback function (these other issue is better described in [this message](https://brlcad.zulipchat.com/#narrow/channel/111975-Google-Summer-of-Code/topic/New.20BRL-CAD.20GUI/near/533793085)). To fix this and the previous issues I opened [PR#5](https://github.com/BRL-CAD/MOOSE/pull/5), which <ins>changes `ChangeSignalHandler` argument `const Object& object` to `const char* objectName` (to avoid getting the reference of a non-existent object)</ins><sup>#5</sup>. **[PR#5](https://github.com/BRL-CAD/MOOSE/pull/5) got merged!**
        - *08/13 Wed*: My VM got corrupted, so I had to redo a fresh OS download and build/compile **BRL-CAD**, **MOOSE** and **arbalest** again. In the mean time I reworked how the "final project report" page will look (inside [this repo](https://github.com/LorenzoPegorari/GSoC25-report))
        - *08/14 Thu*: Kept reworking how "final project report" page will look
        - *08/15 Fri*: Kept working on <ins>adding support to handle non-existent objects in `ObjectTreeWidget`</ins><sup>#68</sup>. Opened [PR#68](https://github.com/BRL-CAD/arbalest/pull/68)
        - *08/17 Sun*: Started working on a <ins>`updateObjectTree()` method that enables the `ObjectTree` to update itself, after a `ChangeSignalHandler` callback is called</ins><sup>#69</sup>
    - Week 12:
        - *08/18 Mon*: Added support for <ins>`ChangeSignalHandler`s to `ObjectTree`, so that now `updateObjectTree()` will be called if the database changed</ins><sup>#69</sup>
        - *08/19 Tue*: Found out that for certain **GED** commands (eg: `killrefs`), it is also necessary to make it so that `ChangeSignalHandler` should be called when a "reference" changes (meaning a combination reference) through the `db_add_update_nref_clbk()` function. This will be handled by my mentors
        - *08/20 Wed*: Kept working on the <ins>`updateObjectTree()` method</ins><sup>#69</sup>
        - *08/21 Thu*: **[PR#68](https://github.com/BRL-CAD/arbalest/pull/68) got merged!**
        - *08/22 Fri*: Finished working on the <ins>`updateObjectTree()` method</ins><sup>#69</sup> (lot of stuff in the GUI still needs to be fixed, in order to support this new command). Opened [PR#69](https://github.com/BRL-CAD/arbalest/pull/69)
        - *08/23 Sat*: Started working on <ins>fixing the `ObjectTreeWidget`, to support the updates done to `ObjectTree`</ins><sup>#70</sup>. **[PR#69](https://github.com/BRL-CAD/arbalest/pull/69) got merged!**
        - *08/24 Sun*: Kept working on <ins>fixing the `ObjectTreeWidget`</ins><sup>#70</sup>
    - Week 13:
        - *08/25 Mon*: Kept working on <ins>fixing the `ObjectTreeWidget`, fixing also other parts of the GUI (eg: `Properties`)</ins><sup>#70</sup>. Opened [PR#70](https://github.com/BRL-CAD/arbalest/pull/70). Opened [PR#71](https://github.com/BRL-CAD/arbalest/pull/71) that <ins>adds support for `ChangeType::References` (added by Daniel Rossberg), to update the `ObjectTree` only when necessary</ins><sup>#71</sup>
        - *08/26 Tue*: Started working on the final project report
        - *08/27 Wed*: Fixed a <ins>bug where `ObjectTreeItem`s were not inheriting the parent color</ins><sup>#70</sup> to [PR#70](https://github.com/BRL-CAD/arbalest/pull/70)
        - *08/28 Thu*: Fixed a <ins>bug where a new (meaning created by a the execution of a **GED** command) top-level combination's children where not correctly update</ins><sup>#70</sup> to [PR#70](https://github.com/BRL-CAD/arbalest/pull/70). Kept working on the final project report
        - *08/29 Fri*: Kept working on the final project report
        - *08/30 Sat*: **Completed the final project report, and done the final submission!**
    - **Final evaluation: ...**
