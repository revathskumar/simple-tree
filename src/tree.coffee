class window.Tree
  constructor: (options) ->
    @el = options.el
    @tree = @el.find('.tree-data')
    @backup = @tree.html()
    @links = @tree.find('a')
    @events()

  events: ->
    @tree.on 'click', 'li > span', @toggle
    @el.on 'keyup', '#tree_search', @searchItem
    @el.on 'click', '#expand_all', @expandAll
    @el.on 'click', '#collapse_all', @collapseAll

  searchItem: (e) =>
    val = $(e.currentTarget).val()
    if val != ''
      results = @search(val)
      if results.length > 0
        @assembleList(results)
      else
        @showError("No Results")
      return
    @restore()

  showError: (msg) ->
    @tree.html("<div class='alert alert-error span5'> #{msg} </div>")

  restore: () ->
    @tree.html(@backup)

  assembleList: (results) ->
    list = $.map results, (a) ->
      return $('<li/>').html(a)

    @tree.html($('<ul>').html(list))

  search: (val) =>
    valReg = new RegExp(val, "i");
    return $.grep @links, (a)->
      return valReg.test(a.text)

  toggle: (e) =>
    @children = @findChildren(e.currentTarget)
    if @children.is(':visible')
      @close(e.currentTarget)
      return
    @open(e.currentTarget)

  findChildren: (target) ->
    return $(target).parent().children('ul')

  expandAll: (e) =>
    @children = @tree.find('ul').children().find('ul')
    @open(@tree.find('i'))

  collapseAll: (e) =>
    @children = @tree.find('ul').children().find('ul')
    @close(@tree.find('i'))

  open: (target) ->
    @children.show()
    $(target).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');

  close: (target) ->
    @children.hide()
    $(target).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
