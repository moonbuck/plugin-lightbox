# plugin-lightbox
A plugin for [Micro.blog](https://micro.blog "Micro.blog") for presenting a slide carousel containing images and/or videos. It was inspired by Jason Becker’s [plugin](https://github.com/jsonbecker/plugin-glightbox) with which I’m sure you are already familiar.

![Slide](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/images/slide.jpeg)

## GLightbox Injection

The [GLightbox](https://biati-digital.github.io/glightbox/ "GLightbox") Javascript and CSS Stylesheet have been bundled into the plugin. They may be found in their respective directories beneath `static/assets`.

`assets/js/lightbox.js` is a template script that creates your `GLightbox` object using the parameter values configured in the data directory. To understand how my plugins utilize data files, have a look at [this post](https://moondeer.blog/2021/11/11/feeding-data-to.html "Feeding Data to My Plugins"). 

## Parameters

The key to understanding and setting values for the plugin parameters is to read the commented template files I’ve included.

There is a file for configuring the default values used by partials and shortcodes when creating a gallery. It lives at `data/plugin_lightbox/defaults.toml` and looks like this:

```TOML
# Whether the gallery slide links should wrap or be constrained to
# a single row. This affects the container's flex-wrap value.
#
wrap = true

# Custom class to apply to the <div> tag. The gallery.html partial
# always adds the 'gallery' class. This value will be anchorized
# around spaces and joined with 'gallery'
#
div_class = ""

# Custom style to apply to the <div> tag. The gallery.html partial
# always adds 'display: flex' and `flex-wrap: (no)wrap`. This will
# be added after.
#
div_style = "gap:0px"

# Custom class to apply to all <a> tags. The gallery.html partial
# always adds the 'gallery-link' class. This value will be anchorized
# around spaces and joined with 'gallery-link'
#
link_class = ""

# Custom style to apply to all <a> tags.
#
link_style = "height:20vh;width:20vh;flex-grow:1"

# Default description position for all slides.
#
desc_position = ""

# Default effect to set for slide transitions. Valid values are
# 'zoom', 'fade', and 'none'. GLightbox defaults to `zoom`.
#
effect = ""

# Default width to apply to all slides.
#
width = ""

# Default height to apply to all slides.
#
height = ""

# Whether slides shall be zoomable by default.
# Glightbox defaults to true.
#
zoomable = ""

# Whether slides shall be draggable by default.
# Glightbox defaults to true.
#
draggable = ""

# Custom class to apply to all <video> tags. The gallery.html partial
# always adds the 'gallery-video' class. This value will be anchorized
# around spaces and joined with 'gallery-video'
#
video_class = ""

# Custom style to apply to all <video> tags.
#
video_style = "max-height:100%;min-height:100%;object-fit:cover; vertical-align:bottom"

# Whether videos used as link content should loop by default.
#
loop = true

# Whether videos used as link content should autoplay by default.
#
autoplay = true

# Whether videos used as link content should preload by default.
# Valid values are 'auto', 'metadata', and 'none'. Ignored when
# autoplay is true
#
preload = ""

# Custom class to apply to all <img> tags. The gallery.html partial
# always adds the 'gallery-image' class. This value will be anchorized
# around spaces and joined with 'gallery-image'
#
img_class = ""

# Custom style to apply to all <img> tags. When photo_width has
# been set, img-thumbnail.html will add the following style
# 'width:[photo_width]px; height: auto; max-width: 100%'. This
# would be appended after in such a case.
#
img_style = "max-height:100%;min-height:100%;object-fit:cover; vertical-align:bottom"

# Default pixel width for fetching thumbnail images via https://micro.blog/photos/ API.
#
photo_width = 260

```

This file may be stored in a custom theme at `data/plugin_lightbox_defaults.toml` to persist the values between plugin updates.

There is also a file for configuring the `GLightbox` instance. It lives at `data/plugin_lightbox/lightbox.toml` and looks like this:

```TOML
# Whether to generate events for analytical consumption. When this
# is true, the following code is added when the lightbox instance
# gets created:
#
# lightbox.on('open', () => {
#   if (typeof dataLayer === 'undefined') { return; }
#   dataLayer.push({'event': 'lightbox_opened'});
# });
#
# lightbox.on('close', () => {
#   if (typeof dataLayer === 'undefined') { return; }
#   dataLayer.push({'event': 'lightbox_closed'});
# });
#
# lightbox.on('slide_changed', ({ prev, current }) => {
#
#   if (typeof dataLayer === 'undefined') { return; }
#
#   // Prev and current are objects that contain the following data
#   // const { slideIndex, slideNode, slideConfig, player, trigger } = current;
#   let event = 'lightbox_slide_changed';
#   let title = current.slideConfig.title;
#   let alt = current.slideConfig.alt;
#   let description = current.slideConfig.description;
#   let type = current.slideConfig.type;
#
#   dataLayer.push({'event': event,
#                   'slide_title': title,
#                   'art_piece':title,
#                   'slide_alt': alt,
#                   'slide_description': description,
#                   'slide_type': type});
#  
# });
#
# Note: This value ranks lower than the plugin parameter value when both are present.
#
GenerateEvents = false

# Name of the selector for example '.glightbox' or 'data-glightbox' 
# or '*[data-glightbox]'
#
Selector = ".glightbox"

# Name of the skin, it will add a class to the lightbox so you 
# can style it with css.
#
Skin = "clean"

# Name of the effect on lightbox open. (zoom, fade, none)
#
OpenEffect = "zoom"

# Name of the effect on lightbox close. (zoom, fade, none)
#
CloseEffect = "zoom"

# Name of the effect on slide change. (slide, fade, zoom, none)
#
SlideEffect = "slide"

# More text for descriptions on mobile devices.
#
MoreText = "See more"

# Number of characters to display on the description before adding
# the moreText link (only for mobiles), if 0 it will display the
# entire description.
#
MoreLength = 60

# Show or hide the close button.
#
CloseButton = true

# Enable or disable the touch navigation (swipe).
#
TouchNavigation = true

# Image follow axis when dragging on mobile.
#
TouchFollowAxis = true

# Enable or disable the keyboard navigation.
#
KeyboardNavigation = true

# Close the lightbox when clicking outside the active slide.
#
CloseOnOutsideClick = true

# Start lightbox at defined index.
#
StartAt = 0

# Default width for inline elements and iframes, you can define a
# specific size on each slide. You can use any unit for example 
# 90% or 100vw for full width
#
Width = "900px"

# Default height for inline elements and iframes, you can define
# a specific size on each slide.You can use any unit for example
# 90% or 100vw For inline elements you can set the height to auto.
#
Height = "506px"

# Default width for videos. Videos are responsive so height is not
# required. The width can be in px % or even vw for example, 500px,
# 90% or 100vw for full width videos
VideosWidth = "960px"

# Global position for slides description, you can define a 
# specific position on each slide (bottom, top, left, right).
#
# DescPosition = "bottom"

# Loop slides on end.
#
Loop = false

# Enable or disable zoomable images you can also use 
# data-zoomable="false" on individual nodes.
#
Zoomable = true

# Enable or disable mouse drag to go prev and next slide 
# (only images and inline content), you can also use 
# data-draggable="false" on individual nodes.
Draggable = true

# Used with draggable. Number of pixels the user has to drag 
# to go to prev or next slide.
#
DragToleranceX = 40

# Used with draggable. Number of pixels the user has to drag up 
# or down to close the lightbox (Set 0 to disable vertical drag).
#
DragToleranceY = 65

# If true the slide will automatically change to prev/next or 
# close if dragToleranceX or dragToleranceY is reached, 
# otherwise it will wait till the mouse is released.
#
DragAutoSnap = false

# Enable or disable preloading.
#
Preload = true

# Set your own svg icons.
#
# SVG = '{}'

# Define or adjust lightbox animations.
#
# See the custom animation section of the README:
# https://github.com/biati-digital/glightbox#adding-a-custom-animation
#
# CSSEfects = '{}'

# You can completely change the html of GLightbox. See the 
# Themeable section in the README:
# https://github.com/biati-digital/glightbox#readme.
# 
LightboxHTML = '''
<div id="glightbox-body" class="glightbox-container">
  <div class="gloader visible"></div>
  <div class="goverlay"></div>
  <div class="gcontainer">
    <div id="glightbox-slider" class="gslider"></div>
    <button class="gnext gbtn" tabindex="0" 
            aria-label="Next">{nextSVG}</button>
    <button class="gprev gbtn" tabindex="1" 
            aria-label="Previous">{prevSVG}</button>
    <button class="gclose gbtn" tabindex="2" 
            aria-label="Close">{closeSVG}</button>
  </div>
</div>
'''

# You can completely change the html of the individual slide. 
# See the Themeable section in the README:
# https://github.com/biati-digital/glightbox#readme.
#
SlideHTML = '''
<div class="gslide">
  <div class="gslide-inner-content">
    <div class="ginner-container">
      <div class="gslide-media"></div>
      <div class="gslide-description">
        <div class="gdesc-inner">
          <h4 class="gslide-title"></h4>
          <div class="gslide-desc"></div>
        </div>
      </div>
    </div>
  </div>
</div>
'''

# Autoplay videos on open.
#
AutoplayVideos =  true

# If true video will be focused on play to allow keyboard 
# shortcuts for the player, this will deactivate prev and 
# next arrows to change slide so use it only if you know 
# what you are doing.
#
# AutofocusVideos = false

# Video player options. See the video player options in
# the README: https://github.com/biati-digital/glightbox#video-player
#
# The example given in the README looks like
# this:
# {
#     css: 'https://cdn.plyr.io/3.5.6/plyr.css',
#     js: 'https://cdn.plyr.io/3.5.6/plyr.js',
#     config: {
#       ratio: '16:9', // or '4:3'
#       muted: false,
#       hideControls: true,
#       youtube: {
#         noCookie: true,
#         rel: 0,
#         showinfo: 0,
#         iv_load_policy: 3
#       },
#       vimeo: {
#         byline: false,
#         portrait: false,
#         title: false,
#         speed: true,
#         transparent: false
#       }
#     }
#   }
# Plyr = '{}'
```

This file may be stored in custom theme at `data/plugin_lightbox_lightbox.toml` to persist the values between plugin updates.

There is only one parameter you can set via the plugin parameters interface.

![](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/images/plugin_parameter.jpeg)

 If you set the parameter value there, it will take precedence versus setting `GenerateEvents` in a data file (this is unusual for my plugins. I wanted to make it easy to flip this one switch on and off).  

Check out the [glightbox README](https://github.com/biati-digital/glightbox#readme "Glightbox README") for more details regarding all those optional parameters (and they are all optional).

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

![From Ulysses](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/images/from_ulysses.jpeg)

and then the result will be all:

![From Ulysses Result](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/images/from_ulysses_result.jpeg) ![Cold Race War](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/images/cold_race_war.jpeg)

Or, you could be … that one other guy … that just thinks it’s cool to be able to stick this directly into your Micro.blog post: 

![Micro.blog Post](https://moondeer.blog/uploads/2021/c9ce0cee4a.jpg)

And end up with this:

![JSON String Result](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/images/json_string_result.jpeg)

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