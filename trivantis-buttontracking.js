function ButtonTrackingObj(exp, titleName, cm, frame){
   this.VarTrivBtnTracking = new Variable( 'VarTrivBtnTracking', null, 0, cm, frame, exp, titleName, true );
   this.title = null;
}

ButtonTrackingObj.codeToStateMap =
{
	'N' : 'normalState',
	'O' : 'overState',
	'D' : 'downState',
	'A' : 'disabledState',
	'V' : 'visitedState',
	'S' : 'selectedState'
};
ButtonTrackingObj.stateToCodeMap = {};
for (var key in ButtonTrackingObj.codeToStateMap)
	ButtonTrackingObj.stateToCodeMap[ButtonTrackingObj.codeToStateMap[key]] = key;

ButtonTrackingObj.prototype.InitPageTracking = function ( )
{
	var THIS = this;
	var pageTrackData = this.VarTrivBtnTracking.getValue();
	var bDoInit = true;
	try {
	    if (pageTrackData && pageTrackData.length > 0 && pageTrackData != '~~~null~~~')
	    {
	        var topLevelSplit = pageTrackData.split('#');
	        if (topLevelSplit && topLevelSplit.length > 1)
            {
		        var arrIds = topLevelSplit[0].split(',');
		        var arrStatus = topLevelSplit[1].split(',');
		        for( var i=0; i<arrIds.length; i++ )
		        {
			        var id = parseInt( '0x' + arrIds[i] );
			        var status = arrStatus[i];
			        var node = this.FindNode( this.title, id );
			        if( node )
						node.v = ButtonTrackingObj.codeToStateMap[status] || status;
		        }
    		}
        }
    } catch (e) { }
}

ButtonTrackingObj.prototype.FindNode = function( node, id )
{
	if( node.id == id )
		return node;
	
	var match = null;
	if( typeof( node.c ) != 'undefined' ){
		for( var i=0; i<node.c.length; i++ ){
			match = this.FindNode( node.c[i], id );
			if( match != null )
				break;
		}
	}
	
	return match;
}

ButtonTrackingObj.prototype.InternalGetRangeStatus = function( node )
{
	if( node == null )
		return -1;
		
	if( typeof(node.c) == 'undefined' )
	{
		return node.v;
	}
	else
	{
		return 'normalState';
	}
}


ButtonTrackingObj.prototype.GetRangeStatus = function( id, bInit )
{
	var status = -1;
	if ( bInit ) 
		this.InitPageTracking();
	
	status = this.InternalGetRangeStatus( this.FindNode( this.title, id ) );

	return status;
}


ButtonTrackingObj.prototype.InternalSetRangeStatus=function( node, status )
{
	if( node == null )
		return;
	node.v = status;
	if( status == 0 && typeof(node.c)!='undefined')
	{
		for( var i=0; i<node.c.length; i++ )
			this.InternalSetRangeStatus( node.c[i], status ); 
	}
}

ButtonTrackingObj.prototype.SetRangeStatus = function( id, status /*0 or 1 or 2*/)
{
	this.InternalSetRangeStatus( this.FindNode(this.title, id), status );
	
	this.SavePageTracking();
}

ButtonTrackingObj.prototype.IterateTree = function( func )
{
	var stack = [];
	stack.push( this.title );
	var i = 0;
	while( stack.length > 0 )
	{
		var node = stack.shift();
		
		if( typeof(node.c) != 'undefined' )
			stack = node.c.concat(stack);
			
		//do the thing
		func( node, i, stack );
		i++;
	}	
}

ButtonTrackingObj.prototype.SavePageTracking = function()
{
	var fnIsSaveState = window.ObjButton && ObjButton.isSaveState || function () { return false; };
	var hexString = '';
	var arrayIds = [];
	var arrayStatus= [];
	
	this.IterateTree(function(node, i, stack){
		if (fnIsSaveState(node.v))
		{
			arrayIds.push(node.id);
			arrayStatus.push(node.v);
		}
	});
	
	for( var i=0; i<arrayIds.length; i++ )
		hexString += (i > 0 ? ',' : '') + arrayIds[i].toString(16);

	hexString += (arrayIds.length > 0 ? '#' : '');
	
	for (var i = 0; i < arrayStatus.length; i++)
		hexString += (i > 0 ? ',' : '') + (ButtonTrackingObj.stateToCodeMap[arrayStatus[i]] || arrayStatus[i]);

	//LD-8267 - Added a condition to avoid tracking null/empty data unnecessarily
	if (hexString.length > 0 || (myTop.suspendDataCache && myTop.suspendDataCache.indexOf('VarTrivBtnTracking') >= 0) || !this.VarTrivBtnTracking.bSCORM)
		this.VarTrivBtnTracking.set(hexString);
}

var trivBtnTracking = new ButtonTrackingObj(365,'project_3', 0, null);
trivBtnTracking.title={id:1,v:0,c:[{id:339920,v:'normalState'},{id:313488,v:'normalState'},{id:313480,v:'normalState'},{id:205536,v:'normalState'},{id:336637,v:'normalState'},{id:336957,v:'normalState'},{id:337485,v:'normalState'},{id:339513,v:'normalState'},{id:160144,v:'normalState'},{id:168524,v:'normalState'},{id:168538,v:'normalState'},{id:178724,v:'normalState'},{id:178750,v:'normalState'},{id:181469,v:'normalState'},{id:213912,v:'normalState'},{id:209221,v:'normalState'},{id:214777,v:'normalState'},{id:216934,v:'normalState'},{id:216019,v:'normalState'},{id:321472,v:'normalState'},{id:321480,v:'normalState'},{id:316865,v:'normalState'},{id:318291,v:'normalState'},{id:319173,v:'normalState'},{id:231381,v:'normalState'},{id:231395,v:'normalState'},{id:231409,v:'normalState'},{id:241281,v:'normalState'},{id:241297,v:'normalState'},{id:241313,v:'normalState'},{id:241329,v:'normalState'},{id:241345,v:'normalState'},{id:241361,v:'normalState'},{id:241378,v:'normalState'},{id:248560,v:'normalState'},{id:248547,v:'normalState'},{id:254802,v:'normalState'},{id:256564,v:'normalState'},{id:256957,v:'normalState'},{id:257049,v:'normalState'},{id:261759,v:'normalState'},{id:261750,v:'normalState'},{id:261741,v:'normalState'},{id:250281,v:'normalState'},{id:251287,v:'normalState'},{id:252000,v:'normalState'},{id:252468,v:'normalState'},{id:270676,v:'normalState'},{id:270660,v:'normalState'},{id:284789,v:'normalState'},{id:273309,v:'normalState'},{id:273293,v:'normalState'},{id:273277,v:'normalState'},{id:288075,v:'normalState'},{id:288371,v:'normalState'},{id:288589,v:'normalState'},{id:277275,v:'normalState'},{id:277266,v:'normalState'},{id:277257,v:'normalState'},{id:273177,v:'normalState'},{id:273186,v:'normalState'},{id:273195,v:'normalState'},{id:290395,v:'normalState'},{id:327358,v:'normalState'},{id:331752,v:'normalState'},{id:331733,v:'normalState'},{id:331716,v:'normalState'},{id:331699,v:'normalState'},{id:331439,v:'normalState'},{id:329665,v:'normalState'},{id:329683,v:'normalState'},{id:329692,v:'normalState'},{id:329701,v:'normalState'},{id:333726,v:'normalState'},{id:289136,v:'normalState'},{id:289149,v:'normalState'},{id:289162,v:'normalState'},{id:306900,v:'normalState'},{id:292281,v:'normalState'},{id:292245,v:'normalState'},{id:292272,v:'normalState'},{id:301651,v:'normalState'},{id:302431,v:'normalState'}]};
