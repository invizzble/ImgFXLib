# ImgFXLib

**At this point there's no support for multiple div's**

A simple script that'll give you the posibility to put a effect between 2 images while they're changing

##Usage:

  Add a div to the html with class "ImgFX".
  
  **Required attributes:**
  
    imgs: The images that need to be displayed
    
  **Optional attributes:**
	
    folder: The folder where all images are stored
    time: The time between between the shift of 2 images in ms (default: 5000)
    speed: The time of the shift between images in ms (default: 800)
    
  **Example**
    
    <div class="ImgFX" folder="img" imgs="img1.jpg;img2.jpg;img3.jpg">
    
##Future plans

  * Add extra custom attributes (for more customization).
  * Add support for multiple div's in one page.
  * Add more effects.
