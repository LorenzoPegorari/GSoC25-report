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
1. Project Overview
    - Current Issues
    - Goals
2. Implementation Detals
    - ...
3. ...
4. Conclusion
5. Extra Contributions & Future Work
6. Acknowledgments
7. References

---

TODO

| Database name        | Average time old [μs] | Average time new [μs] | Time decrease |
| -------------------- | --------------------- | --------------------- | ------------- |
| sphflake.g           | 136595,333            | 3015,467              | 97,792%       |
| havoc.g              | 521648,033            | 31060,400             | 94,046%       |
| goliath.g            | 227395,900            | 17390,867             | 92,352%       |
| m35.g                | 279974,600            | 25470,000             | 90,903%       |
| castle.g             | 31985,833             | 4053,567              | 87,327%       |
| tank_car.g           | 40935,367             | 6102,100              | 85,093%       |
| cray.g               | 10066,467             | 1556,033              | 84,542%       |
| cube.g               | 16964,633             | 2671,067              | 84,255%       |
| die.g                | 2356,700              | 395,133               | 83,234%       |
| xmp.g                | 8374,900              | 1426,800              | 82,963%       |
| star.g               | 6679,400              | 1497,033              | 77,587%       |
| bldg391.g            | 16193,933             | 3660,800              | 77,394%       |
| toyjeep.g            | 11734,767             | 2715,133              | 76,862%       |
| annual_gift_man.g    | 6201,500              | 1439,600              | 76,786%       |
| lgt-test.g           | 5166,800              | 1204,833              | 76,681%       |
| kman.g               | 7267,067              | 1757,100              | 75,821%       |
| bearing.g            | 967,500               | 245,167               | 74,660%       |
| galileo.g            | 2518,833              | 646,967               | 74,315%       |
| radialgrid.g         | 1097,567              | 290,800               | 73,505%       |
| truck.g              | 22349,433             | 6465,400              | 71,071%       |
| aet.g                | 2586,233              | 764,700               | 70,432%       |
| demo.g               | 6670,700              | 1994,067              | 70,107%       |
| traffic_light.g      | 95068,733             | 32956,033             | 65,335%       |
| shipping_container.g | 22419,667             | 7780,067              | 65,298%       |
| ktank.g              | 7275,533              | 2609,133              | 64,138%       |
| axis.g               | 1022,267              | 438,700               | 57,086%       |
| crod.g               | 638,667               | 276,833               | 56,654%       |
| operators.g          | 2365,900              | 1069,200              | 54,808%       |
| pic.g                | 628,400               | 298,233               | 52,541%       |
| moss.g               | 429,633               | 211,333               | 50,811%       |
| rounds.g             | 492,767               | 245,933               | 50,091%       |
| woodsman.g           | 624,833               | 323,633               | 48,205%       |
| terra.g              | 414,367               | 216,733               | 47,695%       |
| wave.g               | 653,667               | 372,800               | 42,968%       |
| cornell.g            | 544,233               | 342,533               | 37,061%       |
| cornell-kunigami.g   | 540,900               | 348,800               | 35,515%       |
| world.g              | 502,733               | 350,300               | 30,321%       |
| boolean-ops.g        | 458,833               | 325,700               | 29,016%       |
| prim.g               | 231,867               | 175,533               | 24,296%       |

## References

- My GSoC'25 daily logs: [https://lorenzopegorari.github.io/GSoC25-report/logs](https://lorenzopegorari.github.io/GSoC25-report/logs)
- BRL-CAD's site: [https://brlcad.org](https://brlcad.org)
- BRL-CAD's main repo: [https://github.com/BRL-CAD/brlcad](https://github.com/BRL-CAD/brlcad)
- BRL-CAD's MOOSE repo: [https://github.com/BRL-CAD/MOOSE](https://github.com/BRL-CAD/MOOSE)
- BRL-CAD's arbalest repo: [https://github.com/BRL-CAD/arbalest](https://github.com/BRL-CAD/arbalest)
- BRL-CAD's Zulip IRC chat: [https://brlcad.zulipchat.com](https://brlcad.zulipchat.com)
