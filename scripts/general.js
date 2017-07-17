// get element of page by id (cross-browser)
function calcSum(obj) 
{
	var total = 0;
	var id = obj.name.replace('count','');
	var cnt = parseInt(obj.value);
	var price = parseFloat(elementById('price'+id).innerHTML.replace(',','.'));
	if(cnt>=0 && price>=0) elementById('sum'+id).innerHTML = (cnt*price).toFixed(2).replace('.',',');


	for(n in obj.form.elements)
	{
		if(obj.form.elements[n] && obj.form.elements[n].type=='text')
		{
			var tmpId = obj.form.elements[n].id.replace('count', '');
			total = total + parseFloat(elementById('sum'+tmpId).innerHTML.replace(',','.'));
		}
	}
	if(total>=0) elementById('totalcart').innerHTML = total.toFixed(2).replace('.',',');
}
function elementById(Name) {
	if(navigator.appName.indexOf("Microsoft")!=-1) {
	// IE
		if(!eval('document.all("'+Name+'")')) return 0; else return document.all(Name);
  	}
  	else {
	// NN & others
    		if(!eval('document.'+Name))  {
			if (document.getElementById) {
				return eval('document.getElementById("'+Name+'")');
			} else
			return 0;
    		}
    		else
		return eval('document.'+Name);
	}
}
// set element property (cross-browser)
function setProp(Name, Param, Val) {
    		if(!eval('document.'+Name))  {
			if (document.getElementById) {
				eval('document.getElementById("'+Name+'").style.'+Param+'='+Val);
			} else
			return 0;
    		}
    		else
		eval('document.'+Name+'.'+Param+'='+Val);
}
// get element property (cross-browser)
function getProp(Name, Param) {
    		if(!eval('document.'+Name))  {
			if (document.getElementById) {
				return eval('document.getElementById("'+Name+'").style.'+Param);
			} else
			return 0;
    		}
    		else
		return eval('document.'+Name+'.'+Param);
}
// for admin
function pclick(s)
{
	var state = (getProp('cb'+s, 'display')=='none') ? "''" : "'none'";
	var i = elementById('ci'+s);
	setProp('cb'+s, 'display', state);
		x = i.src;
	if (x.search('_down')!=-1)
		i.src = urlToImg + 'images/catitem.gif';
	else
		i.src = urlToImg + 'images/catitem_down.gif';
}
// open url
function openUrl(s) 
{
	window.open(s);
}
 // send mail
function sendMail(a, b) 
{
	location.href = 'mai'+'lto'+':'+a+'@'+b;
}
function toggleAnswer(id)
{
	var state = (getProp('answer'+id, 'display')=='none') ? "''" : "'none'";
	setProp('answer'+id, 'display', state);
	elementById('arr'+id).innerHTML = (state=="''") ? '&darr;' : '&rarr;';
}
function dwrite(s)
{
	document.write(s);
}
var General = {
	config: {
		container: {
			node: null,
			width: 0,
			height: 0
		},
		
		heading: {
			node: null,
			width: 0,
			height: 0
		},
		
		content: {
			node: null,
			width: 0,
			height: 0
		},
		
		footer: {
			node: null,
			width: 0,
			height: 0
		}
	},
	
	global: {
		submenu: [],
		iframe: [],
		selectedDealer: null,
		timer: null
	},
	
	page: {
		getWidth: function( )
		{
			var wWidth = General.window.getWidth( );
			var intWidth = 0;
			
			if( self.innerHeight && self.scrollMaxX )
			{
				intWidth = self.innerHeight + self.scrollMaxX;
			}else if ( document.documentElement.clientWidth > document.documentElement.scrollWidth )
			{
				intWidth = document.documentElement.clientWidth;
			}else 
			{
				intWidth = document.documentElement.scrollWidth;
			}
			
			return intWidth;//Math.max( intWidth , wWidth );
		} ,
		
		getHeight: function( )
		{
			var wHeight = General.window.getHeight( );
			var intHeight = 0;
			
			if( self.innerHeight && self.scrollMaxY )
			{
				intHeight = self.innerHeight + self.scrollMaxY;
			}else if ( document.documentElement.offsetHeight > document.documentElement.scrollHeight )
			{
				intHeight = document.documentElement.offsetHeight;
			}else 
			{
				intHeight = document.documentElement.scrollHeight;
			}
			
			if( intHeight  <= wHeight )
			{
				return wHeight;
			}
			
			/* Safari 2 has a bug due to our use of a negative top margin on the container */
			var testSafari2 = navigator.userAgent.match( " AppleWebKit/([0-9]+)" );
			if( testSafari2 && ( testSafari2.length && testSafari2[1] != undefined ) )
			{
				intHeight += 12;
			}
			
			return intHeight;
		}
	},
	
	window: {
		getWidth: function( )
		{
			if( self.innerWidth )
			{
				return self.innerWidth;
			}else if( document.documentElement && document.documentElement.clientWidth )
			{
				return document.documentElement.clientWidth;
			}else if( document.body )
			{
				return document.body.clientWidth;
			}
			
			return 0;
		},
		
		getHeight: function( )
		{
			if( self.innerHeight )
			{
				return self.innerHeight;
			}else if( document.documentElement && document.documentElement.clientHeight )
			{
				return document.documentElement.clientHeight;
			}else if( document.body )
			{
				return document.body.clientHeight;
			}
			
			return 0;
		}
	},
	
	event: {
		register: function( element , type , callback , capture )
		{
			if( !element || !type || !callback ) return false;
			if( !capture ) var capture = false;
		
			if( element.attachEvent && capture == false )
			{
				return element.attachEvent( 'on' + type , this.returnHandler( callback ) );
			}else if( element.addEventListener )
			{
				return element.addEventListener( type , this.returnHandler( callback ) , capture );
			}else
			{
				element['on'+type] = this.returnHandler( callback );
				return false;
			}
		},
		
		returnHandler: function( callback )
		{	
			return function( e )
				{
					if( !e ) var e = window.event;
				
					if( !e.cancelEvent )
					{
						e.cancelEvent = function( )
						{
							if( !this ) return false;
						
							if( this.stopPropagation ) this.stopPropagation();
							if( this.preventDefault ) this.preventDefault( );
							this.cancelBubble = true;
							this.returnValue = false;
						
							return false;
						};
					}
				
					if( !e.targetNode )
					{
						e.targetNode = ( e.target && !e.srcElement ? e.target : e.srcElement );
					
						if( ( e.targetNode && e.targetNode.nodeType == 3 ) && e.targetNode.parentNode )
						{
							e.targetNode = e.targetNode.parentNode;
						}
					}
				
					if( !e.pointerX || !e.pointerY )
					{	
						e.pointerX = 0;
						if( e.pageX && e.pageY )
						{
							e.pointerX = e.pageX;
							e.pointerY = e.pageY;
						}else if( e.clientX && e.clientY )
						{
							e.pointerX = ( e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft );
							e.pointerY = ( e.clientY + document.body.scrollTop + document.documentElement.scrollTop );
						}
					}
					
					if( e.targetNode && ( !e.targetNode.posX || !e.targetNode.posY ) )
					{
						var targetNode = e.targetNode;
						e.targetNode.posX = 0;
						e.targetNode.posY = 0;
						
						if ( targetNode.offsetParent )
						{
							while( targetNode.offsetParent && targetNode.parentNode.nodeName != "FORM" )
							{
								e.targetNode.posX += targetNode.offsetLeft;
								e.targetNode.posY += targetNode.offsetTop;
								targetNode = targetNode.offsetParent;
							}
						}else if( targetNode.x && targetNode.y )
						{
							e.targetNode.posX = targetNode.x;
							e.targetNode.posY = targetNode.y;
						}
					}
					
					callback( e );
				};
		},

		cancelEvent: function( e )
		{
			if( !e ) var e = window.event;
			if( !e ) return false;
		
			if( e.stopPropagation ) e.stopPropagation();
			if( e.preventDefault ) e.preventDefault( );
			e.cancelBubble = true;
			e.returnValue = false;
		
			return false;
		},

		ready: function( callback )
		{
			/*@cc_on @*/
				/*@if (@_win32)
				document.write("<s" + "cript id=__ie_onready defer src=javascript:void(0)><\/script>");
				var script = document.getElementById( "__ie_onready" );
				script.onreadystatechange = function() {
					if (this.readyState == "complete") {
						callback(); // call the onload handler
					}
				};
				return;
			/*@end @*/
			
			if( document.addEventListener && !document.readyState )
			{
				return document.addEventListener( "DOMContentLoaded" , callback , false );
			}else if( document.readyState )
			{
				General.global.timer = setInterval( function( )
				{
					if( /loaded|complete/i.test( document.readyState ) )
					{
						callback( );
						clearInterval( General.global.timer );
					}
					
				} , 1 );
				return;
			}
			
			General.event.register( window , 'load' , callback );
		}
	},
	
	getCoordinates: function( element )
	{
		var posX = 0;
		var posY = 0;
	
		if( element.x && element.y )
		{
			posX = element.x;
			posY = element.y;
		}
	
		if( element.offsetParent )
		{
			while( element.offsetParent && element.parentNode.nodeName != "FORM" )
			{
				posX += element.offsetLeft;
				posY += element.offsetTop;
				element = element.offsetParent;
			}
		}
		
		return {
			x: posX,
			y: posY
		};
	},
	
	getElementByClassName: function( parentNode , nodeName , className )
	{
		if( !parentNode.getElementsByTagName ) return false;
		var childNodes = parentNode.getElementsByTagName( nodeName );
		if( !childNodes || childNodes.length <= 0 ) return false;
		
		for( var i = 0; i < childNodes.length; i++ )
		{
			if( childNodes[i].className.indexOf( className ) != -1 )
			{
				return childNodes[i];
			}
		}
		
		return false;
	}
};

General.event.register( window , 'load' , function( e ){ 
	General.config.container.node = document.getElementById( "daf-container" );
		if( General.config.container.node )
		{
			General.config.container.width = General.config.container.node.offsetWidth;
			General.config.container.height = General.config.container.node.offsetHeight;
		}
		
	General.config.heading.node = document.getElementById( "daf-heading" );
		if( General.config.heading.node )
		{
			General.config.heading.width = General.config.heading.node.offsetWidth;
			General.config.heading.height = General.config.heading.node.offsetHeight;
		}

	General.config.footer.node = document.getElementById( "daf-footer" );
		if( General.config.footer.node )
		{
			General.config.footer.width = General.config.footer.node.offsetWidth;
			General.config.footer.height = General.config.footer.node.offsetHeight;
		}
		
		/*@cc_on

			@if( @_jscript_version <= 5.7 )
	
			if( document.all && Browser.Version() <= 6 ) {
				General.config.container.node.style.display = "none";
				General.config.container.node.style.display = "block";
			}
		/*@end @*/
} );

var Browser = {
  Version: function() {
    var version = 999; // we assume a sane browser
    if (navigator.appVersion.indexOf("MSIE") != -1)
      // bah, IE again, lets downgrade version number
      version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    return version;
  }
};