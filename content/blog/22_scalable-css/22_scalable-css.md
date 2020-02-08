---
title: Scalable CSS
subtitle: Best pratices and conflicting approaches for modular and portable CSS
date: 2020-02-07
updated:
published: true
---
import Example1 from "./22a_example1";

Read:
- https://davidtheclark.com/modular-approach-to-interface-components/
- https://slides.com/linclark/webpack/#/ / https://www.youtube.com/watch?v=p3Wi3xBQdAM
- https://davidtheclark.com/on-utility-classes/
- https://github.com/davidtheclark/scalable-css-reading-list
- https://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/
- 
- https://atomicdesign.bradfrost.com/table-of-contents/
- 


-   [ ] **CSS** (modern CSS, scalable CSS, CSS in dev env/build env)
    -   [ ] PostCSS
    -   [ ] SCSS / LESS
    -   [ ] Utility CSS
    -   [ ] Tailwind CSS
    -   [ ] mini-css-extract-plugin
    -   [ ] css-loader
    -   [ ] postcss-loader
    -   [ ] Emotion
    -   [ ] Styled Components
    -   [ ] [BEM's](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
    -   [ ] [SUIT's](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
    -   [ ] [Atomic CSS](https://acss.io/)
    - COMPONENT-BASED FRAMEWORKs
    - https://github.com/awesome-css-group/awesome-css#readme
    - https://github.com/addyosmani/critical-path-css-tools#readme
    - https://github.com/AllThingsSmitty/must-watch-css#readme
    - https://github.com/AllThingsSmitty/css-protips#readme
    - https://github.com/troxler/awesome-css-frameworks#readme



## Complexity is the enemy

([skip](#css-cant-say-its-simple) Grandpa's war-time stories)

Every software developer knows that even smaller coding projects can get very complex - complex to the point that all its logic and constraints surpass the cognitive ability of one single human brain. Once that happens, the rate of *new bugs per code change* will often increase. Or, to put it the other way: The effort needed to make bug-free code changes will rise dramatically.

If you like a short historical detour, pull up the [1968 NATO Software Engineering Conference report](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF) and read Chapter 7.1. on "Software: The state of the art" which discussed the software industry's inability to reliably produce complex software. According to wikipedia, this conference coined the term "[Software Crisis](https://en.wikipedia.org/wiki/Software_crisis)". 

To quote one of the participants:
> The general admission of the existence of the software failure in this group of responsible people is the most refreshing experience I have had in a number of years, because the admission of shortcomings is the primary condition for improvement.
> 
> Dijkstra (1968)

So, what kind of improvements did humankind come up with?

People figured out that complexity was the enemy. Complex problems had to be broken down into smaller, more manageable problems - complex solutions had to be composed up from more simpler solutions. 

Separating concerns ([term coined by Dijkstra in 1974](https://en.wikipedia.org/wiki/Separation_of_concerns#Origin)) - into multiple modules that offer well-defined interfaces (for use by other modules) while encapsulating (and hiding) their inner implementation - enables a level of abstraction that allows humans to understand, discuss and coordinate otherwise overwhelming problems. 

The idea of independent modules with defined interfaces and encapsulated implementation can be found everywhere, from Microservices and OOP Classes to Web Components. In theory, systems made from these modules will be easier to maintain and extend, enabling a better quality and faster development iterations.

There were other important ideas, of course: 
- Patterns (for Software Design, Enterprise Architecture, Refactoring etc.)
- Process Patterns and Best Practices (Lean, Agile, extreme Programming, Scrum etc.)

## Modularity in Web Applications

 

## CSS: Can't Say it's Simple

Every software developer knows that 

Abstraction
[Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
Modularity
Encapsulation is information hiding
Well-defined interfaces (hiding implementation)

higher extensibility
easier maintenance
better quality
independent development
module/component reuse

- (non-inline) CSS rules apply globally to whole DOM
- Complex selectors targeting nodes in a tree
- non-zero defaults
- inheritance of values
- Different implementations between browsers

role
behavior

problems

<Example1 />

## dsa
