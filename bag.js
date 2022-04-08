bag_img="";
status="";
objects=[];

function preload(){
    img=loadImage('Small room.jpg'); 
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status :Detecting  objects";
}

function modelLoaded(){
    console.log("model loaded");
     status=true;
     objectdetector.detect(img,gotResult);
 }

 function gotResult(error,Results){
    if(error){
    console.log(error);
    } 
  else{
  console.log(Results);  
  objects=Results;
  
  }
}

function draw(){
    image(img,0,0,640,420); 
    if(status!=""){
        document.getElementById("status").innerHTML="Status:Object Detected"
        fill('red')
        for(i=0;i<objects.length;i++){
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
                noFill();
                stroke('red');

                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    } 
}