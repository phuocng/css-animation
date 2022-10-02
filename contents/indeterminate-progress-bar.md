---
layout: layouts/post.njk
title: Indeterminate progress bar
---

It is a variant of a [progress bar](https://csslayout.io/progress-bar/). It is often used to inform users that a particular task is being processed but it's not possible to know when it will complete.

{% demo "Indeterminate progress bar" %}

## Layout

The progress bar is constructed by two elements, a container, and an inner bar:

```html
<div class="progress-bar">
    <div class="progress-bar__progress"></div>
</div>
```

The container has a background and rounded border:

```css
.progress-bar {
    /* Color */
    background-color: #d1d5db;

    /* Rounded border */
    border-radius: 9999px;

    /* Size */
    height: 0.75rem;
}
```

The inner bar has similar styles with a different background color:

```css
.progress-bar__progress {
    /* Different background color */
    background-color: #3b82f6;

    /* Rounded border */
    border-radius: 9999px;
}
```

## Animation

We are going to position the inner bar absolutely to the container. The inner bar also occupies the half-width of its container:

```css
.progress-bar {
    position: relative;
}

.progress-bar__progress {
    /* Absolute position */
    position: absolute;
    bottom: 0;
    top: 0;

    width: 50%;
}
```

To make the inner bar move from the left to the right side, we will use multiple keyframes indicating its positions at the beginning and end times:

```css
@keyframes indeterminate {
    from {
        left: -50%;
    }
    to {
        left: 100%;
    }
}
```

Finally, run the animation without any delay:

```css
.progress-bar__progress {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-name: indeterminate;
}
```

The `animation-iteration-count: infinite` declaration tells the browser that the animation will loop forever, making the indeterminate effect.
