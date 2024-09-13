// this is a sample QR code for my contact info.  It's contained in a Bangle image object.
qr = {
  width : 176, height : 176, bpp : 1,
  transparent : -1,
  palette : new Uint16Array([65535,0]),
  buffer : require("heatshrink").decompress(atob("AH4A/AH4Acn///l/48Dx0AAwXA/+Mv0/gF///4Cts4gEMAgP8AQPA8Fx//jweOg/guASCCtpMBuPHJgPAn8DwPH8f8h4cDCuN+gHj+KOB8ALBK4ccCs+BCpc/jl//DYB/04gfwdQMACrkMnwVC/PgCpAHBbYkB4EcFwJXBh/4jlzx//gDxHCqkcCpNhCo8///8bYKOB4848eOAQLmCMQKkBCq4ACgIGBh6OB8EOg/8sIRBjgSECplzCrp8BhkxBQJMCYoQNBuBmBwP+jAVC/kMuIVNeIYVVgHj+Fwg8Ah0/g/ggEHgcATIP8ZgIVPwAVdnEDA4LeBh0A46ZC//h+ARBEYPACp3zCrsAgfzwBbCnH4/kB4//x4KC//HNoYVqn/jx/wn/gaYKdBAAJhBDoMfwE/BIQVrJAOAv04/l/47YB//4bYIkBjkB/7xECtLbBxl+LYOOg/4//wgEf+YZBK4KkBCtoKBwFx45bBBQMfCIPgv+P44QBUYYVs8F8v//jlx///gFwMQOAh4ZBh//4AVq8BFCRwPxJgKcBaAN/4Hghlwg/jUAKZCCrsYCoccCo4ABhgOCJgJfBuEAjl8BoP8gJsDCs+ACgf/wF+LYOOn4HBx0HjggBcQOOFQgVaxgVBv4VCjwVHnDbBbAMfwEH4ED/0/8YhBn/8MoKZCCq/8mAVS/7MBn8D//A4/8uPA8eMGwMAgP4fgIVWg8H//+nHj/0waIMB//jYAXjgEGCoYnBCoc4CpBiBCrE4/kDLAP8uAIBjkB4CCBg/48fwRwIVPh4VcgBXB+AZBLwISB/0Hj/gmADB//HCp/wuAVcSoOAKgMch4KB8EOgH///xcQKgBTIYVqBQOMv/48F+g7YBx5PBuAdB/lx/AVun5XBA4JMB/BXBa4PgueOg4KB4CZCCtbbC/0/gfwn/HAwM4jkAv4GB/4gBCtqGCZoIOBUAMDxwDB+BfBgYcBCt/gvl//5PCgEcSQMcv+Ag8fwJYBCtrbBwaMB/kOn8/8F+DAIdBCINwVoQVsg8DxgDB8eOg5fBUAUPKgLpCK4QVt+F/4Hjx6OB/hiBjlwuIKC/DuCCsVgmIVH8ZJBgARBAAMf+JTBwChBj/+g5XDCqvDCqc4geDx0AgYYB4//wPHj/8h/AjjiBCrUD5wVCgPnCokHCoN8Congh/wAYNx4/4j7fBjgODAQKZCCqsHj/j+HA8F//8//lwg5WBwBQBhk+Conz+IVMx0/CrACBK4RTBv/8LYPAj4jB/H8TIIVJn/4CoeAh4Vd/8D+D8BwP5/EDwP/8Fhx4DBv/wCgIVCwYVD/AVEuYVDbQQVWgHj/+OgDbC//8h0/gf8CQKZBgHACt0cuASB8beBAYP+cwOAYwMAv04TIQVrSoP8CoPggP/gAGCgF8uAkBv4KBCtsH8EAv/HbYP/4HguEH/lz+E4BwLuBCtpIBh7NB/+B484//+nEf/+P/4DBK4YVsAAN+g//+E/K4MP4EchgkCgP4K4YVqn///kOg8D+EA4HjKYPjwf+CoLiB/AVtIgMMh0/gFwCoJXB4//xhUBK4oVojAVCBQJbB8f//ASBKYP/wCdBbYoVuuEHjjeBn8cv/4/+PwPHgeAg/ACrt8h4VEh/BCpNxJQOAn7QBv/HgEDBIP8uE4V4YVWhgVTbYNxRwOOBQMcuP48F/x6gB+PHCrE/GYUHHAPAQ4MBIIN+DIMfwEAQYQVMvgVdAH4A/AH4AwA="))
};

//standard good options
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

//the main window draws a centered time/date and widgets at the top for battery, connection status, and step count
function mainWindow(){
  Bangle.setUI(); //this clears out any old input handlers
  let dow = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let d = new Date(); //this is "local" time, which is relative to the current time zone
  let h = d.getHours(); //this will be 0->23
  let m = d.getMinutes(); //this will be 0->59

  //convert the hours into am or pm
  let am = h < 12; //0->11, am will be true, 12->23, am will be false
  h = h%12; //this is a remainder function
  if(h==0) h = 12; //this fixes the problem of 0 hours

  g.clear(); //remove any previous drawing
  g.setFont("Vector:60"); //this is a nice big font
  g.setFontAlign(0,0,0); //center
  g.drawString(h+":"+String(m).padStart(2,"0"),176/2,176/2); //draw at center of screen

  g.setFont("6x8:3"); 
  //Let's draw the date as well
  g.drawString(dow[d.getDay()]+" " + (d.getMonth()+1)+"/"+d.getDate(),176/2,176/2+40); //a little below the time

  //draw the top part
  g.reset();
  g.setFont("6x8:2"); 
  g.setFontAlign(-1,0,0); //left
  g.drawString(Bangle.getStepCount()+"",10,15);

  if(NRF.getSecurityStatus().connected){
     g.setFontAlign(0,0,0); //center
     g.drawString("Conn",176/2,15);
  }
  g.setFontAlign(1,0,0); //right
  g.drawString(E.getBattery()+"",166,15);

  //draw a nice line delineating the top and bottom
  g.drawLine(10,30,166,30);
}

//this uses the layout library to create a user interface for turning on and off bluetooth
let isAwake = true; //this holds the intended state of bluetooth
function topWindow(){
  Bangle.setUI(); //this clears out any old input handlers
  let Layout = require("Layout");
  let layout = new Layout( {
    type:"v", c: [
      {id:"address_label",type:"txt",font:"Vector:20",label:NRF.getAddress()},
      {id:"awake_button",type:"btn",font:"6x8:2",label:isAwake?"Sleep":"Awake", cb:function(evt){
                                                                isAwake = !isAwake;
                                                                if(isAwake) NRF.wake();
                                                                if(!isAwake) NRF.sleep();
                                                                topWindow();
                                                              }
      }
    ]
  });
  g.clear();
  layout.render();
}

//the bottom window draws a qr code
function bottomWindow(){
  Bangle.setUI(); //this clears out any old input handlers
  g.clear();
  g.drawImage(qr,0,0,{scale:1});
}

let windowFunction = mainWindow; //this allows other code to know which window is loaded and to run the current window

// this function causes the window function to be switched AND run, but avoids running it repeatedly
function changeWindow(win){ 
  if(win == windowFunction) return; //do nothing
  windowFunction = win;
  windowFunction();
}

//this is our main program that will run every minute
//currently it just calls the current window, but it could do "generic" things you always want to do
function main(){
  windowFunction();
}

//event handlers
//swipe events vary by the window
Bangle.on("swipe",function(lr,ud){
  if(windowFunction == mainWindow){
    if(ud==1) changeWindow(topWindow);
    if(ud==-1) changeWindow(bottomWindow);
  }
  else if(windowFunction == topWindow && ud == -1){
    changeWindow(mainWindow);
  }
  else if(windowFunction == bottomWindow && ud==1){
    changeWindow(mainWindow);
  }
});
//the lock event takes you back to mainWindow.  This could vary depending on what window you were on.
Bangle.on("lock",function(data){
  changeWindow(mainWindow);
});

//The midnight event sets the step count to zero
//note that a hard reset also does this, so just be wary of that if needing accurate step counts
Bangle.on("midnight",function(){
  Bangle.setStepCount(0);
  windowFunction();
});

//connect and disconnect events should draw the window again, because each window might draw something different
NRF.on("connect",windowFunction);
NRF.on("disconnect", windowFunction);

//this listens for the button press and changes the window to the main window
setWatch(function(){changeWindow(mainWindow);},BTN,{repeat:true});
setInterval(main, 60000); //run every minute
main(); //run once to start
