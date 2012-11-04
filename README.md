# CachedImageView Widget
## Overview
The *CachedImageView* widget implements the [best practice of caching remote images](http://docs.appcelerator.com/titanium/latest/#!/guide/Image_Best_Practices-section-30082525_ImageBestPractices-Cachingremoteimages) for [Titanium](http://www.appcelerator.com/platform) [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) by [Appcelerator](http://www.appcelerator.com).

## Features
* Initialize the widget directly through the requiring view.
* Provide a seperate URL for *hires* (*Retina*) devices.
* Provide a local filename to be used instead of the MD5 hash of the URL.
* Provide an extension for the local file if the remote doesn't have one.

## Future work
* Provide a subdirectory to save the image under.
* Provide a maximum age for the cached image before re-downloading it.

## Quick Start
1. Download the repository of the widget as a ZIP to your project root folder.
2. Unzip the widget and you'll find it under `app/widgets/nl.fokkezb.cachedImageView`.
3. Add the widget as a dependency to your `app/config.json` file like so:
```javascript
	…
	"dependencies": {
		"nl.fokkezb.cachedImageView":"1.0"
	}
```
4. Use the widget in a view just like you'd use an `ImageView`. Only use `Widget` instead of `ImageView` and add the `src` attribute to point to the widget.
```xml
<Widget src="nl.fokkezb.cachedImageView"
id="civ" image="http://widgets.fokkezb.nl/cachedImageView/appicon.png" />
```
5. Optionally add any of the extra parameters as attributes.

## Additonal parameters
The only required parameter is the `image` parameter. All parameters are passed on to the resulting *Ti.UI.ImageView*. Except for the following additional parameters that change the widget's behaviour. They can be used both as attributes in the view and when initializing the widget in your controller.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| cacheHires | *string* | URL of the image to use for iOS retina devices. |
| cacheName | *string*  | Basename for the local file instead of the MD5 hash of the URL. Use it when the URL contains some time-dependant key. |
| cacheExt | *string* | Extension for the local file if the URL doesn't have one, like with generated images. |

## Initialization in the Controller
If you don't include the `image` parameter when requiring the widget in your view, the *CachedImageView* will not be automatically initialized for you. This allows you to do this yourself in your controller. This could be usefull if you want to use some advanced decission logic to determine which image to use. If this would only depend on the *formFactor* and *platform* however, I would recommend using [conditional code in views](http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Views-section-34636249_AlloyViews-ConditionalCode) instead.

Please note that `$.cid` corresponds to the `id` attribute used in example for requiring the widget in your view. You can change it to whatever value. 

```javascript
$.cid.init({
    image: OS_IOS ? 'http://widgets.fokkezb.nl/cachedImageView/appicon@2x.png' : 'http://url.to/android.png'
});
```
