---
layout: layouts/post.njk
title: Switching options
---

The animation is often used when users switch between two possible options. Switching between light and dark modes is a common usage of this animation.

{% demo "Switching options" %}

## Layout

The layout consists of a checkbox and circle:

```html
<label class="switch">
    <input type="checkbox" class="switch__input" />
    <div class="switch__circle"></div>
</label>
```

The checkbox is hidden all the time:

```css
.switch__input {
    display: none;
}
```

Despite the fact that it is invisible, clicking the main `label` also toggles the checkbox value because the `label` contains only a single checkbox element.

The label has the `relative` position style that can be used to position the circle:

```css
.switch {
    cursor: pointer;

    /* Rounded border */
    border-radius: 9999px;

    /* Size */
    height: 2rem;
    width: 4rem;

    position: relative;
}
```

The circle is positioned absolutely on the left side by default:

```css
.switch__circle {
    /* Rounded border */
    border-radius: 9999px;

    /* Size */
    height: 2rem;
    width: 2rem;

    /* Absolute position */
    position: absolute;
    left: 0;
    top: 0;

    background-color: #fff;
}
```

We have two possible states for the whole element:

```css
/* OFF state */
.switch--off {
    background-color: #d1d5db;
}
.switch--off .switch__circle {
    border: 1px solid #d1d5db;
    transform: translateX(0%);
}

/* ON state */
.switch--on {
    background-color: #357edd;
}
.switch--on .switch__circle {
    border: 1px solid #357edd;
    transform: translateX(100%);
}
```

Depending on the _off_ or _on_ state, the circle is moved to the left or right side of the container by using the `translateX` function.

## Animation

Since the circle uses the `transform` property to indicate its position, it becomes easy for us to apply a transition based on the `transition` property:

```css
.switch__circle {
    transition: transform 200ms;
}
```

We toggle the _on_ and _off_ state when users click on the checkbox. The simple code below assumes that `checkboxEle` and `switchEle` variables represent the checkbox and the label elements, respectively.

```js
checkboxEle.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
        switchEle.classList.remove('switch--off');
        switchEle.classList.add('switch--on');
    } else {
        switchEle.classList.remove('switch--on');
        switchEle.classList.add('switch--off');
    }
});
```

## Adding icons

We are going to demonstrate how to add icons to the left and right sides. The following example is perfectly suitable for the switching themes use case mentioned at the beginning of this post.

{% demo "Switching dark mode" %}

In addition to the checkbox and circle, there are two SVG icons:

```html
<label class="switch switch--off">
    <input type="checkbox" />
    <div class="switch__circle"></div>
    <svg class="switch__theme switch__theme--light">...</svg>
    <svg class="switch__theme switch__theme--dark">...</svg>
</label>
```

Both icons are positioned absolutely to the main label and displayed at the center vertically:

```css
.switch__theme {
    /* Size */
    height: 1rem;
    width: 1rem;

    /* Absolute position */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

> Take a look at the [Fixed at side](https://csslayout.io/fixed-at-side/) pattern to see how we can build similar layouts

Locating the light or dark icons are easy via the `left` and `right` property:

```css
.switch__theme--light {
    left: 0.5rem;
}
.switch__theme--dark {
    right: 0.5rem;
}
```

Last but not least, we need to display the circle on top of the icons. Therefore, the circle should have a bigger `z-index` value than the icons:

```css
.switch__circle {
    z-index: 1;
}
```
