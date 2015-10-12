function HexagonGrid(canvasId, radius, isVerticle) {
    this.radius = radius;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    
    this.canvasOriginX = 0;
    this.canvasOriginY = 0;
  
    this. isVerticle = isVerticle;
    if(this.isVerticle === true)
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
    
    
    this.note = -60; // default begin note
    this.octave = Math.floor(this.note / 12);
    this.bias = 0;  // default bias for setting tonic
    this.A = 2;
    this.B = -7;
    this.C = -5;
};


// Draw hexagonal grid in horizontal direction
HexagonGrid.prototype.drawHexGrid = function (rows, cols, originX, originY, isDebug) {
    this.canvasOriginX = originX;
    this.canvasOriginY = originY;
    
    var currentHexX;
    var currentHexY;
    var debugText = "";
    
    var offsetColumn = false;
    
    var octave = this.octave; // 
    
    var note = this.note;
    var bias = this.bias;
    
    
    var A = this.A;
    var B = this.B;
    var C = this.C;
    
    note %= 12;
    var ocv = this.octave;
    
   if(this.isHorizontal === true)
       // verticle direction
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
                this.drawHexVerticle(currentHexX, currentHexY, "#ddd", debugText);
            }
            offsetColumn = !offsetColumn;
        }
   }
    else
        // default horizontal direction
    {   
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {

            //    (96/Math.abs(this.A))    cols
                
                if (!offsetColumn) {
                    currentHexX = (col * this.width) + originX;
                    currentHexY = (row * (this.height + this.radius) * 0.5) + originY;
                } else {
                    currentHexX = col * this.width + originX+this.side;
                    currentHexY = (row * (this.height + this.radius) * 0.5) + originY;
                }
                if (isDebug) {
                    debugText = col + "," + row;
//                    debugText ="N"+":"+note + " " +"O"+":"+ octave;
                }
                
                if(octave>=0 && octave<9)
                this.drawHexHorizontal(currentHexX, currentHexY, "#ddd", debugText, bias, note);
                
            var oldNoteA = note; 
                note += A;
            var newNoteA = note;
                
                if(note >= 12&&(newNoteA-oldNoteA)>0)
                    octave++;
                else if(note < 0&&(newNoteA-oldNoteA)<0)
                    octave--;
                    
                note %= 12;
            }
            offsetColumn = !offsetColumn;
            
            octave = ocv;
            if(!offsetColumn)
            {
 
                note += B;
                if(note >= 12)
                    octave++;
                else if(note < 0)
                    octave--;
                note %= 12;
                if(note<0)
                    note = 12+note;
            }
            else
            {
                
                note += C;
                if(note >= 12)
                    octave++;
                else if(note < 0)
                    octave--;
                note %= 12;
                 if(note<0)
                    note = 12+note;
            }
            ocv = octave;
            
        }  
    }
};

// Draw hexgons in verticle direction
HexagonGrid.prototype.drawHexVerticle = function(x0, y0, fillColor, debugText) {
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
        this.context.fillStyle = "#FFF";
        this.context.fillText(debugText, x0, y0);
    } 
};

// Draw hexgons in horizontal direction
HexagonGrid.prototype.drawHexHorizontal = function(x0, y0, fillColor, debugText, bias, note)
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

    
    
        if(note %  12 === bias) //tonic
            this.context.fillStyle = "#F00";
        else if ( (note % 12 === 1) || (note % 12 === 3) || (note % 12 === 6) || (note % 12 === 8) || (note % 12 === 10) || (note % 12 === -2) || (note % 12 === -4) || (note % 12 === -6) || (note % 12 === -9) || (note % 12 === -11))  // black keys
            this.context.fillStyle = "#060"
        else    // white keys
            this.context.fillStyle = fillColor; 
        this.context.fill();

    
    
    if (debugText)
    {
        // font of text
//        if(this.radius >= 40)
        this.context.font = "8px";
        // color of text
        this.context.fillStyle = "#000";
        // position of text
        this.context.fillText(debugText, x0, y0);
    }    
};

function Wicki()
{   
    this.A = 2;
    this.B = -7;
    this.C = -5;
};

function Janko()
{   
    this.A = 2;
    this.B = -1;
    this.C = 1;
};

function Harmonic()
{   
    this.A = 4;
    this.B = -7;
    this.C = -3;
};

function Gerhard()
{   
    this.A = 4;
    this.B = -1;
    this.C = 3;
};

function Park()
{   
    this.A = 5;
    this.B = -3;
    this.C = 2;
};

function C_system()
{   
    this.A = -3;
    this.B = 2;
    this.C = -1;
};

function B_system()
{   
    this.A = -3;
    this.B = 1;
    this.C = -2;
};

function Bajan()
{   
    this.A = 3;
    this.B = -2;
    this.C = 1;
};

function Other(left, right, note, bias)
{
    this.note = note;
    this.bias = bias;
    this.A = right-left;
    this.B = left;
    this.C = right;
};
