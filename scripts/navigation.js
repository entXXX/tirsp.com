/* --------------------------------------------------
	1. Main navigation
-------------------------------------------------- */

/*@cc_on

	@if( @_jscript_version <= 5.7 )
	
	if( document.all && Browser.Version() <= 6 ) {
		General.event.register( window , 'load' , function( e ){ 
			var navRoot = document.getElementById( "daf-mainnav" );
			if( navRoot == undefined ) return;
			navRoot = navRoot.getElementsByTagName( "UL" );
			if( navRoot.length <= 1 ) return;
	
			for( var i = 1; i < navRoot.length; i++ )
			{
				var navNode = navRoot[i];
		
				oldClassName = navNode.parentNode.className;
				navNode.parentNode.className = oldClassName + " open";
				navNode.style.backgroundColor = "#EFEFEF";
				if( navNode.getElementsByTagName( "iframe" ).length <= 0 )
				{
					var iframe = document.createElement( "iframe" );
					iframe.style.width = parseInt( navNode.offsetWidth ) + "px";
					iframe.style.height = parseInt( navNode.offsetHeight - 12 ) + "px";
					iframe.style.top = "12px";
					iframe.style.left = "0px";
					iframe.style.position = "absolute";
					iframe.style.backgroundColor = "#EFEFEF";
					iframe.style.zIndex = "-1";
					iframe.style.filter = "mask()";
					navNode.appendChild( iframe );

				}
			}	
	
			for( var i = (navRoot.length-1); i > 0; i-- )
			{
				var navNode = navRoot[i];
				var className = navNode.parentNode.className;
				navNode.parentNode.className = className.replace(" open","");
			}
		} );
	}
	
	@end
@*/

General.event.register( window , 'load' , function( e ){ 
	var navRoot = document.getElementById( "daf-mainnav" );
	if( navRoot == undefined ) return;
	navRoot = navRoot.getElementsByTagName( "UL" )[0];
	var navChildren = navRoot.childNodes;

	if( navRoot.className != "AspNet-Menu" ){
		return;
	}

	for( var i = 0; i < navChildren.length; i++ )
	{
		var navNode = navChildren[i];
		if( !navNode.nodeName ) continue;
		if( navNode.nodeName != "LI" ) continue;

		navNode.onmouseover = function( )
		{			
			var coords = General.getCoordinates( this );
			var submenu = this.getElementsByTagName( "UL" );
			if( submenu[0] == undefined ) return;
			submenu = submenu[0];
			
			submenu.style.top = ( General.config.heading.height - 24 ) + "px";
			submenu.style.paddingTop = "9px";
			
			/*@cc_on

				@if( @_jscript_version <= 5.7 )
	
				if( document.all && Browser.Version() <= 6 ) {
					submenu.style.paddingTop = 0;
					submenu.style.borderTopWidth = "9px";
					submenu.style.borderTopStyle = "solid";
					submenu.style.borderTopColor = "#efefef";
				}
	
				@end
			@*/
			
			submenu.style.paddingLeft = 0;
			submenu.style.marginLeft = 0;
			submenu.style.zIndex = 20;
			
			if( ( coords.x + 144 ) > General.config.container.width )
			{
				submenu.style.left = ( General.config.container.width - 144 ) + "px";
			}
			else
			{
				if(navigator.userAgent.match("Opera")==null)
				{
					submenu.style.left = ( coords.x + 5 ) + "px";
				}
				else
				{
					// for opera
					//submenu.style.left = (coords.x - 133 ) + "px";
				}
			}
			
			if( this.className.indexOf( " open" ) == -1 )
			{
				this.className = this.className + " open";
			}
		}

		navNode.onmousemove = function( )
		{
			clearTimeout( this['rev'] );
			this['rev'] = "";
		}
		
		navNode.onmouseout = function( )
		{
			var self = this;
			
			this['rev'] = setTimeout( function( ){
				var submenu = self.getElementsByTagName( "UL" );
				if( submenu[0] == undefined ) return;
				submenu = submenu[0];
				
				for( var i = 0; i < submenu.childNodes.length; i++ ){
					if( submenu.childNodes[i].nodeType != 1 ) continue;

					if( submenu.childNodes[i].className.indexOf( " open" ) != -1 )
					{
						submenu.childNodes[i].className = submenu.childNodes[i].className.replace( / open/g , "" );
					}
				}
				
				if( self.className.indexOf( " open" ) != -1 )
				{
					self.className = self.className.replace( " open" , "" );	
				}
			} , 10 );
		}
			
		var subItems = navNode.getElementsByTagName( "LI" );
		for( var j = 0; j < subItems.length; j++ )
		{
			var navNode = subItems[j];
			var hasSubmenu = subItems[j].getElementsByTagName("UL").length > 0 ? true : false;
			if( !hasSubmenu ) continue;
			
			/*General.event.register( subItems[j].getElementsByTagName("A")[0] , 'click' , function( e )
				{
					e.cancelEvent( );
					return false;
				} );*/
			
			/* MOET HOVER WORDEN */
			navNode.onmouseover = function( )
			{
				var submenu = this.getElementsByTagName( "UL" );
				if( submenu[0] == undefined ) return;
				submenu = submenu[0];
				var coords = General.getCoordinates( this );
				
				clearTimeout( this['rev'] );
				this['rev'] = "";
				
				if( this.className.indexOf( " open" ) == -1 )
				{
					this.className = this.className + " open";
					
					if( coords.x + 142 + 144 > General.config.container.width )
					{
						submenu.style.marginLeft = "-144px";
					}
				}			
			}

			navNode.onmousemove = function( )
			{
				clearTimeout( this['rev'] );
				this['rev'] = "";
			}
			
			navNode.onmouseout = function( )
			{
				var self = this;
			
				this['rev'] = setTimeout( function( ){
					var submenu = self.getElementsByTagName( "UL" );
					if( !submenu ) return;
					submenu = submenu[0];
				
					for( var i = 0; i < submenu.childNodes.length; i++ ){
						if( submenu.childNodes[i].nodeType != 1 ) continue;

						if( submenu.childNodes[i].className.indexOf( " open" ) != -1 )
						{
							submenu.childNodes[i].className = submenu.childNodes[i].className.replace( / open/g , "" );
						}
					}
				
					if( self.className.indexOf( " open" ) != -1 )
					{
						self.className = self.className.replace( " open" , "" );	
					}
				} , 10 );
			}
		}
	}
} );


/* --------------------------------------------------
	2. Subnavigation (content pages)
-------------------------------------------------- */

General.event.register( document , 'mousedown' , function( e ){ 
	var theNode = e.targetNode;
	if( theNode.nodeName != "LI" && theNode.parentNode )
	{
		theNode = theNode.parentNode;
	}
	if( theNode.nodeName != "LI" && theNode.parentNode )
	{
		theNode = theNode.parentNode;
	}
	if( theNode.nodeName != "LI" )
	{
		return;
	}
	if( theNode.className.indexOf( "AspNet-Menu-WithChildren" ) == -1 && theNode.className.indexOf( "more" ) == -1 )
	{
		return;
	}
	if( !theNode.parentNode || !theNode.parentNode.parentNode || theNode.parentNode.parentNode.nodeName != "DIV" )
	{
		return;
	}
	
	
	
	var anchor = theNode.getElementsByTagName( "A" );
	if( anchor.length > 0 )
	{
		anchor = anchor[0];
		
		General.event.register( anchor , 'click' , function( e )
			{
				if( !e.targetNode ) return true;
				if( !e.targetNode.parentNode ) return true;
				if( !e.targetNode.parentNode.parentNode ) return true;
				if( !e.targetNode.parentNode.parentNode.parentNode ) return true;
				if( e.targetNode.parentNode.parentNode.parentNode.className == "AspNet-Menu-Horizontal" ) return true;

				//e.cancelEvent( );
			} );
			return; /* weghalen als cancelEvent aan staat */
	}
	
	
	if( theNode.className.indexOf( " AspNet-Menu-ChildSelected" ) != -1 )
	{
		theNode.className = theNode.className.replace( " AspNet-Menu-ChildSelected" , "" );
		General.global.submenu[theNode.parentNode.className] = null;
	}else
	{
		theNode.className = theNode.className + " AspNet-Menu-ChildSelected";
		
		if( General.global.submenu[theNode.parentNode.className] ) General.global.submenu[theNode.parentNode.className].className = 
			General.global.submenu[theNode.parentNode.className].className.replace( " AspNet-Menu-ChildSelected" , "" );
		
		General.global.submenu[theNode.parentNode.className] = theNode;
	}
	/* 
	if( theNode.className.indexOf( " open" ) != -1 )
	{
		theNode.className = theNode.className.replace( " open" , "" );
		General.global.submenu[theNode.parentNode.className] = null;
	}else
	{
		theNode.className = theNode.className + " open";
		
		if( General.global.submenu[theNode.parentNode.className] ) General.global.submenu[theNode.parentNode.className].className = 
			General.global.submenu[theNode.parentNode.className].className.replace( " open" , "" );
		
		General.global.submenu[theNode.parentNode.className] = theNode;
	} */
} );

/* --------------------------------------------------
	3. Tabs
-------------------------------------------------- */
General.event.register( document , 'click' , function( e ){ 
	var theNode = e.targetNode;
	if( !theNode.parentNode ) return;
	if( theNode.nodeName != "A" ) return;
	if( theNode.parentNode.nodeName != "LI" ) return;

	var Clicked = theNode;
	var Tabs = Clicked.parentNode.parentNode;
	var Parent = null;
	if( Tabs.nodeName != "UL" ) return;
	Parent = Tabs.parentNode;
	if( Parent.className.indexOf( "tabs" ) == -1 ) return;		

	var Children = Parent.childNodes;
	var tabNum = Clicked.href.match(/\#tab([0-9]+)/);
	var found = false;
	if( tabNum[1] ) tabNum = tabNum[1];
	for( var i = 0; i < Children.length; i++ )
	{
		if( Children[i].nodeType != 1 ) continue;
		if( Children[i].nodeName != "DIV" ) continue;
		
		if( Children[i].className.indexOf( "tab" + tabNum ) != -1 )
		{
			Children[i].style.display = 'block';
			found = true;
		}else
		{
			Children[i].style.display = 'none';
		}
	}
	
	if( !found ) return;
	
	var Children = Tabs.childNodes;
	for( var i = 0; i < Children.length; i++ )
	{
		if( Children[i].nodeType != 1 ) continue;
		if( Children[i].nodeName != "LI" ) continue;
		if( !Children[i].childNodes[0] ) continue;
		var Anchor = Children[i].childNodes[0];
		if( Anchor.nodeType == 3 ) Anchor = Anchor.nextSibling;
		if( !Anchor ) continue;
		
		if( Anchor.href.indexOf( "#tab" + tabNum ) != -1 )
		{
			if( Children[i].className.indexOf( " active" ) == -1 )
			{
				Children[i].className = Children[i].className + " active";
			}
		}else
		{
			Children[i].className = Children[i].className.replace(/\s{0,1}active/g,"");
		}
	}	
	
	window.location.hash = "tab" + tabNum;
	
	e.cancelEvent( );
	return false;
} );

General.event.register( window , 'load' , function( e ){ 
	var tabHash = window.location.hash;
	var tabNum = tabHash.match(/\#tab([0-9]+)/)
	if( !tabNum ) return false;
	var found = false;
	var Tabs = document.getElementById( "tabslist" );
	var tabList = Tabs.parentNode;
	var Children = tabList.childNodes;
	if( !tabList ) return false;
	if( tabNum[1] ) tabNum = tabNum[1];
	
	for( var i = 0; i < Children.length; i++ )
	{
		if( Children[i].nodeType != 1 ) continue;
		if( Children[i].nodeName != "DIV" ) continue;
		
		if( Children[i].className.indexOf( "tab" + tabNum ) != -1 )
		{
			Children[i].style.display = 'block';
			found = true;
		}else
		{
			Children[i].style.display = 'none';
		}
	}
	
	if( !found ) return;
	
	var Children = Tabs.childNodes;
	for( var i = 0; i < Children.length; i++ )
	{
		if( Children[i].nodeType != 1 ) continue;
		if( Children[i].nodeName != "LI" ) continue;
		var Anchor = Children[i].childNodes[0];
		if( Anchor.nodeType == 3 ) Anchor = Anchor.nextSibling;
		if( !Anchor ) continue;
		
		if( Anchor.href.indexOf( "#tab" + tabNum ) != -1 )
		{
			if( Children[i].className.indexOf( " active" ) == -1 )
			{
				Children[i].className = Children[i].className + " active";
			}
		}else
		{
			Children[i].className = Children[i].className.replace(/\s{0,1}active/g,"");
		}
	}
	
	//tabslist.parentNode
} );

/* @eof */