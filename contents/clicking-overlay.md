---
layout: layouts/post.njk
title: Clicking overlay
---

[Modal](https://csslayout.io/modal/) is one of the common ways to display additional content on the page dynamically. It is often shown on top of an overlay that occupies the full screen.

In most cases, users can close the modal by either pressing the _Escape_ key or clicking the overlay area. However, there are some situations in that we want to avoid that behavior.

For example, the modal contains important information that users can lose when it's closed by accident. I see that scaling the content a little bit is a common approach to let users know to pay more attention.

_Click the overlay to see the effect_

{% demo "Clicking overlay" %}

## Layout

The modal including the overlay and its content is usually appended to the end of the page:

```html
<body>
    ...

    <div class="overlay">
        <div class="content">...</div>
    </div>
</body>
```

The overlay takes the full screen, hence it is positioned as a fixed element:

```css
.overlay {
    background: rgba(48, 64, 77, 0.6);

    position: fixed;
    left: 0;
    top: 0;

    /* Take the full size */
    height: 100%;
    width: 100%;
}
```

We also add an opacity value to the background allowing users to see the content behind it. In popular cases, the content is shown at the center of the overlay:

```css
.overlay {
    align-items: center;
    display: flex;
}
```

## Animation

Assume that the `overlayEle` and `contentEle` variables represent the overlay and content elements respectively. The following code handles the overlay's `click` event:

```js
overlayEle.addEventListener('click', (e) => {
    if (!contentEle.contains(e.target)) {
        contentEle.classList.add('content--scale');
    }
});
```

The `.contains` function checks if an element contains a given target. When users click the overlay, we need to check whether users click the overlay or content.
If the check `contentEle.contains(e.target)` returns `false` meaning that users don't click the content, we append the `content--scale` class to it.

The class simply scales the content up to 1.2:

```css
.content--scale {
    transform: scale(1.2);
}
```

The animation can be activated if we add the `transition` property for the content element:

```css
.content {
    transition: transform 300ms ease-out;
}
```

After a given duration, `300ms` in the sample code above, we have to scale the element down to its original size. To do that, we are going to handle the `transitionend` event:

```js
contentEle.addEventListener('transitionend', (e) => {
    if (e.target === contentEle) {
        contentEle.classList.remove('content--scale');
    }
});
```
