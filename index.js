'use strict';

var electron = require('electron');
var App = electron.app;
var Tray = electron.Tray;
var Menu = electron.Menu;
var BrowserWindow = electron.BrowserWindow;

var dispSize =null;
var mainWindow = null;
var appIcon = null;
var contextMenu = null;

var search = function(menuItem){
  var commandMapIn = menuItem.menu.items[0].submenu.commandsMap;
  var commandMapOut = menuItem.menu.items[1].submenu.commandsMap;
  var nori = null;
  var ori = null;
  Object.keys(commandMapIn).forEach(function(obj, i){
    if(commandMapIn[obj].checked == true){
      nori = commandMapIn[obj].sublabel;
    }
  });
  Object.keys(commandMapOut).forEach(function(obj, i){
    if(commandMapOut[obj].checked == true){
      ori = commandMapOut[obj].sublabel;
    }
  });
  mainWindow.show();
  mainWindow.loadURL('http://www.hakobus.jp/result.php?in=' + nori + '&out=' + ori);
};

App.on('window-all-closed', function(){
  App.quit();
});

App.on('ready', function(){
  dispSize = electron.screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    x: dispSize.width - 800,
    y: 0,
    show: false
  });
  appIcon = new Tray(__dirname + '/image/icon.png');

  contextMenu  = new Menu.buildFromTemplate([
    {label: '乗り場', submenu: [
      {label: '富岡', type: 'radio', sublabel: '154'},
      {label: '未来大学', type: 'radio', sublabel: '165'},
      {label: '五稜郭公園', type: 'radio', sublabel: '150'},
      {label: '函館駅前', type: 'radio', sublabel: '3'}
    ]},
    {label: '降り場', submenu:[
      {label: '富岡', type: 'radio', sublabel: '154'},
      {label: '未来大学', type: 'radio', sublabel: '165'},
      {label: '五稜郭公園', type: 'radio', sublabel: '150'},
      {label: '函館駅前', type: 'radio', sublabel: '3'}
    ]},
    {label: '検索', click: search},
    {label: '隠す', click: function(){mainWindow.hide();}},
    {label: '終了', accelerator: 'Command+Q', click: function(){app.quit();}}
  ]);
  appIcon.setContextMenu(contextMenu);

  mainWindow.on('closed', function(){
    mainWindow = null;
    appIcon = null;
  });
});
