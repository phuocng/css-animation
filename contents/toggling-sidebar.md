---
layout: layouts/post.njk
title: Toggling sidebar
---

This animation is often used when we open and close a sidebar. Opening a sidebar slides it from left to right. Closing it makes the sidebar disappear from the container.

{% demo "Toggling sidebar" %}

## Layout

The entire page is split into two parts, a sidebar, and main content:

```html
<div class="container">
    <div class="sidebar">...</div>

    <div class="content">...</div>
</div>
```

It's a common layout that can be archived by using CSS flexbox:

```css
.container {
    display: flex;
}
.sidebar {
    /* The initial width of sidebar */
    width: 30%;
}
.content {
    /* Take the available width */
    flex: 1;
}
```

The toggle button is a little bit interesting and requires more effort. It is moved along when the sidebar is being slided, hence it should be positioned absolutely to the sidebar:

```html
<div class="sidebar">
    <div class="sidebar__content"></div>
    <button class="sidebar__toggle">...</button>
</div>
```

```css
.sidebar {
    position: relative;
}

.sidebar__toggle {
    /* Absolute position */
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(100%, 0);

    /* Size */
    height: 2rem;
    width: 2rem;
}
```

It's worth noting that the `translate(100%, 0)` style moves the toggle button out of the sidebar.

## Animation

There are two possible animations that we have to prepare CSS classes for. The first class named `slide-out` slides out the sidebar from the right to left:

```css
.slide-out {
    animation-duration: 400ms;
    animation-name: slide-out;
}
@keyframes slide-out {
    0% {
        transform: translateX(0%);
        opacity: 1;
    }
    100% {
        transform: translateX(-100%);
        opacity: 0;
    }
}
```

The other one behaves oppositely which brings the sidebar back in the opposite direction:

```css
.slide-in {
    animation-duration: 400ms;
    animation-name: slide-in;
}
@keyframes slide-in {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0%);
        opacity: 1;
    }
}
```

I use the same name, `slide-out` for example, for both the CSS class and corresponding keyframe. However, it's not required and is up to your naming convention.

## Manage animation classes

Inside the handler of the toggle button's `click` event, we will toggle the animation classes depending on whether the sidebar is expanded or not.

```js
let _isExpanded = true;

const handleToggle = () => {
    if (_isExpanded) {
        sidebarEle.classList.remove('slide-in');
        sidebarEle.classList.add('slide-out');
    } else {
        sidebarEle.classList.remove('slide-out');
        sidebarEle.classList.add('slide-in');
    }
    _isExpanded = !_isExpanded;
};

toggleButtonEle.addEventListener('click', () => {
    handleToggle();
});
```

The sample code above is easy to understand as long as we represent the toggle button and the sidebar element by the `toggleButtonEle` and `sidebarEle` variables. We also need the `_isExpanded` flag to track the sidebar expanded status.

By default, the `_isExpanded` flag sets to `true`. Here are the steps when users click the toggle button for the first time:

1. The sidebar element removes the `slide-out` class
2. The sidebar element adds the `slide-in` class making the animation happens
3. Reverse the `_isExpanded` flag

As the result, the sidebar is really animated. However, it doesn't disappear from the container. Actually, it flies back to the original shape after the animation finishes.

In order to fix the problem, we will set the width of the sidebar to zero. The right moment to set it is when the animation completes its job.

```js
sidebarEle.addEventListener('animationend', (e) => {
    if (e.target === sidebarEle) {
        sidebarEle.classList.remove('slide-in');
        sidebarEle.classList.remove('slide-out');
        if (!_isExpanded) {
            sidebarEle.classList.add('sidebar--collapsed');
        }
    }
});
```

The `animationend` event triggers when any child of a particular element animates completely. Hence you can see the check `e.target === sidebarEle` to ensure that we're handling the animation event of the sidebar, not its children.

Depending on the `_isExpanded` flag, the sidebar will append the collapsed variant whose width is zero:

```css
.sidebar--collapsed {
    width: 0;
}
```
