<h1 align="center">Google Summer of Code 2025 - Final project report</h1>

<img align="center" src="assets/imgs/logos/logos.png" alt="GSoC_BRLCAD_arbalest_logo">

---

## Project
**Developing a MOOSE-based Console for arbalest: a first step to merge arbalest and qged**

## Organization
BRL-CAD

## Mentors
Daniel Rossberg, Himanshu Sekhar Nayak

## Abstract
This project sets out to take the initial step in merging *BRL-CAD*'s two in-development GUIs: "*arbalest*" and "*qged*". The primary objective is to transfer *qged*'s sophisticated *GED* console, which works via low-level calls to *BRL-CAD*'s core libraries (such as *libged* and *librt*), into *arbalest*, while preserving the application's distinctive clean and easy-to-scale architecture. To support this endeavor, I will also expand *BRL-CAD*'s new lightweight, modular, object-oriented API, known as "*MOOSE*". In addition to these core tasks, I will tackle compatibility issues related to *arbalest*’s Qt widgets to ensure proper display across different OSs, as well as resolve various GUI-related bugs.

---

## Table of Contents
1. Introduction
    - Goals
    - Abandoned Goals
2. Implementation Details
    - Changes made to MOOSE
    - A GED console for arbalest
    - Reworking the `ObjectTree`
3. Minor Miscellaneous Improvements
4. Final Result
    - New Console
    - New GUI
    - Old GUI
5. Pull Requests
6. Conclusion
7. Future Work
8. Acknowledgments
9. References

---

## Introduction

Over the past few years, significant efforts have been made to create a new Graphical User Interface (GUI) for BRL-CAD, with the goal of replacing the two outdated but still-used GUIs: "*mged*" and "*archer*".

The two most successful efforts have been "**arbalest**" and "**qged**". Although both are Qt-based GUIs that share the same goal, they have fundamentally different implementation philosophies:
- **arbalest** is a clean implementation built on top of "**MOOSE**", BRL-CAD's new lightweight, modular, object-oriented C++ API. This approach allows developers to focus on creating maintainable, easily scalable code and adhering to good coding practices.
- **qged**, in contrast, relies on low-level calls directly to BRL-CAD's internal libraries. While this approach offers significant advantages, particularly for creating really advanced features, this low-level access has required modifications to the BRL-CAD core libraries, potentially making the GUI less scalable and harder to maintain.

For my *Google Summer of Code 2025* project, I worked on enhancing the more successful GUI arbalest, taking the first step in merging arbalest and qged, specifically by transferring qged's sophisticated *GED* console into arbalest, while preserving the GUI's distinctive clean and easy-to-scale architecture.

Aside from this main objective, I will also tackle compatibility issues related to arbalest’s Qt widgets to ensure proper display across different OSs (Linux and Windows mainly), as well as resolve various GUI-related bugs.

### Goals

The primary goals of the this project were:

- **Improve MOOSE**: Improve the API MOOSE, partiularly creating links that allow a simple access to `libged`'s internal functions (the library that contains all GED-related functions)
- **Create a qged-like GED console for arbalest**: Designing a `QWidget` console that supports command execution, comand completion, object names completion and command history.
- **Uniform the GUI across different OSs**: Rework the `Qt Style Sheets` in order to make the GUI appear the same on all OSs (focusing on Windows and Linux).
- **Add support for changing themes at runtime**: Make it so that the light/dark themes can be switched without having to close and reopen the application.
- **Revert the personalized title bar**: Go back to using the standard Qt title bar, in order to make arbalest more portable and easier to maintain.

### Abandoned Goals

The proposal incuded an idea for adding a functionality let the user create new themes and modify already existing ones directly from within arbalest, making it simpler to customize the GUI. This idea was abandoned to prioritize the other more important goals.

## Implementation Details



### Changes made to MOOSE



### A GED console for arbalest



### Reworking the `ObjectTree`



<div align="center">

<table>
    <thead>
        <tr>
            <th>Database name</th>
            <th>Average time old [μs]</th>
            <th>Average time new [μs]</th>
            <th>Time decrease</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>sphflake.g</th>
            <td>136595,333</td>
            <td>3015,467</td>
            <td>97,792%</td>
        </tr>
        <tr>
            <th>havoc.g</th>
            <td>521648,033</td>
            <td>31060,400</td>
            <td>94,046%</td>
        </tr>
        <tr>
            <th>goliath.g</th>
            <td>227395,900</td>
            <td>17390,867</td>
            <td>92,352%</td>
        </tr>
        <tr>
            <th>m35.g</th>
            <td>279974,600</td>
            <td>25470,000</td>
            <td>90,903%</td>
        </tr>
        <tr>
            <th>castle.g</th>
            <td>31985,833</td>
            <td>4053,567</td>
            <td>87,327%</td>
        </tr>
        <tr>
            <th>tank_car.g</th>
            <td>40935,367</td>
            <td>6102,100</td>
            <td>85,093%</td>
        </tr>
        <tr>
            <th>cray.g</th>
            <td>10066,467</td>
            <td>1556,033</td>
            <td>84,542%</td>
        </tr>
        <tr>
            <th>cube.g</th>
            <td>16964,633</td>
            <td>2671,067</td>
            <td>84,255%</td>
        </tr>
        <tr>
            <th>die.g</th>
            <td>2356,700</td>
            <td>395,133</td>
            <td>83,234%</td>
        </tr>
        <tr>
            <th>xmp.g</th>
            <td>8374,900</td>
            <td>1426,800</td>
            <td>82,963%</td>
        </tr>
        <tr>
            <th>star.g</th>
            <td>6679,400</td>
            <td>1497,033</td>
            <td>77,587%</td>
        </tr>
        <tr>
            <th>bldg391.g</th>
            <td>16193,933</td>
            <td>3660,800</td>
            <td>77,394%</td>
        </tr>
        <tr>
            <th>toyjeep.g</th>
            <td>11734,767</td>
            <td>2715,133</td>
            <td>76,862%</td>
        </tr>
        <tr>
            <th>annual_gift_man.g</th>
            <td>6201,500</td>
            <td>1439,600</td>
            <td>76,786%</td>
        </tr>
        <tr>
            <th>lgt-test.g</th>
            <td>5166,800</td>
            <td>1204,833</td>
            <td>76,681%</td>
        </tr>
        <tr>
            <th>kman.g</th>
            <td>7267,067</td>
            <td>1757,100</td>
            <td>75,821%</td>
        </tr>
        <tr>
            <th>bearing.g</th>
            <td>967,500</td>
            <td>245,167</td>
            <td>74,660%</td>
        </tr>
        <tr>
            <th>galileo.g</th>
            <td>2518,833</td>
            <td>646,967</td>
            <td>74,315%</td>
        </tr>
        <tr>
            <th>radialgrid.g</th>
            <td>1097,567</td>
            <td>290,800</td>
            <td>73,505%</td>
        </tr>
        <tr>
            <th>truck.g</th>
            <td>22349,433</td>
            <td>6465,400</td>
            <td>71,071%</td>
        </tr>
        <tr>
            <th>aet.g</th>
            <td>2586,233</td>
            <td>764,700</td>
            <td>70,432%</td>
        </tr>
        <tr>
            <th>demo.g</th>
            <td>6670,700</td>
            <td>1994,067</td>
            <td>70,107%</td>
        </tr>
        <tr>
            <th>traffic_light.g</th>
            <td>95068,733</td>
            <td>32956,033</td>
            <td>65,335%</td>
        </tr>
        <tr>
            <th>shipping_container.g</th>
            <td>22419,667</td>
            <td>7780,067</td>
            <td>65,298%</td>
        </tr>
        <tr>
            <th>ktank.g</th>
            <td>7275,533</td>
            <td>2609,133</td>
            <td>64,138%</td>
        </tr>
        <tr>
            <th>axis.g</th>
            <td>1022,267</td>
            <td>438,700</td>
            <td>57,086%</td>
        </tr>
        <tr>
            <th>crod.g</th>
            <td>638,667</td>
            <td>276,833</td>
            <td>56,654%</td>
        </tr>
        <tr>
            <th>operators.g</th>
            <td>2365,900</td>
            <td>1069,200</td>
            <td>54,808%</td>
        </tr>
        <tr>
            <th>pic.g</th>
            <td>628,400</td>
            <td>298,233</td>
            <td>52,541%</td>
        </tr>
        <tr>
            <th>moss.g</th>
            <td>429,633</td>
            <td>211,333</td>
            <td>50,811%</td>
        </tr>
        <tr>
            <th>rounds.g</th>
            <td>492,767</td>
            <td>245,933</td>
            <td>50,091%</td>
        </tr>
        <tr>
            <th>woodsman.g</th>
            <td>624,833</td>
            <td>323,633</td>
            <td>48,205%</td>
        </tr>
        <tr>
            <th>terra.g</th>
            <td>414,367</td>
            <td>216,733</td>
            <td>47,695%</td>
        </tr>
        <tr>
            <th>wave.g</th>
            <td>653,667</td>
            <td>372,800</td>
            <td>42,968%</td>
        </tr>
        <tr>
            <th>cornell.g</th>
            <td>544,233</td>
            <td>342,533</td>
            <td>37,061%</td>
        </tr>
        <tr>
            <th>cornell-kunigami.g</th>
            <td>540,900</td>
            <td>348,800</td>
            <td>35,515%</td>
        </tr>
        <tr>
            <th>world.g</th>
            <td>502,733</td>
            <td>350,300</td>
            <td>30,321%</td>
        </tr>
        <tr>
            <th>boolean-ops.g</th>
            <td>458,833</td>
            <td>325,700</td>
            <td>29,016%</td>
        </tr>
        <tr>
            <th>prim.g</th>
            <td>231,867</td>
            <td>175,533</td>
            <td>24,296%</td>
        </tr>
    </tbody>
</table>

</div>

## Minor Miscellaneous Improvements

## Final Result

### New Console

**New Arbalest console on Linux (Ubuntu 24.04.1 LTS)**:

<video controls>
  <source src="assets/videos/console-linux.mp4" type="video/mp4">
</video>

**New Arbalest console on Windows (Windows 11)**:

<video controls>
  <source src="assets/videos/console-windows.mp4" type="video/mp4">
</video>

### New GUI

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

### Old GUI

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
            <td>Removed <code>using</code> directives in header files, in order to do fix the error <code>rpcndr.h: 'byte': ambiguous symbol</code> when building on Windows</td>
        </tr>
        <tr>
            <td>June 7th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/60">Reverted the hacks done to create a personalized title bar [BRL-CAD/arbalest/PR#60]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Reverted the hacks done to create a personalized title bar</td>
        </tr>
        <tr>
            <td>June 15th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/61">Removed <code>MainWindow</code> icon memory waste and document area buttons' icons uncertainty regarding how they appear [BRL-CAD/arbalest/PR#61]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Uniformed how the document area buttons' icons look on different OSs, and removed some useless memory allocation</td>
        </tr>
        <tr>
            <td>June 16th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/62">Standardized "<i>arbalest_simple.qss</i>" to appear the same way on Windows and Linux [BRL-CAD/arbalest/PR#62]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Standardized the <code>Qy Style Sheet</code> "<i>arbalest_simple.qss</i>" to appear the same way on Windows and Linux</td>
        </tr>
        <tr>
            <td>June 16th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/63">Added dedicated method that sets UI elements icons and added more theme variables for icon colors [BRL-CAD/arbalest/PR#63]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Added more theme variables to define icon colors, and added dedicated method that sets UI elements icons</td>
        </tr>
        <tr>
            <td>June 17th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/64">Added support for changing themes at runtime (without reopening arbalest) [BRL-CAD/arbalest/PR#64]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Added support for changing themes at runtime (without having reopen the application)</td>
        </tr>
        <tr>
            <td>August 15th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/66">Idea for new <code>ObjectTree</code> [BRL-CAD/arbalest/PR#66]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Replaced the old <code>ObjectTree</code>, which was based on <code>QHash</code>es that connect an id to one of the geometry object properties, with a new <code>ObjectTree</code>, in which a single <code>QHash</code> connects an id to an actual object that contains all the properties of a geometry object</td> 
        </tr>
        <tr>
            <td>August 10th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/67">New <code>Console</code> for arbalest (clone from <code>libqtcad</code>'s <code>QgConsole</code>, but using MOOSE) [BRL-CAD/arbalest/PR#67]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Created the <code>QWidget</code> <code>Console</code>, heavily based on <code>libqtcad</code>'s <code>QgConsole</code>, but without having direct connections to BRL-CAD's internal libraries, and connecting instead only to MOOSE functions.</td>
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
            <td>Added methods to <code>ObjectTree</code> that allow to update the itself when a GED command that modified the geometry database was executed.</td>
        </tr>
        <tr>
            <td>-</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/70">Fix segmentation fault when an object is selected in <code>ObjectTreeWidget</code> [BRL-CAD/arbalest/PR#70]</a></td>
            <td><img src="assets/imgs/open-pr-icon.png" height="36px" /></td>
            <td>Heavily reworked <code>ObjectTreeWidget</code> in order to fix segmentation fault when an object is selected (this segmentation fault is a consequence of the modifications done to <code>ObjectTree</code>).</td>
        </tr>
        <tr>
            <td>-</td>
            <td><a href="https://github.com/BRL-CAD/arbalest/pull/71">Added support for MOOSE's <code>ChangeType::References</code> [BRL-CAD/arbalest/PR#71]</a></td>
            <td><img src="assets/imgs/open-pr-icon.png" height="36px" /></td>
            <td>Modified <code>databaseChangeHandler</code> to support the new <code>ChangeType::References</code>.</td>
        </tr>
        <tr>
            <td>August 8th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/MOOSE/pull/3">Modified <code>Parse()</code> method so that it returns additional informations [BRL-CAD/MOOSE/PR#3]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Modified the <code>Parse()</code> method (which handles the execution of GED commands) so that it returns additional informations about the execution result.</td>
        </tr>
        <tr>
            <td>August 11th, 2025</td>
            <td><a href="https://github.com/BRL-CAD/MOOSE/pull/5">Changed callbacks argument from <code>Object</code> to <code>const char*</code> (<code>objectName</code>) [BRL-CAD/MOOSE/PR#5]</a></td>
            <td><img src="assets/imgs/merged-pr-icon.png" height="36px" /></td>
            <td>Modified the <code>ChangeSignalHandler</code> callback function, so that one of its arguments is the name of the object that called the callback, instead of a reference to the actual object. This was done to avoid issues related to having a reference to a not-fully-constructed object.</td>
        </tr>
    </tbody>
</table>

</div>

## Conclusion

## Future Work

## Acknowledgements

## References

- My GSoC'25 daily logs: [https://lorenzopegorari.github.io/GSoC25-report/logs](https://lorenzopegorari.github.io/GSoC25-report/logs)
- BRL-CAD's site: [https://brlcad.org](https://brlcad.org)
- BRL-CAD's main repo: [https://github.com/BRL-CAD/brlcad](https://github.com/BRL-CAD/brlcad)
- BRL-CAD's MOOSE repo: [https://github.com/BRL-CAD/MOOSE](https://github.com/BRL-CAD/MOOSE)
- BRL-CAD's arbalest repo: [https://github.com/BRL-CAD/arbalest](https://github.com/BRL-CAD/arbalest)
- BRL-CAD's Zulip IRC chat: [https://brlcad.zulipchat.com](https://brlcad.zulipchat.com)
