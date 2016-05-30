'use strict';
var page = require('page');
var IndexMenu = React.createClass({

render: function (){
  return (
  <div id="content" className="col-md-12">
    <h1 className="fadeInDown animated">" Learn By Doing "</h1>
    <ul className="col-md-12 ">
      <li className="col-md-4 fadeInUp animated" >
        <i className="fa fa-map-signs fa-2x"></i>
        <h3>精准能力评估</h3>
        <p>选择你想练的，我们会精心为您挑选最合适的，最有效的练习题目，作为考前自测的最佳选择。</p>
      </li>
      <li className="col-md-4 fadeInUp animated" >
        <i className="fa fa-mortar-board fa-2x"></i>
        <h3>针对性专项练习</h3>
        <p>选择题错太多？完型填空只能靠瞎蒙？大题终止于“解：”？别担心，我们帮你把它们拉出来单练！</p>
      </li>
      <li className="col-md-4 fadeInUp animated" >
        <i className="fa fa-pencil fa-2x"></i>
        <h3>历届考试真题</h3>
        <p>系统题库中收藏了历届各科的各种真题，覆盖到了各科历届考点知识点,答完即可马上知道自己的成绩，更加及时的反馈。</p>
      </li>
      <li className="col-md-4 fadeInUp animated" >
        <i className="fa fa-rocket fa-2x"></i>
        <h3>精华专题练习</h3>
        <p>无论是考研各科题目，还是托福雅思CET，各种等级证书题目，你能想到的我们都有。</p>
      </li>
      <li className="col-md-4 fadeInUp animated" >
        <i className="fa fa-comments-o fa-2x"></i>
        <h3>以题会友</h3>
        <p>一个人的学习太无聊？找不到能一起学习去图书馆奋斗的小伙伴，试试这个吧。</p>
      </li>
      <li className="col-md-4 fadeInUp animated" >
        <i className="fa fa-exchange fa-2x"></i>
        <h3>教师跟进点评</h3>
        <p>更轻松地数据采集，数据分析，更加方便老师对学生进行评估，及时了解学生的学习进度，更加有针对性的进行辅导。</p>
      </li>
    </ul>
  </div>
  );
}


});

module.exports = IndexMenu;
