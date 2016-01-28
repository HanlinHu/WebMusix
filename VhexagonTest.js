// Hex math defined here: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html

function HexagonGrid(canvasId, radius, originX, originY, isVerticle) {
    this.radius = radius;
    
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    
//    this.canvasOriginX = 0;
//    this.canvasOriginY = 0;

    this.canvasOriginX = originX;
    this.canvasOriginY = originY;    
    
    this.isVerticle = isVerticle;
    if (this.isVerticle === true)
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

    this.note = 60; // default begin note have to number of times of 12
    this.octave = Math.floor(this.note / 12);
    this.bias = 0;  // default bias for setting tonic
    
    // default layout Wicki-Hayden
    this.A = 2;
    this.B = -7;
    this.C = -5;
    
    this.canvas.addEventListener("mousedown", this.clickEvent.bind(this), false);
};


// Draw hexagonal grid in horizontal direction
// HexagonGrid.prototype.drawHexGrid = function (rows, cols, originX, originY, isDebug, isFlat) {
//    this.canvasOriginX = originX;
//    this.canvasOriginY = originY;
  
HexagonGrid.prototype.drawHexGrid = function (rows, cols, isDebug, isFlat) {    
 
    originX = this.canvasOriginX;
    originY = this.canvasOriginY;
    
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
    
    var flatForNumber = 
    {
                0: "C ",
                1: "Db",
                2: "D ",
                3: "Eb",
                4: "E ",
                5: "F ",
                6: "Gb",
                7: "G ",
                8: "Ab",
                9: "A ",
                10: "Bb",
                11: "B "
    };

    var sharpForNumber = 
    {
                0: "C ",
                1: "C#",
                2: "D ",
                3: "D#",
                4: "E ",
                5: "F ",
                6: "F#",
                7: "G ",
                8: "G#",
                9: "A ",
                10: "A#",
                11: "B "
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
                if (isDebug) 
                    debugText = col + "," + row;
                else
                {
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
                
                    if(note < -12)
                    octave--;             
            }                
                note += 12;
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
                if (isDebug) 
                    debugText = col + "," + row;
                else
                {
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
            this.context.fillStyle = "#2DB500"
        else    // white keys
            this.context.fillStyle = fillColor; 
        this.context.fill();
    
    if (debugText)
    {
    //    this.context.font = "40px Arial";
        this.context.font = "15px Arial";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText,  x0 - (this.width / 4), y0 + (this.width / 16));
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
            this.context.fillStyle = "#2DB500"
        else    // white keys
            this.context.fillStyle = fillColor; 
        this.context.fill();

    
    
    if (debugText)
    { 
        // font of text
//        if(this.radius >= 40)
        this.context.font = "15px Arial";
        // color of text
        this.context.fillStyle = "#000";
        // position of text
//        this.context.fillText(debugText,  x0 + (this.width / 2) - (this.width/4), y0 + (this.height - 5));
        this.context.fillText(debugText,  x0 - (this.width / 4), y0 + (this.width / 16));
    }    
};

//Recusivly step up to the body to calculate canvas offset.
HexagonGrid.prototype.getRelativeCanvasOffset = function() {
    var x = 0, y = 0;
    var layoutElement = this.canvas;
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);
        
        return { x: x, y: y };
    }
}

//Uses a grid overlay algorithm to determine hexagon location
//Left edge of grid has a test to acuratly determin correct hex
HexagonGrid.prototype.getSelectedTileV = function(mouseX, mouseY) {
    
    var offSet = this.getRelativeCanvasOffset();
    
    mouseX -= offSet.x;
    mouseY -= offSet.y;
    
    mouseX += this.radius;
    mouseY += this.height*0.5;
    
//    var column = Math.floor((mouseX + this.radius) / this.side);
//    var row = Math.floor(
//            column % 2 == 0
//            ? Math.floor((mouseY + (this.height * 0.5)) / this.height)
//            : Math.floor(((mouseY + this.height) / this.height)) - 1);
  
    var column = Math.floor((mouseX) / this.side);
    var row = Math.floor(
        column % 2 == 0
            ? Math.floor((mouseY) / this.height)
            : Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);    
    
    //Test if on left side of frame
    if (mouseX> (column * this.side) && mouseX < (column * this.side) + this.width - this.side) {
        
        
        //Now test which of the two triangles we are in
        //Top left triangle points
        var p1 = new Object();
        p1.x = column * this.side;
//        p1.y = column % 2 == 0
//        ? row * this.height + (this.height / 2)
//        : (row * this.height) + this.height;
        
        p1.y = column % 2 == 0
        ? row * this.height 
        : (row * this.height)+ (this.height / 2);
        
        
        var p2 = new Object();
        p2.x = p1.x;
        p2.y = p1.y + (this.height / 2);
        
        var p3 = new Object();
        p3.x = p1.x + this.width - this.side;
        p3.y = p1.y;
        
        var mousePoint = new Object();
        mousePoint.x = mouseX;
        mousePoint.y = mouseY;
        
        if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
            column--;
            
            if (column % 2 != 0) {
                row--;
            }
        }
        
        //Bottom left triangle points
        var p4 = new Object();
        p4 = p2;
        
        var p5 = new Object();
        p5.x = p4.x;
        p5.y = p4.y + (this.height / 2);
        
        var p6 = new Object();
        p6.x = p5.x + (this.width - this.side);
        p6.y = p5.y;
        
        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;
            
            if (column % 2 == 0) {
                row++;
            }
        }
    }
    
    return  { row: row, column: column };
};


HexagonGrid.prototype.getSelectedTileH = function(mouseX, mouseY) {
    
    var offSet = this.getRelativeCanvasOffset();
    
    mouseX -= offSet.x;
    mouseY -= offSet.y;    
};


HexagonGrid.prototype.sign = function(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};


//TODO: Replace with optimized barycentric coordinate method
HexagonGrid.prototype.isPointInTriangle = function isPointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;
    
    b1 = this.sign(pt, v1, v2) < 0.0;
    b2 = this.sign(pt, v2, v3) < 0.0;
    b3 = this.sign(pt, v3, v1) < 0.0;
    
    return ((b1 == b2) && (b2 == b3));
};

HexagonGrid.prototype.clickEvent = function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;    
    
    if(this.isVerticle)
    {
    
    var tile = this.getSelectedTileV(localX, localY);
    if (tile.column >= 0 && tile.row >= 0)
        {
//        var drawy = tile.column % 2 == 0 ? (tile.row * this.height) + this.canvasOriginY + 6 : (tile.row * this.height) + this.canvasOriginY + 6 + (this.height / 2);
        var drawy = tile.column % 2 == 0 ? (tile.row * this.height) + this.canvasOriginY : (tile.row * this.height) + this.canvasOriginY + (this.height / 2);        
        var drawx = (tile.column * this.side) + this.canvasOriginX;
        
//        this.drawHex(drawx, drawy - 6, "rgba(110,110,70,0.3)", "");
        
        var debugText = "";
        
        // debugText = localX + ","+ localY + "," + drawx + "," + drawy;
        
        debugText = tile.column+","+tile.row; 

        this.drawHexV(drawx, drawy, "rgba(110,110,70,0.3)", debugText);
        }   
    }
    else
        // horizontally
    {
        var tile = this.getSelectedTileH(localX, localY);
    if (tile.column >= 0 && tile.row >= 0)
        {
//        var drawy = tile.column % 2 == 0 ? (tile.row * this.height) + this.canvasOriginY + 6 : (tile.row * this.height) + this.canvasOriginY + 6 + (this.height / 2);
        var drawy = tile.column % 2 == 0 ? (tile.row * this.height) + this.canvasOriginY : (tile.row * this.height) + this.canvasOriginY + (this.height / 2);        
        var drawx = (tile.column * this.side) + this.canvasOriginX;
        
//        this.drawHex(drawx, drawy - 6, "rgba(110,110,70,0.3)", "");
        
        var debugText = "";
        
        // debugText = localX + ","+ localY + "," + drawx + "," + drawy;
        
        debugText = tile.column+","+tile.row; 
        this.drawHexH(drawx, drawy, "rgba(110,110,70,0.3)", debugText);        
       } 
    }
};



HexagonGrid.prototype.drawHexV = function(x0, y0, fillColor, debugText) {
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
    
    if (fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }    
    
    if (debugText) {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText, x0, y0);
    }
};





//---------------------------------------------------------------------------------------------------------------
HexagonGrid.prototype.getSelectedTileH = function(mouseX, mouseY) {
    
    var offSet = this.getRelativeCanvasOffset();
    
    mouseY -= offSet.x;
    mouseX -= offSet.y;
    
    mouseY -= this.radius;
    mouseX -= this.width / 2;
    
//    var column = Math.floor((mouseX + this.radius) / this.side);
//    var row = Math.floor(
//            column % 2 == 0
//            ? Math.floor((mouseY + (this.height * 0.5)) / this.height)
//            : Math.floor(((mouseY + this.height) / this.height)) - 1);
  
//    var row = Math.floor((mouseX) / (2 * this.side));
//    var column = Math.floor(
//        column % 2 == 0
//            ? Math.floor((mouseY) / this.width)
//            : Math.floor(((mouseY + (this.width * 0.5)) / this.width)) - 1);    
//    
//    //Test if on left side of frame
//    if (mouseY> (row * 2 * this.side) && mouseY < (row * 2 * this.side) + this.height - 2 * this.side) {
//        
//        
//        //Now test which of the two triangles we are in
//        //Top left triangle points
//        var p1 = new Object();
//        p1.y = column * 2 * this.side;
////        p1.y = column % 2 == 0
////        ? row * this.height + (this.height / 2)
////        : (row * this.height) + this.height;
//        
//        p1.x = column % 2 == 0
//        ? row * this.width 
//        : (row * this.width)+ (this.width / 2);
//        
//        
//        var p2 = new Object();
//        p2.y = p1.y;
//        p2.x = p1.x + (this.width / 2);
//        
//        var p3 = new Object();
//        p3.y = p1.y + this.height - 2 * this.side;
//        p3.x = p1.x;
//        
//        var mousePoint = new Object();
//        mousePoint.x = mouseX;
//        mousePoint.y = mouseY;
//        
//        if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
//            row--;
//            
//            if (row % 2 != 0) {
//                column--;
//            }
//        }
//        
//        //Bottom left triangle points
//        var p4 = new Object();
//        p4 = p2;
//        
//        var p5 = new Object();
//        p5.y = p4.y;
//        p5.x = p4.x + (this.width / 2);
//        
//        var p6 = new Object();
//        p6.y = p5.y + (this.height - 2 * this.side);
//        p6.x = p5.x;
//        
//        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
//            row--;
//            
//            if (row % 2 == 0) {
//                column++;
//            }
//        }
//    }
//    
//    return  { row: row, column: column };
};


HexagonGrid.prototype.drawHexH = function(x0, y0, fillColor, debugText) {
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
    
    if (fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }    
    
    if (debugText) {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText, x0, y0);
    }
};
