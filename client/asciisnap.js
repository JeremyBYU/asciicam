
app.initPhoto = function() {
    //Get all the page element we need
    
    ascii = document.getElementById("asciiText");
    canvas = document.createElement("canvas");
    canvasCtx = canvas.getContext("2d");
    btnStart = document.getElementById('startbtn');
    btnStop = document.getElementById('stopbtn');
    photo = null;
    image = new Image();
    //Init events
    btnStart.addEventListener('click', app.takePhoto);
    btnStop.addEventListener('click', app.stopCam);
    width = 80;
	height = 60;
};

app.takePhoto = function(e) {
    // Get specific vendor methods
    // If browser supports user media
    MeteorCamera.getPicture(
    {
    	"width": width,
    	"height": height,
    	"quality": 50 
    },function successCallback(error, data) {

    	if(error)
    	{
    		console.log(error.error);

    	}
    	else
    	{

    		
    		//assign the photo the div
			image.src = data;
			app.createASCII(image)



    	}
    	

    });
    e.preventDefault();
};

app.stopCam = function(e) {
    clearInterval(intervalId);
    photo.src = "";
    e.preventDefault();
    btnStop.style.display = "none";
    btnStart.style.display = "inline-block";
};

//The generation of the ascii text was taken from this great sample from thecodeplayer:
//http://thecodeplayer.com/walkthrough/cool-ascii-animation-using-an-image-sprite-canvas-and-javascript
app.createASCII = function(image) {
    var r, g, b, gray;
    var character, line = "";

    //clear canvas
    canvasCtx.clearRect(0, 0, width, height);

    //draw the video frame
    canvasCtx.drawImage(image, 0, 0, width, height);

    //accessing pixel data
    var pixels = canvasCtx.getImageData(0, 0, width, height);
    var colordata = pixels.data;

    //every pixel gives 4 integers -> r, g, b, a
    //so length of colordata array is width*height*4

    ascii.innerHTML = ''; //clear contents

    for (var i = 0; i < colordata.length; i = i + 4) {
        r = colordata[i];
        g = colordata[i + 1];
        b = colordata[i + 2];
        //converting the pixel into grayscale
        gray = r * 0.2126 + g * 0.7152 + b * 0.0722;
        //overwriting the colordata array with grayscale values
        //colordata[i] = colordata[i+1] = colordata[i+2] = gray;

        //text for ascii art.
        //blackish = dense characters like "W", "@"
        //whitish = light characters like "`", "."
        if (gray > 250) character = " "; //almost white
        else if (gray > 230) character = "`";
        else if (gray > 200) character = ":";
        else if (gray > 175) character = "*";
        else if (gray > 150) character = "+";
        else if (gray > 125) character = "#";
        else if (gray > 50) character = "W";
        else character = "@"; //almost black

        //newlines and injection into dom
        if (i !== 0 && (i / 4) % width === 0) //if the pointer reaches end of pixel-line
        {
            ascii.appendChild(document.createTextNode(line));
            //newline
            ascii.appendChild(document.createElement("br"));
            //emptying line for the next row of pixels.
            line = "";
        }

        line += character;
    }
};


