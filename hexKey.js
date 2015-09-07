
//vertical
function drewHexVertical(x0,y0, fillColor,text)
{
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
    
    if (text)
    {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(text, x0, y0);
    }    
};

//horizontal
function drewHexHorizontal(x0,y0, fillColor,text)
{
    var angle = Math.PI/2;
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
    
    if (text)
    {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(text, x0, y0);
    }    
};
