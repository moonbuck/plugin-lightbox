{{- $source := site.Data.plugin_lightbox_lightbox | default site.Data.plugin_lightbox.lightbox -}}
{{- $settings := newScratch -}}
{{- with $source.Selector -}}
{{- $settings.SetInMap "settings" "selector" . -}}
{{- end -}}
{{- with $source.Skin -}}
{{- $settings.SetInMap "settings" "skin" . -}}
{{- end -}}
{{- with $source.OpenEffect -}}
{{- $settings.SetInMap "settings" "openEffect" . -}}
{{- end -}}
{{- with $source.CloseEffect -}}
{{- $settings.SetInMap "settings" "closeEffect" . -}}
{{- end -}}
{{- with $source.SlideEffect -}}
{{- $settings.SetInMap "settings" "slideEffect" . -}}
{{- end -}}
{{- with $source.MoreText -}}
{{- $settings.SetInMap "settings" "moreText" . -}}
{{- end -}}
{{- with $source.MoreLength -}}
{{- $settings.SetInMap "settings" "moreLength" . -}}
{{- end -}}
{{- if (isset $source "CloseButton") -}}
{{- $settings.SetInMap "settings" "closeButton" $source.CloseButton -}}
{{- end -}}
{{- if (isset $source "TouchNavigation") -}}
{{- $settings.SetInMap "settings" "touchNavigation" $source.TouchNavigation -}}
{{- end -}}
{{- if (isset $source "TouchFollowAxis") -}}
{{- $settings.SetInMap "settings" "touchFollowAxis" $source.TouchFollowAxis -}}
{{- end -}}
{{- if (isset $source "KeyboardNavigation") -}}
{{- $settings.SetInMap "settings" "keyboardNavigation" $source.KeyboardNavigation -}}
{{- end -}}
{{- if (isset $source "CloseOnOutsideClick") -}}
{{- $settings.SetInMap "settings" "closeOnOutsideClick" $source.CloseOnOutsideClick -}}
{{- end -}}
{{- with $source.StartAt -}}
{{- $settings.SetInMap "settings" "startAt" . -}}
{{- end -}}
{{- with $source.Width -}}
{{- $settings.SetInMap "settings" "width" . -}}
{{- end -}}
{{- with $source.Height -}}
{{- $settings.SetInMap "settings" "height" . -}}
{{- end -}}
{{- with $source.VideosWidth -}}
{{- $settings.SetInMap "settings" "videosWidth" . -}}
{{- end -}}
{{- with $source.DescPosition -}}
{{- $settings.SetInMap "settings" "descPosition" . -}}
{{- end -}}
{{- if (isset $source "Loop") -}}
{{- $settings.SetInMap "settings" "loop" $source.Loop -}}
{{- end -}}
{{- if (isset $source "Zoomable") -}}
{{- $settings.SetInMap "settings" "zoomable" $source.Zoomable -}}
{{- end -}}
{{- if (isset $source "Draggable") -}}
{{- $settings.SetInMap "settings" "draggable" $source.Draggable -}}
{{- end -}}
{{- with $source.DragToleranceX -}}
{{- $settings.SetInMap "settings" "dragToleranceX" . -}}
{{- end -}}
{{- with $source.DragToleranceY -}}
{{- $settings.SetInMap "settings" "dragToleranceY" . -}}
{{- end -}}
{{- with $source.DragAutoSnap -}}
{{- $settings.SetInMap "settings" "dragAutoSnap" . -}}
{{- end -}}
{{- if (isset $source "Preload") -}}
{{- $settings.SetInMap "settings" "preload" $source.Preload -}}
{{- end -}}
{{- /*with $source.SVG -}}
{{- $settings.SetInMap "settings" "svg" . -}}
{{- end*/ -}}
{{- /*with $source.CSSEfects -}}
{{- $settings.SetInMap "settings" "cssEfects" . -}}
{{- end*/ -}}
{{- with $source.LightboxHTML -}}
{{- $settings.SetInMap "settings" "lightboxHTML" . -}}
{{- end -}}
{{- with $source.SlideHTML -}}
{{- $settings.SetInMap "settings" "slideHTML" . -}}
{{- end -}}
{{- if (isset $source "AutoplayVideos") -}}
{{- $settings.SetInMap "settings" "autoplayVideos" $source.AutoplayVideos -}}
{{- end -}}
{{- if (isset $source "AutofocusVideos") -}}
{{- $settings.SetInMap "settings" "autofocusVideos" $source.AutofocusVideos -}}
{{- end -}}
{{- /*with $source.Plyr -}}
{{- $settings.SetInMap "settings" "plyr" . -}}
{{- end*/ -}}

{{- $settings = $settings.Get "settings" -}}

const lightbox = GLightbox({{ $settings | jsonify | safeJS }});

{{- $generate_events := false -}}
{{- if (and (isset site.Params "lightbox_generate_events") (eq site.Params.lightbox_generate_events "true")) -}}
{{- $generate_events = true -}}
{{- else if (and (not (isset site.Params "lightbox_generate_events")) $source.GenerateEvents) -}}
{{- $generate_events = true -}}
{{- end -}}

{{- if $generate_events }}

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