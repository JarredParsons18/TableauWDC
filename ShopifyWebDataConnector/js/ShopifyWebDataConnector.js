
(function(){
  var myConnector = tableau.makeConnector();
  myConnector.getSchema = function(schemaCallback) {
    // Create a promise to get our Standard Connections List from a JSON file. This increases code readability since we
    // no longer need to define the lengthy object within our javascript itself.
    var standardConnections = new Promise(function(resolve, reject) {
    loadJSON("TestShopifyConnectors", function(json) {
      var obj = JSON.parse(json);
      var connectionList = [];
      for (var connection in obj.connections) {
        connectionList.push(obj.connections[connection]);
      }
      resolve(connectionList);
    }, true);
    });
    // Create a promise to get our table schema info as well, just like above
    var tables = new Promise(function(resolve, reject) {
      loadJSON("StandardConnectionsTableInfoData", function(json) {
        var obj = JSON.parse(json);
        var tableList = [];
        for (var table in obj.tables) {
          tableList.push(obj.tables[table]);
        }
        resolve(tableList);
      }, true);
    });
    // Once all our promises are resolved, we can call the schemaCallback to send this info to Tableau
    Promise.all([tables, standardConnections]).then(function(data) {
      schemaCallback(data[0], data[1]);
    });
  }

  myConnector.getData = function(table, doneCallback) {
    // Load our data from the API. Multiple tables for WDC work by calling getData multiple times with a different id
    // so we want to make sure we are getting the correct table data per getData call
    loadJSON(table.tableInfo.id, function(data) {
      var obj = JSON.parse(data);
      var tableData = [];
      // Iterate through the data and build our table
      for (var i = 0; i < obj.length; i++) {
        tableEntry = {};
        var ref = obj[i];
		switch(table){
			case "orders":
				tableEntry = ut.getOrderDataRow(ref);
				break;
			case "line_item_list":
				tableEntry = ut.getLineItemList(ref);
				break;
		}
          }
        tableData.push(tableEntry);
      });
      // Once we have all the data parsed, we send it to the Tableau table object
      table.appendRows(tableData);
      doneCallback();
    };
  tableau.registerConnector(myConnector);
  
  $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Shopify Web Connector"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
