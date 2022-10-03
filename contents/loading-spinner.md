---
layout: layouts/post.njk
title: Loading spinner
---

Spinner lets users know that a particular task is being processed.

{% demo "Loading spinner" %}

## Layout

A spinner needs only a single element:

```html
<div class="loading-spinner"></div>
```

Before diving into the animation, imagine that the spinner has the same width and height:

```css
.loading-spinner {
    height: 4rem;
    width: 4rem;
}
```

At that moment, it looks like a square. The top side should have a different color:

```css
.loading-spinner {
    border: 4px solid #d1d5db;
    border-top-color: #3b82f6;
}
```

It's the right time to turn its shape into a circle by using the border-radius property. The top side then becomes one of four curves:

```css
.loading-spinner {
    border-radius: 50%;
}
```

## Animation

To make the curve move continuously, we will rotate it around itself:

```css
@keyframes spinner {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
```

The final step is to use the animation an infinite number of times:

```css
.loading-spinner {
    animation: spinner 800ms linear infinite;
}
```

## Using SVG circles

There is another approach that is more complex using SVG `circle` elements. Let's start with constructing the spinner with two circles:

```html
<svg class="svg-spinner">
    <!-- The track circle -->
    <circle class="svg-spinner__track"></circle>

    <!-- The progress circle -->
    <circle class="svg-spinner__progress"></circle>
</svg>
```

The diameters of both circles are the same as the spinner's size:

```css
.svg-spinner__track,
.svg-spinner__progress {
    stroke-width: 4px;

    /* Assume that the spinner has the size of 64px */
    cx: 32;
    cy: 32;
    r: 32;
}
```

Rather than covering the full round of spinner, the progress circle only covers a quarter corner.
Using the `dasharray` and `dashoffset` properties allows us to do that:

```css
.svg-spinner__progress {
    /* Math.PI * size */
    stroke-dasharray: 201.062;

    /* (1 - 0.25) * Math.PI * size */
    stroke-dashoffset: 150.796;
}
```

I leave the formulations here, so you can calculate the styles dynamically based on the spinner's size.

Using the `spinner` animation in the previous section gives us the same result:

```css
.svg-spinner {
    animation: spinner 800ms linear infinite;
}
```

Last but not least, the SVG element must come with a `viewBox` attribute to indicate the bounding:

```html
<svg class="svg-spinner" viewBox="-2 -2 68 68">...</svg>
```

The magic numbers `-2 -2 68 68` actually is the resulf of the formulation:

```shell
-(strokeWidth / 2) -(strokeWidth / 2) (strokeWidth + size) (strokeWidth + size)
```

The following table describes the variable used in the formulation:

| Variable      | Description               |
| ------------- | ------------------------- |
| `strokeWidth` | The border of circles (4) |
| `size`        | The spinner size (64)     |

{% demo "Svg spinner" %}

## See also

-   [Indeterminate progress bar](/indeterminate-progress-bar/)
