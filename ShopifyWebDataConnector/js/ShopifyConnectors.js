var connectors = `{
  "connections" : [
    {
      "alias" : "ordersLineItems",
      "tables" : [
        { "id"    : "orders",
          "alias" : "orders"     },
        { "id"    : "line_item_list",
          "alias" : "line_item_list"    },
        { "id"    : "line_item",
          "alias" : "line_item"    },
		{ "id"    : "product",
        "alias" : "product"    },
		{ "id"    : "product_variant",
          "alias" : "product_variant"    }
      ],
      "joins" : [
        {
          "left" : {
            "tableAlias" : "orders",
            "columnId"   : "id"
          },
          "right" : {
            "tableAlias" : "line_item_list",
            "columnId"   : "order_id"
          },
          "joinType" : "inner"
        },{
          "left" : {
            "tableAlias" : "line_item_list",
            "columnId"   : "id"
          },
          "right" : {
            "tableAlias" : "line_item",
            "columnId"   : "list_id"
          },
          "joinType" : "inner"
        },
		{
          "left" : {
            "tableAlias" : "product_variant",
            "columnId"   : "id"
          },
          "right" : {
            "tableAlias" : "line_item",
            "columnId"   : "variant_id"
          },
          "joinType" : "inner"
        },
		{
          "left" : {
            "tableAlias" : "products",
            "columnId"   : "id"
          },
          "right" : {
            "tableAlias" : "product_variant",
            "columnId"   : "product_id"
          },
          "joinType" : "inner"
        }
      ]
    }
 ]}`;
 
