{{- with .Scratch.Get "plugin-lightbox.Parameters" -}}

  {{- $settings := dict
    "selector" .GLightbox.Selector
    "skin" .GLightbox.Skin
    "openEffect" .GLightbox.OpenEffect
    "closeEffect" .GLightbox.CloseEffect
    "slideEffect" .GLightbox.SlideEffect
    "moreText" .GLightbox.MoreText
    "moreLength" .GLightbox.MoreLength
    "closeButton" .GLightbox.CloseButton
    "touchNavigation" .GLightbox.TouchNavigation
    "touchFollowAxis" .GLightbox.TouchFollowAxis
    "keyboardNavigation" .GLightbox.KeyboardNavigation
    "closeOnOutsideClick" .GLightbox.CloseOnOutsideClick
    "startAt" .GLightbox.StartAt
    "width" .GLightbox.Width
    "height" .GLightbox.Height
    "videosWidth" .GLightbox.VideosWidth
    "descPosition" .GLightbox.DescPosition
    "loop" .GLightbox.Loop
    "zoomable" .GLightbox.Zoomable
    "draggable" .GLightbox.Draggable
    "dragToleranceX" .GLightbox.DragToleranceX
    "dragToleranceY" .GLightbox.DragToleranceY
    "dragAutoSnap" .GLightbox.DragAutoSnap
    "Preload" .GLightbox.Preload
    "svg" .GLightbox.SVG
    "cssEfects" .GLightbox.CSSEfects
    "lightboxHTML" .GLightbox.LightboxHTML
    "slideHTML" .GLightbox.SlideHTML
    "autoplayVideos" .GLightbox.AutoplayVideos
    "autofocusVideos" .GLightbox.AutofocusVideos
    "plyr" .GLightbox.Plyr
    -}}

const lightbox = GLightbox({{ $settings | jsonify | safeJS }});

{{- if .Config.GenerateEvents }}

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
  
  dataLayer.push({'event': event,
                  'slide_title': title,
                  'art_piece':title,
                  'slide_alt': alt,
                  'slide_description': description,
                  'slide_type': type});
  
});

{{- end -}}