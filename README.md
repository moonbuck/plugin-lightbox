# plugin-lightbox
A plugin for [Micro.blog](https://micro.blog "Micro.blog") for presenting a slide carousel containing images and/or videos. It was inspired by Jason Becker’s [plugin](https://github.com/jsonbecker/plugin-glightbox) with which I’m sure you are already familiar.

![Slide](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/slide.jpeg)

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

Speaking of shortcodes, the beast of burden here is definitely `layouts/partials/lightbox.html`. That’s right. I said ‘partial’. I wanted re-useable code … and I wanted it invokeable from within content markdown files as well as from theme templates. The solution was to create templates and include shortcodes that bounced it all over. The parameters for the shortcodes and partials mirror each other with shortcode parameter names being dash-cased and partial parameter names being underscore-cased.

So `layouts/shortcodes/lightbox.html` is all…

```go
{{- if (.Get "src") -}}
{{ partial "lightbox.html" (dict "src" (.Get "src") "href" (.Get "href") "link_class" (.Get "link-class") "link_style" (.Get "link-style") "gallery" (.Get "gallery") "title" (.Get "title") "description" (.Get "description") "desc_position" (.Get "desc-position") "type" (.Get "type") "effect" (.Get "effect") "width" (.Get "width") "height" (.Get "height") "zoomable" (.Get "zoomable") "draggable" (.Get "draggable") "sizes" (.Get "sizes") "srcset" (.Get "srcset") "photo_width" (.Get "photo-width") "alt" (.Get "alt") "img_class" (.Get "img-class") "img_style" (.Get "img-style")) }}
{{- end -}}
```

and then `layouts/partials/lightbox.html` responds like…

```go
{{- if .src -}}
{{- $src := .src -}}
<a
  href="{{ .href | default $src }}"
  class="glightbox{{- with .link_class }} {{ . }}{{ end }}"
  {{- with .link_style }}style="{{ . | safeCSS }}"{{ end }}
  {{- with .gallery }}data-gallery="{{ . }}"{{ end }}
  {{- with .title }}data-title="{{ . }}"{{ end }}
  {{- with .description }}data-description="{{ . }}"{{ end }}
  {{- with .desc_position }}data-desc-position="{{ . }}"{{ end }}
  {{- with .type }}data-type="{{ . }}"{{ end }}
  {{- with .effect }}data-effect="{{ . }}"{{ end }}
  {{- with .width }}data-width="{{ . }}"{{ end }}
  {{- with .height }}data-height="{{ . }}"{{ end }}
  {{- with .zoomable }}data-zoomable="{{ . }}"{{ end }}
  {{- with .draggable }}data-draggable="{{ . }}"{{ end }}
  {{- with .sizes }}data-sizes="{{ . }}"{{ end }}
  {{- with .srcset }}data-srcset="{{ . }}"{{ end }}
  > 
  {{- if and (in (slice ".mp4" ".mov" ".webm" ".ogg") (path.Ext $src)) (not (isset . "href")) -}}
  <video playsinline autoplay muted loop
    src="{{ $src }}"
    {{- with .video_class }}class="{{ . }}"{{ end }}
    {{- with .video_style }}style="{{ . | safeCSS }}"{{ end -}}
    ></video>
  {{- else -}}
  <img
    {{- with .photo_width }}
    src="https://micro.blog/photos/{{ . }}x/{{ $src }}"
    {{- else }}
    src="{{ $src }}"
    {{- end }}
    {{- with .alt }}alt="{{ . }}"{{ end }}
    {{- with .img_class }}class="{{ . }}"{{ end }}
    {{- with .img_style }}
    style="{{ . | safeCSS }}"
    {{- else -}}
    {{- with .photo_width }}
    style="width: {{ . }}px; height: auto; max-width: 100%"
    {{- end -}}
    {{- end }}
  />
  {{- end -}}
</a>
{{- end -}}
```

All parameters are named parameters.

The only required parameter value is `src`, which should point to the slide content.

`href` is the link target to use when it is different then `src`. 

`gallery`, `title`, `desc`, `desc-position`/`desc_position`, `type`, `effect`, `width`, `height`, `zoomable`, `draggable`, `sizes`, `srcset`, and `alt` are all passed directly through to the Javascript. For their descriptions, have a look at the [glightbox slide options](https://github.com/biati-digital/glightbox#slide-options "GLightbox Slide Options").

`link-class`/`link_class` is an optional parameter for setting the class on the `<a>` tag.

`link-style`/`link_style` is an optional parameter for styling the `<a>` tag.

`video-class`/`video_class` is an optional parameter for setting the class on a `<video>` tag.

`video-style`/`video_style` is an optional parameter for styling the `<video>` tag.

`img-class`/`img_class` is an optional parameter for setting the class on a `<img>` tag.

`img-style`/`img_style` is an optional parameter for styling the `<img>` tag.

`photo-width`/`photo_width` sets the pixel width requested via the `https://micro.blog/photos/` API which is fetched to serve as a thumbnail via the an `<img>` tag. This will be ignored if `img_style` has been set as setting this value also leads to corresponding style code to be generated.

And that’s all there is to it. Okay, it’s a lot Those of you already using Becker’s shortcode will be happy to know that I included a shortcode to mimic its behavior (I have a sh$t ton of posts that invoke his shortcode as well). It looks like this:

```go
{{- if (.Get "src") -}}
{{ partial "lightbox.html" (dict "src" (.Get "src") "photo_width" (.Get "img-width" | default "260") "gallery" (.Get "gallery") "title" (.Get "title") "description" (.Get "description") "alt" (.Get "alt")) }}
{{- end -}}
```

So there’s your standalone lightbox.

What about your galleries? Well, the other plugin workhorse would be `layouts/partials/gallery.html`. You caught it. You know by now. I said ‘partial’. Whatever. Honestly, I thought I had a big bouncing gallery shortcode; but, I don’t. That will probably change. I do have some basic shortcodes that I probably left in there for old posts that make use of them. Let’s go over those.

They are all gonna be paired shortcodes. Like most of my shortcodes, they were created to make [Ulysses](https://ulysses.app/ "Ulysses") more functional.

The first one I created simply created a wrapper and made `gallery` available to nested shortcodes. It lives at `layouts/shortcodes/gallery.html` and looks like this:

```go
<div class="{{ .Get "gallery" }}" style="display: flex;">
  {{ .Inner }}
</div>
```

That evolved into parsing the image markdown generated by Ulysses between the opening and closing tags. It lives at `layouts/shortcodes/gallery-markdown.html` and looks like this:

```go
{{/* Gallery name should be passed as first parameter */}}
{{- $gallery := .Get 0 -}}
{{/* Create a flex box container for the images */}}
<div 
  class="gallery {{ $gallery }}"
  style="display: flex;">
{{/* Parse out markdown image declarations from `.Inner` and iterate */}}
{{- $parsed_images := findRE "[!][[][^]]*[]][(][^)]+[)]" .Inner -}}
{{- range $parsed_images -}}
  {{/* Parse the image URL */}}
  {{- $src := index (findRE "http[^)]+" .) 0 -}}
  {{- $description := replaceRE "[!][[]([^]]*)[]].+" "$1" . }}
  {{ partial "lightbox.html" (dict "src" $src "gallery" $gallery  "description" $description "link_class" "gallery-link" "img_class" "gallery-image") }}
{{- end -}}
</div>
```

Say you’re in a Ulysses sheet, wanting to drop some sh$t in a gallery. You can be all…

![](https://raw.githubusercontent.com/moonbuck/plugin-lightbox/main/from_ulysses.jpeg)

The real gallery workhorse was designed for use from within a template (I created it for the gallery page I extracted out of my theme and into [this-plugin](https://github.com/moonbuck/plugin-gallery "plugin-gallery")). It lives at `layouts/partials/gallery.html` and it looks like this:

```go
{{/* Check we have what we need to start */}}
{{ if (and .gallery .slide_data) }}

{{/* Capture the known parameters */}}
{{ $gallery := .gallery }}
{{ $slide_data := .slide_data }}

{{/* Establish key values for the slide data */}}
{{ $title_key := .title_key | default "title" }}
{{ $desc_key := .desc_key | default "description" }}
{{ $src_key := .src_key | default "src"  }}
{{ $width_key := .width_key | default "width"  }}
{{ $height_key := .height_key | default "height"  }}
{{ $thumb_src_key := .thumb_src_key | default "thumb" }}
{{ $desc_position_key := .desc_position_key | default "desc-position" }}

{{/* Generate the style and class attributes for the div */}}
{{ $flex_wrap := .flex_wrap | default "wrap" }}
{{ $div_style := printf "display: flex; flex-wrap: %s;" $flex_wrap }}
{{ with .div_style }}
{{ $div_style = printf "%s %s" $div_style . }}
{{ end }}
{{ $div_class := printf "gallery %s" $gallery }}
{{ with .div_class }}{{ $div_class = printf "%s %s" $div_class . }}{{ end }}

{{/* Capture optional parameter values shared by all slides */}}
{{ $link_class := "gallery-link" }}
{{ with .link_class }}{{ $link_class = printf "%s %s" $link_class . }}{{ end }}
{{ $img_class := "gallery-image" }}
{{ with .img_class }}{{ $img_class = printf "%s %s" $img_class . }}{{ end }}
{{ $video_class := "gallery-video" }}
{{ with .video_class }}{{ $video_class = printf "%s %s" $video_class . }}{{ end }}
{{ $photo_width := .photo_width }}
{{ $link_style := .link_style }}
{{ $img_style := .img_style }}
{{ $video_style := .video_style }}

{{/* Output the opening div tag with the generated attributes */}}
<div class="{{ $div_class }}" style="{{ $div_style | safeCSS }}">

{{/* Iterate over the individual slides */}}
{{ range $slide := $slide_data }}

{{/* Retrieve slide values */}}
{{ $src := index $slide $src_key }}
{{ $thumb_src := index $slide $thumb_src_key }}
{{ $title := index $slide $title_key }}
{{ $description := index $slide $desc_key }}
{{ $desc_position := index $slide $desc_position_key }}
{{ $slide_width := index $slide $width_key }}
{{ $slide_height := index $slide $height_key }}

{{/* Invoke the lightbox partial to generate the slide */}}
{{ partial "lightbox.html" (dict "src" $src "thumb_src" $thumb_src "title" $title "description" $description "desc_position" $desc_position "width" $slide_width "height" $slide_height "gallery" $gallery "link_class" $link_class "link_style" $link_style "img_class" $img_class "img_style" $img_style "video_class" $video_class "video_style" $video_style "photo_width" $photo_width) }}

{{/* Close range */}}
{{ end }}
</div>

{{/* Close if */}}
{{ end }}
```

It does some fancy stuff … but I will leave of describing this one for when I do the README for `plugin-gallery` (also, I’m in the middle of watching my Dawgs destroy them Gators). 

In the `static/assets/css` directory you will also find `lightbox.css`, it holds the default styles used by the gallery partial.

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
