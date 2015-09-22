var AutoSize = (function(){ 

	var self = {} ;

	self.resize = function(element){
		if ( element[0] === "#" ){
			var text = document.getElementById(element.substring(1));
			setTextEvent(text) ;
		} else if ( element[0] === "." ){
			var texts = document.getElementsByClassName(element.substring(1));
			for ( var i = 0 ; i < texts.length ; i ++ ){
				setTextEvent(texts[i]) ;
			}
		}
	}

	var setTextEvent = function(text){
		text.onkeyup = function(e){
			if ( e.keyCode === 13) {
				return false ;
		    }
			setTextBorder(this) ;
		}
		text.onkeydown = function(e){
			if ( e.keyCode === 13) {
				document.execCommand('insertHTML', false, '<br><br>');
				setTextBorder(this) ;
				return false ;
		    }
			setTextBorder(this) ;
		}
	}

	var setTextBorder = function(text){
		var result = getTextMaxLength(text,getFontFamily(text),getFontSize(text)) ;
		text.style.width = (result.length ) + "px" ;
		text.style.height = (getTextHeight(getFontFamily(text),getFontSize(text)) * result.row + 10) + "px" ;
	}

	var getFontSize = function(text){
		var style = window.getComputedStyle(text, null).getPropertyValue('font-size');
		var fontSize = parseFloat(style); 
		return fontSize ;
	}

	var getFontFamily = function(text){
		return window.getComputedStyle( text, null ).getPropertyValue( 'font-family' );
	}

	var getTextWidth = function(text,font,size){
		var span = document.createElement('span');
		span.style['fontFamily'] = font ;
		span.style['fontSize'] = size ;
		span.innerHTML = "W" + text  + "W";
		document.body.appendChild(span);
		var width = 0 ;
		try {
			width = span.offsetWidth ;
		} finally {
			span.remove();
		}
		return width;
	}

	var getTextHeight = function(font,size) {
		var text = document.createElement('span');
		text.style['fontFamily'] = font ;
		text.style['fontSize'] = size ;
		text.innerHTML = "Hg";
		var block = document.createElement('div') ;
		block.style.display ="inline-block";
		block.style.width = "1px" ;
		block.style.height = "0px" ; 
		var div = document.createElement('div');
		div.appendChild(text);
		div.appendChild(block)
		document.body.appendChild(div);
		var height = 0 ;
		try {
			block.style.verticalAlign = "bottom" ;
			height = block.offsetTop - text.offsetTop;
		} finally {
			div.remove();
		}
		return height;
	}

	var getTextMaxLength = function(text,font,size){
		var s = "" ;
		var t = (text.innerHTML).replace("&nbsp;",' ') ;
		var max = 0 ;
		var row = 0 ;
		for ( var i = 0 ; t.indexOf("<br>") !== -1 ; i ++ , row = i ){
			max = Math.max(max,getTextWidth(t.substring(0,t.indexOf("<br>")-1),font,size)) ;
			t = t.substring(t.indexOf("<br>")+4,t.length) ;
		}
		if ( t !== "" ){
			max = Math.max(max,getTextWidth(t,font,size)) ;
			row ++ ;
		}
		return {row:row,length:max} ;
	}

	return self ;
})();
