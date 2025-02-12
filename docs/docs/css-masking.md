CSS Masking
With CSS masking you create a mask layer to place over an element to partially or fully hide portions of the element.

The CSS mask-image Property
The CSS mask-image property specifies a mask layer image.

The mask layer image can be a PNG image, an SVG image, a CSS gradient, or an SVG <mask> element.

Browser Support
The numbers in the table below specify the first browser version that fully supports the property.

Numbers followed by -webkit- specify the first version that worked with a prefix.

Property					
mask-image	120	120	53	15.4	15 -webkit-
Use an Image as the Mask Layer
To use a PNG or an SVG image as the mask layer, use a url() value to pass in the mask layer image.

The mask image needs to have a transparent or semi-transparent area. Black indicates fully transparent.

Here is the mask image (a PNG image) we will use:

W3Schools.com
Here is an image from Cinque Terre, in Italy:

Cinque Terre
Now, we apply the mask image (the PNG image above) as the mask layer for the image from Cinque Terre, Italy:

Cinque Terre
Example
Here is the source code:

.mask1 {
  -webkit-mask-image: url(w3logo.png);
  mask-image: url(w3logo.png);
  mask-repeat: no-repeat;
}
Example Explained
The mask-image property specifies the image to be used as a mask layer for an element.

The mask-repeat property specifies if or how a mask image will be repeated. The no-repeat value indicates that the mask image will not be repeated (the mask image will only be shown once).

Another Example
If we omit the mask-repeat property, the mask image will be repeated all over the image from Cinque Terre, Italy:

Cinque Terre
Example
Here is the source code:

.mask1 {
  -webkit-mask-image: url(w3logo.png);
  mask-image: url(w3logo.png);
}
ADVERTISEMENT

ADVERTISEMENT

Use Gradients as the Mask Layer
CSS linear and radial gradients can also be used as mask images.

Linear Gradient Examples
Here, we use a linear-gradient as the mask layer for our image. This linear gradient goes from top (black) to bottom (transparent):

Cinque Terre
 
Example
Use a linear gradient as a mask layer:

.mask1 {
  -webkit-mask-image: linear-gradient(black, transparent);
  mask-image: linear-gradient(black, transparent);
}
Here, we use a linear-gradient along with text masking as the mask layer for our image:

The Cinque Terre is a coastal area within Liguria, in the northwest of Italy. It lies in the west of La Spezia Province, and comprises five villages: Monterosso al Mare, Vernazza, Corniglia, Manarola, and Riomaggiore.

The Cinque Terre is a coastal area within Liguria, in the northwest of Italy. It lies in the west of La Spezia Province, and comprises five villages: Monterosso al Mare, Vernazza, Corniglia, Manarola, and Riomaggiore.

The Cinque Terre is a coastal area within Liguria, in the northwest of Italy. It lies in the west of La Spezia Province, and comprises five villages: Monterosso al Mare, Vernazza, Corniglia, Manarola, and Riomaggiore.

Example
Use a linear gradient along with text masking as a mask layer:

.mask1 {
  max-width: 600px;
  height: 350px;
  overflow-y: scroll;
  background: url(img_5terre.jpg) no-repeat;
  -webkit-mask-image: linear-gradient(black, transparent);
  mask-image: linear-gradient (black, transparent);
}
Radial Gradient Examples
Here, we use a radial-gradient (shaped as a circle) as the mask layer for our image:

Cinque Terre
Example
Use a radial gradient as a mask layer (a circle):

.mask2 {
  -webkit-mask-image: radial-gradient(circle, black 50%, rgba(0, 0, 0, 0.5) 50%);
  mask-image: radial-gradient(circle, black 50%, rgba(0, 0, 0, 0.5) 50%);
}
Here, we use a radial-gradient (shaped as an ellipse) as the mask layer for our image:

Cinque Terre
Example
Use another radial gradient as a mask layer (an ellipse):

.mask3 {
  -webkit-mask-image: radial-gradient(ellipse, black 50%, rgba(0, 0, 0, 0.5) 50%);
  mask-image: radial-gradient(ellipse, black 50%, rgba(0, 0, 0, 0.5) 50%);
}
Use SVG as the Mask Layer
The SVG <mask> element can be used inside an SVG graphic to create masking effects.

Here, we use the SVG <mask> element to create different mask layers for our image:

Example
An SVG mask layer (formed as a triangle):

<svg width="600" height="400">
  <mask id="svgmask1">
    <polygon fill="#ffffff" points="200 0, 400 400, 0 400"></polygon>
  </mask>
  <image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img_5terre.jpg" mask="url(#svgmask1)"></image>
</svg>
Example
An SVG mask layer (formed as a star):

<svg width="600" height="400">
  <mask id="svgmask2">
    <polygon fill="#ffffff" points="100,10 40,198 190,78 10,78 160,198"></polygon>
  </mask>
  <image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img_5terre.jpg" mask="url(#svgmask2)"></image>
</svg>
Example
An SVG mask layer (formed as circles):

<svg width="600" height="400">
  <mask id="svgmask3">
    <circle fill="#ffffff" cx="75" cy="75" r="75"></circle>
    <circle fill="#ffffff" cx="80" cy="260" r="75"></circle>
    <circle fill="#ffffff" cx="270" cy="160" r="75"></circle>
  </mask>
  <image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img_5terre.jpg" mask="url(#svgmask3)"></image>
</svg>
Exercise
?
Which of the following can be used as a mask layer in CSS?


A PNG image
An SVG image
A CSS gradient
All of the above

CSS Masking Properties
The following table lists all the CSS masking properties:

Property	Description
mask-clip	Specifies which area is affected by a mask image
mask-composite	Specifies a compositing operation used on the current mask layer with the mask layers below it
mask-image	Specifies an image to be used as a mask layer for an element
mask-mode	Specifies whether the mask layer image is treated as a luminance mask or as an alpha mask
mask-origin	Specifies the origin position (the mask position area) of a mask layer image
mask-position	Sets the starting position of a mask layer image (relative to the mask position area)
mask-repeat	Specifies how the mask layer image is repeated
mask-size	Specifies the size of a mask layer image