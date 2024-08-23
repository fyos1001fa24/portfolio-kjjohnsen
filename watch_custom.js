Bangle.setOptions({wakeOnBTN1: true,
                   wakeOnFaceUp: false,
                   wakeOnTwist: false,
                   powerSave: true,
                   lockTimeout: 10000,
                   lcdPowerTimeout:0,
                   backlightTimeout: 10000,
                   hrmPollInterval:40
                  });
E.setTimeZone(-4); //this is the current timezone
let dow = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function main(){

   let d = new Date(); //this is "local" time, which is relative to the current time zone
   let h = d.getHours(); //this will be 0->23
   let m = d.getMinutes(); //this will be 0->59

   //convert the hours into am or pm
   let am = h < 12; //0->11, am will be true, 12->23, am will be false
   h = h%12; //this is a remainder function
   if(h==0) h = 12; //this fixes the problem of 0 hours

   g.clear(); //remove any previous drawing
   g.setFont("6x8:4"); //we'll use a built in fixed-width font
   g.setFontAlign(0,0,0); //center
   g.drawString(h+":"+String(m).padStart(2,"0"),176/2,176/2); //draw at center of screen

   g.setFont("6x8:3"); //we'll use a built in fixed-width font
   //Let's draw the date as well
   g.drawString(dow[d.getDay()]+" " + (d.getMonth()+1)+"/"+d.getDate(),176/2,176/2+40);

   //draw the top part
   g.setFont("6x8:2"); //we'll use a built in fixed-width font
   g.setFontAlign(-1,0,0); //left
   g.drawString(Bangle.getStepCount()+"",10,15);

   g.setFontAlign(1,0,0); //right
   g.drawString(E.getBattery()+"",166,15);

   //draw a nice line delineating the top and bottom
   g.drawLine(10,30,166,30);
}

setInterval(main, 60000); //run every minute
main(); //run once to start
