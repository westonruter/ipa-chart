/*
 * International Phonetic Alphabet Unicode Keyboard
 * Copyright (C) 2004-2006 Weston Ruter
 * 
 * 	This program is free software; you can redistribute it and/or
 * 	modify it under the terms of the GNU General Public License
 * 	as published by the Free Software Foundation; either version 2
 * 	of the License, or (at your option) any later version.
 * 
 * 	This program is distributed in the hope that it will core useful,
 * 	but WITHOUT ANY WARRANTY; without even the implied warranty of
 * 	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * 	GNU General Public License for more details.
 * 
 * 	You should have received a copy of the GNU General Public License
 * 	along with this program; if not, write to the Free Software
 * 	Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

var textarea;
var is_GECKO = navigator.userAgent.indexOf('Gecko') != -1;
var ipawin;
var repeatDelay = 200;
var repeatRate = 25;
var timer = null;
var pressedKey = '';
var pressedNode = null;
var textarea_selection;
var symbolsUsedBox;
var useEntities = false;
var useHex = true;

/*
function mouseoverKey(){
	top.status = this.getAttribute('title');
	return true;
}
*/

function engageKey(){
	textarea.focus();
	saveSelection();
	pressedKey = '';
	pressedNode = this;

	//var target = (e ? e.target : ipawin.event.srcElement);
	if(this.firstChild)
		pressedKey = this.firstChild.data.replace(/\s|[\u2000-\u200A\u25CC]/g, '');
	else
		return;
	
	//add symbol to queue
	if(this.nodeName.toLowerCase() != 'a'){
		//determine if the symbol is already in the queue
		var inQueue = false;
		var spanIndex;
		for(spanIndex = 0; spanIndex < symbolsUsedBox.childNodes.length; spanIndex++){
			if(symbolsUsedBox.childNodes[spanIndex].firstChild.data.replace(/\s|[\u2000-\u200A\u25CC]/g, '') == pressedKey){
				inQueue = true;
				break;
			}
		}
		
		//move key to the beginning of the queue
		if(inQueue && spanIndex > 0){
			symbolsUsedBox.insertBefore(symbolsUsedBox.childNodes[spanIndex], symbolsUsedBox.firstChild);
		}
		//add the key to the queue
		else if(!inQueue){
			var symbolSpan = document.createElement('a');
			symbolSpan.setAttribute('title', this.getAttribute('title'));
			symbolSpan.setAttribute('href', 'javascript:void(0)');
			symbolSpan.appendChild(document.createTextNode(this.firstChild.data));
			
			if(document.addEventListener){
				symbolSpan.addEventListener('mousedown', engageKey, false);
				symbolSpan.addEventListener('mouseup', disengageKey, false);
				symbolSpan.addEventListener('mouseout', disengageKey, false);
				//symbolSpan.addEventListener('mouseover', mouseoverKey, false);
			}
			else {
				symbolSpan.onmousedown = engageKey;
				symbolSpan.onmouseup = disengageKey;
				symbolSpan.onmouseout = disengageKey;
				//symbolSpan.onmouseover = mouseoverKey;
			}
			symbolsUsedBox.insertBefore(symbolSpan, symbolsUsedBox.firstChild);
		}

		//remove last elements if not visible
		var docWidth = getDocumentWidth();
		for(var i = symbolsUsedBox.childNodes.length-1; i >= 0; i--){
			if(symbolsUsedBox.childNodes[i].offsetLeft < docWidth)
				break;
			else
				symbolsUsedBox.removeChild(symbolsUsedBox.childNodes[i]);
		}
	}
	
	//output symbol to textarea
	if(useEntities){
		var entities = '';
		//hexadecimal entities
		if(useHex){
			for(var i = 0; i < pressedKey.length; i++){
				entities += '&#x';
				entities += pressedKey.charCodeAt(i).toString(16).toUpperCase();
				entities += ';';
			}
		}
		//decimal entites
		else {
			for(var i = 0; i < pressedKey.length; i++){
				entities += '&#';
				entities += pressedKey.charCodeAt(i)
				entities += ';';
			}
		}
		pressedKey = entities;
	}
	
	timer = self.setTimeout("timer = self.setInterval('writekey()', repeatRate)", repeatDelay); //\"" + (pressedKey == '"' ? '\\\\"' : (pressedKey.match(/[\n']/) ? '\\' + pressedKey : pressedKey)) + "\"
	writekey();
	showSymbolsUsed();

	//if(this.nodeName.toLowerCase() == 'a'){
	//	top.status = this.getAttribute('title');
	//}
};
function disengageKey(){
	pressedKey = 0;
	self.clearInterval(timer);
	if(pressedNode == this){
		textarea.focus();
		if(textarea_selection)
			textarea_selection.select();
	}
	pressedNode = null;
	
	if(this.nodeName.toLowerCase() == 'a'){
		top.status = top.defaultStatus;
	}
}

function mouseoverSymbol(){
	this.style.backgroundColor = "#FFFF66";
}
function mouseoutSymbol(){
	this.style.backgroundColor = "transparent";
}

function fallbackInit(){
	//move to top iframe
	if(self == window.top){
		window.location.href = "./";
		return false;
	}
}

function init(){
	//definitions
	top.document.getElementById('inputFrame').onresize = resizeTextarea;
	if(is_GECKO)
		self.onresize = resizeTextarea;
	else if(navigator.userAgent.match(/MSIE (4|5)/))
	{
		alert("Note: this keyboard does not work in MSIE 5. Please upgrade to version 6, or more preferably, upgrade to Mozilla Firefox.");
		top.location.href = "../index.html";
		return false;
	}

	textarea = document.getElementById('inputField');
	ipawin = top.frames[0];
	if(ipawin){
		ipawin.document.getElementById('keyboardRefHead').style.display = 'none';
		ipawin.document.getElementById('keyboardRefFoot').style.display = 'none';
		ipawin.document.getElementById('keyboardLink').style.display = 'none';
	}
	symbolsUsedBox = document.getElementById('symbolsUsed');
	useEntities = document.getElementById('insertEntities').checked;
	document.getElementById('insertEntities').onclick = function(){useEntities = this.checked};
	
	//make the document unselectable so that repeated clicks don't select text
	var ipachart = ipawin.document.getElementById('chart');
	var toolbarDiv = document.getElementById('toolbar');
	if(document.all){
		ipachart.onselectstart = function(){return false};
		toolbarDiv.onselectstart = ipachart.onselectstart;
	}
	var abandonClick = function(){return false};
	var focusOnField = function(){
		if(textarea_selection)
			textarea_selection.select();
		textarea.focus();
		return true;
	};
	var overrideAbandonment = function(e){
		e.stopPropagation();
	};
	
	ipachart.onmousedown = abandonClick;
	toolbarDiv.onmousedown = abandonClick;
	ipachart.onclick = focusOnField;
	toolbarDiv.onclick = focusOnField;
	if(document.addEventListener){ //allow the controls to be interactive
		document.getElementById('clearButton').addEventListener('mousedown', overrideAbandonment, false);
		document.getElementById('insertEntities').addEventListener('mousedown', overrideAbandonment, false);
	}
	
	//add event handlers to capture the characters
	var nodes, i;
	function addHandlers(nodes, option){
		for(i = 0; i < nodes.length; i++){
			if(!nodes.item(i).firstChild || !nodes.item(i).firstChild.data)
				continue;
			switch(option){
				case 'pulmonicConsonants':
					if(nodes.item(i).className.match(/\bimpossible\b/))
						continue;
					break;
				case 'tonesAndWordAccents':
					nodes.item(i).firstChild.data = nodes.item(i).firstChild.data.replace(/e/g, "\u25CC"); //U+2002 "EN SPACE" replaced with U+25CC "DOTTED CIRCLE"
					break;
				case 'diacritics':
					nodes.item(i).firstChild.data = nodes.item(i).firstChild.data.replace(/[\u2000-\u200A\u25CC]/g, "\u25CC");
					break;
				case 'ipa':
					if(!nodes.item(i).className.match(/\bipa\b/))
						continue;
			}
			nodes.item(i).style.cursor = 'pointer';
			if(document.addEventListener){
				nodes.item(i).addEventListener('mousedown', engageKey, false);
				nodes.item(i).addEventListener('mouseup', disengageKey, false);
				nodes.item(i).addEventListener('mouseout', disengageKey, false);
				nodes.item(i).addEventListener('mouseover', mouseoverSymbol, false);
				nodes.item(i).addEventListener('mouseout', mouseoutSymbol, false);
			}
			else {
				nodes.item(i).onmousedown = engageKey;
				nodes.item(i).onmouseup = disengageKey;
				nodes.item(i).onmouseout = disengageKey;
				nodes.item(i).onmouseover = mouseoverSymbol;
				nodes.item(i).onmouseout = mouseoutSymbol;
			}
		}
	}
	
	//pulmonicConsonants
	addHandlers(ipawin.document.getElementById('pulmonicConsonants').getElementsByTagName('span'), 'pulmonicConsonants');

	//nonPulmonicConsonants
	addHandlers(ipawin.document.getElementById('nonPulmonicConsonants').getElementsByTagName('td'));

	//vowelSymbols
	addHandlers(ipawin.document.getElementById('vowelSymbols').getElementsByTagName('span'));

	//otherSymbols
	addHandlers(ipawin.document.getElementById('otherSymbols').getElementsByTagName('td'));

	//suprasegmentals
	addHandlers(ipawin.document.getElementById('suprasegmentals').getElementsByTagName('td'));

	//diacritics
	addHandlers(ipawin.document.getElementById('diacritics').getElementsByTagName('td'), 'diacritics');

	//tonesAndWordAccents
	addHandlers(ipawin.document.getElementById('tonesAndWordAccents').getElementsByTagName('td'), 'tonesAndWordAccents');

	//all text embedded ipa
	addHandlers(ipawin.document.getElementById('chart').getElementsByTagName('span'), 'ipa');

	resizeTextarea();
	//textarea.select(); //focus
	textarea.focus();
}

function resizeTextarea(){
	var height = 0;
	if(self.innerHeight)
		height = self.innerHeight;
	else if(document.documentElement && document.documentElement.clientHeight)
		height = document.documentElement.clientHeight;
	else if(document.body && document.body.clientHeight)
		height = document.body.clientHeight;
	height -= document.getElementById('toolbar').offsetHeight;
	textarea.style.height =  height + "px";
}

function getDocumentWidth(){
	var width = 0;
	if(self.innerWidth)
		width = self.innerWidth;
	else if(document.documentElement && document.documentElement.clientWidth)
		width = document.documentElement.clientWidth;
	else if(document.body && document.body.clientWidth)
		width = document.body.clientWidth;
	return width;
}

//returns the selected element from the edit window (tries to get elementName)
function saveSelection(){
	if(document.selection){//Internet Explorer
		textarea_selection = ipawin.document.selection.createRange();
		textarea_selection.type = ipawin.document.selection.type;	
	}
}

function writekey(){
	textarea.focus();
	if(textarea_selection)
		textarea_selection.select();
	
	//Gecko/Opera
	if (textarea.selectionStart || textarea.selectionStart == '0'){
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, startPos) + pressedKey + textarea.value.substring(endPos, textarea.value.length);
		textarea.selectionStart = startPos+pressedKey.length;
		textarea.selectionEnd = startPos+pressedKey.length;
	}
	//MSIE
	else if(document.selection)
		textarea_selection.text = pressedKey;
	else
		textarea.value += pressedKey;
		
	if(textarea_selection)
		textarea_selection.select();
}

function showSymbolsUsed(){
	document.getElementById('symbolsUsedLabel').style.display = 'inline';
	symbolsUsedBox.style.display = 'inline';
	document.getElementById('instructions').style.display = 'none';
}

function clearField(){
	if(!textarea) return false;
	textarea.value = '';
	textarea_selection = null;
}