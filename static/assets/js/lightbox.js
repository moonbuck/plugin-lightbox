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
  // Do something
});

lightbox.on('close', () => {
  // Do something
});

lightbox.on('slide_changed', ({ prev, current }) => {
  
  // Prev and current are objects that contain the following data
  const { slideIndex, slideNode, slideConfig, player, trigger } = current;

  // slideIndex - the slide index
  // slideNode - the node you can modify
  // slideConfig - will contain the configuration of the slide like title, description, etc.
  // player - the slide player if it exists otherwise will return false
  // trigger - this will contain the element that triggers this slide, this can be a link, a button, etc in your HTML, it can be null

  
});