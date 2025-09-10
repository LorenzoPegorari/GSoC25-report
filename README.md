<h1 align="center">Google Summer of Code 2025 - Final project report</h1>

<img align="center" src="assets/imgs/logos/logos.png" alt="GSoC_BRLCAD_arbalest_logo">

---

<div align="center"><i><a href="https://gist.github.com/LorenzoPegorari/adf89487a5adbdd7741417ea286bfaf5">Read as a GitHub Gist!</a></i></div>

## Project
**Developing a MOOSE-based Console for arbalest: a first step to merge arbalest and qged**

## Organization
BRL-CAD

## Mentors
Daniel Rossberg, Himanshu Sekhar Nayak

## Abstract
This project sets out to take the initial step in merging **BRL-CAD**'s two in-development GUIs: "**arbalest**" and "**qged**". The primary objective is to transfer **qged**'s sophisticated **GED** console, which works via low-level calls to **BRL-CAD**'s core libraries (such as **libged** and **librt**), into **arbalest**, while preserving the application's distinctive clean and easy-to-scale architecture. To support this endeavor, I will also expand **BRL-CAD**'s new lightweight, modular, object-oriented API, known as "**MOOSE**". In addition to these core tasks, I will tackle compatibility issues related to **arbalest**’s Qt widgets to ensure proper display across different OSs, as well as resolve various GUI-related bugs.

---

## Table of Contents
1. Introduction
    - Goals
    - Abandoned Goals
2. Implementation Details
    - Reworking the `ObjectTree`
    - Changes Made to MOOSE
    - The GED Console
        - How the Console Looks
    - Improving the `Qt Style Sheet`
        - New GUI
        - Old GUI
3. Minor Miscellaneous Improvements
4. Pull Requests
5. Conclusions
6. Future Work
7. Acknowledgments
8. References

---

## Introduction

Over the past few years, significant efforts have been made to create a new Graphical User Interface (GUI) for **BRL-CAD**, with the goal of replacing the two outdated but still-used GUIs: "*mged*" and "*archer*".

The two most successful efforts have been "**arbalest**" and "**qged**".

Although both are Qt-based GUIs that share the same goal, they have fundamentally different implementation philosophies:
- **arbalest** is a clean implementation built on top of "**MOOSE**", **BRL-CAD**'s new lightweight, modular, object-oriented C++ API. This approach allows developers to focus on creating maintainable, easily scalable code and adhering to good coding practices.
- **qged**, in contrast, relies on low-level calls directly to **BRL-CAD**'s internal libraries. While this approach offers significant advantages, particularly for creating really advanced features, this low-level access has required modifications to **BRL-CAD**'s core libraries, making the GUI less scalable and harder to maintain.

For my *Google Summer of Code 2025* project, I worked on enhancing the more successful GUI **arbalest**, taking the first step in merging **arbalest** and **qged**, specifically by transferring **qged**'s sophisticated **GED** (_**G**eometry **ED**iting library_, a CLI library for working on **BRL-CAD** geometry) console into **arbalest**, while preserving the GUI's distinctive clean and easy-to-scale architecture.

Aside from this main objective, I will also tackle compatibility issues related to **arbalest**’s Qt widgets to ensure proper display across different OSs (Linux and Windows mainly), as well as resolve various GUI-related bugs.

### Goals

The primary goals of the project were:

- **Improve MOOSE**: Improve the API **MOOSE**, particularly creating links that allow simple access to `libged`'s internal functions (the library that contains all **GED**-related functions)
- **Create a qged-like GED console for arbalest**: Designing a `QWidget` console that supports **GED** command execution, command completion, object names completion and command history.
- **Uniform the GUI across different OSs**: Rework the `Qt Style Sheet` in order to make the GUI appear the same on all OSs (focusing on Windows and Linux).
- **Add support for changing themes at runtime**: Make it so that the light/dark themes can be switched without having to close and reopen the application.
- **Revert the personalized title bar**: Go back to using the standard Qt title bar, in order to make **arbalest** more portable and easier to maintain.

### Abandoned Goals

The proposal included an idea for adding a functionality that would have given the user the ability to create new themes (outside of the standard light/dark ones) and modify already existing ones directly from within **arbalest**, making it simpler to customize the GUI. This idea was abandoned to prioritize more critical goals.

## Implementation Details

What follows are details about the most important changes that I have done to **arbalest** during this project.

### Reworking the `ObjectTree`

The `ObjectTree` is an essential class which has the task of representing the open geometric database, particularly the tree structure of the objects in a database.

> _**Note**_:
>
> It's important to notice that a **BRL-CAD** database is composed of two objects: *primitives* (which are the actual solids) and *combinations* (which are groups that contain other combinations and/or primitives).
> **BRL-CAD**'s databases allow primitives and combinations to be inside many different combinations at the same time. This means that the same object, even though it's defined only once in memory, can be a child of many combinations simultaneously, so it can appear many times inside the tree that represents the objects of a database.

Previously the `ObjectTree` was mainly composed of many `QHash`es that connected a unique item's id, in which an item is a node in the database tree, to one property of the corresponding geometry object. For example:

```c++
/* fullPathMap connects an item's id to the corresponding object's path */
QHash<int, QString> fullPathMap;

/* objectIdParentObjectIdMap connects an item's id to the id of the corresponding item's parent */
QHash<int, int> objectIdParentObjectIdMap;
```

This architecture has the privilege of being extremely simple, but obviously has many issues:
- The `ObjectTree`'s building speed after opening a file is pretty slow, because we need to recursively go through the database tree and fill out many `QHash`es with the properties of each node.
- When we need to retrieve many properties of the same item, we have to search for the same item's id in multiple `QHash`es, instead of just once.

To greatly improve the `ObjectTree`'s architecture I took full advantage of how **BRL-CAD**'s databases are structured, by defining the following two classes:
- `ObjectTreeItem`, which represents a node in the database tree. It contains the following properties:
    - a reference to the `ObjectTreeItem` parent,
    - a list of references to the `ObjectTreeItem`s children,
    - a reference to the `ObjectTreeItemData` that represents the **BRL-CAD**'s object in the current node in the database tree,
    - some specific properties for a node in the database tree (eg: the visibility state of the node, the unique item's id)
- `ObjectTreeItemData`, which represents an object in the database. It contains the following properties:
    - a list of references to the `ObjectTreeItem`s that share this `ObjectTreeItemData`,
    - some specific properties for an object in the database (eg: name, if it's a solid or a combination, color).

With these classes set up, it's now possible to have only 2 `QHash`es:
- The first one connects a unique item's id to the corresponding `ObjectTreeItem`.
- The second one connects a `QString` to the corresponding `ObjectTreeItemData` (since in **BRL-CAD**'s databases all objects must have a unique name).

All of this work allows us now to work with the items of the `ObjectTree` in a truly object-oriented way, making the code much clearer and more maintainable.

Also, making it so that all object-specific properties are contained inside `ObjectTreeItemData`, which is shared across many `ObjectTreeItem`, allows us to allocate memory for the object only once, and share it across all items. This also means that it is now extremely simple to change properties of an object, without having to rewrite all corresponding items.

Finally, I also reworked the "building `ObjectTree`" algorithm, making it more efficient and easier to expand if in the future more object properties are added.

The results of my work are as follows:
- Less memory is allocated the more frequently objects occur multiple times in the database tree (slightly more memory than before if all objects appear only once, mostly because of memory alignment reasons).
- `ObjectTree` building time is down by an average of 66.4% (97.8% in the best situation, 24.4% in the worst situation).

These conclusions come from the following data table, which was created by testing the old and the new `ObjectTree` on 39 standard **BRL-CAD** databases (that can be found [here](https://github.com/BRL-CAD/brlcad/tree/main/db)).

<div align="center">

<table>
    <thead>
        <tr>
            <th>Database name</th>
            <th>No. of nodes</th>
            <th>No. of objects</th>
            <th>No. nodes per object</th>
            <th>Average time old [μs]</th>
            <th>Average time new [μs]</th>
            <th>Time decrease</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>sphflake.g</th>
            <td>835</td>
            <td>834</td>
            <td>1.001</td>
            <td>136595.333</td>
            <td>3015.467</td>
            <td>97.792%</td>
        </tr>
        <tr>
            <th>havoc.g</th>
            <td>8.719</td>
            <td>2.952</td>
            <td>2.954</td>
            <td>521648.033</td>
            <td>31060.400</td>
            <td>94.046%</td>
        </tr>
        <tr>
            <th>goliath.g</th>
            <td>5.284</td>
            <td>217</td>
            <td>24.350</td>
            <td>227395.900</td>
            <td>17390.867</td>
            <td>92.352%</td>
        </tr>
        <tr>
            <th>m35.g</th>
            <td>4.241</td>
            <td>2.080</td>
            <td>2.039</td>
            <td>279974.600</td>
            <td>25470.000</td>
            <td>90.903%</td>
        </tr>
        <tr>
            <th>castle.g</th>
            <td>823</td>
            <td>125</td>
            <td>6.584</td>
            <td>31985.833</td>
            <td>4053.567</td>
            <td>87.327%</td>
        </tr>
        <tr>
            <th>tank_car.g</th>
            <td>1.301</td>
            <td>645</td>
            <td>2.017</td>
            <td>40935.367</td>
            <td>6102.100</td>
            <td>85.093%</td>
        </tr>
        <tr>
            <th>cray.g</th>
            <td>404</td>
            <td>60</td>
            <td>6.733</td>
            <td>10066.467</td>
            <td>1556.033</td>
            <td>84.542%</td>
        </tr>
        <tr>
            <th>cube.g</th>
            <td>546</td>
            <td>61</td>
            <td>8.951</td>
            <td>16964.633</td>
            <td>2671.067</td>
            <td>84.255%</td>
        </tr>
        <tr>
            <th>die.g</th>
            <td>102</td>
            <td>43</td>
            <td>2.372</td>
            <td>2356.700</td>
            <td>395.133</td>
            <td>83.234%</td>
        </tr>
        <tr>
            <th>xmp.g</th>
            <td>398</td>
            <td>53</td>
            <td>7.509</td>
            <td>8374.900</td>
            <td>1426.800</td>
            <td>82.963%</td>
        </tr>
        <tr>
            <th>star.g</th>
            <td>312</td>
            <td>199</td>
            <td>1.568</td>
            <td>6679.400</td>
            <td>1497.033</td>
            <td>77.587%</td>
        </tr>
        <tr>
            <th>bldg391.g</th>
            <td>754</td>
            <td>383</td>
            <td>1.969</td>
            <td>16193.933</td>
            <td>3660.800</td>
            <td>77.394%</td>
        </tr>
        <tr>
            <th>toyjeep.g</th>
            <td>428</td>
            <td>375</td>
            <td>1.141</td>
            <td>11734.767</td>
            <td>2715.133</td>
            <td>76.862%</td>
        </tr>
        <tr>
            <th>annual_gift_man.g</th>
            <td>271</td>
            <td>148</td>
            <td>1.831</td>
            <td>6201.500</td>
            <td>1439.600</td>
            <td>76.786%</td>
        </tr>
        <tr>
            <th>lgt-test.g</th>
            <td>227</td>
            <td>72</td>
            <td>3.153</td>
            <td>5166.800</td>
            <td>1204.833</td>
            <td>76.681%</td>
        </tr>
        <tr>
            <th>kman.g</th>
            <td>328</td>
            <td>122</td>
            <td>2.689</td>
            <td>7267.067</td>
            <td>1757.100</td>
            <td>75.821%</td>
        </tr>
        <tr>
            <th>bearing.g</th>
            <td>48</td>
            <td>39</td>
            <td>1.231</td>
            <td>967.500</td>
            <td>245.167</td>
            <td>74.660%</td>
        </tr>
        <tr>
            <th>galileo.g</th>
            <td>109</td>
            <td>61</td>
            <td>1.787</td>
            <td>2518.833</td>
            <td>646.967</td>
            <td>74.315%</td>
        </tr>
        <tr>
            <th>radialgrid.g</th>
            <td>51</td>
            <td>32</td>
            <td>1.594</td>
            <td>1097.567</td>
            <td>290.800</td>
            <td>73.505%</td>
        </tr>
        <tr>
            <th>truck.g</th>
            <td>435</td>
            <td>366</td>
            <td>1.189</td>
            <td>22349.433</td>
            <td>6465.400</td>
            <td>71.071%</td>
        </tr>
        <tr>
            <th>aet.g</th>
            <td>133</td>
            <td>57</td>
            <td>2.333</td>
            <td>2586.233</td>
            <td>764.700</td>
            <td>70.432%</td>
        </tr>
        <tr>
            <th>demo.g</th>
            <td>465</td>
            <td>178</td>
            <td>2.612</td>
            <td>6670.700</td>
            <td>1994.067</td>
            <td>70.107%</td>
        </tr>
        <tr>
            <th>traffic_light.g</th>
            <td>690</td>
            <td>138</td>
            <td>5.000</td>
            <td>95068.733</td>
            <td>32956.033</td>
            <td>65.335%</td>
        </tr>
        <tr>
            <th>shipping_container.g</th>
            <td>391</td>
            <td>383</td>
            <td>1.021</td>
            <td>22419.667</td>
            <td>7780.067</td>
            <td>65.298%</td>
        </tr>
        <tr>
            <th>ktank.g</th>
            <td>352</td>
            <td>243</td>
            <td>1.449</td>
            <td>7275.533</td>
            <td>2609.133</td>
            <td>64.138%</td>
        </tr>
        <tr>
            <th>axis.g</th>
            <td>41</td>
            <td>35</td>
            <td>1.171</td>
            <td>1022.267</td>
            <td>438.700</td>
            <td>57.086%</td>
        </tr>
        <tr>
            <th>crod.g</th>
            <td>32</td>
            <td>26</td>
            <td>1.231</td>
            <td>638.667</td>
            <td>276.833</td>
            <td>56.654%</td>
        </tr>
        <tr>
            <th>operators.g</th>
            <td>95</td>
            <td>15</td>
            <td>6.333</td>
            <td>2365.900</td>
            <td>1069.200</td>
            <td>54.808%</td>
        </tr>
        <tr>
            <th>pic.g</th>
            <td>28</td>
            <td>27</td>
            <td>1.037</td>
            <td>628.400</td>
            <td>298.233</td>
            <td>52.541%</td>
        </tr>
        <tr>
            <th>moss.g</th>
            <td>15</td>
            <td>15</td>
            <td>1.000</td>
            <td>429.633</td>
            <td>211.333</td>
            <td>50.811%</td>
        </tr>
        <tr>
            <th>rounds.g</th>
            <td>25</td>
            <td>20</td>
            <td>1.250</td>
            <td>492.767</td>
            <td>245.933</td>
            <td>50.091%</td>
        </tr>
        <tr>
            <th>woodsman.g</th>
            <td>26</td>
            <td>24</td>
            <td>1.083</td>
            <td>624.833</td>
            <td>323.633</td>
            <td>48.205%</td>
        </tr>
        <tr>
            <th>terra.g</th>
            <td>15</td>
            <td>12</td>
            <td>1.250</td>
            <td>414.367</td>
            <td>216.733</td>
            <td>47.695%</td>
        </tr>
        <tr>
            <th>wave.g</th>
            <td>25</td>
            <td>25</td>
            <td>1.000</td>
            <td>653.667</td>
            <td>372.800</td>
            <td>42.968%</td>
        </tr>
        <tr>
            <th>cornell-kunigami.g</th>
            <td>21</td>
            <td>21</td>
            <td>1.000</td>
            <td>540.900</td>
            <td>348.800</td>
            <td>37.061%</td>
        </tr>
        <tr>
            <th>cornell.g</th>
            <td>20</td>
            <td>20</td>
            <td>1.000</td>
            <td>544.233</td>
            <td>342.533</td>
            <td>35.515%</td>
        </tr>
        <tr>
            <th>world.g</th>
            <td>18</td>
            <td>18</td>
            <td>1.000</td>
            <td>502.733</td>
            <td>350.300</td>
            <td>30.321%</td>
        </tr>
        <tr>
            <th>boolean-ops.g</th>
            <td>25</td>
            <td>13</td>
            <td>1.923</td>
            <td>458.833</td>
            <td>325.700</td>
            <td>29.016%</td>
        </tr>
        <tr>
            <th>prim.g</th>
            <td>8</td>
            <td>8</td>
            <td>1.000</td>
            <td>231.867</td>
            <td>175.533</td>
            <td>24.296%</td>
        </tr>
    </tbody>
</table>

</div>

The new `ObjectTree` required many changes across the entire code, to adapt everything to the new `ObjectTree` structure.

**For details, refer to the pull requests: [#66](https://github.com/BRL-CAD/arbalest/pull/66).**

### Changes Made to MOOSE

**MOOSE** required some new functionalities and modifications.

My mentor Daniel Rossberg created hooks for registering and deregistering callback functions through the underlying methods `db_add_changed_clbk()` and `db_rm_changed_clbk()`. These callback functions are called when an object in the database is added/removed/modified. The arguments of the callback were a reference to the object and an `enum` that indicates whether said object was added/removed/modified.

While testing this new functionality, I found some issues related to having a reference to a not-fully-constructed object. In the end, we switched to passing the name of the object as an argument, instead of a reference.

Daniel Rossberg also added a way to call the registered callback if a combination's children reference changes, using the underlying methods `db_add_update_nref_clbk()` and `db_rm_update_nref_clbk()`.

Finally, I also modified the `Parse()` method (inside the `CommandString` module), the method that handles the execution of **GED** commands, in order for it to return more information about the execution result. This additional information will be used by the new console to handle some specific commands.

**For details, refer to the pull requests: [#3](https://github.com/BRL-CAD/arbalest/pull/3), [#5](https://github.com/BRL-CAD/arbalest/pull/5), [#71](https://github.com/BRL-CAD/arbalest/pull/71).**

### The GED Console

The **GED** console is the core of my proposed project.

The actual `Console` `QWidget` is not very complex and is mostly based on `libqtcad`'s `QgConsole` (the console that is used in **qged**), with some modifications to simplify it and adapt it to call **MOOSE**'s methods.

The previously described changes to **MOOSE** made it easy to implement support for all commands, and with the new `ObjectTree` it was easy to add callbacks for when a command caused changes in the database.

The most challenging part was creating methods that to update the `ObjectTree` after a command execution. To do that I created some methods for when an object is added/removed/modified, that allowed queuing Qt signals. This way, when these queued signals actually called the connected slots, it meant that the added/removed/modified objects were fully created/modified/removed, so that updating these objects could proceed smoothly.

After this, I created an algorithm that goes through the entire database tree and, for each node, checks if anything is different in the tree structure, and if so, updates it.

Finally, I revised many components of the GUI, such as `Properties`, `ObjectTreeWidget`, and many more, so that they would be able to manage the new situations introduced by certain **GED** commands. An example of these situations are the "kill commands" (`kill`, `killall`, `killtree` and `killrefs`), which, for the first time, introduced the possibility of destroying objects in the database. This required ensuring that if an object was removed from the database, all parts of the GUI would update correctly.

**For details, refer to the pull requests: [#67](https://github.com/BRL-CAD/arbalest/pull/67), [#68](https://github.com/BRL-CAD/arbalest/pull/68), [#69](https://github.com/BRL-CAD/arbalest/pull/69), [#70](https://github.com/BRL-CAD/arbalest/pull/70), [#71](https://github.com/BRL-CAD/arbalest/pull/71)**.

#### How the Console Looks

**New Arbalest console on Linux (Ubuntu 24.04.1 LTS)**:

<video controls>
  <source src="assets/videos/console-linux.mp4" type="video/mp4">
</video>

**New Arbalest console on Windows (Windows 11)**:

<video controls>
  <source src="assets/videos/console-windows.mp4" type="video/mp4">
</video>

### Improving the `Qt Style Sheet`

Many changes were made to standardize the appearance of `QWidget`s on Windows and Linux, and to make the code easier to maintain.

First of all, I reverted the hacks used to create a personalized title bar that also acted as a menu bar. These hacks caused many portability issues (particularly on macOS), so I simply removed them and restored the default Qt title bar.

After that, I focused on fixing background color issues affecting many widgets on Linux (particularly the document area buttons), and standardizing the appearance of all elements (borders, margins, paddings, sizes, etc.). While working on these issues, I completely reworked the `Qt Style Sheet` "*arbalest_simple.qss*", making it much clearer, more concise and precise. 

Finally, I added support for changing themes at runtime, without requiring the application to be restarted.

**For details, refer to the pull requests: [#60](https://github.com/BRL-CAD/arbalest/pull/60), [#61](https://github.com/BRL-CAD/arbalest/pull/61), [#62](https://github.com/BRL-CAD/arbalest/pull/62), [#63](https://github.com/BRL-CAD/arbalest/pull/63), [#64](https://github.com/BRL-CAD/arbalest/pull/64).**

#### New GUI

**New Arbalest style with dark theme on Linux (Ubuntu 24.04.1 LTS)** *with theme change at runtime*:

<video controls>
  <source src="assets/videos/gui-new-linux-dark.mp4" type="video/mp4">
</video>

**New Arbalest style with light theme on Linux (Ubuntu 24.04.1 LTS)** *with theme change at runtime*:

<video controls>
  <source src="assets/videos/gui-new-linux-light.mp4" type="video/mp4">
</video>

**New Arbalest style with dark theme on Windows (Windows 11)** *with theme change at runtime*:

<video controls>
  <source src="assets/videos/gui-new-windows-dark.mp4" type="video/mp4">
</video>

**New Arbalest style with light theme on Windows (Windows 11)** *with theme change at runtime*:

<video controls>
  <source src="assets/videos/gui-new-windows-light.mp4" type="video/mp4">
</video>

#### Old GUI

**Old Arbalest style with dark theme on Linux (Ubuntu 24.04.1 LTS)**:

<video controls>
  <source src="assets/videos/gui-old-linux-dark.mp4" type="video/mp4">
</video>

**Old Arbalest style with light theme on Linux (Ubuntu 24.04.1 LTS)**:

<video controls>
  <source src="assets/videos/gui-old-linux-light.mp4" type="video/mp4">
</video>

**Old Arbalest style with dark theme on Windows (Windows 11)**:

<video controls>
  <source src="assets/videos/gui-old-windows-dark.mp4" type="video/mp4">
</video>

**Old Arbalest style with light theme on Windows (Windows 11)**:

<video controls>
  <source src="assets/videos/gui-old-windows-light.mp4" type="video/mp4">
</video>

## Minor Miscellaneous Improvements

Other minor bug fixes and tweaks include:
- Removed `using` directives in header files, in order to fix the error `rpcndr.h: 'byte': ambiguous symbol` when building on Windows: **[#59](https://github.com/BRL-CAD/arbalest/pull/59)**.
- Removed useless memory allocation for some `MainWindow`'s icons: **[#61](https://github.com/BRL-CAD/arbalest/pull/61)**.

## Pull Requests

<div align="center">

<table>
    <thead>
        <tr>
            <th>Date of Merge</th>
            <th>Pull Request</th>
            <th>Status</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>June 7th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/59">Removed <code>using</code> directives in header files [BRL-CAD/arbalest/PR#59]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Removed <code>using</code> directives in header files, in order to do fix the error <code>rpcndr.h: 'byte': ambiguous symbol</code> when building on Windows.</td>
        </tr>
        <tr>
            <td>June 7th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/60">Reverted the hacks done to create a personalized title bar [BRL-CAD/arbalest/PR#60]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Reverted the hacks done to create a personalized title bar, and went back to using the default Qt title bar for portability and maintainability reasons.</td>
        </tr>
        <tr>
            <td>June 15th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/61">Removed <code>MainWindow</code> icon memory waste and document area buttons' icons uncertainty regarding how they appear [BRL-CAD/arbalest/PR#61]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Standardized how the document area buttons' icons look on different OSs, and removed some useless memory allocation.</td>
        </tr>
        <tr>
            <td>June 16th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/62">Standardized "<i>arbalest_simple.qss</i>" to appear the same way on Windows and Linux [BRL-CAD/arbalest/PR#62]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Standardized the <code>Qt Style Sheet</code> "<i>arbalest_simple.qss</i>" to appear the same way on Windows and Linux.</td>
        </tr>
        <tr>
            <td>June 16th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/63">Added dedicated method that sets UI elements icons and added more theme variables for icon colors [BRL-CAD/arbalest/PR#63]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Added more theme variables to define icon colors, and a dedicated method to set UI element icons.</td>
        </tr>
        <tr>
            <td>June 17th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/64">Added support for changing themes at runtime (without reopening arbalest) [BRL-CAD/arbalest/PR#64]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Added support for changing themes at runtime (without requiring the application to be restarted).</td>
        </tr>
        <tr>
            <td>August 15th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/66">Idea for new <code>ObjectTree</code> [BRL-CAD/arbalest/PR#66]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Replaced the old <code>ObjectTree</code>, which was based on <code>QHash</code>es that connect an id to one of the geometry object properties, with a new <code>ObjectTree</code>, in which a single <code>QHash</code> connects an id to an actual object that contains all the properties of a geometry object.</td> 
        </tr>
        <tr>
            <td>August 10th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/67">New <code>Console</code> for arbalest (clone from <code>libqtcad</code>'s <code>QgConsole</code>, but using MOOSE) [BRL-CAD/arbalest/PR#67]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Created the <code>QWidget</code> <code>Console</code>, heavily based on <code>libqtcad</code>'s <code>QgConsole</code>, but without having direct connections to <b>BRL-CAD</b>'s internal libraries, and connecting instead only to <b>MOOSE</b> functions.</td>
        </tr>
        <tr>
            <td>August 21th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/68">Added support to handle non-existent objects in the <code>ObjectTreeWidget</code> [BRL-CAD/arbalest/PR#68]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Modified <code>ObjectTreeWidget</code> in order to handle non-existent geometry objects.</td>
        </tr>
        <tr>
            <td>August 23th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/69">Allow the <code>ObjectTree</code> to update itself after a command execution [BRL-CAD/arbalest/PR#69]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Added methods to <code>ObjectTree</code> that allow it to update itself when a <b>GED</b> command that modified the geometry database was executed.</td>
        </tr>
        <tr>
            <td>Pending review</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/70">Fix segmentation fault when an object is selected in <code>ObjectTreeWidget</code> [BRL-CAD/arbalest/PR#70]</a></td>
            <td><img src="assets/imgs/open-pr-icon.png" height="36px" /></td>
            <td>Heavily reworked <code>ObjectTreeWidget</code> to fix a segmentation fault that occurred when an object was selected (a consequence of the modifications made to <code>ObjectTree</code>).</td>
        </tr>
        <tr>
            <td>Pending review</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/71">Added support for MOOSE's <code>ChangeType::References</code> [BRL-CAD/arbalest/PR#71]</a></td>
            <td><img src="assets/imgs/open-pr-icon.png" height="36px" /></td>
            <td>Modified <code>databaseChangeHandler</code> to support the new <code>ChangeType::References</code>.</td>
        </tr>
        <tr>
            <td>August 8th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/MOOSE/pull/3">Modified <code>Parse()</code> method so that it returns additional information [BRL-CAD/MOOSE/PR#3]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Modified the <code>Parse()</code> method (which handles the execution of <b>GED</b> commands) so that it returns additional information about the execution result.</td>
        </tr>
        <tr>
            <td>August 11th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/MOOSE/pull/5">Changed callbacks argument from <code>Object</code> to <code>const char*</code> (<code>objectName</code>) [BRL-CAD/MOOSE/PR#5]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Modified the <code>ChangeSignalHandler</code> callback function so that one of its arguments is the name of the object that triggered the callback, instead of a reference to the actual object. This avoids issues related to referencing a not-fully-constructed object.</td>
        </tr>
    </tbody>
</table>

</div>

## Conclusions

This project successfully integrated a **MOOSE**-based **qged**-like **GED** console into **arbalest**, significantly improved the `ObjectTree` architecture, and enhanced cross-platform GUI consistency.

These changes will hopefully lay the groundwork for further merging of **arbalest** and **qged**, and for future **arbalest** specific features.

## Future Work

Future work that still needs to be done is the following:

- Resolve issues in **BRL-CAD**'s core libraries that affect certain **GED** commands, due to the recently added but not fully tested "in-memory databases".
- Further merge **arbalest** and **qged**.
- Improve support and testing for macOS.

## Acknowledgements

I want to deeply thank Daniel Rossberg for being an outstanding mentor and developer. Without his help, I wouldn't have achieved what I have done during this *GSoC*.

I also want to thank the organization administrator, Christopher Sean Morrison, for always being present and supportive throughout the entire summer.

And obviously I also want to thank everyone else in the great **BRL-CAD** community who helped me during this project.

## References

- My GSoC'25 daily logs: [https://lorenzopegorari.github.io/GSoC25-report/logs](https://lorenzopegorari.github.io/GSoC25-report/logs)
- BRL-CAD's site: [https://brlcad.org](https://brlcad.org)
- BRL-CAD's main repo: [https://github.com/BRL-CAD/brlcad](https://github.com/BRL-CAD/brlcad)
- BRL-CAD's MOOSE repo: [https://github.com/BRL-CAD/MOOSE](https://github.com/BRL-CAD/MOOSE)
- BRL-CAD's arbalest repo: [https://github.com/BRL-CAD/arbalest](https://github.com/BRL-CAD/arbalest)
- BRL-CAD's Zulip IRC chat: [https://brlcad.zulipchat.com](https://brlcad.zulipchat.com)
