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

function main(){

   let d = new Date(); //this is "local" time, which is relative to the current time zone
   let h = d.getHours(); //this will be 0->23
   let m = d.getMinutes(); //this will be 0->59

   //convert the hours into am or pm
   let am = h < 12; //0->11, am will be true, 12->23, am will be false
   h = h%12; //this is a remainder function
   if(h==0) h = 12; //this fixes the problem of 0 hours

   g.clear(); //remove any previous drawing
   g.setFont("6x8:3"); //we'll use a built in fixed-width font
   g.setFontAlign(0,0,0); //center
   g.drawString(h+":"+String(m).padStart(2,"0")+" "+(am?"am":"pm"),176/2,176/2); //draw at center of screen
  
}

setInterval(main, 60000); //run every minute
main(); //run once to start
