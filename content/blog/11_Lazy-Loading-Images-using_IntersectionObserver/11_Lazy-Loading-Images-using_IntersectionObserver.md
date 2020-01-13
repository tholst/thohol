---
title: Lazy Loading with IntersectionObserver
subtitle: Lazy Loading of DOM elements like images, videos etc. using IntersectionObserver
date: 2019-11-10
updated:
published: true
---

# Lazy Loading of DOM elements like images, videos etc. using IntersectionObserver

Note:

-   [not supported on IE](https://caniuse.com/#feat=intersectionobserver)
-   Alternative approaches:
    -   connect to scroll event
    -   using periodic timer and calling `getBoundingClientRect()` on target (observed) element: NOT a good option because it is painfully slow as each call to getBoundingClientRect() forces the browser to re-layout the entire page and will introduce considerable jank to your website.

Links:

-   [W3C Spec](https://w3c.github.io/IntersectionObserver/)
-   [Google Developer Article](https://developers.google.com/web/updates/2016/04/intersectionobserver)
-   [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
-   [Polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)

## Minimal Example

**HTML**

```html
<div id="scrollArea">
    ...
    <div id="listItem">...</div>
    ...
</div>
```

**JS**

```js
// Step 1: Create Observer on a given viewport ('root' option below)

let options = {
    root: document.querySelector("#scrollArea"), // The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
    rootMargin: "0px 0px 0px 0px", // This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.
    threshold: 1.0 // A threshold of 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked. Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
};

let observer = new IntersectionObserver(callback, options);

// Step 2: Observe a target element
let target = document.querySelector("#listItem"); // the target must be a descendant of the root element
observer.observe(target);

// Step 3: Handle target observations (whenever the target meets a threshold specified for the observer, the callback is invoked.)
let callback = (entries, observer) => {
    // The callback receives a list of IntersectionObserverEntry objects and the observer:
    entries.forEach(entry => {
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio - Returns the ratio of the intersectionRect to the boundingClientRect. This will NOT neccessarily be one of the tresholds specified for the observer, but the actual ratio. Tresholds only specify that the callback should be called whenever a treshold is crossed.
        //   entry.intersectionRect - Returns a DOMRectReadOnly representing the target's visible area.
        //   entry.isIntersecting - A Boolean value which is true if the target element intersects with the intersection observer's root. If this is true, then, the IntersectionObserverEntry describes a transition into a state of intersection; if it's false, then you know the transition is from intersecting to not-intersecting.
        //   entry.rootBounds
        //   entry.target - The Element whose intersection with the root changed.
        //   entry.time
    });
};
```

## Delay Loading Example

from [W3C's Intersection Observers Explained](https://github.com/w3c/IntersectionObserver/blob/master/explainer.md)

Many sites like to avoid loading certain resources until they're near the viewport. This is easy to do with an IntersectionObserver:

```html
<!-- index.html -->
<div class="lazy-loaded">
    <template>
        ...
    </template>
</div>
```

```js
function query(selector) {
    return Array.from(document.querySelectorAll(selector));
}

var observer = new IntersectionObserver(
    // Pre-load items that are within 2 multiples of the visible viewport height.
    function(changes) {
        changes.forEach(function(change) {
            var container = change.target;
            var content = container.querySelector("template").content;
            container.appendChild(content);
            observer.unobserve(container);
        });
    },
    { rootMargin: "200% 0%" }
);

// Set up lazy loading
query(".lazy-loaded").forEach(function(item) {
    observer.observe(item);
});
```
