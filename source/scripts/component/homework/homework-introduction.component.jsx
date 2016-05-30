'use strict';

var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var HomeworkIntroduction = React.createClass({

  componentWillUpdate: function(prev) {
    if(this.props.quiz.id !== prev.quiz.id) {
      this.refs.container.scrollTop = 0;
    }
  },

  render() {
    var desc = this.props.quiz.desc || "";

    function content() {
      var pattern = /a href=/g;
      desc = marked(desc);
      var addTargetInMarkDownText = desc.replace(pattern, "a target='_blank' href=");
      return {__html: addTargetInMarkDownText};
    }

    return (
        <div className="tab">
          <div ref="container"  className="content">
            <div id="introduction" dangerouslySetInnerHTML={content()}>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = HomeworkIntroduction;
