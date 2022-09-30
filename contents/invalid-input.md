---
layout: layouts/post.njk
title: Invalid input
---

The animation is often used to indicate an invalid input. It shakes the input for a while.

_Press the Enter key to see the effect_

{% demo "Invalid input" %}

The shaking animation moves the element to the left and right sides. It can be done by using the `translateX` function:

```css
@keyframes shake {
    from,
    to {
        transform: translateX(0);
    }

    40%,
    80% {
        transform: translateX(-1rem);
    }

    20%,
    60% {
        transform: translateX(1rem);
    }
}
```

To use the animation, we can add a simple `animation` style:

```css
.input--invalid {
    animation: shake 1s;
    outline-color: #ef4444;
}
```

Let's assume that `inputEle` represents the input element. You can add the invalid CSS class created above anytime to indicate the input is invalid:

```js
inputEle.classList.add('input--invalid');
```

## Remove the animation

If you want to remove the invalid state from the element when the animation completes, you can handle the `animationend` event:

```js
inputEle.addEventListener('animationend', (e) => {
    if (e.animationName === 'shake') {
        inputEle.classList.remove('input--invalid');
    }
});
```

Inside the event handler, you can use the `animationName` property to check which animation is completed. It's very useful in the case the element runs more than one animation at the same time.
