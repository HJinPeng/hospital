// pages/article/article.js
import {
  getOneArticle
} from '../../service/home'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {}
    // nodes: `<div class="info_cont" id="mod_player"><p style="margin-bottom: 0in; line-height: 100%;"><span style="font-size: 16px; line-height: 1.75;"><span style="font-family: 等线;"><span lang="zh-CN"><strong>今天是第五个中国航天日</strong>，也是东方红一号卫星<strong>发射成功</strong></span></span><span style="font-family: 微软雅黑, serif;"><strong>50</strong></span><span style="font-family: 等线;"><span lang="zh-CN"><strong>周年纪念日</strong>。国家航天局新闻宣传中心携手《王者荣耀》，向广大年轻用户弘扬我国航天事业伟大成就。</span></span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;">&nbsp;</p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-family: 等线; font-size: 16px; line-height: 1.75;"><span lang="zh-CN">此次贺图中出现的“东方红一号“卫星，是我国第一颗人造卫星。五十年前的今天，“东方红一号”的成功发射，正式拉开了中国人探索宇宙奥秘、和平利用太空、造福人类的序幕，成为中华民族不畏艰难、勇攀高峰的记忆丰碑和精神象征。画面右下角的航天员形象，则是为了致敬我国载人航天从无到有、从弱到强的伟大成就。画面中心的可爱探测器，则是我们的“玉兔号”月球车，嫦娥探月工程的成功，是我国向星辰大海迈进的重要一步。</span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-size: 16px; line-height: 1.75;"><img src="http://shp.qpic.cn/cfwebcap/0/3d6a6b0f939024846b2a77329c3d425a/0"></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;">&nbsp;</p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-size: 16px; line-height: 1.75;"><span style="font-family: 等线;"><span lang="zh-CN">探索浩瀚宇宙，发展航天事业，建设航天强国是我们不懈追求的航天梦。习近平总书记强调“任何伟大的事业都始于梦想、基于创新、成于实干”。</span></span><span style="font-family: 微软雅黑, serif;">1970</span><span style="font-family: 等线;"><span lang="zh-CN">年，我国第一颗人造卫星“东方红一号”成功发射，拉开了中国人探索宇宙奥秘、和平利用太空、造福人类的序幕，成为中华民族不畏艰难、勇攀高峰的记忆丰碑和精神象征。</span></span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;">&nbsp;</p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-size: 16px; line-height: 1.75;"><span style="font-family: 等线;"><span lang="zh-CN">传承航天精神，拥抱星辰大海，永远在路上。值“东方红一号”卫星发射成功</span></span><span style="font-family: 微软雅黑, serif;">50</span><span style="font-family: 等线;"><span lang="zh-CN">年之际，中国航天局推出主题宣传片，讲述中国航天重要事件和人物故事，展示在“两弹一星”精神感召下，中国航天的奋斗历程，中国航天的卓越贡献，中国航天的前行步伐。希望年轻一代能够受到航天精神的激励，砥砺前行，为弘扬我国航天事业的伟大成就贡献力量。</span></span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;">&nbsp;</p>
    // <p style="margin-bottom: 0in; line-height: 100%; text-align: center;"><span style="font-family: 等线; font-size: 16px; line-height: 1.75;"><span lang="zh-CN">【中国航天日官方宣传视频】</span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%; text-align: center;"><iframe frameborder="0" height="450" src="https://v.qq.com/txp/iframe/player.html?vid=j0955qh2rli" width="700"></iframe></p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-family: 等线; font-size: 16px; line-height: 1.75;"><span lang="zh-CN">无数中国航天人正孜孜不倦地探索着我们头顶的浩瀚星空，而建设航天事业，更是需要新一代年轻人的参与和奉献。《王者荣耀》作为年轻群体中极具号召力的游戏品牌，也持续承担社会责任，为航天事业的科普贡献力量。</span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;">&nbsp;</p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-size: 16px; line-height: 1.75;"><span style="font-family: 微软雅黑, serif;">2019</span><span style="font-family: 等线;"><span lang="zh-CN">年初，为庆祝“嫦娥四号”成功登月，《王者荣耀》与《人民日报》联动，推出航天主题活动，宣传中国航天登月成果。</span></span><span style="font-family: 微软雅黑, serif;">2020</span><span style="font-family: 等线;"><span lang="zh-CN">年初，《王者荣耀》与中国航天科技集团合作推出的两款航天主题皮肤，并赋予了它们“航天交流</span></span><span style="font-family: 微软雅黑, serif;">·</span><span style="font-family: 等线;"><span lang="zh-CN">探索大使”的称号，使之在有温度的情感连接上，化身为带领年轻用户开启浩瀚星空之门的“领航员”，还在游戏内、微信、微博等社交平台展开科普类等的活动，深入科普中国航天大事件。</span></span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-size: 16px; line-height: 1.75;"><img src="http://shp.qpic.cn/cfwebcap/0/9be3d69c2e007878361960dec3578c6f/0"></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-family: 等线; font-size: 16px; line-height: 1.75;"><span lang="zh-CN">发展航天事业，建设航天强国，是几代航天人默默的坚守与拼搏，而《王者荣耀》持续响应号召，面向年轻用户科普和弘扬我国航天成就，也是希望能够以此号召中国年轻一代弘扬航天精神，拥抱星辰大海，让航天这份来之不易的“荣耀”，更具“王者”气质。</span></span></p>
    // <p style="margin-bottom: 0in; line-height: 100%;">&nbsp;</p>
    // <p style="margin-bottom: 0in; line-height: 100%;"><span style="font-size: 16px; line-height: 1.75;"><span style="font-family: 等线;"><span lang="zh-CN">中国航天的故事还在延续，五十年来步履不停，才能在浩瀚星海中拥有属于我们的声音。召唤师们也可以跟随“中国航天日”（微信公众号</span></span><span style="font-family: 微软雅黑, serif;">ID</span><span style="font-family: 等线;"><span lang="zh-CN">：</span></span><span style="font-family: 微软雅黑, serif;">chinaspaceday</span><span style="font-family: 等线;"><span lang="zh-CN">）的指引，一起关注航天发展、宣传航天成就、弘扬航天精神、普及航天知识。让我们沿着航天先辈们的脚步，走进中国航天，爱上“中国航天日”。</span></span></span></p></div>`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const id = options.id;
    this._getOneArticle(id);
  },

  // --------------------方法
  _getOneArticle(id){
    getOneArticle(id).then(res=>{
      console.log(res);
      const data = res.data;
      data.updatedAt = data.updatedAt.slice(0,10)+' '+data.updatedAt.slice(11,19);
      data.body = data.body.replace(/<img /g, '<img class="rich_img" ');
      this.setData({
        article: data
      })
    })
  }
})