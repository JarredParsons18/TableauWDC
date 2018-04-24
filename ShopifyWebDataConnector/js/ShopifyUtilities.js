var pre = 'https://';
var key = 'c15f3d388eacdc054fbdb8a43ca68050';
var val = '7e31478f59e5df163ddffbc9eb72c7d9';
var web = '@cc-pos.myshopify.com/admin/';
var ext = 'orders.json';
var call = 'callback=?';
var url = pre + key + ':' + val + web + ext + call;
var result = [];
/*r = new FileReader();
r.readAsText('../json/orders.json');
var orderData = r.result;
var orderData = $.getJSON('../json/orders.json', function(json){
	return json;
});
*/

function getOrderDataRow(order){
	
}

function getOrdersJson(url){
	var orders = [];
	var line_lists = [];
	var line_items = [];
	
	var line_item_list_id = 0;
	
	$.getJSON(url, function(json){
	var obj = JSON.parse(json);	
	obj.foreach(function(order){
		orders.push({
			"id" : order.id,
			"created_at" : order.created_at,
			"updated_at" : order.updated_at,
			"closed_at" : order.closed_at,
			"processed_at" : order.processed_at,
			"number" : order.number,
			"total_price" : order.total_price,
			"subtotal_price" : order.subtotal_price,
			"total_weight" : order.total_weight,
			"total_tax" : order.total_tax,
			"buyer_accepts_marketing" : order.buyer_accepts_marketing,
			"currency" : order.currency,
			"financial_status" : order.financial_status,
			"fulfillment_status" : order.fulfillment_status
		});
		line_lists.push({
				"id" : line_item_list_id,
				"order_id" : order.id
			});
		order.line_items.foreach(function(line_item){
			line_items.push({
				"id" : line_item.id,
				"list_id" : line_item_list_id,
				"product_id" : line_item.product_id,
				"variant_id" : line_item.variant_id,
				"title" : line_item.title,
				"price" : line_item.price,
				"quantity" : line_item.quantity,
				"taxable" : line_item.taxable
			});
			
		});
		line_item_list_id += 1;
	});
});

	return obj;
}

var res = getOrdersJson(url);




