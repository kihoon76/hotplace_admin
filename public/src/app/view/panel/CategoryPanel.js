Ext.define('Hotplace.view.panel.CategoryPanel', {
	 extend      : 'Ext.tree.Panel'
    ,alias       : 'widget.categorypanel'
    //,uses        : ['Hotplace.util.Constants']
    ,title       : '카테고리'
    ,initComponent : function() {
    	var addedCategoryMap = {};
    	
    	Ext.apply(this, {
    		 store : Ext.create('Ext.data.TreeStore', {
    	    	 root : {
    	    		  expanded : true
					 ,children : [{
						 text : '회원관리', expand : true, iconCls : 'tree-expand'
						,children : [{
							text : '회원목록', leaf : true, cate : 'mapTypes', id : 'cate-member-list'
						}]
					 }]
    	    	 }
    	    })
    	    ,rootVisible : false
    	    ,isAttachedCategory : function(id) {
     	 	   return addedCategoryMap[id] != null;
     	    }
     	    ,addCategoryInTab : function(id) {
     	    	addedCategoryMap[id] = 'Y';
     	    }
     	    ,rmCategoryInTab : function(id) {
     	    	delete addedCategoryMap[id];
     	    }
     	    ,rmAllInTab : function() {
     	    	addedCategoryMap = {};
     	    }
    	    ,listeners : {
    	    	itemexpand : function(n, opt) {
    	    		n.set('iconCls', 'tree-expand');
    	    	}
    	       ,itemcollapse : function(n, opt) {
    	    	   console.log(n)
    	    	   n.set('iconCls', 'tree-collapse');
    	       }
    	    }
    	});

    	this.callParent(arguments);
    }
});