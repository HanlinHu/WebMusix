// Hex math defined here: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html

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

    this.note = 0; // default begin note have to number of times of 12
    this.octave = Math.floor(this.note / 12);
    this.bias = 0;  // default bias for setting tonic
    this.A = 2;
    this.B = -7;
    this.C = -5;
};


// Draw hexagonal grid in horizontal direction
HexagonGrid.prototype.drawHexGrid = function (rows, cols, originX, originY, isDebug, isFlat) {
    this.canvasOriginX = originX;
    this.canvasOriginY = originY;
    
    var currentHexX;
    var currentHexY;
    var debugText = "";
    
    var offset = false;
    
    var octave = this.octave; // 
    
    var note = this.note;
    var bias = this.bias;
    
    var isFlat = isFlat;
    
    var A = this.A;
    var B = this.B;
    var C = this.C;
    
    note %= 12;
    
    var ocv = this.octave;
    
    var flatForNumber = {
    0: "C",
    1: "Db",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "Gb",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B"
    };

    var sharpForNumber = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B"
    };
    
    var getFlat = function (propertyName)
    {
        return flatForNumber[propertyName];
    };
    
    var getSharp = function (propertyName) 
    {
        return sharpForNumber[propertyName];
    };
    
    var printNote;
    var noteToChar;
    
   if(this.isVerticle === true)
       // verticle direction
   {
        for (var col = 0; col < cols; col++) 
        {
            for (var row = 0; row < rows; row++) {

                if (!offset) {
                    currentHexX = (col * this.side) + originX;
                    currentHexY = (row * this.height) + originY;
                } else {
                    currentHexX = col * this.side + originX;
                    currentHexY = (row * this.height) + originY + (this.height * 0.5);
                }
                if (isDebug) {
//                    debugText = col + "," + row;
//                   debugText = note + "," + octave;
                    if(note<0)
                        printNote = note + 12;
                    else
                        printNote = note;
                    
                    if(isFlat === true)
                        noteToChar = getFlat(printNote);
                    else
                        noteToChar = getSharp(printNote);
                    
                    debugText = noteToChar + octave;
                    
                }
                if(octave>0 && octave<9)
                this.drawHexVerticle(currentHexX, currentHexY, "#ddd", debugText, bias, note);
            if(B>0)
            {                
            var oldNoteB = note; 
                note += B;
            var newNoteB = note;
                if(note >= 12&&(newNoteB-oldNoteB)>0)
                    octave++;
                else if(note < 0&&(newNoteB-oldNoteB)<0)
                    octave--;
            }
            else if(B<0)
            {

            var oldNoteB = note; 
                note += B;
            var newNoteB = note;                
                
                    if(oldNoteB >= 0 && newNoteB < 0)
                    octave--;
                
                    if(note < -12 &&(newNoteB-oldNoteB)<0)
                    octave--;             
            }                
                
                note %= 12;
            }
            offset = !offset;
            octave = ocv;
            if(!offset)
            {
                var oldNoteA = note;
                note += A;
                var newNoteA = note;
                if(B>=0)
                {
                if(note >= 12)
                    octave++;
                else if(note < 0)
                    octave--;
                }
                else // B<0
                {
                    if(oldNoteA>=0 && newNoteA<0)
                        octave--;
                    if(oldNoteA<0 && newNoteA>=0)
                        octave++;
                    if(oldNoteA<12 && newNoteA>=12)
                        octave++;  
                }
                
                note %= 12;
                
                if(note<0)
                    note = 12+note;
            }
            else
            {   
                var oldNoteC = note;
                    note += C;
                var newNoteC = note;
                
                if(B >=0)
                {
                if(note >= 12)
                    octave++;
                else if(note < 0)
                    octave--;
                }
                else
                {
                    if(oldNoteC>=0 && newNoteC<0)
                        octave--;
                    if(oldNoteC<0 && newNoteC>=0)
                        octave++;
                    if(oldNoteC<12 && newNoteC>=12)
                        octave++;                   

                }
                note %= 12;
                if(note<0)
                    note = 12+note;
            }
            ocv = octave;
            
            
        }
   }
    else
        // default horizontal direction
    {   
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {

            //    (96/Math.abs(this.A))    cols
                
                if (!offset) {
                    currentHexX = (col * this.width) + originX;
                    currentHexY = (row * (this.height + this.radius) * 0.5) + originY;
                } else {
                    currentHexX = col * this.width + originX+this.side;
                    currentHexY = (row * (this.height + this.radius) * 0.5) + originY;
                }
                if (isDebug) {
//                    debugText = col + "," + row;
//                    debugText = note + "," + octave;
//                    debugText ="N"+":"+note + " " +"O"+":"+ octave;
                    if(note<0)
                        printNote = note + 12;
                    else
                        printNote = note;
                    
                    if(isFlat === true)
                        noteToChar = getFlat(printNote);
                    else
                        noteToChar = getSharp(printNote);
                    
                    debugText = noteToChar + octave;
                    
                }
                
//                if(octave>=0 && octave<9)
                if(octave>0 && octave<9)
                this.drawHexHorizontal(currentHexX, currentHexY, "#ddd", debugText, bias, note);

            if(A>0)
            {                
            var oldNoteA = note; 
                note += A;
            var newNoteA = note;
                if(note >= 12&&(newNoteA-oldNoteA)>0)
                    octave++;
                else if(note < 0&&(newNoteA-oldNoteA)<0)
                    octave--;
            }
            else if(A<0)
            {

            var oldNoteA = note; 
                note += A;
            var newNoteA = note;                
                
                    if(oldNoteA >= 0 && newNoteA < 0)
                    octave--;
                
                    if(note < -12 &&(newNoteA-oldNoteA)<0)
                    octave--;             
            }                
                
                note %= 12;
            }
            offset = !offset;
            
            octave = ocv;
            if(!offset)
            {
                var oldNoteB = note;
                note += B;
                var newNoteB = note;
                if(A>=0)
                {
                if(note >= 12)
                    octave++;
                else if(note < 0)
                    octave--;
                }
                else // A<0
                {
                    if(oldNoteB>=0 && newNoteB<0)
                        octave--;
                    if(oldNoteB<0 && newNoteB>=0)
                        octave++;
                    if(oldNoteB<12 && newNoteB>=12)
                        octave++;  
                }
                
                note %= 12;
                
                if(note<0)
                    note = 12+note;
            }
            else
            {   
                var oldNoteC = note;
                    note += C;
                var newNoteC = note;
                
                if(A >=0)
                {
                if(note >= 12)
                    octave++;
                else if(note < 0)
                    octave--;
                }
                else
                {
                    if(oldNoteC>=0 && newNoteC<0)
                        octave--;
                    if(oldNoteC<0 && newNoteC>=0)
                        octave++;
                    if(oldNoteC<12 && newNoteC>=12)
                        octave++;                   

                }
                note %= 12;
                if(note<0)
                    note = 12+note;
            }
            ocv = octave;
            
        }  
    }
};

// Draw hexgons in verticle direction
HexagonGrid.prototype.drawHexVerticle = function(x0, y0, fillColor, debugText, bias, note) {
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
    
        if(note %  12 === bias||(note % 12 === (bias - 12 )&&(bias>0)) || (note % 12 === (bias + 12) && (bias<0))) //tonic
            this.context.fillStyle = "#F00";
        else if ( (note % 12 === 1) || (note % 12 === 3) || (note % 12 === 6) || (note % 12 === 8) || (note % 12 === 10) || (note % 12 === -2) || (note % 12 === -4) || (note % 12 === -6) || (note % 12 === -9) || (note % 12 === -11))  // black keys
            this.context.fillStyle = "#060"
        else    // white keys
            this.context.fillStyle = fillColor; 
        this.context.fill();
    
    if (debugText)
    {
        this.context.font = "8px Arial";
        this.context.fillStyle = "#000";
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

    
    
        if(note %  12 === bias||(note % 12 === (bias - 12 )&&(bias>0)) || (note % 12 === (bias + 12) && (bias<0))) //tonic
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
        this.context.font = "8px Arial";
        // color of text
        this.context.fillStyle = "#000";
        // position of text
        this.context.fillText(debugText, x0, y0);
    }    
};

function Wicki()
{   
//    this.note = 60; //size 15-20
    this.A = 2;
    this.B = -7;
    this.C = -5;
};

function Janko()
{   
//    this.note = 12;
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
//    this.note = -60; //size 15-20;
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

function Bajan()
{   
    this.A = 3;
    this.B = -2;
    this.C = 1;
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

function Other(left, right, note, bias)
{
    this.note = note;
    this.bias = bias;
    this.A = right-left;
    this.B = left;
    this.C = right;
};
