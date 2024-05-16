(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['stickyTemplate'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!--\n - Collaborators:       Sahith Chandra, Andrew Inman, Preet Patel\n - Name:        MEMOZ\n -->\n\n<div class=\"sticky-note\" data-memo=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"memo") || (depth0 != null ? lookupProperty(depth0,"memo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"memo","hash":{},"data":data,"loc":{"start":{"line":6,"column":36},"end":{"line":6,"column":44}}}) : helper)))
    + "\" data-date=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"memoDate") || (depth0 != null ? lookupProperty(depth0,"memoDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"memoDate","hash":{},"data":data,"loc":{"start":{"line":6,"column":57},"end":{"line":6,"column":69}}}) : helper)))
    + "\" data-color=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"stickyColor") || (depth0 != null ? lookupProperty(depth0,"stickyColor") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stickyColor","hash":{},"data":data,"loc":{"start":{"line":6,"column":83},"end":{"line":6,"column":98}}}) : helper)))
    + "\">\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"truncatedMemo") || (depth0 != null ? lookupProperty(depth0,"truncatedMemo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"truncatedMemo","hash":{},"data":data,"loc":{"start":{"line":7,"column":7},"end":{"line":7,"column":24}}}) : helper)))
    + "</p>\n</div>\n";
},"useData":true});
})();