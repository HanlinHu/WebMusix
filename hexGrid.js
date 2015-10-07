function HexagonGrid(canvasId, radius, isHorizontal) {
    this.radius = radius;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    
    this.canvasOriginX = 0;
    this.canvasOriginY = 0;
  
    this. isHorizontal = isHorizontal;
    if(this.isHorizontal === true)
    {
        this.height = Math.sqrt(3) * radius;
        this.width = 2 * radius;
        this.side = (3 / 2) * radius;
    }
    else
    {
        this.height = 2* radius;
        this.width = Math.sqrt(3)*radius;
        this.side = (Math.sqrt(3)/2)*radius;
    }
    
};


// Draw hexagonal grid in horizontal direction
HexagonGrid.prototype.drawHexGrid = function (rows, cols, originX, originY, isDebug) {
    this.canvasOriginX = originX;
    this.canvasOriginY = originY;
    
    var currentHexX;
    var currentHexY;
    var debugText = "";
    
    var offsetColumn = false;
    
   if(this.isHorizontal === true)
       // horizontal direction
   {
        for (var col = 0; col < cols; col++) 
        {
            for (var row = 0; row < rows; row++) {

                if (!offsetColumn) {
                    currentHexX = (col * this.side) + originX;
                    currentHexY = (row * this.height) + originY;
                } else {
                    currentHexX = col * this.side + originX;
                    currentHexY = (row * this.height) + originY + (this.height * 0.5);
                }
                if (isDebug) {
                    debugText = col + "," + row;
                }

                this.drawHexHorizontal(currentHexX, currentHexY, "#ddd", debugText);
            }
            offsetColumn = !offsetColumn;
        }
   }
    else
        // default verticle direction
    {   
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {

                if (!offsetColumn) {
                    currentHexX = (col * this.width) + originX;
                    currentHexY = (row * (this.height + this.radius) * 0.5) + originY;
                } else {
                    currentHexX = col * this.width + originX+this.side;
                    currentHexY = (row * (this.height + this.radius) * 0.5) + originY;
                }
                if (isDebug) {
                    debugText = col + "," + row;
                }

                this.drawHexVerticle(currentHexX, currentHexY, "#ddd", debugText);
            }
            offsetColumn = !offsetColumn;
        }  
    }
};

// Draw hexgons in horizontal direction
HexagonGrid.prototype.drawHexHorizontal = function(x0, y0, fillColor, debugText) {
    var angle = Math.PI/3;
    var increment = Math.PI/3;
    
    this.context.strokeStyle = "#000";
    this.context.beginPath();
    this.context.moveTo(x0+this.radius*Math.cos(angle), y0+this.radius*Math.sin(angle));
    for(var i=1; i<6; i++)
    {
        this.context.lineTo((x0+this.radius*Math.cos(angle+i*increment)), 
                            (y0+this.radius*Math.sin(angle+i*increment)));    
    }
    this.context.closePath();
    this.context.stroke();
    
    if (fillColor)
    {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }
    
    if (debugText)
    {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText, x0, y0);
    } 
};

// Draw hexgons in verticle direction
HexagonGrid.prototype.drawHexVerticle = function(x0, y0, fillColor, debugText)
{
    var angle = Math.PI/2;
    var increment = Math.PI/3;
    
    this.context.strokeStyle = "#000";
    this.context.beginPath();
    this.context.moveTo(x0+this.radius*Math.cos(angle), y0+this.radius*Math.sin(angle));
    for(var i=1; i<6; i++)
    {
        this.context.lineTo(x0+this.radius*Math.cos(angle+i*increment), 
                            y0+this.radius*Math.sin(angle+i*increment));  
    }
    this.context.closePath();
    this.context.stroke();
    
    if (fillColor)
    {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }
    
    if (debugText)
    {
        // font of text
        this.context.font = "8px";
        // color of text
        this.context.fillStyle = "#000";
        // position of text
        this.context.fillText(debugText, x0, y0);
    }    
};
