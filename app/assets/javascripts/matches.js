// instantiate the bloodhound suggestion engine
var users = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '/users',
  remote: {
    url: '/users?q=%QUERY',
    wildcard: '%QUERY'
  }
});

// instantiate the typeahead UI
$(function() {
  $('.typeahead').typeahead(null, {
    name: 'users',
    displayKey: 'name',
    source: users,
    minLength: 3
  });
})
