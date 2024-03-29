//Ready actions
jQuery(document).ready(function () {
    setFixHeader();
    cloneBasketNumber();
});

//Load actions
jQuery(window).load(function () {
    normalizeBannerAssets();
    verticalAlign();
    resetSkuCat();
    resetLookAsideSku();
    fixPercentWishlist();
    changeSacText();
    fixPercentCat();
    addBtTop();
    changePadraoBrasilero();
    productFixes();
    lookFixes();
});

//On resize actions
window.onresize = function() {
    reinitHeader();
}


