# plugin-lightbox (A README Experience)
A plugin for [Micro.blog](https://micro.blog "Micro.blog") for presenting a slide carousel containing images and/or videos. It was inspired by Jason Becker’s [plugin](https://github.com/jsonbecker/plugin-glightbox) with which I’m sure you are already familiar.

![Slide](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/slide.jpeg)

***Needs updating: lightbox.js is now being built via a template using parameter values***

## GLightbox Injection

The [GLightbox](https://biati-digital.github.io/glightbox/ "GLightbox") Javascript and CSS Stylesheet have been bundled into the plugin. They may be found in their respective directories beneath `static/assets`.

In the `static/assets/js/` directory you will also find `lightbox.js`, which is the script that creates your `GLightbox` object. There is still so much more parameterization possible with this plugin, perhaps starting with those custom HTML variable values.

```js
const customLightboxHTML = `<div id="glightbox-body" class="glightbox-container">
    <div class="gloader visible"></div>
    <div class="goverlay"></div>
    <div class="gcontainer">
    <div id="glightbox-slider" class="gslider"></div>
    <button class="gnext gbtn" tabindex="0" aria-label="Next" data-customattribute="example">{nextSVG}</button>
    <button class="gprev gbtn" tabindex="1" aria-label="Previous">{prevSVG}</button>
    <button class="gclose gbtn" tabindex="2" aria-label="Close">{closeSVG}</button>
</div>
</div>`;

let customSlideHTML = `<div class="gslide">
    <div class="gslide-inner-content">
        <div class="ginner-container">
            <div class="gslide-media">
            </div>
            <div class="gslide-description">
                <div class="gdesc-inner">
                    <h4 class="gslide-title"></h4>
                    <div class="gslide-desc"></div>
                </div>
            </div>
        </div>
    </div>
    </div>`;
    
const lightbox = GLightbox({
  lightboxHTML: customLightboxHTML,
  slideHTML: customSlideHTML
});

lightbox.on('open', () => {
  if (typeof dataLayer === 'undefined') { return; }
  dataLayer.push({'event': 'lightbox_opened'});
});

lightbox.on('close', () => {
  if (typeof dataLayer === 'undefined') { return; }
  dataLayer.push({'event': 'lightbox_closed'});
});

lightbox.on('slide_changed', ({ prev, current }) => {
  
  if (typeof dataLayer === 'undefined') { return; }
  
  // Prev and current are objects that contain the following data
  // const { slideIndex, slideNode, slideConfig, player, trigger } = current;
  let event = 'lightbox_slide_changed';
  let title = current.slideConfig.title;
  let alt = current.slideConfig.alt;
  let description = current.slideConfig.description;
  let type = current.slideConfig.type;
  
  dataLayer.push({'event': event,'slide_title': title,'art_piece':title,'slide_alt': alt,'slide_description': description,'slide_type': type});
  
});
```

You’ll notice that the lightbox open and close events, as well as slide change events, are monitored and various values pushed into `dataLayer`. I did this to make it available to myself for Google Tag Manager; but, you needn’t keep it. This is another possible point of parameterization.

If you’re into customizing sh$t, you will want to check out the [glightbox README](https://github.com/biati-digital/glightbox#readme "Glightbox README"). It is full of useful things to know about using the framework.

## Shortcodes (and Partials)

When it comes to the included shortcodes, the beast of burden here is definitely `layouts/partials/lightbox.html`. That’s right. I said ***partial***. I wanted re-useable code … and I wanted it invokeable from within content markdown files as well as from theme templates. The solution was to create templates and include shortcodes that bounced it all over. The parameters for the shortcodes and partials mirror each other with shortcode parameter names being *dash-cased* and partial parameter names being *underscore\_cased*. Let’s have a look at the ridiculous collection of available parameters.

### `lightbox` Parameters

<dl>
<dt>href</dt><dd>The URL for the slide content. This is required unless a <code>src</code> parameter value has been provided.</dd>

<dt>src</dt><dd>The URL for the link content. This is required unless an <code>href</code> parameter value has been provided.</dd>

<dt>link-class / link_class</dt><dd>Custom class to apply to the anchor tag. Default is undefined. <code>glightbox</code> is always applied.</dd>

<dt>link-style / link_style</dt><dd>Custom style to apply to the anchor tag. Default is undefined.</dd>

<dt>gallery</dt><dd>The name of the slide's gallery. Default is undefined.</dd>

<dt>title</dt><dd>The slide's title. Default is undefined.</dd>

<dt>description</dt><dd>The slide's description. Default is undefined.</dd>

<dt>desc-postion / desc_position</dt><dd>(<code>bottom</code>, <code>top</code>, <code>left</code>, <code>right</code>) Where the slide's description should be positioned. Default is <code>bottom</code>.</dd>

<dt>type</dt><dd>(<code>image</code>, <code>video</code>, <code>inline</code>?, <code>iframe</code>?) The slide type. Default infers from source … and the last two options I'm not so sure about.</dd>

<dt>effect</dt><dd>(<code>zoom</code>, <code>fade</code>, <code>none</code>) The animation effect the slide should use. Default is <code>zoom</code>.</dd>

<dt>width</dt><dd>The custom width for this slide. Default is <code>900px</code>.</dd>

<dt>height</dt><dd>The custom height for this slide. Default is <code>506px</code>.</dd>

<dt>zoomable</dt><dd>Whether this slide should be zoomable. Default is <code>true</code>.</dd>

<dt>draggable</dt><dd>Whether this slide should be draggable. Default is <code>true</code>.</dd>

<dt>sizes</dt><dd>Specifies image sizes for different page layouts. Default is undefined.</dd>

<dt>srcset</dt><dd>Specifies a list of image files to use in different situations. Default is undefined.</dd>

<dt>video-class / video_class</dt><dd>Custom class to apply to the video tag. Default is undefined.</dd>

<dt>video-style / video_style</dt><dd>Custom style to apply to the video tag. Default is undefined.</dd>

<dt>loop</dt><dd>Whether the link video should loop. Default is <code>true</code>.</dd>

<dt>autoplay</dt><dd>Whether the link video should be set to autoplay. Default is <code>true</code>.</dd>

<dt>preload</dt><dd>Value for the link video's preload attribute. This ignored when set to autoplay. Default is undefined.</dd>

<dt>alt</dt><dd>Specifies an alternate text for an image. Default is undefined.</dd>

<dt>img-class / img_class</dt><dd>Custom class to apply to the img tag. Default is undefined.</dd>

<dt>img-style / img_style</dt><dd>Custom style to apply to the img tag. Default is undefined.</dd>

<dt>photo-width / photo_width</dt><dd>Specifies a pixel width for a thumbnail image to be fetched using the <code>https://micro.blog/photos/</code> API. Default is undefined.</dd>
</dl>

### `gallery` Parameters

<dl>
<dt>wrap</dt>
<dd>Whether the gallery links should wrap or be constrained to a single row. Default is<code>true</code>.</dd>

<dt>div-class / div_class</dt>
<dd>Custom class to apply to the <code>div</code>. Default is<code>undefined</code>. 'gallery' is always applied.</dd>

<dt>div-style / div_style</dt>
<dd>Custom style to apply to the <code>div </code>in additon to the flex declaration and wrap specification. Default is<code>undefined</code>.</dd>

<dt>link-class / link_class</dt>
<dd>Custom class to apply to all anchor tags. Default is<code>undefined</code>. gallery-link and glightbox are always applied.</dd>

<dt>link-style / link_style</dt>
<dd>Custom style to apply to all anchor tags. Default is<code>undefined</code>.</dd>

<dt>gallery</dt>
<dd>The name of the gallery. This is required.</dd>

<dt>desc-position / desc_position</dt>
<dd>(<code>bottom</code>, <code>top</code>, <code>left</code>, <code>right</code>) Where all slides descriptions should be positioned. Default is <code>bottom</code>.</dd>

<dt>effect</dt>
<dd>(<code>zoom</code>, <code>fade</code>, <code>none</code>) The animation effect all slide should use. Default is <code>zoom</code>.</dd>

<dt>width</dt>
<dd>The custom width for all slides. Default is <code>900px</code>.</dd>

<dt>height</dt>
<dd>The custom height for all slides. Default is <code>506px</code>.</dd>

<dt>zoomable</dt>
<dd>Whether slides should be zoomable. Default is<code>true</code>.</dd>

<dt>draggable</dt>
<dd>Whether slides should be draggable. Default is<code>true</code>.</dd>

<dt>video-class / video_class</dt>
<dd>Custom class to apply to all <code>video</code> tags. Default is<code>undefined</code>. gallery-video is always applied.</dd>

<dt>video-style / video_style</dt>
<dd>Custom style to apply to all <code>video</code> tags. Default is<code>undefined</code>.</dd>

<dt>loop</dt>
<dd>Whether link videos should loop. Default is<code>true</code>.</dd>

<dt>autoplay</dt>
<dd>Whether link videos should be set to autoplay. Default is<code>true</code>.</dd>

<dt>preload</dt>
<dd>Value for link video <code>preload</code> attributes. This ignored when set to autoplay. Default is<code>undefined</code>.</dd>

<dt>img-class / img_class</dt>
<dd>Custom class to apply to all <code>img</code> tags. Default is<code>undefined</code>. gallery-image is always applied.</dd>

<dt>img-style / img_style</dt>
<dd>Custom style to apply to all <code>img</code> tags. Default is<code>undefined</code>.</dd>

<dt>photo-width / photo_width</dt>
<dd>Specifies a pixel width for a thumbnail image to be fetched using the <code>https://micro.blog/photos/</code> API. Default is<code>undefined</code>.</dd>

<dt>scheme</dt>
<dd>Shortcode-only parameter used to get around the autolinking when passing a string of JSON from the markdown file. This should be <code>https</code> or <code>http</code>.</dd>

<dt>host</dt>
<dd>Shortcode-only parameter used to get around the autolinking when passing a string of JSON from the markdown file. This should be <code>HOSTNAME</code></dd>

<dt>slide-data / slide_data</dt>
<dd>The <i>shortcode</i> parameter expects a string containing a JSON array of slide JSON objects. The JSON should use the underscore version of the keys as defined below. When passing the JSON string to the shortcode, use relative URL values and provide <code>scheme</code> and <code>host</code> values as described above. The <i>partial</i> parameter expects this same data but already unmarshalled into a valid <code>Slice</code>.</dd>
<dl>
<dt>href</dt>
<dd>The URL for the slide content. This is required unless a <code>src</code> parameter value has been provided.</dd>

<dt>src</dt>
<dd>The URL for the link content. This is required unless an <code>href</code> parameter value has been provided.</dd>

<dt>link_style</dt>
<dd>Custom style to apply to the anchor tag. Default is <code>undefined</code>.</dd>

<dt>gallery</dt>
<dd>The name of the slide's gallery. Default is <code>undefined</code>.</dd>

<dt>title</dt>
<dd>The slide's title. Default is <code>undefined</code>.</dd>

<dt>description</dt>
<dd>The slide's description. Default is <code>undefined</code>.</dd>

<dt>desc_position</dt>
<dd>(<code>bottom</code>, <code>top</code>, <code>left</code>, <code>right</code>) Where the slide's description should be positioned. Default is <code>bottom</code>.</dd>

<dt>type</dt>
<dd>(<code>image</code>, <code>video</code>, <code>inline</code>?, <code>iframe</code>?) The slide type. Default infers from source … and the last two options I'm not sure about.</dd>

<dt>effect</dt>
<dd>(<code>zoom</code>, <code>fade</code>, <code>none</code>) The animation effect the slide should use. Default is <code>zoom</code>.</dd>

<dt>width</dt>
<dd>The custom width for this slide. Default is <code>900px</code>.</dd>

<dt>height</dt>
<dd>The custom height for this slide. Default is <code>506px</code>.</dd>

<dt>zoomable</dt>
<dd>Whether this slide should be zoomable. Default is <code>true</code>.</dd>

<dt>draggable</dt>
<dd>Whether this slide should be draggable. Default is <code>true</code>.</dd>

<dt>sizes</dt>
<dd>Specifies image sizes for different page layouts. Default is<code>undefined</code>.</dd>

<dt>srcset</dt>
<dd>Specifies a list of image files to use in different situations. Default is<code>undefined</code>.</dd>

<dt>video_style</dt>
<dd>Custom style to apply to the <code>video tag</code>. Default is<code>undefined</code>.</dd>

<dt>loop</dt>
<dd>Whether the link video should loop. Default is<code>true</code>.</dd>

<dt>autoplay</dt>
<dd>Whether the link video should be set to autoplay. Default is<code>true</code>.</dd>

<dt>preload</dt>
<dd>Value for the link video's <code>preload</code> attribute. This ignored when set to <code>autoplay</code>. Default is<code>undefined</code>.</dd>

<dt>alt</dt>
<dd>Specifies an alternate text for an image. Default is<code>undefined</code>.</dd>

<dt>img_style</dt>
<dd>Custom style to apply to the <code>img</code> tag. Default is<code>undefined</code>.</dd>

<dt>photo_width</dt>
<dd>Specifies a pixel width for a thumbnail image to be fetched using the <code>https://micro.blog/photos/</code> API. Default is<code>undefined</code>.</dd>
</dl>
</dl>

### Okay, That’s A Lot
Some of y’all will be relieved to discover that I also include a shortcode mimicking Becker’s `glightbox` shortcode. It takes the following parameters:

<dl>
<dt>src</dt>
<dd>An image URL for the slide. This is required.</dd>

<dt>img-width</dt>
<dd>Specifies a pixel width for a thumbnail image to be fetched using the <code>https://micro.blog/photos/</code> API. Default is<code>260px</code>.</dd>

<dt>gallery</dt>
<dd>The name of the slide's gallery. Default is <code>undefined</code></dd>

<dt>title</dt>
<dd>The slide's title. Default is <code>undefined</code>.</dd>

<dt>description</dt>
<dd>The slide's description. Default is <code>undefined</code>.</dd>

<dt>alt</dt>
<dd>Specifies an alternate text for an image. Default is<code>undefined</code>.</dd>
</dl>

### Okay, One More

There is a special flavor of the `gallery` shortcode named `gallery-markdown`. It is identical to the `gallery` shortcode with the exception that you do not provide slide data as a parameter. It is used as a paired tag with inner content comprised of markdown images (such as one might find exported from [Ulysses](https://ulysses.app "Ulysses")). The caption and   src values are parsed from the markdown and used to create the slide objects.

## Use Cases

Say you’re in a Ulysses sheet and wanna drop some images in a gallery. You can be all:

![From Ulysses](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/from_ulysses.jpeg)

and then the result will be all:

![From Ulysses Result](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/from_ulysses_result.jpeg) ![Cold Race War](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/cold_race_war.jpeg)

Or, you could be … that one other guy … that just thinks it’s cool to be able to stick this directly into your Micro.blog post: 
```md
{{< gallery gallery="chapterx" scheme="https" host="moondeer.blog" link-style="height:20vh;flex-grow:1;" slide-data="[{\"src\":\"/uploads/2021/4f0024c294.jpg\"}, {\"src\":\"/uploads/2021/b0e919de8a.jpg\"}, {\"src\":\"/uploads/2021/5f0e585195.jpg\"}, {\"src\":\"/uploads/2021/d98e67ac8e.jpg\"}, {\"src\":\"/uploads/2021/8d4a236a5a.jpg\"}, {\"src\":\"/uploads/2021/de2e42c518.jpg\"}, {\"src\":\"/uploads/2021/3f8d0ef051.webp\"}, {\"src\":\"/uploads/2021/6b85041015.webp\"}, {\"src\":\"/uploads/2021/e84db9a063.jpg\"}, {\"src\":\"/uploads/2021/13eb82ba44.jpg\"}, {\"src\":\"/uploads/2021/fd727a1100.jpg\"}, {\"src\":\"/uploads/2021/60d13dc85d.jpg\"}, {\"src\":\"/uploads/2021/b51786fa78.webp\"}, {\"src\":\"/uploads/2021/7cfe1fe6b5.jpg\"}, {\"src\":\"/uploads/2021/60d07419f4.jpg\"}, {\"src\":\"/uploads/2021/ffe769b968.jpg\"}, {\"src\":\"/uploads/2021/730a50d6e2.jpg\"}, {\"src\":\"/uploads/2021/8578f0bc1b.jpg\"}, {\"src\":\"/uploads/2021/b6c5ee9c33.jpg\"}, {\"src\":\"/uploads/2021/d7cde010f4.jpg\"}, {\"src\":\"/uploads/2021/da5caedfd4.jpg\"}, {\"src\":\"/uploads/2021/d99c28d3f2.jpg\"}]" >}}
```

And end up with this:

![JSON String Result](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/json_string_result.jpeg)

For a look at how one might use the `gallery` partial directly, check out my [plugin](https://github.com/moonbuck/plugin-gallery "plugin-gallery") that does just that.

But don’t get overwhelmed by all the options. You can keep simple, be all:

```go
{{< lightbox photo-width="300" src="https://moondeer.blog/uploads/2021/b0e919de8a.jpg" >}}
```

Or stick with old-school Becker, and be all:

```go
{{< glightbox src="https://moondeer.blog/uploads/2021/b0e919de8a.jpg" >}}
```

## A Limited Amount of Style
In the `static/assets/css` directory you will also find `lightbox.css`, it holds the default styles used by the gallery partial. Feel free to carve this up or trash it entirely.

```css
a.gallery-link {
  height: 30vh;
  flex-grow: 1;
}
img.gallery-image {
  max-height: 100%;
  min-height: 100%;
  object-fit: cover; 
  vertical-align: bottom;
}
video.gallery-image {
  max-height: 100%;
  min-height: 100%;
  object-fit: cover; 
  vertical-align: bottom;
}
```