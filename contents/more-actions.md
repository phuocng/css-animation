---
layout: layouts/post.njk
title: More actions
---

The animation is often used when we show additional actions inside a menu or popover.

{% demo "More actions" %}

## Layout

You can use a SVG element to create the plus icon inside the button. Another approach seen in the demo above uses two different elements representing the `:before` and `:after` selectors of the button.

To archive that, we use the relative position of the button:

```css
.btn {
    position: relative;
}
```

The vertical line represents the `:before` selector which is positioned absolutely:

```css
.btn::before {
    background: #4b5563;

    /* Absolute position */
    content: '';
    position: absolute;
    bottom: 0.25rem;
    top: 0.25rem;

    /* Size */
    width: 1px;
}
```

The vertical line is displayed at the center of the button exactly via two CSS declarations:

```css
.btn::before {
    left: 50%;
    transform: translate(-50%, 0);
}
```

In the same way, the `:after` selector can be used to represent the horizontal line:

```css
.btn::after {
    background: #4b5563;

    /* Absolute position */
    content: '';
    position: absolute;
    left: 0.25rem;
    right: 0.25rem;

    /* Display at the center horizontally */
    top: 50%;
    transform: translate(0, -50%);

    /* Size */
    height: 1px;
}
```

To display the popover or menu right under the button, you can organize the layout as follows:

```html
<div class="container">
    <!-- The button -->
    <button class="btn"></button>

    <!-- The additional contents -->
    <div class="popover">...</div>
</div>
```

The popover should be positioned absolutely to its container:

```css
.container {
    position: relative;
}

.popover {
    position: absolute;
    left: 0;
    top: 100%;
    margin-top: 0.5rem;
}
```

> You can take a look at the [popover arrow](https://csslayout.io/popover-arrow/) pattern if you want to include an arrow at the top left corner of the popover

## Animation

When users click the button, it will be rotated by 45 degrees. The target variant has the following styles:

```css
.btn--rotate {
    transform: rotate(45deg);
}
```

To animate the button, we can add a transition for the `transform` property:

```css
.btn {
    transform-origin: center center;
    transition: transform 100ms;
}
```

Clicking the button needs to toggle the `btn--rotate` class, assuming that the `buttonEle` variable represents the button element:

```js
buttonEle.addEventListener('click', () => {
    buttonEle.classList.toggle('btn--rotate');
});
```
