//----------------
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
