(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Tree = (function() {
    function Tree(options) {
      this.collapseAll = __bind(this.collapseAll, this);
      this.expandAll = __bind(this.expandAll, this);
      this.toggle = __bind(this.toggle, this);
      this.search = __bind(this.search, this);
      this.searchItem = __bind(this.searchItem, this);
      this.el = options.el;
      this.tree = this.el.find('.tree-data');
      this.backup = this.tree.html();
      this.links = this.tree.find('a');
      this.events();
    }

    Tree.prototype.events = function() {
      this.tree.on('click', 'li > span', this.toggle);
      this.el.on('keyup', '#tree_search', this.searchItem);
      this.el.on('click', '#expand_all', this.expandAll);
      return this.el.on('click', '#collapse_all', this.collapseAll);
    };

    Tree.prototype.searchItem = function(e) {
      var results, val;
      val = $(e.currentTarget).val();
      if (val !== '') {
        results = this.search(val);
        if (results.length > 0) {
          this.assembleList(results);
        } else {
          this.showError("No Results");
        }
        return;
      }
      return this.restore();
    };

    Tree.prototype.showError = function(msg) {
      return this.tree.html("<div class='alert alert-error span5'> " + msg + " </div>");
    };

    Tree.prototype.restore = function() {
      return this.tree.html(this.backup);
    };

    Tree.prototype.assembleList = function(results) {
      var list;
      list = $.map(results, function(a) {
        return $('<li/>').html(a);
      });
      return this.tree.html($('<ul>').html(list));
    };

    Tree.prototype.search = function(val) {
      var valReg;
      valReg = new RegExp(val, "i");
      return $.grep(this.links, function(a) {
        return valReg.test(a.text);
      });
    };

    Tree.prototype.toggle = function(e) {
      this.children = this.findChildren(e.currentTarget);
      if (this.children.is(':visible')) {
        this.close(e.currentTarget);
        return;
      }
      return this.open(e.currentTarget);
    };

    Tree.prototype.findChildren = function(target) {
      return $(target).parent().children('ul');
    };

    Tree.prototype.expandAll = function(e) {
      this.children = this.tree.find('ul').children().find('ul');
      return this.open(this.tree.find('i'));
    };

    Tree.prototype.collapseAll = function(e) {
      this.children = this.tree.find('ul').children().find('ul');
      return this.close(this.tree.find('i'));
    };

    Tree.prototype.open = function(target) {
      this.children.show();
      return $(target).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
    };

    Tree.prototype.close = function(target) {
      this.children.hide();
      return $(target).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
    };

    return Tree;

  })();

}).call(this);
