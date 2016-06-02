'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var CodexSkellingtonGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the codeX Skellington generator!'
    ));

    var prompts = [
    {
      type    : 'input',
      name    : 'codexTitle',
      message : 'The title of the module'
    }];

    this.prompt(prompts, function (props) {
      this.codexTitle = props.codexTitle;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('_includes');
      this.dest.mkdir('_layouts');
      this.dest.mkdir('_posts');

      this.src.copy('index.md', 'index.md');
      this.src.copy('LICENSE', 'LICENSE');
      this.src.copy('README.md', 'README.md');

      this.src.copy('_includes/footer.html', '_includes/footer.html');
      this.src.copy('_includes/head.html', '_includes/head.html');
      this.src.copy('_includes/header.html', '_includes/header.html');

      this.src.copy('_layouts/default.html', '_layouts/default.html');
      this.src.copy('_layouts/single.html', '_layouts/single.html');

      this.src.copy('_posts/2016-06-01-starter.md', '_posts/2016-06-01-starter.md');

      var configYmlContext = {
        codex_title: this.codexTitle,
      };

    this.template("__config.yml", "_config.yml", configYmlContext);
      //this.src.copy('__config.yml', '_config.yml');
    },

    projectfiles: function () {
      this.src.copy('gitignore', '.gitignore');
    }
  },

});

module.exports = CodexSkellingtonGenerator;
