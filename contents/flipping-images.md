---
layout: layouts/post.njk
title: Flipping images
---

Flipping images is a common way to compare two different images visually. Clicking one of them will flip it, and shows the other image.

{% demo "Flipping images" %}

_Photos by [@tronle_sg](https://unsplash.com/@tronle_sg)_

## Layout

The layout is structured as follows:

```html
<div class="flipping-images">
    <div class="flipping-images__inner">
        <div class="flipping-images__side flipping-images__side--front">
            <!-- The image shown on the front -->
            <img class="flipping-images__img" src="..." />
        </div>

        <div class="flipping-images__side flipping-images__side--back">
            <!-- The image shown on the back -->
            <img class="flipping-images__img" src="..." />
        </div>
    </div>
</div>
```

It has two sides, front and back, placed inside an inner container. We want both of them to overlap with each other. The best way to do that is to use the `relative` style for their container, and position them absolutely.

```css
.flipping-images__inner {
    /* Take full size of the root element */
    height: 100%;
    width: 100%;

    position: relative;
}

.flipping-images__side {
    /* Take full size of the inner container */
    height: 100%;
    width: 100%;

    /* Absolute position */
    position: absolute;
    top: 0;
    left: 0;
}
```

Initially, the front side is displayed on top of the backside. Users won't see the backside until clicking the front side. That's where the `z-index` property comes in handy.
Using a smaller `z-index` value ensures that the back size is hidden by default:

```css
.flipping-images__side--back {
    z-index: 1;
}
.flipping-images__side--front {
    z-index: 2;
}
```

The images must fit within its side. Without setting the width and height properties explicitly, we can use the `object-fit` property to fit the image perfectly inside each side:

```css
.flipping-images__img {
    /* Take the full height */
    height: 100%;

    /* But don't exceed the side's width */
    max-width: 100%;

    /* Fit within each side */
    object-fit: cover;
}
```

## Centering the inner

We would like to display the inner container at the [center](https://csslayout.io/centering/) of the root element. Using a combination of three CSS flexbox properties will give us the ability to do that:

```css
.flipping-images {
    /* Center the content */
    align-items: center;
    display: flex;
    justify-content: center;
}
```

Moreover, we also need to set the width of the inner container. It must be the same as the width of the images. We can handle the `load` event of one of the images, then determine its width:

```js
const handleLoad = (e) => {
    const imageEle = e.target;

    // Get the image's width
    const width = imageEle.getBoundingClientRect().width;

    // Assume `innerEle` represents the inner container
    innerEle.style.width = `${width}px`;
};

// Assume `containerEle` represents the root element
containerEle.querySelector('.flipping-images__img').addEventListener('load', handleLoad);
```

## Animation

To archive the animation you saw at the beginning of this post, we need to rotate the inner container when users click it. We create a flip variant that rotates the inner container by 180 degrees in the vertical direction:

```css
.flipping-images__inner {
    transition: transform 800ms;
}

.flipping-images__inner--flip {
    transform: rotateY(180deg);
}
```

We toggle the flip variant when users click the inner container:

```js
// Assume `innerEle` represents the inner container
innerEle.addEventListener('click', () => {
    innerEle.classList.toggle('flipping-images__inner--flip');
});
```

However, the result is that only the first image is rotated actually. The second image on the back side is still hidden. In order to replace the front side with the back one, we need more additional styles:

```css
.flipping-images__inner {
    transform-style: preserve-3d;
}
.flipping-images__side {
    backface-visibility: hidden;
}
```

Both declarations are required. Otherwise, it's not possible to see the backside when the front side is rotated. Last but not least, since we rotate the inner container causing the back side is also rotated.
Therefore, we have to reverse the rotation:

```css
.flipping-images__side--back {
    transform: rotateY(-180deg);
}
```

## 3D animation

Until now, the images are flipped within the inner container. The `perspective` style will give us the power to make the flipping look like a 3D animation.

```css
.flipping-images {
    perspective: 1000px;
}
```

It works best if the value of `perspective` is twice the width of the inner container. We can do that right inside the `load` event handler mentioned in the previous section:

```js
const handleLoad = (e) => {
    const imageEle = e.target;

    // Get the image's width
    const width = imageEle.getBoundingClientRect().width;

    // Assume `containerEle` represents the root element
    containerEle.style.perspective = `${2 * width}px`;
};
```

## Flipping horizontally

We use the `rotateY` function to flip the images in the vertical direction. If you want to change the flip direction to horizontal, then you can use the `rotateX` function.

```css
.flipping-images__inner--flip {
    transform: rotateX(180deg);
}
.flipping-images__side--back {
    transform: rotateX(-180deg);
}
```

{% demo "Flipping images horizontally" %}

_Photos by [@tronle_sg](https://unsplash.com/@tronle_sg)_
