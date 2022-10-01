---
layout: layouts/post.njk
title: Switching tabs
---

[Tab](https://csslayout.io/tab/) is a popular pattern to group content by different titles. When users switch between tabs, we animate the bottom line to indicate the selected tab.

{% demo "Switching tabs" %}

## The first approach

The tabs element consists of multiple tabs:

```html
<div class="tabs">
    <div class="tabs__titles">
        <button class="tabs__title">Day</button>
        <button class="tabs__title tabs__title--selected">Week</button>
        <button class="tabs__title">Month</button>
    </div>
</div>
```

We can center all titles horizontally by using a few CSS flex styles:

```css
.tabs__titles {
    align-items: center;
    display: flex;
}
```

The first approach uses a bottom border for the whole titles container:

```css
.tabs__titles {
    border-bottom: 2px solid #d1d5db;
}
```

A selected tab will override the border color:

```css
.tabs__title--selected {
    border-bottom: 2px solid #3b82f6;
}
```

To make the bottom borders of the whole titles and the selected tab align with each other, we need to use a negative margin for all titles:

```css
.tabs__title {
    margin-bottom: -2px;
}
```

As you can see this approach gives us the correct look and feel of the selected tab, there are a few disadvantages:

1. Using a negative value for margin isn't a common practice
2. The height of the border and margin, without caring about the positive and negative factors, must be the same (`2px`).
   You need to have a variable for it or leave a comment for the code. Otherwise, it can be changed by another engineer and the layout might be broken.

The sample code below uses a CSS variable to represent the value:

```css
:root {
    --tab-border-height: 2px;
}
.tabs__title--selected {
    border-bottom-width: var(--tab-border-height);
}
.tabs__title {
    margin-bottom: -var(--tab-border-height);
}
```

More important, since each tab has its own border, it's not easy to animate the selected border moving around when users choose a tab.

{% demo "Tab border" %}

## The second approach

Instead of using a separate border for each tab, we will create a single element to indicate the selected tab. The layout needs more additional elements:

```html
<div class="tabs">
    <!-- The titles -->
    <div class="tabs__titles">...</div>

    <!-- The bottom line -->
    <div class="tabs__line">
        <div class="tabs__indicator"></div>
    </div>
</div>
```

The `tabs-line` class represents the bottom line of whole tabs:

```css
.tabs__line {
    background: #d1d5db;
    height: 2px;
    width: 100%;
}
```

In this approach, we will use the `tabs__indicator` class to indicate the selected tab. Its position varies depending on which tab is selected. To archive the flexibility of the position, we use a relative position for the bottom line:

```css
.tabs__line {
    position: relative;
}

.tabs__indicator {
    /* The selected background */
    background: #3b82f6;

    /* Absolute position */
    position: absolute;
    top: 0;
    bottom: 0;
}
```

## Animation

When users select a tab, we have to move the indicator to under the selected tab. The two following conditions must be matched:

1. The indicator's width is the same as the selected tab's width
2. The distances to the left side of the container of the indicator and the selected tab are the same as each other

The following function makes some calculations to solve these conditions:

```js
const activateTab = (index) => {
    // Query all titles
    // Assume `containerEle` represents the root element
    const buttons = containerEle.querySelectorAll('.tabs__title');

    // Get the title corresponding to given index
    const button = buttons[index];

    // Get the bounding rectangles of the title and the root element
    const buttonRect = button.getBoundingClientRect();
    const containerRect = containerEle.getBoundingClientRect();

    const containerPaddingLeft = parseInt(window.getComputedStyle(this._containerEle).paddingLeft, 10);
    const left = buttonRect.left - containerRect.left - containerPaddingLeft;

    // Assume `indicatorEle` represents the indicator element
    indicatorEle.style.width = `${buttonRect.width}px`;
    indicatorEle.style.transform = `translateX(${left}px)`;
};
```

The last two lines set the `width` and `transform` properties, making both conditions satisfied. The `activateTab` function can be invoked inside the `click` event handler of each tab:

```js
// Assume `containerEle` represents the root element
const buttons = containerEle.querySelectorAll('.tabs__title');

[...buttons].forEach((button, index) => {
    button.addEventListener('click', () => {
        activateTab(index);
    });
});
```

In reality, tabs always have an activated tab initially. Hence, the `activateTab` can be used to activate the initial tab, for example:

```js
// Activate the first tab initially
activateTab(0);
```

Animating the indicator becomes an easy task by transitioning both `width` and `transform` properties in a given duration:

```css
.tabs__indicator {
    transition-duration: 200ms;
    transition-property: transform, width;
}
```

## See also

-   [Radio switch](/radio-switch/)
