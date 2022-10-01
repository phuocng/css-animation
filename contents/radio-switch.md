---
layout: layouts/post.njk
title: Radio switch
---

We often see this animation when users choose an option from a given list. The following example is a popular usage that has been seen in most pricing tables.

{% demo "Radio switch" %}

## Layout

The element contains multiple child elements where each of them is a pair of a radio and a label:

```html
<div class="radio-switch">
    <label class="radio-switch__label">
        <input type="radio" class="radio-switch__input" />
        Monthly
    </label>

    <label class="radio-switch__label">
        <input type="radio" class="radio-switch__input" />
        Yearly
    </label>

    <!-- Repeat other items ... -->
</div>
```

All the labels are displayed in the same line horizontally by using CSS flexbox style for the root element:

```css
.radio-switch {
    display: flex;

    /* Make rounded border */
    background: #d1d5db;
    border-radius: 9999px;

    /* Spacing */
    padding: 0.25rem;
}
```

The radio elements are hidden all the time. Because each radio is placed inside a `label`, clicking a label also toggles the radio checked state.

```css
.radio-switch__label {
    cursor: pointer;
}
.radio-switch__input {
    display: none;
}
```

To animate the selected label, we are going to create an additional, empty element to represent the selected label:

```html
<div class="radio-switch">
    <!-- Labels ... -->

    <div class="radio-switch__selected"></div>
</div>
```

The selected element is positioned absolutely to the root element:

```css
.radio-switch {
    position: relative;
}
.radio-switch__selected {
    position: absolute;
    top: 0.25rem;
    bottom: 0.25rem;
}
```

The values of the `top` and `bottom` properties are the same as the padding of the root element.

## Animation

Our idea is to display the selected label and the selected element in the same position. To do that, whenever a label is selected:

1. The selected element must have the same width as the selected label
2. The distance of the selected element to the left side of the root element must be the same as the selected label

Let's start with handling the `click` event of the radio element, assuming that `containerEle` represents the root element:

```js
[...containerEle.querySelectorAll('.radio-switch__input')].forEach((radioEle, index) => {
    radioEle.addEventListener('click', (e) => {
        handleSelectRadio(index, radioEle);
    });
});
```

The `handleClickRadio` function handles the `click` event of a particular radio corresponding to the `index` number:

```js
const handleClickRadio = (index: number, e: MouseEvent) => {
    // Query the parent `label` element
    const label = (e.target as HTMLElement).parentElement;

    // Calculate the bounding rectangles of the label and root elements
    const labelRect = label.getBoundingClientRect();
    const containerRect = containerEle.getBoundingClientRect();

    const containerPaddingLeft = parseInt(window.getComputedStyle(containerEle).paddingLeft, 10);
    const left = labelRect.left - containerRect.left - containerPaddingLeft;

    selectedEle.style.width = `${label.clientWidth}px`;
    selectedEle.style.transform = `translateX(${left}px)`;
}
```

The last two lines set the with and position the selected element exactly at the same as the selected label.
Note that we have to subtract the left padding value of the root element from the distance between the left sides of the selected and the root elements.
It can be determined from the computed styles of the `paddingLeft` property:

```js
parseInt(window.getComputedStyle(containerEle).paddingLeft, 10);
```

After calculating the `width` and `transform` properties, we can make them animated by setting the transition properties:

```css
.radio-switch__selected {
    transition-duration: 200ms;
    transition-property: transform, width;
}
```

There is one more important thing. Since the selected label and selected element are displayed in the same position, we need to show the selected label on top of the selected element.
Setting the `z-index` property fixes the issue:

```css
.radio-switch__label {
    z-index: 1;
}
```

## See also

-   [Switching tabs](/switching-tabs/)
