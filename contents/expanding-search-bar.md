---
layout: layouts/post.njk
title: Expanding search bar
---

We often use this animation to expand a search bar when users click its search icon.

{% demo "Expanding search bar" %}

## Layout

Let's take a look at the layout of the search box that consists of text input and a search button.

```html
<div class="search">
    <!-- The input element -->
    <input type="text" class="search__input" placeholder="Search" />

    <!-- The search button -->
    <button class="search__button">
        <svg class="search__icon">...</svg>
    </button>
</div>
```

These elements are displayed at the [center](https://csslayout.io/centering/) in both vertical and horizontal directions, hence we can use the `flexbox` style for the search bar:

```css
.search {
    align-items: center;
    display: flex;
    justify-content: center;
}
```

The same styles are applied to the button to center the search icon:

```css
.search__button {
    align-items: center;
    display: flex;
    justify-content: center;
}
```

## Animation

Initially, we can set a zero width for the text input to make it hidden:

```css
.search__input {
    width: 0;
}
```

In order to animate the input when it is expanded, we simply add a transition for the `width` property:

```css
.search__input {
    transition: width 120ms;
}

.search--expanded .search__input {
    width: 10rem;
}
```

When users click the search button, we will toggle the expanded class for the whole search bar. The following piece of code assumes that the `searchButton` and `searchBar` variables represent the search button and search bar elements, respectively.

```js
searchButton.addEventListener('click', () => {
    searchBar.classList.toggle('search--expanded');
});
```

To improve the user experience, you should focus on the input automatically:

```js
searchButton.addEventListener('click', () => {
    const isExpanded = searchBar.classList.contains('search--expanded');
    if (!isExpanded) {
        inputEle.focus();
    }

    ...
});
```
