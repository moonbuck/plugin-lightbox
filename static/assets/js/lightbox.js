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
  let event = 'lightbox_click';
  let title = current.slideConfig.title;
  let alt = current.slideConfig.alt;
  let description = current.slideConfig.description;
  let type = current.slideConfig.type;
  
  dataLayer.push({'event': event,'title': title,'art_piece':title,'alt': alt,'description': description,'type': type});
  
});