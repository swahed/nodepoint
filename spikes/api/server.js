var url = "http://hostname/sites/sitename"

var site = new SPSite(url);
//Write("Site Url" + site.Url); // Url Properties oder andere Pfade
site.Title;
site.Dispose();

var rootWeb = site.Rootweb;
var web = site.OpenWeb();
var subweb = web.Webs[0]; 	// Underscore collections?
var subweb = web.Webs["suburl"];
var subweb = web.Webs[Guid];
web.Title;
web.Dispose();

var quicknav = web.Navigation.QuickNavigation;
var topnav = web.Navigation.TopNavigation;

var node = quicknav.Nodes[0];
node.Title;
node.Type; // how to map to path?
node.Url; // how to map to path?

var list = web.Lists[0];
var list = web.Lists["ListName"];
var list = web.Lists[Guid];
list.Title;
// list.Type;

//var folder = list.Folders["Foldername"];

var field = list.Fields[0];
var field = list.Fields["FieldName"];
var field = list.Fields[Guid];
field.Title;
field.FieldType;
field.Required;
field.ShowInNewForm;
field.ShowInEditForm;
field.ShowInViewForm;

var view = list.Views.DefaultView;
var view = list.Views[0];
var view = list.Views["FieldName"];
var view = list.Views[Guid];
view.Title;
view.ViewFields; // Same collection as list.Fields?
view.Query;

var query = new SPQuery();
query.Query = "caml"; // Might use Json notation instead of XML? Are there samples for JSON based query syntax
query.RowLimit = 55;

var items = list.GetItems(view.Query);
items.Count;

var item = items[11];
var item = list.GetItemById(11);

var value = item[fieldId];
var value = item[fieldName];

// Others:
// - Libraries and Files
// - Permissions / Users
// - How to display page contents?
// 		- Representations for th default webparts on WebPart pages? Compatibility to 2013 client side rendering? 
//		... it would be nice to get rid of webparts and replace them with something for the same use cases (this replacment could be stored as configured webparts)
//			- ListView WebPart : configurable grid view of webpart
//			- Content Editor WebPart
//			- Other?
// 		- Contents of WIKI pages
// 		- Fields / Contents of publishing pages

// Create context // Does a context object make sense to keep shared objects?
SPContext.Current = new SPContext();
SPContext.Current.Site = new SPSite(url);
SPContext.Current.Web = SPContext.Current.Site.OpenWeb();

SPContext.Current.ListId = ""; //???
SPContext.Current.ViewId = ""; //???
SPContext.Current.FormMode = 0; // ???

// Destroy at the end of request
SPContext.Current.Site.Dispose();
SPContext.Current.Web.Dispose();

// Draw navigation: Get navigation nodes to draw navigation
var site = SPContext.Current.Site;
var web = SPContext.Current.Web;

var nodes = web.Navigation.QuickNavigation;
viewModel.QuickNavigation = new Navigation();
for(i=0;i = nodes.length - 1;i++)
{
	var node = nodes[i];
	var title = node.Title;	
	var url = node.Url;
	viewModel.Navigation.Add({ "Title" : title, "Url" : url});
}

nodes = web.Navigation.QuickNavigation;
viewModel.TopNavigation = new Navigation();
for(i=0;i = nodes.length - 1;i++)
{
	var node = nodes[i];
	var title = node.Title;	
	var url = node.Url;
	viewModel.Navigation.Add({ "Title" : title, "Url" : url});
}

// List website contents: Get lists for viewAllsitecontents
var lists = web.Lists;
viewModel.GridView = new GridView();
for(i=0;i = lists.length - 1;i++)
{
	var list = lists[i];
	var title = list.Url;	
	var type = list.Type;
	var url = list.RootFolder.Url;
	viewModel.GridView.Add({ "Title" : title, "Url" : url, "Type" :  type});
}

// List items for a list view
var listId = SPContext.Current.ListId;
var list = web.Lists[listId];
var viewId = SPContext.Current.ViewId;
var view = list.View[viewId];
viewModel.GridView = new GridView();
viewModel.GridView.Title = list.Title;
viewModel.GridView.ViewTitle = View.Title;
for(i=0;i = view.Fields.length - 1;i++)
{
	var field = view.Fields[i];
	viewModel.GridView.Add({"Title" : field.title, "Type" : field.FieldType});
}
var items = list.GetItems(view.Query); // Paging?
for(i=0;i = items.length - 1;i++)
{
	var item = items[i];
	var fieldValues = {};
	for(i=0;i = view.Fields.length - 1;i++)
	{
		fieldValues[field.id] = item[field.id];
	}
	viewModel.GridView.Add({"Title" : item.title, "Type" : field.FieldType, "FieldValue" : fieldValues});
}

// Build new/display/edit form
var listId = SPContext.Current.ListId;
var list = web.Lists[listId];
var listFormMode = SPContext.Current.FormMode;
var fields = view.Fields;
viewModel.InputPanel = new InputPanel(listFormMode);
for(i=0;i = view.Fields.length - 1;i++)
{
	var field = view.Fields[i];
	if((listFormMode == 1 && field.ShowInNewForm = true) ||
	   (listFormMode == 2 && field.ShowInEditForm = true) ||
	   (listFormMode == 2 && field.ShowInViewForm = true))
	{
		viewModel.InputPanel.Add({"Title" : field.title, "Type" : field.FieldType, "Required" : field.Required});
	}
}