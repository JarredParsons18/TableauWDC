# TableauWDC
Shopify Web Data Connector for Tableau


This Web Data Connector was made for Classical Conversations. 

It is used in Tableau applications as a data source.

To use it you must create a config file in \WebDataConnectors\ShopifyWDC\Connectors\LoginCredentials with a switch statement in it.

example: 

#ShopifyCreds.ps1

switch($shop){

	#testCredentials
	"POS" {$credential = @{url = "https://pos.myshopify.com/admin/"; tokenString = "ExampleUser:ExamplePass" }; Break}
	
	#HTS Credentials
	"HTS" {$credential = @{url = "https://homeschool-testing-services.myshopify.com/admin/"; tokenString = "ExampleUser:ExamplePass"}; Break}
	
	#Bookstore Credentials
	"BOOK" {$credential = @{url = "https://classical-conversations-bookstore.myshopify.com/admin/"; tokenString = "ExampleUser:ExamplePass" }; Break}
	
}

return $credential

You refresh your stores data by calling 

WebDataConnectors\ShopifyWDC\PowershellScripts\ShopifyRefreshScript/RefreshShopify.ps1 $store $UserId $Password $view $output

$store : The string value to search for in the switch to get credentials
$UserId : Your Tableau User ID
$Passworkd : Your Tableau Password
$View : The tableau view that you would like to take a picture of (Company specific, not standard tableau use)
$output : Filename for the PNG file produced from tableau view

you then call serverStart.ps1 to start a node server. You can then connect via tableau to the URL for the HTML page in a store (Currently BOOK, POS, and HTS)


Desired Updates to come:

1) Will be updated to use tableau native credentials
2) will create a way to incrementally update

