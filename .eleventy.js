const fs = require('fs');
const markdownIt = require('markdown-it');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const htmlmin = require('html-minifier');

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = function(eleventyConfig) {
    // Copy the `img` and `css` folders to the output
    eleventyConfig.addPassthroughCopy('assets');

    eleventyConfig.addPlugin(syntaxHighlight);

    let markdownLibrary = markdownIt({
        html: true,
        linkify: true
    });
    eleventyConfig.setLibrary('md', markdownLibrary);

    // Shortcodes

    eleventyConfig.addShortcode('demo', function(name) {
        const componentTag = `${name.toLowerCase().split(' ').join('-')}`;
        return `<div class="example example--border">
            <div class="example__ribbon example__ribbon--tr">
                <span class="example__title">Demo</span>
            </div>
            <div class="example__content example__content--medium"><${componentTag}></${componentTag}></div>
       </div>`;
    });
    eleventyConfig.addShortcode('showcase', function(name) {
        const componentTag = `${name.toLowerCase().split(' ').join('-')}`;
        return `<div class="showcases__item">
            <div class="showcases__demo"><${componentTag}></${componentTag}></div>
            <a class="showcases__name" href="/${componentTag}/">${name}</a>
        </div>`;
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        return (n < 0) ? array.slice(n) : array.slice(0, n);
    });

    eleventyConfig.addCollection('sortByTitle', function(collectionApi) {
        return collectionApi.getAll()
            .filter(function(item) {
                let extension = item.inputPath.split('.').pop();
                return extension === 'md';
            })
            .sort(function(a, b) {
                return a.data.title.localeCompare(b.data.title);
            });
    });

    eleventyConfig.addTransform('minify-html', function(content) {
        if (this.outputPath && this.outputPath.endsWith('.html')) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
        }    
        return content;
    });

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: [
            'md',
            'njk',
            'html',
            'liquid',
        ],
        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: 'njk',

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: 'njk',

        // These are all optional (defaults are shown):
        dir: {
            input: 'contents',
            includes: '_includes',
            data: '_data',
            output: '_site'
        }
    };
};