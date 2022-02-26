// Simple art generator by HashLips <->

#include "./lib/json2.js";

function main() {
  var continueConfirmation = confirm(
    "You are about to use the HashLips art generator. Are you sure you want to continue?"
  );

  if (!continueConfirmation) return;

  var supply = prompt("How many images do you want to generate?", "1");

  var name = prompt("What is the name of your collection?", "");

  var description = prompt("What is the description for your collection?", "");

  var rootFolderName = prompt("What is the name of the root folder of your character?", "GHOST");
  var rootFolder = app.activeDocument.layerSets.getByName(rootFolderName);

  var bgFolderName = prompt("What is the name of the root folder of your character?", "BG");
  var bg = app.activeDocument.layerSets.getByName(bgFolderName);
  
  alert(supply + " images will be generated, so sit back relax and enjoy the art being generated.");

  //creates array with all folders that need to be cycled trough    
  var testGroupArray = new Array(app.activeDocument.layerSets.getByName(bgFolderName));
  for(var i = 0; i < rootFolder.layerSets.length; i++){
    testGroupArray.push(rootFolder.layerSets[i]);
  }

  resetLayers(testGroupArray);

  function getRWeights(_str) {
    var weight = Number(_str.split("#").pop());
    if(isNaN(weight)){
      weight = 1;
    }
    return weight;
  }

  function cleanName(_str) {
    return _str.split("#").shift();
  }

  for (var h = 1; h < parseInt(supply) + 1; h++) {
    var obj = {};
    obj.name = name + " #" + h;
    obj.description = description;
    obj.image = "To be replaced";
    obj.edition = h;
    obj.attributes = [];
      for (var i = 0; i < testGroupArray.length; i++) {
        //alert(testGroupArray[i]);
        var totalWeight = 0;
        var layerMap = [];

        for(var j = 0; j < testGroupArray[i].layers.length; j++){
          totalWeight += getRWeights(testGroupArray[i].layers[j].name);
          layerMap.push({
            index: j,
            name: cleanName(testGroupArray[i].layers[j].name),
            weight: getRWeights(testGroupArray[i].layers[j].name)
          });
        }
        var ran = Math.floor(Math.random() * totalWeight);
        (function() {
          for(var j = 0; j < testGroupArray[i].layers.length; j++){
            ran -= layerMap[j].weight;
            if(ran < 0) {
              testGroupArray[i].layers[j].visible = true;
              obj.attributes.push({
                trait_type: testGroupArray[i].name, 
                value: layerMap[j].name
              })
              return;
            }
          }
        })();
      }
    saveImage(obj.edition);
    saveMetadata(obj);
    resetLayers(testGroupArray);
  }
  alert("Generation process is complete.");
}

function x(){
  
}

//turns all groups to visible and layers invisble
function resetLayers(_groups) {
  if (_groups.length > 0){
    for (var i = 0; i < _groups.length; i++) {
      _groups[i].visible = true;
      for (var j = 0; j < _groups[i].layers.length; j++) {
        if(_groups[i].layers[j].allLocked){
          _groups[i].layers[j].visible = true;
          //alert(_groups[i].layers[j].name + "locked")
        }else{
          _groups[i].layers[j].visible = false;
          //alert(_groups[i].layers[j].name + "not locked")
        }
      }
    }
  }else{
    for(var i = 0; i < _groups.layers.length; i++){
      _groups.layers[i].visible = false;
    }
  } 
}

function saveImage(_edition) {
  app.activeDocument.resizeImage(3000,3000,118,ResampleMethod.NEARESTNEIGHBOR);
  var saveFile = new File(toFolder("build/images") + "/" + _edition + ".png");
  exportOptions = new ExportOptionsSaveForWeb();
  exportOptions.format = SaveDocumentType.PNG;
  exportOptions.PNG24 = false;
  exportOptions.transparency = true;
  exportOptions.interlaced = false;
  app.activeDocument.exportDocument(
    saveFile,
    ExportType.SAVEFORWEB,
    exportOptions
  );
}

function saveMetadata(_data) {
  var file = new File(toFolder("build/metadata") + "/" + _data.edition + ".json");
  file.open("w");
  file.write(JSON.stringify(_data));
  file.close();
}

function toFolder(_name) {
  var path = app.activeDocument.path;
  var folder = new Folder(path + "/" + _name);
  if (!folder.exists) {
    folder.create();
  }
  return folder;
}


main();
