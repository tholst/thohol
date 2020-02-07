# Putting your Markdown-based articles on the Web (a custom blog/website)

## Markdown to HTML

### Pandoc

```bash
$ brew install pandoc
```

Transform a Markdown document to HTML with (the `-s` is optional, it is used to create a _standalone_ html document):

```
$ pandoc example.md -f markdown -t html -s -o example.html
```

Below is some example Markdown input and the generated HTML output.

**Input: Markdown**

````Markdown
# A very interesting topic!

## Introduction with list

- a
- b
- c

## THE SOURCE CODE

```js
var some = () => "code";
```

## And some nice image!

![A nice Image](https://via.placeholder.com/300x50/FFFFFF/000000?text=Image)

````



**Output: embeddable HTML (without pandoc -s)**

```HTML
<h1 id="a-very-interesting-topic">A very interesting topic!</h1>
<h2 id="introduction-with-list">Introduction with list</h2>
<ul>
  <li>a</li>
  <li>b</li>
  <li>c</li>
</ul>
<h2 id="the-source-code">THE SOURCE CODE</h2>
<div class="sourceCode" id="cb1">
  <pre
    class="sourceCode js"
  ><code class="sourceCode javascript"><span id="cb1-1"><a href="#cb1-1"></a><span class="kw">var</span> some <span class="op">=</span> () <span class="kw">=&gt;</span> <span class="st">&quot;code&quot;</span><span class="op">;</span></span></code></pre>
</div>
<h2 id="and-some-nice-image">And some nice image!</h2>
<figure>
  <img
    src="https://via.placeholder.com/300x50/FFFFFF/000000?text=Image"
    alt=""
  />
  <figcaption>A nice Image</figcaption>
</figure>

```

**Output: standalone HTML (with pandoc -s)**

```HTML
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
  <head>
    <meta charset="utf-8" />
    <meta name="generator" content="pandoc" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=yes"
    />
    <title>20a_Markdown-Article-Example</title>
    <style>
      code {
        white-space: pre-wrap;
      }
      span.smallcaps {
        font-variant: small-caps;
      }
      span.underline {
        text-decoration: underline;
      }
      /*
        ...more styles....
      */
    </style>
  </head>
  <body>
    <!-- actual content from markdown, same as above when generated without -s -->
  </body>
</html>

```

## Website Integration

### Single Page Applications

Tasks

1. Convert Markdown to HTML
2. Display HTML within SPA
3. Create list of articles based on available articles
4. Only include articles marked as published

### One Page Per Article


