Ext.define('Asher.store.WorshipListStore', {
    extend : 'Ext.data.Store'
   ,requires : ['Asher.util.Constants']
   ,proxy : {
        type : 'ajax'
       ,url : Asher.util.Constants.context + '/worship/sunlist'
       ,actionMethods : 'POST'
       ,reader : {
           type : 'json'
          ,root : 'datas'
          ,totalProperty : 'total'
       }
   }
   ,fields : ['date', 'title', 'bible', 'chapter', 'verse', 'attachment', 'body']
   ,autoLoad : true
   ,pageSize : Asher.util.Constants.gridPageSize
});
