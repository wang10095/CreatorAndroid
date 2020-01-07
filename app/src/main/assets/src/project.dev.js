window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AnimationManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "05e47flznNBG6Ca0XwQQgjA", "AnimationManager");
    "use strict";
    var Animation = require("Animation");
    var AnimationManager = cc.Class({
      extends: cc.Component,
      ctor: function ctor() {
        this.aniAtlasNameLast = ".plist";
        this.aniAtlasList = {};
        this.aniList = {};
      },
      loadResDir: function loadResDir(url) {
        var self = this;
        cc.loader.loadResDir(url, cc.SpriteAtlas, function(err, res) {
          if (err) {
            cc.error("\u52a8\u753b\u8d44\u6e90\u52a0\u8f7d\u9519\u8bef");
            return;
          }
          res.forEach(function(element) {
            self.aniAtlasList[element.name] = element;
          });
          cc.log("\u52a8\u753b\u8d44\u6e90\u52a0\u8f7d\u5b8c\u6210");
        });
      },
      loadRes: function loadRes(url, callBack) {
        var self = this;
        cc.loader.loadRes(url, cc.SpriteAtlas, function(err, res) {
          if (err) {
            cc.error("\u52a8\u753b\u8d44\u6e90\u52a0\u8f7d\u9519\u8bef");
            return;
          }
          self.aniAtlasList[res.name] = res;
          cc.log("\u52a8\u753b\u8d44\u6e90\u52a0\u8f7d\u5b8c\u6210");
          callBack && callBack();
        });
      },
      getAtlas: function getAtlas(name) {
        var atlas = this.aniAtlasList[name + this.aniAtlasNameLast];
        if (atlas) return atlas;
        cc.warn("\u7f3a\u5c11\u5f53\u524d " + name + " \u56fe\u96c6\u8d44\u6e90");
      },
      playAnimation: function playAnimation(name, parent) {
        var simaple = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 12;
        var x = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        var y = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0;
        var sx = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
        var sy = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 1;
        var wrapMode = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0;
        var cb = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : null;
        if (this.aniList[name] && this.aniList[name].getAniNode().parent == parent) {
          this.aniList[name].getAni().node.active = true;
          this.aniList[name].getAni().play(name, parent, this.getAtlas(name), simaple, x, y, sx, sy, wrapMode, cb);
          return this.aniList[name];
        }
        var ani = new Animation();
        ani.play(name, parent, this.getAtlas(name), simaple, x, y, sx, sy, wrapMode, cb);
        this.aniList[name] = ani;
        return this.aniList[name];
      },
      stopAnimation: function stopAnimation(name) {
        this.aniList[name] && this.aniList[name].stop();
      },
      resumeAnimation: function resumeAnimation(name) {
        this.aniList[name] && this.aniList[name].resume(this.aniName);
      }
    });
    AnimationManager.instance = null;
    AnimationManager.getInstance = function() {
      this.instance || (this.instance = new AnimationManager());
      return this.instance;
    };
    module.exports = AnimationManager;
    cc._RF.pop();
  }, {
    Animation: "Animation"
  } ],
  Animation: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cefc53lRX1FDpOxvc/Gx0Dg", "Animation");
    "use strict";
    var Animation = cc.Class({
      extends: cc.Component,
      properties: {
        aniNode: null,
        ani: null,
        atlas: null,
        aniName: "",
        frame: 0,
        aniCache: true,
        wrapMode: 0,
        onFinished: null
      },
      ctor: function ctor() {},
      play: function play(name, parent, atlas) {
        var simaple = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10;
        var x = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0;
        var y = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        var sx = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 1;
        var sy = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1;
        var wrapMode = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0;
        var cb = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : null;
        this.atlas = atlas;
        this.frame = simaple;
        this.aniName = name;
        if (!this.atlas) {
          cc.log("\u65e0\u6b64\u52a8\u753b");
          return;
        }
        this.aniNode = new cc.Node();
        this.aniNode.x = x;
        this.aniNode.y = y;
        this.aniNode.scaleX = sx;
        this.aniNode.scaleY = sy;
        parent.addChild(this.aniNode);
        this.aniNode.addComponent(cc.Sprite);
        this.ani = this.aniNode.addComponent(cc.Animation);
        var spriteFrames = this.atlas.getSpriteFrames();
        var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, this.frame);
        clip.name = this.aniName;
        clip.wrapMode = wrapMode;
        this.ani.addClip(clip);
        this.onFinished = cb;
        this.ani.on("finished", this.onCompleteCallBack, this);
        this.aniName = this.aniName;
        this.ani.play(name);
      },
      stop: function stop() {
        this.ani && this.ani.stop(this.aniName);
      },
      resume: function resume() {
        this.ani && this.ani.resume(this.aniName);
      },
      onCompleteCallBack: function onCompleteCallBack() {
        if (this.onFinished) this.onFinished(); else {
          this.ani.node.active = false;
          this.ani.off("finished", this.onCompleteCallBack, this);
        }
      },
      getAniNode: function getAniNode() {
        return this.aniNode;
      },
      getAni: function getAni() {
        return this.ani;
      }
    });
    module.exports = Animation;
    cc._RF.pop();
  }, {} ],
  ApplyItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f5fdxploJJ4IN/wCi7H+Ts", "ApplyItem");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btn_agree: cc.Button
      },
      setData: function setData(data) {
        this.data = data;
      },
      ctor: function ctor() {},
      agree: function agree(touch) {
        var data = {
          roomId: Number(Utils.gameInfo.roomInfo.roomId),
          applicantUids: [ this.data.uid ],
          type: 1
        };
        window.message.send(window.CS.HANDLE_APPLY, data, true);
        this.btn_agree.node.active = false;
      },
      onLoad: function onLoad() {
        var _this = this;
        if (this.data) {
          var name = this.node.getChildByName("name");
          name.getComponent(cc.Label).string = this.data.nickname;
          cc.loader.load(this.data.headimgurl, function(err, texture) {
            err || (_this.node.getChildByName("mask").getChildByName("head_img").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture));
          });
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  AudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fea71sT2RRK5Ym+zKWcIbaV", "AudioManager");
    "use strict";
    var AudioManager = {
      localStorageList: {
        audio: "audio",
        audioSwitch: "audioSwitch"
      },
      init: function init() {
        this._audioList = {};
        this._switchMusic = false;
        this._switchEffect = false;
        this._effectVolume = 1;
        this._musicVolume = 1;
        var audioSetting = this.getLocalStorageItem(this.localStorageList.audio);
        this._effectVolume = audioSetting["effect"];
        this._musicVolume = audioSetting["music"];
        var switchSetting = this.getLocalStorageItem(this.localStorageList.audioSwitch);
        this._switchEffect = switchSetting["switchEffect"];
        this._switchMusic = switchSetting["switchMusic"];
      },
      getLocalStorageItem: function getLocalStorageItem(name) {
        var item = JSON.parse(cc.sys.localStorage.getItem(name));
        if (!item || "" == item) {
          if (name == this.localStorageList.audio) {
            this.setEffectVolume();
            this.setMusicVolume();
          } else if (name == this.localStorageList.audioSwitch) {
            this.switchEffectFunc();
            this.switchMusicFunc();
          }
          item = JSON.parse(cc.sys.localStorage.getItem(name));
        }
        return item;
      },
      loadResDir: function loadResDir(url) {
        var self = this;
        cc.loader.loadResDir(url, cc.AudioClip, function(err, res) {
          if (err) {
            cc.error("\u58f0\u97f3\u8d44\u6e90\u52a0\u8f7d\u9519\u8bef");
            return;
          }
          res.forEach(function(element) {
            self._audioList[element.name] = element;
          });
          cc.log("\u58f0\u97f3\u8d44\u6e90\u8f7d\u5b8c\u6210");
        });
      },
      playEffect: function playEffect(name) {
        var loop = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (this._switchEffect) {
          var clip = this._audioList[name];
          clip ? cc.audioEngine.playEffect(clip, loop, this._musicVolume) : cc.warn("\u97f3\u6548" + name + "\u6587\u4ef6\u4e0d\u5b58\u5728");
        }
      },
      switchEffectFunc: function switchEffectFunc() {
        this._switchEffect = !this._switchEffect;
        this._switchEffect || this.stopAllEffect();
        cc.sys.localStorage.setItem(this.localStorageList.audioSwitch, JSON.stringify({
          switchEffect: this._switchEffect,
          switchMusic: this._switchMusic
        }));
      },
      getSwitchEffect: function getSwitchEffect() {
        return this._switchEffect;
      },
      setEffectVolume: function setEffectVolume() {
        var value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        this._effectVolume = value;
        cc.audioEngine.setEffectsVolume(value);
        cc.sys.localStorage.setItem(this.localStorageList.audio, JSON.stringify({
          effect: this._effectVolume,
          music: this._musicVolume
        }));
      },
      getEffectVolume: function getEffectVolume() {
        return cc.audioEngine.getEffectsVolume();
      },
      pauseEffect: function pauseEffect(name) {
        var audio = this._audioList[name];
        audio ? cc.audioEngine.pauseEffect(audio) : cc.error("\u97f3\u6548\u6587\u4ef6" + name + "\u4e0d\u5b58\u5728");
      },
      pauseAllEffect: function pauseAllEffect() {
        cc.audioEngine.pauseAllEffects();
      },
      resumeEffect: function resumeEffect(name) {
        var audio = this._audioList[name];
        audio ? cc.audioEngine.resumeEffect(audio) : cc.error("\u97f3\u6548\u6587\u4ef6" + name + "\u4e0d\u5b58\u5728");
      },
      resumeAllEffect: function resumeAllEffect() {
        cc.audioEngine.resumeAllEffects();
      },
      stopEffect: function stopEffect(name) {
        var audio = this._audioList[name];
        audio ? cc.audioEngine.stopEffect(audio) : cc.error("\u97f3\u6548\u6587\u4ef6" + name + "\u4e0d\u5b58\u5728");
      },
      stopAllEffect: function stopAllEffect() {
        cc.audioEngine.stopAllEffects();
      },
      playMusic: function playMusic(name) {
        var loop = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        if (this._switchMusic) {
          var clip = this._audioList[name];
          clip ? cc.audioEngine.playMusic(clip, loop, this._musicVolume) : cc.warn("\u97f3\u4e50" + name + "\u6587\u4ef6\u4e0d\u5b58\u5728");
        }
      },
      switchMusicFunc: function switchMusicFunc() {
        this._switchMusic = !this._switchMusic;
        this._switchMusic || this.stopMusic();
        cc.sys.localStorage.setItem(this.localStorageList.audioSwitch, JSON.stringify({
          switchEffect: this._switchEffect,
          switchMusic: this._switchMusic
        }));
      },
      getSwitchMusic: function getSwitchMusic() {
        return this._switchMusic;
      },
      pauseMusic: function pauseMusic() {
        cc.audioEngine.pauseMusic();
      },
      resumeMusic: function resumeMusic() {
        cc.audioEngine.resumeMusic();
      },
      stopMusic: function stopMusic() {
        var releaseData = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        cc.audioEngine.stopMusic(releaseData);
      },
      setMusicVolume: function setMusicVolume() {
        var value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        this._musicVolume = value;
        cc.audioEngine.setMusicVolume(value);
        cc.sys.localStorage.setItem(this.localStorageList.audio, JSON.stringify({
          effect: this._effectVolume,
          music: this._musicVolume
        }));
      },
      getMusicVolume: function getMusicVolume() {
        return cc.audioEngine.getMusicVolume();
      },
      isMusicPlaying: function isMusicPlaying() {
        return cc.audioEngine.isMusicPlaying();
      },
      releaseAudio: function releaseAudio(name) {
        var clip = this._audioList[name];
        if (clip) {
          cc.audioEngine.uncache(clip);
          delete this._audioList[name];
        } else cc.error("\u8d44\u6e90" + name + "\u4e0d\u5b58\u5728\uff0c \u91ca\u653e\u5931\u8d25");
      }
    };
    module.exports = AudioManager;
    cc._RF.pop();
  }, {} ],
  Canvas: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8e53pSwNhEVLcDNx3guemn", "Canvas");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        login_View: cc.Node
      },
      start: function start() {
        this.login_View.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  ChangeIp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dda7qBct9Dsbqzw3/F/dbJ", "ChangeIp");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btn: cc.Button
      },
      start: function start() {
        var _this = this;
        this.btn.y = -1e4;
        var _loop = function _loop(i) {
          var newBtn = cc.instantiate(_this.btn.node);
          _this.node.addChild(newBtn);
          newBtn.x = 0;
          newBtn.y = -60 * i;
          var labelNode = newBtn.getChildByName("Label");
          var label = labelNode.getComponent(cc.Label);
          label.string = Config.ipChange[i].ip + ":" + Config.ipChange[i].port;
          newBtn.on("touchend", function() {
            Config.ip = Config.ipChange[i].ip;
            Config.port = Config.ipChange[i].port;
            cc.sys.localStorage.setItem("saveTestIP", Config.ip);
            cc.sys.localStorage.setItem("saveTestPort", Config.port);
          }, newBtn);
        };
        for (var i = 0; i < Config.ipChange.length; i++) _loop(i);
      }
    });
    cc._RF.pop();
  }, {} ],
  ChatView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97a9bOPjOlHbKTYi8afRGLA", "ChatView");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        itemTemplate: {
          default: null,
          type: cc.Prefab
        },
        scrollView: {
          default: null,
          type: cc.ScrollView
        },
        intervalHeight: 30
      },
      onLoad: function onLoad() {
        this.reset();
      },
      reset: function reset() {
        this.content = this.scrollView.content;
        this.content.height = 0;
        this.scrollView.content.removeAllChildren(true);
        this.items = [];
        this.scrollToFixedPosition(0);
      },
      addItem: function addItem(data) {
        var _this = this;
        Log("====================================== \u6dfb\u52a0\u4e00\u4e2aitem ===================================");
        var item = cc.instantiate(this.itemTemplate);
        var callFunc = function callFunc(nodeHeight) {
          var y = -_this.content.height;
          item.setPosition(0, y);
          _this.content.height += nodeHeight;
          _this.scrollToFixedPosition(nodeHeight);
        };
        item.getComponent("ItemInfo").setData(data, callFunc);
        this.content.addChild(item);
        this.items.push(item);
      },
      removeItem: function removeItem() {
        var item = this.items.pop();
        item.removeFromParent(true);
        this.content.height -= item.height;
      },
      scrollToFixedPosition: function scrollToFixedPosition(nodeHeight) {
        var height = this.content.height;
        var curHeight = Math.abs(this.scrollView.getScrollOffset().y);
        var curHeightNow = Math.abs(height - this.scrollView.node.height);
        Math.abs(curHeight + nodeHeight - curHeightNow) > this.scrollView.node.height / 2 || this.scrollView.scrollToOffset(cc.v2(0, height), 0);
      }
    });
    cc._RF.pop();
  }, {} ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ce9beLZ9oVI8ofxuTiwtDHE", "Config");
    "use strict";
    var Config = {};
    Config.gameId = 101;
    Config.ip = "47.104.214.17";
    Config.port = 20004;
    Config.houseNumMax = 5;
    Config.playersNum = -1;
    Config.roleIdConfig = {
      predict: "101",
      holy: "102",
      loyal: "103",
      hunter: "104",
      magic: "105",
      searcher: "106",
      witch: "201",
      boss: "202",
      thug: "203",
      lackeys: "204",
      idiot: "205",
      spy: "206"
    };
    Config.goodRole = [ "101", "102", "103", "104", "105", "106" ];
    Config.roleIdByVisibleConfig = {
      101: [ 201, 203, 204, 205, 206 ],
      102: [ 101, 201 ],
      103: [],
      104: [],
      105: [],
      106: [],
      201: [ 202, 203, 204 ],
      202: [ 201, 203, 204 ],
      203: [ 201 ],
      204: [ 201, 202, 203 ],
      205: [],
      206: [ 201 ]
    };
    Config.ruleConfig = {
      5: {
        pickMember: [ 2, 3, 2, 3, 3 ],
        destroyNumber: [ 1, 1, 1, 1, 1 ]
      },
      6: {
        pickMember: [ 2, 3, 4, 3, 4 ],
        destroyNumber: [ 1, 1, 1, 1, 1 ]
      },
      7: {
        pickMember: [ 2, 3, 3, 4, 4 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      },
      8: {
        pickMember: [ 3, 4, 4, 5, 5 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      },
      9: {
        pickMember: [ 3, 4, 4, 5, 5 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      },
      10: {
        pickMember: [ 3, 4, 4, 5, 5 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      },
      11: {
        pickMember: [ 3, 4, 5, 6, 6 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      },
      12: {
        pickMember: [ 3, 4, 5, 6, 6 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      },
      13: {
        pickMember: [ 3, 4, 6, 7, 7 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      },
      14: {
        pickMember: [ 3, 4, 7, 8, 8 ],
        destroyNumber: [ 1, 1, 1, 2, 1 ]
      }
    };
    Config.loadAssetsPath = "loadAssets";
    Config.SoundsFileName = "loadAssets/sounds";
    Config.AudioList = {
      game_win: "game_win",
      game_fail: "game_fail",
      thugkill: "thugkill",
      team_win: "team_win",
      team_fail: "team_fail"
    };
    Config.AnimationsFileName = "loadAssets/animation";
    Config.AnimationList = {
      task: "task",
      target: "target",
      star: "star",
      thug: "thug",
      win_bad: "win_bad",
      win_good: "win_good"
    };
    Config.TextureUrl = {
      mark: {
        unknown: "texture/id_mark/mark_unknown",
        notSure: "texture/id_mark/mark_notSure",
        101: "texture/id_mark/mark_xianzhi",
        102: "texture/id_mark/mark_shengqi",
        103: "texture/id_mark/mark_zhongchen",
        104: "texture/id_mark/mark_youxia",
        105: "texture/id_mark/mark_moshushi",
        106: "texture/id_mark/mark_jianchaguan",
        201: "texture/id_mark/mark_monv",
        202: "texture/id_mark/mark_heilaoda",
        203: "texture/id_mark/mark_cike",
        204: "texture/id_mark/mark_zhaoya",
        205: "texture/id_mark/mark_huaibaichi",
        206: "texture/id_mark/mark_nvwu"
      },
      taskPlayer: {
        waiting: "texture/task/task_waiting_bg",
        pending: "texture/task/task_success_bg",
        success: "texture/task/task_success_bg",
        fail: "texture/task/task_fail_bg"
      },
      stage_sign_url: {
        learning: "texture/stage_icon/icon_learning",
        regular: "texture/stage_icon/icon_regular",
        advanced: "texture/stage_icon/icon_advanced"
      },
      pop_up: {
        fail: "texture/pop_up/fail",
        success: "texture/pop_up/success",
        victory_good: "texture/pop_up/victory_good",
        victory_bad: "texture/pop_up/victory_bad",
        text_kill_target: "texture/pop_up/text_kill_target",
        text_youxia_kill: "texture/pop_up/text_youxia_kill",
        text_assassin_kill: "texture/pop_up/text_assassin_kill",
        team_fail: "texture/pop_up/team/team_failure",
        team_success: "texture/pop_up/team/team_success",
        task_fail: "texture/pop_up/task/task_failure",
        task_success: "texture/pop_up/task/task_success"
      },
      help: {
        101: "texture/help/help_xianzhi",
        102: "texture/help/help_shengqi",
        103: "texture/help/help_zhongchen",
        104: "texture/help/help_youxia",
        105: "texture/help/help_moshushi",
        106: "texture/help/help_jianchaguan",
        201: "texture/help/help_monv",
        202: "texture/help/help_heilaoda",
        203: "texture/help/help_cike",
        204: "texture/help/help_zhaoya",
        205: "texture/help/help_huaibaichi",
        206: "texture/help/help_nvwu"
      },
      card_A: {
        101: "texture/card/card_xianzhi_A",
        102: "texture/card/card_shengqi_A",
        103: "texture/card/card_zhongchen_A",
        104: "texture/card/card_youxia_A",
        105: "texture/card/card_moshushi_A",
        106: "texture/card/card_jianchaguan_A",
        201: "texture/card/card_monv_A",
        202: "texture/card/card_heilaoda_A",
        203: "texture/card/card_cike_A",
        204: "texture/card/card_zhaoya_A",
        205: "texture/card/card_huaibaichi_A",
        206: "texture/card/card_nvwu_A"
      },
      card_B: {
        101: "texture/card/card_xianzhi_B",
        102: "texture/card/card_shengqi_B",
        103: "texture/card/card_zhongchen_B",
        104: "texture/card/card_youxia_B",
        105: "texture/card/card_moshushi_B",
        106: "texture/card/card_jianchaguan_B",
        201: "texture/card/card_monv_B",
        202: "texture/card/card_heilaoda_B",
        203: "texture/card/card_cike_B",
        204: "texture/card/card_zhaoya_B",
        205: "texture/card/card_huaibaichi_B",
        206: "texture/card/card_nvwu_B"
      }
    };
    Config.rolesNum = {
      5: {
        101: 1,
        102: 1,
        103: 1,
        104: 0,
        105: 0,
        106: 0,
        201: 1,
        202: 0,
        203: 1,
        204: 0,
        205: 0,
        206: 0
      },
      6: {
        101: 1,
        102: 1,
        103: 2,
        104: 0,
        105: 0,
        106: 0,
        201: 1,
        202: 0,
        203: 1,
        204: 0,
        205: 0,
        206: 0
      },
      7: {
        101: 1,
        102: 1,
        103: 2,
        104: 0,
        105: 0,
        106: 0,
        201: 1,
        202: 0,
        203: 1,
        204: 0,
        205: 0,
        206: 0
      },
      8: {
        101: 1,
        102: 1,
        103: 3,
        104: 0,
        105: 0,
        106: 0,
        201: 1,
        202: 0,
        203: 1,
        204: 1,
        205: 0,
        206: 0
      },
      9: {
        101: 1,
        102: 1,
        103: 4,
        104: 0,
        105: 0,
        106: 0,
        201: 1,
        202: 1,
        203: 1,
        204: 0,
        205: 0,
        206: 0
      },
      10: {
        101: 1,
        102: 1,
        103: 4,
        104: 0,
        105: 0,
        106: 0,
        201: 1,
        202: 1,
        203: 1,
        204: 0,
        205: 0,
        206: 0
      },
      11: {
        101: 1,
        102: 1,
        103: 1,
        104: 1,
        105: 0,
        106: 0,
        201: 1,
        202: 1,
        203: 1,
        204: 0,
        205: 1,
        206: 0
      },
      12: {
        101: 1,
        102: 1,
        103: 1,
        104: 1,
        105: 0,
        106: 0,
        201: 1,
        202: 1,
        203: 1,
        204: 1,
        205: 1,
        206: 0
      },
      13: {
        101: 1,
        102: 1,
        103: 1,
        104: 1,
        105: 1,
        106: 1,
        201: 1,
        202: 1,
        203: 1,
        204: 0,
        205: 1,
        206: 1
      },
      14: {
        101: 1,
        102: 1,
        103: 1,
        104: 1,
        105: 1,
        106: 1,
        201: 1,
        202: 1,
        203: 1,
        204: 1,
        205: 1,
        206: 1
      }
    };
    Config.rolesName = {
      101: "\u5148\u77e5",
      102: "\u5723\u9a91",
      103: "\u5fe0\u81e3",
      104: "\u6e38\u4fa0",
      105: "\u9b54\u672f\u5e08",
      106: "\u68c0\u5bdf\u5b98",
      201: "\u9b54\u5973",
      202: "\u9ed1\u8001\u5927",
      203: "\u523a\u5ba2",
      204: "\u722a\u7259",
      205: "\u574f\u767d\u75f4",
      206: "\u95f4\u8c0d"
    };
    Config.watchRoles = {
      101: {
        see: [],
        notSee: [ "102", "103", "104", "105", "106" ],
        notSure: [ "201", "202", "203", "204", "205" ]
      },
      102: {
        see: [],
        notSee: [ "103", "104", "105", "106", "202", "203", "204", "205", "206" ],
        notSure: [ "101", "201" ]
      },
      103: {
        see: [],
        notSee: [ "101", "102", "103", "104", "105", "106", "201", "202", "203", "204", "205", "206" ],
        notSure: []
      },
      104: {
        see: [],
        notSee: [ "101", "102", "103", "105", "106", "201", "202", "203", "204", "205", "206" ],
        notSure: []
      },
      105: {
        see: [],
        notSee: [ "101", "102", "103", "104", "106", "201", "202", "203", "204", "205", "206" ],
        notSure: []
      },
      106: {
        see: [],
        notSee: [ "101", "102", "103", "104", "105", "201", "202", "203", "204", "205", "206" ],
        notSure: []
      },
      201: {
        see: [ "202", "203", "204" ],
        notSee: [ "101", "102", "103", "104", "105", "106", "205", "206" ],
        notSure: []
      },
      202: {
        see: [ "201", "203", "204" ],
        notSee: [ "101", "102", "103", "104", "105", "106", "205", "206" ],
        notSure: []
      },
      203: {
        see: [ "201" ],
        notSee: [ "101", "102", "103", "104", "105", "106", "202", "204", "205", "206" ],
        notSure: []
      },
      204: {
        see: [ "201", "202", "203" ],
        notSee: [ "101", "102", "103", "104", "105", "106", "202", "205", "206" ],
        notSure: []
      },
      205: {
        see: [],
        notSee: [ "101", "102", "103", "104", "105", "106", "201", "202", "203", "204", "206" ],
        notSure: []
      },
      206: {
        see: [ "201" ],
        notSee: [ "101", "102", "103", "104", "105", "106", "202", "203", "204", "205", "206" ],
        notSure: []
      }
    };
    Config.ipChange = [];
    Config.ipChange[Config.ipChange.length] = {
      ip: "127.0.0.1",
      port: 20001
    };
    Config.ipChange[Config.ipChange.length] = {
      ip: "47.104.214.17",
      port: 20003
    };
    Config.ipChange[Config.ipChange.length] = {
      ip: "47.104.214.17",
      port: 20004
    };
    Config.testRoomId = 8;
    Config.testRoomIdName = "testRoomId";
    Config.testUid = 100;
    Config.testUidName = "testUid";
    module.exports = Config;
    cc._RF.pop();
  }, {} ],
  DataManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc8bekxX7pNF5nQKcNjiGcx", "DataManager");
    "use strict";
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    cc.Class({
      properties: _defineProperty({
        GameData_Round: 0
      }, "GameData_Round", 0),
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  GameScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca29efH6apPN4Ad+vvCj+wl", "GameScene");
    "use strict";
    var _cc$Class;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    var PanelMsg = require("PanelMsg");
    cc.Class((_cc$Class = {
      extends: cc.Component,
      properties: {
        seat: cc.Prefab,
        mainView: cc.Node,
        header: cc.Sprite,
        oneSeatMarginHeight: 200,
        bottomUI: cc.Node,
        login_View: cc.Node,
        chat_View: cc.Node,
        pop_View: cc.Node,
        countDownLabel: {
          default: null,
          type: cc.Label
        },
        btn_recoder: cc.Button
      },
      initListeners: function initListeners() {
        window.message.add(window.SC.PEOPLE_JOIN_HOUSE, this);
        window.message.add(window.SC.PEOPLE_READY_HOUSE, this);
        window.message.add(window.SC.QUERY_PLAYERMSG, this);
        window.message.add(window.SC.SYSTEM_LOG, this);
        window.message.add(window.SC.PUSH_CARD, this);
        window.message.add(window.SC.CHAT_START, this);
        window.message.add(window.SC.TAKE_TEAM, this);
        window.message.add(window.SC.INFORM_VOTE, this);
        window.message.add(window.SC.VOTE_RESULT, this);
        window.message.add(window.SC.ACTIVE_KILL, this);
        window.message.add(window.SC.THUG_KILL_RESULT, this);
        window.message.add(window.SC.GAME_END, this);
        window.message.add(window.SC.TASK_VOTE, this);
        window.message.add(window.SC.TASK_RESULT, this);
        window.message.add(window.SC.LEAVE_HOUSE, this);
        window.message.add(window.SC.PEOPLE_LEAVE_HOUSE, this);
        window.message.add(window.SC.SYN_MESSAGE, this);
        window.message.add(window.SC.RECORDER, this);
        window.message.add(window.SC.BROAD_MESSAGE, this);
        window.message.add(window.SC.APPLY_PLAYER_INFO, this);
      },
      removeListeners: function removeListeners() {
        window.message.remove(window.SC.PEOPLE_JOIN_HOUSE, this);
        window.message.remove(window.SC.PEOPLE_READY_HOUSE, this);
        window.message.remove(window.SC.QUERY_PLAYERMSG, this);
        window.message.remove(window.SC.SYSTEM_LOG, this);
        window.message.remove(window.SC.PUSH_CARD, this);
        window.message.remove(window.SC.CHAT_START, this);
        window.message.remove(window.SC.TAKE_TEAM, this);
        window.message.remove(window.SC.INFORM_VOTE, this);
        window.message.remove(window.SC.VOTE_RESULT, this);
        window.message.remove(window.SC.ACTIVE_KILL, this);
        window.message.remove(window.SC.THUG_KILL_RESULT, this);
        window.message.remove(window.SC.GAME_END, this);
        window.message.remove(window.SC.TASK_VOTE, this);
        window.message.remove(window.SC.TASK_RESULT, this);
        window.message.remove(window.SC.LEAVE_HOUSE, this);
        window.message.remove(window.SC.PEOPLE_LEAVE_HOUSE, this);
        window.message.remove(window.SC.SYN_MESSAGE, this);
        window.message.remove(window.SC.RECORDER, this);
        window.message.remove(window.SC.BROAD_MESSAGE, this);
        window.message.remove(window.SC.APPLY_PLAYER_INFO, this);
      },
      recvMsg: function recvMsg(cmd, data) {
        var _this = this;
        PanelMsg.addItemMsg(cmd, data.data);
        switch (cmd) {
         case window.SC.PEOPLE_JOIN_HOUSE:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.setSeatsInfo(data.data.players, data.data.ownerUid, data.data.vacantSeatArr);
          break;

         case window.SC.PEOPLE_READY_HOUSE:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          var seat = Utils.gameInfo.playerUid_SeatList[data.data.uid];
          data.data.ready ? seat.showReady() : seat.hideReady();
          seat.updatePlayerInfo_Ready(data.data.ready);
          break;

         case window.SC.SYSTEM_LOG:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          break;

         case window.SC.QUERY_PLAYERMSG:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          var playerInfo = Utils.gameInfo.playerUid_SeatList[data.data.queryUid].seatInfo.playerInfo;
          playerInfo.level = data.data.lv;
          playerInfo.innings = data.data.countTotal;
          0 == data.data.countTotal ? playerInfo.rate = 0 : playerInfo.rate = data.data.countWin / data.data.countTotal;
          this.popUIScript.showPlayerInfo(playerInfo);
          break;

         case window.SC.PUSH_CARD:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.pushCardFunc(data.data);
          break;

         case window.SC.SYN_MESSAGE:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.recvSynMessageFunc(data);
          break;

         case window.SC.CHAT_START:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          var timeTotal = data.data.timeTotal;
          var leaderUid = data.data.leaderUid;
          var speakUid = data.data.speakUid;
          var endTime = data.data.timeEnd;
          this.startPlayersTeamLeaderAndSpeaking(timeTotal, leaderUid, speakUid, endTime);
          break;

         case window.SC.TAKE_TEAM:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          var _timeTotal = data.data.timeTotal;
          var _leaderUid = data.data.leaderUid;
          var _endTime = data.data.timeEnd;
          this.startPlayersTeamLeaderAndSpeaking(_timeTotal, _leaderUid, _leaderUid, _endTime);
          this.chooseLeagueNum = 0;
          if (this.lastTeamLeaderUid == Utils.gameInfo.selfInfo.uid) {
            this.bottomUIScript.setUI().take_team_start();
            this.setChooseLeague();
          }
          break;

         case window.SC.INFORM_VOTE:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.startCountdown(data.data.timeTotal, data.data.timeEnd);
          this.hideLastPlayerSpeaking();
          this.chooseTaskPlayer_UidArr = data.data.memberUids;
          this.setPlayersTeamLeader(data.data.leaderUid);
          this.showTeamMember();
          if (this.lastTeamLeaderUid == Utils.gameInfo.selfInfo.uid) {
            this.hideChooseLeague();
            this.bottomUIScript.setUI().take_team_end();
          }
          this.bottomUIScript.setUI().inform_vote_start();
          break;

         case window.SC.VOTE_RESULT:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          if (0 == data.data.result) {
            this.hideTeamMember();
            AudioManager.playEffect(Config.AudioList.team_fail);
          } else AudioManager.playEffect(Config.AudioList.team_win);
          this.bottomUIScript.setUI().inform_vote_end();
          break;

         case window.SC.TASK_VOTE:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.startCountdown(data.data.timeTotal, data.data.timeEnd);
          this.setPlayersTeamLeader(data.data.leaderUid);
          this.chooseTaskPlayer_UidArr = data.data.memberUids;
          this.showTeamMember();
          var index = data.data.memberUids.indexOf(Utils.gameInfo.selfInfo.uid);
          if (-1 != index) {
            this.bottomUIScript.setUI().task_vote_start();
            -1 != Config.goodRole.indexOf(Utils.gameInfo.selfInfo.role) ? this.bottomUIScript.setDestroyBtnEnable(false) : this.bottomUIScript.setDestroyBtnEnable(true);
          }
          break;

         case window.SC.TASK_RESULT:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.setTaskStatus(Utils.gameInfo.roomInfo.curGameRound, data.data.result);
          this.bottomUIScript.setUI().task_vote_end();
          this.hideTeamMember();
          Utils.gameInfo.roomInfo.curGameRound++;
          break;

         case window.SC.ACTIVE_KILL:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.startCountdown(data.data.timeTotal, data.data.timeEnd);
          this.recvActiveKillFunc(data);
          break;

         case window.SC.THUG_KILL_RESULT:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          this.isKill = false;
          if (Utils.gameInfo.selfInfo.role == Config.roleIdConfig.thug || Utils.gameInfo.selfInfo.role == Config.roleIdConfig.hunter) {
            this.hideChooseLeague();
            if (Utils.gameInfo.selfInfo.role == Config.roleIdConfig.thug) {
              this.bottomUIScript.setUI().thug_kill_end();
              AudioManager.playEffect(Config.AudioList.thugkill);
              AnimationManager.getInstance().playAnimation(Config.AnimationList.thug, this.node, 12, 0, 0, 2.5, 2.5);
            } else this.bottomUIScript.setUI().active_kill_end();
          }
          0 != data.data.toUid && AnimationManager.getInstance().playAnimation(Config.AnimationList.target, Utils.gameInfo.playerUid_SeatList[data.data.toUid].node, 6);
          break;

         case window.SC.GAME_END:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          Utils.gameInfo.gameState = "ready";
          this.gameEndData = {};
          this.gameEndData = data.data.all;
          var arr = this.getDistributCampByRole_UidArr(this.gameEndData);
          var camp = Utils.judgePlayerisGoodCampByRole(Utils.gameInfo.selfInfo.role);
          var isgoodwin = false;
          100 == data.data.winning && (isgoodwin = true);
          setTimeout(function() {
            camp && isgoodwin ? AudioManager.playEffect(Config.AudioList.game_win) : AudioManager.playEffect(Config.AudioList.game_fail);
            _this.popUIScript.showLayer_GameEnd(arr[0], arr[1], isgoodwin);
            _this.popUIScript.showFinalResult(true);
            _this.resetPlayersSeatAndData();
          }, 2e3);
          break;

         case window.SC.LEAVE_HOUSE:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          JsbManager.quitRoom(Utils.gameInfo.roomInfo.roomId);
          this.login_View.active = true;
          this.popUIScript.hideExitPrompt();
          this.chatUIScript.reset();
          Utils.gameInfo.gameState = "ready";
          this.initData();
          Utils.gameInfo.allSeatsNode.forEach(function(seat) {
            seat.resetSeat();
          });
          this.headerUIScript.resetTaskStatus();
          this.node.active = false;
          break;

         case window.SC.PEOPLE_LEAVE_HOUSE:
          if (data.errMsg && data.errCode) {
            cc.log(data.errMsg);
            return;
          }
          if ("playing" != Utils.gameInfo.gameState) {
            Utils.gameInfo.playerUid_SeatList[data.data.uid].resetSeat();
            this.setPlayersMaster(data.data.ownerUid);
            delete Utils.gameInfo.playerUid_SeatList[data.data.uid];
          }
          break;

         case window.SC.RECORDER:
          this.popUIScript.showRecorder(data.data);
          break;

         case window.SC.BROAD_MESSAGE:
          0 == data.data.type ? Utils.gameInfo.selfInfo.uid != data.data.uid && Utils.gameInfo.playerUid_SeatList[data.data.uid].showSpeaking(false) : 1 == data.data.type && Utils.gameInfo.playerUid_SeatList[data.data.uid].hideSpeaking();
          break;

         case window.SC.RECORDER:
          this.popUIScript.showRecorder(data.data);
          break;

         case window.SC.APPLY_PLAYER_INFO:
          cc.log("==APPLY_PLAYER_INFO==1=", data);
          var ownerUid = data.data.ownerUid;
          if (ownerUid === Utils.gameInfo.selfInfo.uid) {
            this.bottomUIScript.btn_applyList.node.active = true;
            data.data.applicantList.length > 0 && (this.bottomUIScript.btn_applyList.node.getChildByName("redpoint").active = true);
            this.applicantList = data.data.applicantList;
          } else this.bottomUIScript.btn_applyList.node.active = false;
        }
      },
      onLoad: function onLoad() {
        this.initListeners();
        this.initData();
        this.createSeats(Config.houseNumMax);
        this.headerUIScript = this.header.getComponent("header");
        this.bottomUI.active = true;
        this.bottomUIScript = this.bottomUI.getComponent("bottom");
        this.chatUIScript = this.chat_View.getComponent("ChatView");
        this.popUIScript = this.pop_View.getComponent("Pop_up");
        this.bottomUIScript.btn_applyList.node.active = Utils.gameInfo.selfInfo.uid === Utils.gameInfo.selfInfo.uid;
      },
      initData: function initData() {
        this.intervalTime = 1;
        this.curCountDownTime = 0;
        this.totalCountDownTime = 0;
        this.countDownCtrl = false;
        this.lastTeamLeader = null;
        this.lastTeamLeaderUid = -1;
        this.lastPlayerSpeaking = null;
        this.lastPlayerSpeakingUid = -1;
        this.chooseLeagueNum = 0;
        this.chooseTaskPlayer_UidArr = [];
        this.chooseKillPlayer_LimitUidArr = [];
        this.chooseKillPlayer_UidArr = [];
        this.thugToUid = -1;
        this.searcherSkill = 1;
        this.magicToUid = -1;
        this.isKill = false;
        Utils.gameInfo.selfInfo.role = "";
        Utils.gameInfo.roomInfo.curGameRound = 1;
        Utils.gameInfo.roomInfo.ownerHouseUid = -1;
        this.applicantList = [];
      },
      update: function update(dt) {
        if (this.countDownCtrl) if (this.intervalTime >= 0) this.intervalTime -= dt; else {
          this.intervalTime = 1;
          this.countDownShow();
        }
      },
      countDownShow: function countDownShow() {
        var cb = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        this.curCountDownTime = this.curCountDownTime - this.intervalTime;
        this.countDownLabel.string = String(this.curCountDownTime);
        if (this.curCountDownTime <= 0) {
          this.countDownCtrl = false;
          this.countDownLabel.node.active = false;
          cb && cb();
        }
      },
      startCountdown: function startCountdown(totalTime, endTime) {
        this.curCountDownTime = this.countDateDif(endTime);
        this.countDownCtrl = true;
        this.totalCountDownTime = totalTime;
        this.countDownLabel.string = String(this.curCountDownTime);
        this.countDownLabel.node.active = true;
      },
      countDateDif: function countDateDif(endTime) {
        var curTime = new Date().valueOf();
        if (curTime >= endTime) return 0;
        var realTime = endTime - curTime;
        this.intervalTime = realTime / 1e3 % 1;
        return Math.ceil(realTime / 1e3);
      },
      getMainViewHeight: function getMainViewHeight() {
        return .94 * cc.winSize.height - this.header.node.height;
      },
      createSeats: function createSeats() {
        var seat_num = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5;
        var that = this;
        Utils.gameInfo.allSeatsNode = [];
        var mainView_height = this.getMainViewHeight();
        var allSeatsHeight = .8 * mainView_height;
        var needSeatNum = seat_num % 2 == 0 ? seat_num : seat_num + 1;
        var seatAverageHeight = allSeatsHeight / (needSeatNum / 2);
        var scale_num = needSeatNum / 2 * this.oneSeatMarginHeight > allSeatsHeight ? allSeatsHeight / (needSeatNum / 2 * this.oneSeatMarginHeight) : 1;
        for (var i = 0; i < needSeatNum; i++) {
          var newSeat = cc.instantiate(this.seat);
          var newSeatNode = newSeat.getComponent("seat");
          Utils.gameInfo.allSeatsNode.push(newSeatNode);
          var leftMaxNum = Math.ceil(seat_num / 2);
          var seatInfo = {
            hasPlayer: false
          };
          seatInfo.seat_id = i + 1;
          seatInfo.side = i < leftMaxNum ? "left" : "right";
          seatInfo.isLock = 5 == i && 5 == seat_num;
          seatInfo.position = {
            x: i < leftMaxNum ? -this.mainView.width / 2 + 80 : this.mainView.width / 2 - 80,
            y: mainView_height / 2 - newSeat.height / 2 - .02 * mainView_height - seatAverageHeight * (i % (needSeatNum / 2))
          };
          seatInfo.scale = scale_num;
          newSeatNode.initSeat(seatInfo, that);
          this.mainView.addChild(newSeat);
        }
      },
      setSeatsInfo: function setSeatsInfo(playersInfo, ownerUid) {
        var vacantSeatArr = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        Config.playersNum = playersInfo.length;
        Utils.gameInfo.roomInfo.ownerHouseUid = ownerUid;
        Utils.gameInfo.playerUid_SeatList = {};
        vacantSeatArr.forEach(function(pos) {
          Utils.gameInfo.allSeatsNode[pos - 1].hasOwnProperty("seatInfo") && Utils.gameInfo.allSeatsNode[pos - 1].seatInfo.hasOwnProperty("seat_uid") && Utils.gameInfo.allSeatsNode[pos - 1].resetSeat();
        });
        var isReady = false;
        playersInfo.forEach(function(item) {
          var pos = parseInt(item.pos);
          Utils.gameInfo.allSeatsNode[pos - 1].setData(item);
          Utils.gameInfo.playerUid_SeatList[item.uid] = Utils.gameInfo.allSeatsNode[pos - 1];
          item.uid == Utils.gameInfo.selfInfo.uid && (isReady = item.ready);
        });
        var isMaster = ownerUid == Utils.gameInfo.selfInfo.uid;
        this.bottomUIScript.showMasterOrReady(isMaster, isReady);
      },
      qureyPlayerMsgFunc: function qureyPlayerMsgFunc(touchUid) {
        var data = {
          queryUid: touchUid,
          gameId: Config.gameId
        };
        window.message.send(window.CS.QUERY_PLAYERMSG, data, true);
      },
      callBackSeatInfo: function callBackSeatInfo(seatInfo) {
        if (seatInfo.isLock) console.log("\u9501\u5b9a\u7684\u5ea7\u4f4d"); else if (seatInfo.hasPlayer) {
          console.log("\u663e\u793a\u5ea7\u4f4d\u4fe1\u606f");
          this.qureyPlayerMsgFunc(seatInfo.playerInfo.uid);
        } else console.log("\u5ea7\u4f4d\u53ef\u4ee5\u5207\u6362");
      },
      leaveBtnFunc: function leaveBtnFunc() {
        this.popUIScript.showExitPrompt();
      },
      updateUserInfo: function updateUserInfo(data) {
        Utils.gameInfo.roomInfo.roomId = String(data.data.roomInfo.roomId);
        Utils.gameInfo.roomInfo.ownerHouseUid = data.data.roomInfo.ownerUid;
        JsbManager.enterRoom(Utils.gameInfo.roomInfo.roomId, Utils.gameInfo.selfInfo.uid);
        this.setSeatsInfo(data.data.roomInfo.players, data.data.roomInfo.ownerUid);
        var isOwnerHouse = Utils.gameInfo.roomInfo.ownerHouseUid == Utils.gameInfo.selfInfo.uid;
        "ready" == Utils.gameInfo.gameState && this.bottomUIScript.showMasterOrReady(isOwnerHouse, Utils.gameInfo.playerUid_SeatList[Utils.gameInfo.selfInfo.uid].seatInfo.playerInfo.ready);
        this.headerUIScript.showUI();
      },
      resetPlayersSeatAndData: function resetPlayersSeatAndData() {
        var _this2 = this;
        Utils.gameInfo.allSeatsNode.forEach(function(seat) {
          if (!seat.seatInfo.seat_uid) return;
          var isMaster = seat.seatInfo.seat_uid == Utils.gameInfo.roomInfo.ownerHouseUid;
          if (seat.seatInfo.seat_uid == Utils.gameInfo.selfInfo.uid) {
            var isReady = seat.getPlayerInfo_Ready();
            _this2.bottomUIScript.showMasterOrReady(isMaster, isReady);
          }
          seat.hideTeamLeader();
          seat.hideMark();
          seat.hideSpeaking();
        });
        this.headerUIScript.showUI();
        this.headerUIScript.resetTaskStatus();
        this.initData();
        this.countDownLabel.node.active = false;
      },
      getRoleByUid: function getRoleByUid(uid, playerRole_UidList) {
        for (var roleId in playerRole_UidList) for (var i = 0; i < playerRole_UidList[roleId].length; i++) {
          var userUid = playerRole_UidList[roleId][i];
          if (userUid == uid) return roleId;
        }
        cc.error("\u672a\u627e\u5230Uid\uff1a" + uid + " \u5bf9\u5e94\u89d2\u8272roleId");
      },
      setPlayersRole: function setPlayersRole() {
        var _this3 = this;
        Utils.gameInfo.selfInfo.role = this.getRoleByUid(Utils.gameInfo.selfInfo.uid, Utils.gameInfo.playerRole_UidList);
        var roleSkill = Config.roleIdByVisibleConfig[Utils.gameInfo.selfInfo.role];
        Utils.gameInfo.allSeatsNode.forEach(function(seat) {
          if (!seat.seatInfo.seat_uid) return;
          var role = _this3.getRoleByUid(seat.seatInfo.seat_uid, Utils.gameInfo.playerRole_UidList);
          seat.seatInfo.seat_roleId = role;
          if (seat.seatInfo.seat_uid == Utils.gameInfo.selfInfo.uid) {
            seat.setMark(role);
            seat.showArrow();
          } else {
            seat.seatInfo.seat_roleId = role;
            var index = roleSkill.indexOf(Number(role));
            -1 != index ? Utils.gameInfo.selfInfo.role != Config.roleIdConfig.holy ? seat.setMark(role) : seat.setMark("notSure") : seat.setMark();
          }
        });
      },
      setPlayersTeamLeader: function setPlayersTeamLeader(leader_uid) {
        if (this.lastTeamLeaderUid != leader_uid) {
          this.lastTeamLeaderUid = leader_uid;
          this.lastTeamLeader && this.lastTeamLeader.hideTeamLeader();
          this.lastTeamLeader = Utils.gameInfo.playerUid_SeatList[leader_uid];
          this.lastTeamLeader.showTeamLeader();
        }
      },
      setPlayersMaster: function setPlayersMaster(ownerUid) {
        Utils.gameInfo.roomInfo.ownerHouseUid = ownerUid;
        Utils.gameInfo.playerUid_SeatList[ownerUid].showMaster();
        ownerUid == Utils.gameInfo.selfInfo.uid && this.bottomUIScript.setUI().ready_master();
      },
      setSingleSpeaking: function setSingleSpeaking(speaking_uid) {
        var isOnlyChat = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var selfSpeaking = speaking_uid == Utils.gameInfo.selfInfo.uid;
        selfSpeaking && (isOnlyChat ? this.bottomUIScript.setUI().only_chat() : this.bottomUIScript.setUI().chat_start());
        this.bottomUIScript.setMicBtnEnable(selfSpeaking);
        Utils.gameInfo.playerUid_SeatList[speaking_uid].showSpeaking(selfSpeaking, this.totalCountDownTime, 1e3 * this.curCountDownTime);
      },
      setTurnsSpeaking: function setTurnsSpeaking(speaking_uid) {
        var selfSpeaking = speaking_uid == Utils.gameInfo.selfInfo.uid;
        selfSpeaking ? this.bottomUIScript.setUI().chat_start() : this.bottomUIScript.setUI().chat_end();
        this.bottomUIScript.setMicBtnEnable(selfSpeaking);
        if (this.lastPlayerSpeakingUid != speaking_uid) {
          this.lastPlayerSpeakingUid = speaking_uid;
          this.lastPlayerSpeaking && this.lastPlayerSpeaking.hideSpeaking();
          this.lastPlayerSpeaking = Utils.gameInfo.playerUid_SeatList[speaking_uid];
          this.lastPlayerSpeaking.showSpeaking(selfSpeaking, this.totalCountDownTime, 1e3 * this.curCountDownTime);
        }
      },
      hideLastPlayerSpeaking: function hideLastPlayerSpeaking() {
        this.lastPlayerSpeaking && this.lastPlayerSpeaking.hideSpeaking();
      },
      startPlayersTeamLeaderAndSpeaking: function startPlayersTeamLeaderAndSpeaking(timeTotal, leaderUid, speakUid, endTime) {
        this.startCountdown(timeTotal, endTime);
        this.setPlayersTeamLeader(leaderUid);
        this.setTurnsSpeaking(speakUid);
      },
      setChooseLeague: function setChooseLeague() {
        Utils.gameInfo.allSeatsNode.forEach(function(seat) {
          if (!seat.seatInfo.seat_uid) return;
          seat.showChooseLeague();
        });
      },
      checkChooseLeaguaLimit: function checkChooseLeaguaLimit(choosePlayer_UidArr) {
        var _this4 = this;
        var isActiveKill = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var chooseLeagueMax = 0;
        chooseLeagueMax = isActiveKill ? 1 : Config.ruleConfig[String(Config.playersNum)].pickMember[Utils.gameInfo.roomInfo.curGameRound - 1];
        this.chooseLeagueNum >= chooseLeagueMax ? Utils.gameInfo.allSeatsNode.forEach(function(seat) {
          if (!seat.seatInfo.seat_uid) return;
          -1 == choosePlayer_UidArr.indexOf(seat.seatInfo.seat_uid) && seat.hideChooseLeague();
        }) : Utils.gameInfo.allSeatsNode.forEach(function(seat) {
          if (!seat.seatInfo.seat_uid) return;
          isActiveKill ? -1 != _this4.chooseKillPlayer_LimitUidArr.indexOf(seat.seatInfo.seat_uid) && seat.showChooseLeague() : -1 == choosePlayer_UidArr.indexOf(seat.seatInfo.seat_uid) && seat.showChooseLeague();
        });
      },
      hideChooseLeague: function hideChooseLeague() {
        Utils.gameInfo.allSeatsNode.forEach(function(seat) {
          seat.hideChooseLeague();
        });
      },
      showTeamMember: function showTeamMember() {
        this.chooseTaskPlayer_UidArr.forEach(function(uid) {
          Utils.gameInfo.playerUid_SeatList[String(uid)].showTeamMember();
        });
      },
      hideTeamMember: function hideTeamMember() {
        this.chooseTaskPlayer_UidArr.forEach(function(uid) {
          Utils.gameInfo.playerUid_SeatList[String(uid)].hideTeamMember();
        });
        this.chooseTaskPlayer_UidArr = [];
      },
      judgeVoteRole_Magic: function judgeVoteRole_Magic(doubleCount) {
        Utils.gameInfo.selfInfo.role == Config.roleIdConfig.magic && 0 == doubleCount;
      },
      magicSkillFunc: function magicSkillFunc() {
        var data = {
          toUid: this.magicToUid,
          fromUid: Utils.gameInfo.selfInfo.uid,
          role: Number(Config.roleIdConfig.magic)
        };
        window.message.send(window.CS.MAGICIAN_SKILL, data, true);
      },
      judgeVoteRole_Searcher: function judgeVoteRole_Searcher(discardCount) {
        Utils.gameInfo.selfInfo.role == Config.roleIdConfig.searcher && (0 == discardCount || (this.searcherSkill = 1));
      },
      searcherSkillFunc: function searcherSkillFunc() {
        this.searcherSkill = 2;
      },
      getDistributCampByRole_UidArr: function getDistributCampByRole_UidArr(playerRole_UidList) {
        var playerArr = [];
        var goodArr = [];
        var badArr = [];
        for (var roleId in playerRole_UidList) if (Number(roleId) < 200) for (var i = 0; i < playerRole_UidList[roleId].length; i++) goodArr.push(Utils.gameInfo.playerUid_SeatList[playerRole_UidList[roleId][i]]); else for (var _i = 0; _i < playerRole_UidList[roleId].length; _i++) badArr.push(Utils.gameInfo.playerUid_SeatList[playerRole_UidList[roleId][_i]]);
        playerArr.push(goodArr);
        playerArr.push(badArr);
        return playerArr;
      },
      hideMasterOrReady: function hideMasterOrReady() {
        Utils.gameInfo.allSeatsNode.forEach(function(seat) {
          seat.hideMasterOrReady();
        });
      },
      setTaskStatus: function setTaskStatus(round, result) {
        0 == result ? this.headerUIScript.setTaskStatus(round, "fail") : this.headerUIScript.setTaskStatus(round, "success");
      },
      pushCardFunc: function pushCardFunc(Role_UidList) {
        Utils.gameInfo.gameState = "playing";
        this.headerUIScript.showUI();
        this.headerUIScript.setTaskPlayer(Config.ruleConfig[String(Config.playersNum)].pickMember);
        Utils.gameInfo.playerRole_UidList = Role_UidList;
        this.setPlayersRole();
        this.hideMasterOrReady();
        this.bottomUIScript.setUI().push_card();
      },
      recvActiveKillFunc: function recvActiveKillFunc(data) {
        var _this5 = this;
        this.isKill = true;
        this.chooseLeagueNum = 0;
        this.chooseKillPlayer_LimitUidArr = [];
        var isSelf = data.data.fromUid == Utils.gameInfo.selfInfo.uid;
        for (var roleId in data.data.allRole) for (var i = 0; i < data.data.allRole[roleId].length; i++) {
          var userUid = data.data.allRole[roleId][i];
          Utils.gameInfo.playerUid_SeatList[userUid].setMark(roleId);
          this.setSingleSpeaking(userUid, true);
        }
        var killType = 0;
        if (isSelf) {
          if (Utils.gameInfo.selfInfo.role == Config.roleIdConfig.thug) this.bottomUIScript.setUI().thug_kill_start(); else {
            this.bottomUIScript.setUI().active_kill_start();
            killType = 1;
          }
          Utils.gameInfo.allSeatsNode.forEach(function(seat) {
            if (!seat.seatInfo.seat_uid || seat.seatInfo.seat_uid == Utils.gameInfo.selfInfo.uid || Utils.gameInfo.playerRole_UidList[Config.roleIdConfig.witch] == seat.seatInfo.seat_uid) return;
            seat.showChooseLeague();
            _this5.chooseKillPlayer_LimitUidArr.push(seat.seatInfo.seat_uid);
          });
        }
        this.popUIScript.showText(killType);
      },
      recvSynMessageFunc: function recvSynMessageFunc(data) {
        cc.log("roomId: " + Utils.gameInfo.roomInfo.roomId);
        cc.log("uid: " + Utils.gameInfo.selfInfo.uid);
        var msgCode = data.data.roundInfo.stateCode;
        if (0 != msgCode) {
          Utils.gameInfo.roomInfo.curGameRound = data.data.roundInfo.tasks.length + 1;
          this.pushCardFunc(data.data.roundInfo.allRole);
          for (var index = 0; index < data.data.roundInfo.tasks.length; index++) {
            var element = data.data.roundInfo.tasks[index];
            var round = index + 1;
            this.setTaskStatus(round, element);
          }
          Utils.msgData.code = msgCode;
          Utils.msgData.data = data.data.roundInfo.stateMsg;
          window.message.send(Utils.msgData.code, Utils.msgData, false);
        }
      }
    }, _defineProperty(_cc$Class, "hideLastPlayerSpeaking", function hideLastPlayerSpeaking() {
      this.lastPlayerSpeaking && this.lastPlayerSpeaking.hideSpeaking();
    }), _defineProperty(_cc$Class, "showRecoder", function showRecoder() {
      window.message.send(CS.RECORDER, {}, true);
    }), _defineProperty(_cc$Class, "broadMessage", function broadMessage(_type) {
      var _txt = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
      var data = {};
      data.code = SC.BROAD_MESSAGE;
      data.data = {
        type: _type,
        uid: Utils.gameInfo.selfInfo.uid,
        txt: _txt || ""
      };
      window.message.send(CS.USER_TEST, data, true);
    }), _cc$Class));
    cc._RF.pop();
  }, {
    PanelMsg: "PanelMsg"
  } ],
  HallScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HallScene");
    "use strict";
    var AudioManager = require("AudioManager");
    var HallScene = cc.Class({
      extends: cc.Component,
      properties: {
        roomid: null,
        _retryTime: 0,
        btn1: {
          default: null,
          type: cc.Button
        },
        btn2: {
          default: null,
          type: cc.Button
        },
        btn3: {
          default: null,
          type: cc.Button
        },
        btn4: {
          default: null,
          type: cc.Button
        },
        btn5: {
          default: null,
          type: cc.Button
        },
        btn6: {
          default: null,
          type: cc.Button
        },
        editBox1: {
          default: null,
          type: cc.EditBox
        },
        editBox2: {
          default: null,
          type: cc.EditBox
        },
        content_View: {
          default: null,
          type: cc.Node
        }
      },
      ctor: function ctor() {
        this.isPrivateRoom = false;
      },
      onLoad: function onLoad() {
        AudioManager.init();
        this.initListeners();
        var loadres = cc.find("Canvas/loading_view");
        loadres.active = true;
      },
      start: function start() {
        this.testFunc();
      },
      initListeners: function initListeners() {
        window.message.add(window.SC.LOGIN_GAME, this);
        window.message.add(window.SC.BUILD_HOUSE, this);
        window.message.add(window.SC.JOIN_HOUSE, this);
        window.message.add(window.SC.LEAVE_HOUSE, this);
        window.message.add(window.SC.PEOPLE_JOIN_HOUSE, this);
        window.message.add(window.SC.SYN_MESSAGE, this);
        window.message.add(window.SC.APPLY_ENTER_ROOM, this);
      },
      removeListeners: function removeListeners() {
        window.message.remove(window.SC.LOGIN_GAME, this);
        window.message.remove(window.SC.BUILD_HOUSE, this);
        window.message.remove(window.SC.JOIN_HOUSE, this);
        window.message.remove(window.SC.LEAVE_HOUSE, this);
        window.message.remove(window.SC.PEOPLE_JOIN_HOUSE, this);
        window.message.remove(window.SC.SYN_MESSAGE, this);
        window.message.remove(window.SC.APPLY_ENTER_ROOM, this);
      },
      recvMsg: function recvMsg(cmd, data) {
        switch (cmd) {
         case window.SC.LOGIN_GAME:
          Utils.gameInfo.selfInfo.uid = data.data.uid;
          break;

         case window.SC.BUILD_HOUSE:
          if (data.errMsg && data.errCode) return;
          this.roomid = data.data.roomId;
          Utils.gameInfo.roomInfo.roomId = data.data.roomId;
          break;

         case window.SC.JOIN_HOUSE:
          if (data.errMsg && data.errCode) return;
          break;

         case window.SC.LEAVE_HOUSE:
          break;

         case window.SC.PEOPLE_JOIN_HOUSE:
          if (data.errMsg && data.errCode) return;
          break;

         case window.SC.SYN_MESSAGE:
          if (data.errMsg && data.errCode) return;
          this.node.active = false;
          this.content_View.active = true;
          var contentViewScript = this.content_View.getComponent("GameScene");
          contentViewScript.updateUserInfo(data);
          contentViewScript.recvSynMessageFunc(data);
          break;

         case window.SC.APPLY_ENTER_ROOM:
          if (data.errMsg && data.errCode) return;
          if (2 === data.data.type) {
            Utils.showTip("\u60a8\u7684\u52a0\u5165\u623f\u95f4\u8bf7\u6c42\u540c\u610f!");
            window.message.send(window.CS.JOIN_HOUSE, {
              roomId: data.data.roomId
            }, true);
          } else 3 === data.data.type && Utils.showTip("\u60a8\u7684\u52a0\u5165\u623f\u95f4\u8bf7\u6c42\u88ab\u62d2\u7edd!");
        }
      },
      _connectSuccess: function _connectSuccess() {
        this._retryTime = 0;
        var data = {
          openid: Utils.gameInfo.selfInfo.uid,
          nickname: "\u8d26\u53f7\u540d\u5b57" + this.editBox1.string,
          sex: 0,
          headimgurl: "http://at2.jyimg.com/1f/58/2fbd1138f6ffe8ecb20d1a965291/2fbd1138f_2_avatar_p.jpg",
          os: cc.sys.os,
          version: "1.0.0"
        };
        window.message.send(window.CS.LOGIN_GAME, data, true);
      },
      _connectFailure: function _connectFailure() {
        Utils.gameInfo.selfInfo.uid = this.editBox1.string;
        this._retryTime++;
        if (this._retryTime < 3) {
          cc.log("\u7f51\u7edc\u8bbf\u95ee\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc");
          window.message.doConnect(this.ip, this.port, this._connectSuccess.bind(this), this._connectFailure.bind(this));
        }
      },
      send1: function send1() {
        this.ip = Config.ip;
        this.port = Config.port;
        Utils.gameInfo.selfInfo.uid = this.editBox1.string;
        if ("" == Utils.gameInfo.selfInfo.uid) {
          cc.log("\u8bf7\u8f93\u5165\u4e00\u4e2auid");
          return;
        }
        window.message.doConnect(this.ip, this.port, this._connectSuccess.bind(this), this._connectFailure.bind(this));
      },
      send2: function send2() {
        var data = {
          roomId: this.editBox2.string,
          gameId: Config.gameId,
          autoJoinRooom: true,
          autoJoinRoomUids: [ 333, 444, 555, 666 ],
          createChannel: 1,
          options: {
            name: "\u963f\u74e6\u9686",
            desp: "\u8fd9\u662f\u6e38\u620f\u7b80\u4ecb",
            taskTimeOut: 1e3,
            teamTimeOut: 1e3,
            killTimeOut: 1e3,
            selectMemberTimeOut: 1e3,
            speakTimeOut: 1e3,
            speed: 0,
            autoReady: true,
            maxPlayerCnt: Config.houseNumMax,
            minPlayerCnt: 5,
            privat: this.isPrivateRoom
          },
          clubInfo: {
            id: 111,
            name: "",
            head: ""
          },
          group: {
            id: 1,
            name: "\u521d\u7ea7\u573a"
          }
        };
        window.message.send(window.CS.BUILD_HOUSE, data, true);
      },
      send3: function send3() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        Utils.gameInfo.roomInfo.roomId = this.editBox2.string;
        window.message.send(window.CS.JOIN_HOUSE, data, true);
      },
      send4: function send4() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.DISMISS_HOUSE, data, true);
      },
      send5: function send5() {
        var data = {
          roomId: "" + this.editBox2.string,
          ready: true
        };
        window.message.send(window.CS.READY_HOUSE, data, true);
      },
      send6: function send6() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.LEAVE_HOUSE, data, true);
      },
      send7: function send7() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.START_HOUSE, data, true);
      },
      sendApply: function sendApply() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.APPLY_ENTER_ROOM, data, true);
      },
      setPrivateRoom: function setPrivateRoom(toggle) {
        cc.log(toggle);
        true === toggle.isChecked ? this.isPrivateRoom = true : this.isPrivateRoom = false;
      },
      testFunc: function testFunc() {
        if (cc.sys.localStorage.getItem(Config.testRoomIdName) && "" != cc.sys.localStorage.getItem(Config.testRoomIdName)) this.editBox2.string = cc.sys.localStorage.getItem(Config.testRoomIdName); else {
          cc.sys.localStorage.setItem(Config.testRoomIdName, Config.testRoomId);
          this.editBox2.string = String(Config.testRoomId);
        }
        cc.sys.localStorage.getItem(Config.testUidName) && "" != cc.sys.localStorage.getItem(Config.testUidName) || cc.sys.localStorage.setItem(Config.testUidName, Config.testUid);
        Config.testUid = cc.sys.localStorage.getItem(Config.testUidName);
        this.editBox1.string = String(Config.testUid);
        Config.testUid = Number(Config.testUid) + 1;
        cc.sys.localStorage.setItem(Config.testUidName, Config.testUid);
      },
      resetTestUid: function resetTestUid() {
        if ("" != this.editBox1.string) {
          Config.testUid = Number(this.editBox1.string) + 1;
          cc.sys.localStorage.setItem(Config.testUidName, Config.testUid);
        }
      },
      resetTestRoomId: function resetTestRoomId() {
        if ("" != this.editBox2.string) {
          Config.testRoomId = Number(this.editBox2.string);
          cc.sys.localStorage.setItem(Config.testRoomIdName, Config.testRoomId);
        }
      },
      editOneEvent: function editOneEvent(sender, eventData) {
        cc.log(sender);
      }
    });
    module.exports = HallScene;
    cc._RF.pop();
  }, {
    AudioManager: "AudioManager"
  } ],
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0967bKgsFdBeZOT5xUeJXwz", "HelloWorld");
    "use strict";
    var Config = require("Config");
    var AudioManager = require("AudioManager");
    var AnimationManager = require("AnimationManager");
    var Utils = require("Utils");
    var JsbManager = require("JsbManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        roomid: null,
        _retryTime: 0,
        btn1: {
          default: null,
          type: cc.Button
        },
        btn2: {
          default: null,
          type: cc.Button
        },
        btn3: {
          default: null,
          type: cc.Button
        },
        btn4: {
          default: null,
          type: cc.Button
        },
        btn5: {
          default: null,
          type: cc.Button
        },
        btn6: {
          default: null,
          type: cc.Button
        },
        editBox1: {
          default: null,
          type: cc.EditBox
        },
        editBox2: {
          default: null,
          type: cc.EditBox
        },
        content_View: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        AudioManager.init();
        this.initListeners();
      },
      start: function start() {},
      initListeners: function initListeners() {
        window.message.add(window.SC.LOGIN_GAME, this);
        window.message.add(window.SC.BUILD_HOUSE, this);
        window.message.add(window.SC.JOIN_HOUSE, this);
        window.message.add(window.SC.LEAVE_HOUSE, this);
        window.message.add(window.SC.PEOPLE_JOIN_HOUSE, this);
      },
      removeListeners: function removeListeners() {
        window.message.remove(window.SC.LOGIN_GAME, this);
        window.message.remove(window.SC.BUILD_HOUSE, this);
        window.message.remove(window.SC.JOIN_HOUSE, this);
        window.message.remove(window.SC.LEAVE_HOUSE, this);
        window.message.remove(window.SC.PEOPLE_JOIN_HOUSE, this);
      },
      recvMsg: function recvMsg(cmd, data) {
        switch (cmd) {
         case window.SC.LOGIN_GAME:
          Utils.gameInfo.selfInfo.uid = data.data.uid;
          break;

         case window.SC.BUILD_HOUSE:
          if (data.errMsg && data.errCode) return;
          this.roomid = data.data.roomId;
          Utils.gameInfo.roomInfo.roomId = data.data.roomId;
          this.editBox2.string = this.roomid;
          break;

         case window.SC.JOIN_HOUSE:
          if (data.errMsg && data.errCode) return;
          this.roomid = data.data.roomId;
          this.editBox2.string = this.roomid;
          break;

         case window.SC.LEAVE_HOUSE:
          break;

         case window.SC.PEOPLE_JOIN_HOUSE:
          if (data.errMsg && data.errCode) return;
          Utils.gameInfo.roomInfo.ownerHouseUid = data.data.ownerUid;
          this.content_View.active = true;
        }
      },
      _connectSuccess: function _connectSuccess() {
        this._retryTime = 0;
        var data = {
          openid: Utils.gameInfo.selfInfo.uid,
          nickname: "\u968f\u673a\u540d\u5b57" + Math.floor(-99 * Math.random() + 100),
          sex: 0,
          headimgurl: "http://at2.jyimg.com/1f/58/2fbd1138f6ffe8ecb20d1a965291/2fbd1138f_2_avatar_p.jpg",
          os: cc.sys.os,
          version: "1.0.0"
        };
        window.message.send(window.CS.LOGIN_GAME, data, true);
      },
      _connectFailure: function _connectFailure() {
        Utils.gameInfo.selfInfo.uid = this.editBox1.string;
        this._retryTime++;
        if (this._retryTime < 3) {
          cc.log("\u7f51\u7edc\u8bbf\u95ee\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc");
          window.message.doConnect(this.ip, this.port, this._connectSuccess.bind(this), this._connectFailure.bind(this));
        }
      },
      send1: function send1() {
        this.ip = Config.ip;
        this.port = Config.port;
        Utils.gameInfo.selfInfo.uid = this.editBox1.string;
        if ("" == Utils.gameInfo.selfInfo.uid) {
          cc.log("\u8bf7\u8f93\u5165\u4e00\u4e2auid");
          return;
        }
        window.message.doConnect(this.ip, this.port, this._connectSuccess.bind(this), this._connectFailure.bind(this));
      },
      send2: function send2() {
        var data = {
          roomId: 0,
          gameId: Config.gameId,
          autoJoinRooom: true,
          createChannel: 1,
          options: {
            name: "\u963f\u74e6\u9686",
            desp: "\u8fd9\u662f\u6e38\u620f\u7b80\u4ecb"
          },
          club_info: {
            id: 111,
            name: "",
            head: ""
          },
          group: {
            id: 1,
            name: "\u521d\u7ea7\u573a"
          }
        };
        window.message.send(window.CS.BUILD_HOUSE, data, true);
      },
      send3: function send3() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.JOIN_HOUSE, data, true);
      },
      send4: function send4() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.DISMISS_HOUSE, data, true);
        this.editBox2.string = "";
      },
      send5: function send5() {
        var data = {
          roomId: "" + this.editBox2.string,
          ready: true
        };
        window.message.send(window.CS.READY_HOUSE, data, true);
      },
      send6: function send6() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.LEAVE_HOUSE, data, true);
        this.editBox2.string = "";
      },
      send7: function send7() {
        var data = {
          roomId: "" + this.editBox2.string
        };
        window.message.send(window.CS.START_HOUSE, data, true);
      },
      send8: function send8() {
        cc.log("=======enterRoom====");
        JsbManager.enterRoom(this.roomid + "", "64818045");
      },
      send9: function send9() {
        cc.log("=======startSpeack====");
        JsbManager.startSpeack();
      },
      send10: function send10() {
        cc.log("=======stopSpeack====");
        JsbManager.stopSpeack();
      },
      send11: function send11() {
        cc.log("=======closeMic====");
        JsbManager.openMic();
      },
      send12: function send12() {
        cc.log("=======closeMic====");
        JsbManager.closeMic();
      }
    });
    cc._RF.pop();
  }, {
    AnimationManager: "AnimationManager",
    AudioManager: "AudioManager",
    Config: "Config",
    JsbManager: "JsbManager",
    Utils: "Utils"
  } ],
  ItemInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "88bae1ZK1BGYLsE7sq8sGLv", "ItemInfo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bg_blue: cc.Sprite,
        bg_gray: cc.Sprite,
        head_left: cc.Node,
        head_right: cc.Node,
        content: cc.Label,
        head_node: cc.Node,
        nodeHeight: 0
      },
      setData: function setData(data, callBack) {
        this.data = data;
        this.callBack = callBack;
      },
      ctor: function ctor() {
        this.nodeHeight = 0;
        this.data = null;
        this.color = cc.color(226, 213, 48, 255);
        this.bg = null;
      },
      start: function start() {
        this.content.string = "";
        this.head_node.active = false;
        this.init();
      },
      init: function init() {
        var _this = this;
        if (this.data && this.callBack) {
          var TopHeight = 80;
          if (1 === this.data.type) {
            TopHeight = 40;
            this.bg = this.bg_blue;
            this.head_left.opacity = 0;
            this.head_right.opacity = 0;
            this.bg_gray.node.opacity = 0;
            this.head_left.getChildByName("seatID").active = false;
          } else if (2 === this.data.type) {
            this.head_right.opacity = 0;
            this.bg = this.bg_gray;
            this.head_left.getChildByName("title").getComponent(cc.Label).string = this.data.title.content;
            this.head_left.getChildByName("seatID").active = false;
          } else if (3 === this.data.type) {
            this.head_right.opacity = 0;
            this.bg = this.bg_gray;
            this.head_left.getChildByName("title").color = cc.color(255, 255, 255, 255);
            this.head_left.getChildByName("title").getComponent(cc.Label).string = this.data.title.content;
            this.color = cc.color(255, 255, 255, 255);
            this.head_left.getChildByName("seatID").getComponent(cc.Label).string = this.data.title.seat;
            cc.loader.load(this.data.title.headUrl, function(err, texture) {
              err || (_this.head_left.getChildByName("mask").getChildByName("head_img").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture));
            });
          } else if (4 === this.data.type) {
            this.head_left.opacity = 0;
            this.bg = this.bg_gray;
            this.head_right.getChildByName("title").color = cc.color(255, 255, 255, 255);
            this.head_right.getChildByName("title").getComponent(cc.Label).string = this.data.title.content;
            this.color = cc.color(255, 255, 255, 255);
            this.head_right.getChildByName("seatID").getComponent(cc.Label).string = this.data.title.seat;
            cc.loader.load(this.data.title.headUrl, function(err, texture) {
              err || (_this.head_right.getChildByName("mask").getChildByName("head_img").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture));
            });
          }
          Log(this.data);
          this.nodeHeight = 0;
          for (var i = 0; i < this.data.content.length; i++) {
            var lineData = this.data.content[i];
            var lineNode = new cc.Node();
            lineNode.x = 10;
            lineNode.y = -5 - this.nodeHeight;
            this.bg.node.addChild(lineNode);
            var width = 0;
            var height = 0;
            for (var k = 0; k < lineData.length; k++) {
              var itemData = lineData[k];
              if ("txt" === itemData.type) {
                var node = cc.instantiate(this.content.node);
                var label = node.getComponent(cc.Label);
                label.string = itemData.content;
                node.color = this.color;
                node.x = 0;
                node.y = 0;
                lineNode.addChild(node);
                label._forceUpdateRenderData(true);
                width += node.width;
                height = node.height;
              } else "head" === itemData.type && function() {
                var node = cc.instantiate(_this.head_node);
                node.active = true;
                var head_img = node.getChildByName("mask").getChildByName("head_img").getComponent(cc.Sprite);
                var head_seat = node.getChildByName("seatID").getComponent(cc.Label);
                head_seat.string = itemData.seat;
                node.x = 40 * k;
                node.y = -5;
                if (k >= 8) {
                  node.x = 40 * (k - 8);
                  node.y = -45;
                }
                cc.loader.load(itemData.headUrl, function(err, texture) {
                  err || (head_img.spriteFrame = new cc.SpriteFrame(texture));
                });
                lineNode.addChild(node);
                width += k >= 8 ? 0 : 40 * k;
                height = k >= 8 ? 80 : 40;
              }();
            }
            this.nodeHeight += height;
            if (lineData && lineData.length > 0) {
              var alignHorizon = lineData[0].alignHorizon;
              "center" === alignHorizon && (lineNode.x = this.bg.node.width / 2 - width / 2);
            }
          }
          this.nodeHeight += 10;
          this.bg.node.height = this.nodeHeight;
          this.bg_blue.node.height = this.nodeHeight;
          this.nodeHeight += TopHeight;
          this.callBack(this.nodeHeight);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  JsbManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eafbaZsbgdJLq9k9rxxsNyC", "JsbManager");
    "use strict";
    var JsbManager = {};
    JsbManager.showAlertDialog = function() {
      if (cc.sys.isNative) if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) jsb.reflection.callStaticMethod("AppController", "showAlertDialog:withMessage:", "Title", "Native Call Test"); else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var className = "com/example/creatorandroid/GameActivity";
        var methodName = "showAlertDialog";
        var methodSignature = "(Ljava/lang/String;Ljava/lang/String;)V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature, "Title", "Native Call Test");
      }
    };
    JsbManager.enterRoom = function(roomId, uid) {
      if (cc.sys.isNative) if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) jsb.reflection.callStaticMethod("ViewController", "enterRoom:withUid:", roomId, uid); else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var className = "com/example/creatorandroid/GameActivity";
        var methodName = "enterRoom";
        var methodSignature = "(Ljava/lang/String;Ljava/lang/String;)V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature, roomId, uid);
      }
    };
    JsbManager.quitRoom = function(roomId) {
      if (cc.sys.isNative) if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) jsb.reflection.callStaticMethod("ViewController", "quitRoom:", roomId); else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var className = "com/example/creatorandroid/GameActivity";
        var methodName = "quitRoom";
        var methodSignature = "(Ljava/lang/String;)V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature, roomId);
      }
    };
    JsbManager.openMic = function() {
      if (cc.sys.isNative) if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) jsb.reflection.callStaticMethod("ViewController", "openMic"); else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var className = "com/example/creatorandroid/GameActivity";
        var methodName = "openMic";
        var methodSignature = "()V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature);
      }
    };
    JsbManager.startSpeack = function() {
      if (cc.sys.isNative) if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) jsb.reflection.callStaticMethod("ViewController", "startSpeack"); else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var className = "com/example/creatorandroid/GameActivity";
        var methodName = "startSpeack";
        var methodSignature = "()V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature);
      }
    };
    JsbManager.stopSpeack = function() {
      if (cc.sys.isNative) if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) jsb.reflection.callStaticMethod("ViewController", "stopSpeack"); else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var className = "com/example/creatorandroid/GameActivity";
        var methodName = "stopSpeack";
        var methodSignature = "()V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature);
      }
    };
    JsbManager.closeMic = function() {
      if (cc.sys.isNative) if (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX) jsb.reflection.callStaticMethod("ViewController", "closeMic"); else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var className = "com/example/creatorandroid/GameActivity";
        var methodName = "closeMic";
        var methodSignature = "()V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature);
      }
    };
    module.exports = JsbManager;
    cc._RF.pop();
  }, {} ],
  LoadRes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca941mV+uBI8rxs/lP1PcS1", "LoadRes");
    "use strict";
    var animationManager = require("AnimationManager").getInstance();
    var audioManager = require("AudioManager");
    var Utils = require("Utils");
    cc.Class({
      extends: cc.Component,
      properties: {
        loadNumber: cc.Label,
        progressBar: cc.ProgressBar
      },
      setData: function setData(callback) {
        this.callback = callback;
      },
      onLoad: function onLoad() {},
      start: function start() {},
      onEnable: function onEnable() {
        this.loadNumber.string = "0%";
        this.progressBar.progress = 0;
        this.loadResources();
      },
      onDisable: function onDisable() {},
      loadResources: function loadResources() {
        var _this = this;
        cc.loader.loadResDir(Config.loadAssetsPath, function(count, total, item) {
          _this.setProgress(count, total);
        }, function(err, res) {
          if (err) {
            cc.error("\u8d44\u6e90\u52a0\u8f7d\u9519\u8bef");
            _this.loadResources();
            return;
          }
          cc.log("\u8d44\u6e90\u52a0\u8f7d\u5b8c\u6210: ", res);
          _this.setProgress(1, 1);
          audioManager.init();
          var aniAtlasList = animationManager.aniAtlasList;
          var _audioList = audioManager._audioList;
          res.forEach(function(item) {
            item._spriteFrames ? aniAtlasList[item.name] = item : item._audio && (_audioList[item.name] = item);
          });
          audioManager.loadResDir(Config.AnimationsFileName);
          animationManager.loadResDir(Config.SoundsFileName);
          setTimeout(function() {
            _this.node.active = false;
            _this.callback && _this.callback();
          }, 400);
        });
      },
      setProgress: function setProgress(count, total) {
        if (total > 0) {
          var pt = count / total;
          this.progressBar.progress = pt;
          this.loadNumber.string = Math.ceil(100 * pt) + "%";
        }
      }
    });
    cc._RF.pop();
  }, {
    AnimationManager: "AnimationManager",
    AudioManager: "AudioManager",
    Utils: "Utils"
  } ],
  Loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "893c4kMdTtNFbvig0hvjO+S", "Loading");
    "use strict";
    var animate = require("AnimationManager").getInstance();
    cc.Class({
      extends: cc.Component,
      properties: {
        grayLayer: cc.Node
      },
      start: function start() {
        var _this = this;
        cc.log("===loading===");
        var path = Config.AnimationsFileName + "/" + Config.AnimationList.LOADING;
        animate.loadRes(path, function() {
          var winSize = cc.winSize;
          animate.playAnimation(Config.AnimationList.LOADING, _this.node, 10, winSize.width / 2, winSize.height / 2, 3);
        });
      },
      loadPrefab: function loadPrefab(url) {
        var _this2 = this;
        cc.loader.loadRes(url, cc.Prefab, function(err, prefab) {
          cc.loader.setAutoRelease(prefab, true);
          var node = cc.instantiate(prefab);
          _this2.node.addChild(node);
          node.position = cc.v2(200, 200);
        });
      }
    });
    cc._RF.pop();
  }, {
    AnimationManager: "AnimationManager"
  } ],
  Message: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2332cOWoqhJ8pN/0UOEv8SC", "Message");
    "use strict";
    var NetWork = require("NetWork");
    var Message = cc.Class({
      extends: cc.Component,
      properties: {
        msgMap: null,
        _heartTimer: null,
        _interval: 10,
        netWork: null
      },
      ctor: function ctor() {
        this.msgMap = new Map();
      },
      doConnect: function doConnect(ip, port) {
        var suc = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        var fail = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        this.isConnect() && this.disConnect();
        this.netWork = new NetWork();
        this.netWork.connect(Utils.gameInfo.selfInfo.uid, suc, fail, ip, port);
      },
      disConnect: function disConnect() {
        if (this.netWork) {
          this.netWork.disconnect();
          this.netWork = null;
        } else console.log("\u91cd\u590d\u5173\u95ed\u670d\u52a1\u5668");
      },
      isConnect: function isConnect() {
        return !!this.netWork && this.netWork.isAlive();
      },
      heartTimerFunc: function heartTimerFunc() {
        if (this.netWork && this.netWork.isAlive()) {
          var data = {
            clientTime: new Date().valueOf()
          };
          this.send(window.CS.SYNC_PING, data, true, 0);
        }
      },
      add: function add(cmd, msg) {
        var list = this.msgMap.get(cmd);
        if (!list) {
          list = [];
          this.msgMap.set(cmd, list);
        }
        -1 == list.indexOf(msg) && list.push(msg);
      },
      remove: function remove(cmd, msg) {
        var list = this.msgMap.get(cmd);
        if (list) {
          var len = list.length;
          for (var i = 0; i < len; i++) list[i] == msg && (list[i] = null);
        }
      },
      send: function send(cmd) {
        var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        var isServer = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        try {
          if (isServer) {
            this.netWork && this.netWork.send(cmd, data);
            return;
          }
          var list = this.msgMap.get(cmd);
          if (list) {
            var len = list.length;
            for (var i = 0; i < len; ) {
              if (!list[i]) {
                list.splice(i, 1);
                len--;
                continue;
              }
              list[i].recvMsg.call(list[i], cmd, data);
              i++;
            }
            len <= 0 && this.msgMap.delete(cmd);
          }
        } catch (e) {
          cc.log("exception: " + e.toString());
          cc.error(e);
        }
      },
      Send: function Send(obj) {
        try {
          this.netWork && this.netWork.Send(obj);
          return;
        } catch (e) {
          cc.log("exception: " + e.toString());
          cc.error(e);
        }
      }
    });
    Message.instance = null;
    Message.getInstance = function() {
      this.instance || (this.instance = new Message());
      return this.instance;
    };
    module.exports = Message;
    cc._RF.pop();
  }, {
    NetWork: "NetWork"
  } ],
  MsgCode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c6df52/h49LRKb7O3S1xUxx", "MsgCode");
    "use strict";
    var CS = {
      SYNC_PING: 11e3,
      CHAT_FINISH: 10201,
      TAKE_TEAM: 10310,
      MAGICIAN_SKILL: 10312,
      PLAYER_VOTE: 10313,
      TASK_VOTE: 10401,
      THUG_KILL: 10601,
      LOGIN_GAME: 12e3,
      QUERY_PLAYERMSG: 12100,
      BUILD_HOUSE: 13100,
      JOIN_HOUSE: 13200,
      CHAGE_SEAT: 13210,
      READY_HOUSE: 13220,
      START_HOUSE: 13230,
      LEAVE_HOUSE: 13300,
      DISMISS_HOUSE: 13400,
      RECORDER: 10910,
      USER_TEST: 13240,
      APPLY_ENTER_ROOM: 13250,
      HANDLE_APPLY: 13320
    };
    var SC = {
      SYNC_PING: 21e3,
      PUSH_CARD: 20100,
      CHAT_START: 20200,
      TAKE_TEAM: 20300,
      INFORM_VOTE: 20311,
      VOTE_RESULT: 20314,
      TASK_VOTE: 20400,
      TASK_RESULT: 20402,
      ACTIVE_KILL: 20600,
      THUG_KILL_RESULT: 20602,
      GAME_END: 20700,
      SYSTEM_LOG: 20800,
      SYN_MESSAGE: 20900,
      LOGIN_GAME: 22e3,
      QUERY_PLAYERMSG: 22100,
      BUILD_HOUSE: 23100,
      JOIN_HOUSE: 23200,
      CHAGE_SEAT: 23210,
      READY_HOUSE: 23220,
      LEAVE_HOUSE: 23300,
      ONLINE_RESULT: 22001,
      PEOPLE_JOIN_HOUSE: 23201,
      PEOPLE_LEAVE_HOUSE: 23301,
      PEOPLE_CHAGE_SEAT: 23211,
      PEOPLE_READY_HOUSE: 23221,
      RECORDER: 20910,
      BROAD_MESSAGE: 23240,
      APPLY_PLAYER_INFO: 23320,
      APPLY_ENTER_ROOM: 23250
    };
    var MsgCode = {};
    MsgCode.CS = CS;
    MsgCode.SC = SC;
    module.exports = MsgCode;
    cc._RF.pop();
  }, {} ],
  NetWork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e0f28RjSNhPeYF60rFY50gJ", "NetWork");
    "use strict";
    var NetWork = cc.Class({
      properties: {
        _client: null,
        _isConnected: false,
        _disconnectCb: null,
        _successCb: null,
        _failureCb: null,
        FREQUENCY: 50,
        _heartTime: 1e4,
        _heartTimeout: null
      },
      ctor: function ctor() {},
      _onConnectSuccess: function _onConnectSuccess() {
        this._client.subscribe("n");
        this._isConnected = true;
      },
      _onConnectFailure: function _onConnectFailure() {
        this._isConnected = false;
      },
      _onConnectionLost: function _onConnectionLost(responseObject) {
        0 !== responseObject.errorCode && cc.error("onConnectionLost:" + responseObject.errorMessage);
        this._isConnected = false;
        this._disconnectCb ? this._disconnectCb() : cc.log("\u8054\u63a5\u5931\u6548");
      },
      _onMessageArrived: function _onMessageArrived(msg) {
        var bytes = msg.payloadBytes;
        var arr = [];
        try {
          for (var j = 2; j < bytes.length; j++) arr.push(bytes[j]);
          arr = bzip2.simple(bzip2.array(arr));
          arr = this.UTF8ArrayToUTF16Array(arr, 0);
        } catch (e) {
          arr = this.UTF8ArrayToUTF16Array(bytes, 2);
        }
        var str = decodeURIComponent(arr);
        try {
          var obj = JSON.parse(str);
          window.message.send(obj.code, obj);
          obj.errCode = obj.errCode || 0;
          console.log(" recv: " + JSON.stringify(obj));
          obj.errCode && obj.errMsg && cc.log(obj.errMsg);
        } catch (e) {
          cc.log(str);
          cc.log(e);
        }
      },
      send: function send(code, data) {
        if (!this._isConnected) return;
        var obj = {};
        obj.code = code;
        obj.data = data || {};
        Utils.gameInfo.selfInfo.uid && (obj.uid = Utils.gameInfo.selfInfo.uid);
        code === CS.USER_TEST && (obj.destination = "toRoom/" + Utils.gameInfo.roomInfo.roomId);
        var msgStr = JSON.stringify(obj);
        var sum = 0;
        for (var i = 0; i < msgStr.length; i++) msgStr.charCodeAt(i) < 256 && (sum += msgStr.charCodeAt(i));
        var sign = (sum + 245619426) % 15619472;
        var msg = new Paho.MQTT.Message(sign + msgStr);
        msg.destinationName = "n";
        this._client.send(msg);
        cc.log("send: " + JSON.stringify(obj));
      },
      connect: function connect(clientId, successCB, failureCB, ip, port) {
        if (this._isConnected) return;
        this._successCb = successCB;
        this._failureCb = failureCB;
        this.currentIp = ip.replace(/\./g, "_");
        var url = "ws://" + ip + ":" + port + "/mqtt";
        cc.log(url);
        this._client = new Paho.MQTT.Client(url, clientId);
        this._client.onConnectionLost = this._onConnectionLost.bind(this);
        this._client.onMessageArrived = this._onMessageArrived.bind(this);
        this._client.connect({
          timeout: 4,
          mqttVersion: 3,
          keepAliveInterval: 8,
          onSuccess: this._connectSuccess.bind(this),
          onFailure: this._connectFailure.bind(this)
        });
      },
      disconnect: function disconnect() {
        cc.log("\u4e3b\u52a8\u65ad\u7ebf");
        if (this._isConnected) {
          this._client.disconnect();
          this._client = null;
        }
      },
      _connectSuccess: function _connectSuccess() {
        cc.log("\u8054\u63a5\u6210\u529f");
        this._onConnectSuccess();
        this._successCb && this._successCb();
      },
      _connectFailure: function _connectFailure() {
        cc.log("\u8054\u63a5\u5931\u8d25");
        this._onConnectFailure();
        this._failureCb && this._failureCb();
      },
      getLastPingInterval: function getLastPingInterval() {
        if (this._isConnected) return this._client.getLastPingInterval();
        return 16888;
      },
      setOnDisconnectListener: function setOnDisconnectListener(cb) {
        this._disconnectCb = cb;
      },
      removeOnDisconnectListener: function removeOnDisconnectListener() {
        this._disconnectCb = null;
      },
      isAlive: function isAlive() {
        return this._isConnected;
      },
      UTF8ArrayToUTF16Array: function UTF8ArrayToUTF16Array(s, startIdx) {
        var aCharCode = "\n".charCodeAt(0);
        var cCharCode = "'".charCodeAt(0);
        if (!s) return "";
        var i, codes0, codes1, codes2, bytes0, bytes1, ret = "", len = s.length;
        for (i = startIdx; i < len; i++) {
          codes0 = s[i];
          if (0 == (codes0 >> 7 & 255)) s[i] == aCharCode ? ret += "\\n" : s[i] == cCharCode ? ret += '"' : ret += String.fromCharCode(s[i]); else if (6 == (codes0 >> 5 & 255)) {
            codes1 = s[++i];
            bytes0 = 31 & codes0;
            bytes1 = 63 & codes1;
            ret += String.fromCharCode(bytes0 << 6 | bytes1);
          } else if (14 == (codes0 >> 4 & 255)) {
            codes1 = s[++i];
            codes2 = s[++i];
            bytes0 = codes0 << 4 | codes1 >> 2 & 15;
            bytes1 = (3 & codes1) << 6 | 63 & codes2;
            ret += String.fromCharCode(bytes0 << 8 | bytes1);
          }
        }
        return ret;
      },
      checkHeartRecv: function checkHeartRecv(cmd) {
        var _this = this;
        window.SC.SYNC_PING == cmd && console.log("\u5fc3\u8df3\u5305\u56de\u6765\u5566");
        this._heartTimeout && clearTimeout(this._heartTimeout);
        this._heartTimeout = setTimeout(function() {
          _this._client.disconnect();
        }, this._heartTime);
      },
      Send: function Send(obj) {
        if (!this._isConnected) return;
        var msgStr = JSON.stringify(obj);
        var sum = 0;
        for (var i = 0; i < msgStr.length; i++) msgStr.charCodeAt(i) < 256 && (sum += msgStr.charCodeAt(i));
        var sign = (sum + 245619426) % 15619472;
        var msg = new Paho.MQTT.Message(sign + msgStr);
        msg.destinationName = "n";
        this._client.send(msg);
        cc.log("send: " + JSON.stringify(obj));
      }
    });
    module.exports = NetWork;
    cc._RF.pop();
  }, {} ],
  PanelMsg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c520cVJJ9RGAao0MXZiFtmH", "PanelMsg");
    "use strict";
    var PanelMsg = {};
    var InfoToMsg = {};
    PanelMsg.addItemMsg = function(id, data) {
      var contentViewScript = cc.find("Canvas/content_view").getComponent("GameScene");
      PanelMsg.chatUIScript = contentViewScript.chatUIScript;
      PanelMsg.playerUid_SeatList = Utils.gameInfo.playerUid_SeatList;
      PanelMsg.curRound = Utils.gameInfo.roomInfo.curGameRound;
      InfoToMsg[id] && InfoToMsg[id](data);
    };
    var getSeat = function getSeat(uid) {
      var seatPrefeb = PanelMsg.playerUid_SeatList[uid];
      var seat_id = seatPrefeb.seatInfo.seat_id;
      return seat_id;
    };
    var getImg = function getImg(uid) {
      var seatPrefeb = PanelMsg.playerUid_SeatList[uid];
      var headimgurl = seatPrefeb.seatInfo.playerInfo.headimgurl;
      return headimgurl;
    };
    var getTxtInfo = function getTxtInfo(content, alignHorizon) {
      var align = "left";
      alignHorizon && (align = alignHorizon);
      return {
        type: "txt",
        content: content,
        alignHorizon: align
      };
    };
    var getHeadInfo = function getHeadInfo(uid, alignHorizon) {
      var align = "left";
      alignHorizon && (align = alignHorizon);
      return {
        type: "head",
        alignHorizon: align,
        seat: getSeat(uid),
        headUrl: getImg(uid)
      };
    };
    PanelMsg.init = function() {
      InfoToMsg[window.SC.CHAT_START] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("[" + getSeat(data.speakUid) + "]\u53f7\u73a9\u5bb6\u53d1\u8a00") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.TAKE_TEAM] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("[" + getSeat(data.leaderUid) + "]\u53f7\u6210\u4e3a\u6307\u6325\u5b98") ];
        msg.content[msg.content.length] = [ getTxtInfo("\u8bf7[" + getSeat(data.leaderUid) + "]\u53f7\u786e\u5b9a\u4f5c\u6218\u65b9\u6848\u5e76\u63d0\u4ea4") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.INFORM_VOTE] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("\u6307\u6325\u5b98\u63d0\u4ea4\u4f5c\u6218\u65b9\u6848") ];
        msg.content[msg.content.length] = [];
        for (var i = 0; i < data.memberUids.length; i++) msg.content[msg.content.length - 1][i] = getHeadInfo(data.memberUids[i]);
        msg.content[msg.content.length] = [ getTxtInfo(data.memberUids.length + "\u4eba\u51fa\u5f81\u8bf7\u8868\u51b3") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.VOTE_RESULT] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("\u7b2c" + PanelMsg.curRound + "\u6b21\u51fa\u5f81\u65b9\u6848") ];
        msg.content[msg.content.length] = [ getTxtInfo("\u6307\u6325\u5b98") ];
        msg.content[msg.content.length] = [ getHeadInfo(data.leaderUid) ];
        msg.content[msg.content.length] = [ getTxtInfo("\u4f5c\u6218\u65b9\u6848") ];
        msg.content[msg.content.length] = [];
        for (var i = 0; i < data.memberUids.length; i++) msg.content[msg.content.length - 1][i] = getHeadInfo(data.memberUids[i]);
        msg.content[msg.content.length] = [ getTxtInfo("\u8d5e\u6210\u7968") ];
        msg.content[msg.content.length] = [];
        for (var _i = 0; _i < data.agree.length; _i++) msg.content[msg.content.length - 1][_i] = getHeadInfo(data.agree[_i]);
        msg.content[msg.content.length] = [ getTxtInfo("\u53cd\u5bf9\u7968") ];
        msg.content[msg.content.length] = [];
        for (var _i2 = 0; _i2 < data.disagree.length; _i2++) msg.content[msg.content.length - 1][_i2] = getHeadInfo(data.disagree[_i2]);
        msg.content[msg.content.length] = [ getTxtInfo("\u8868\u51b3\u7ed3\u679c") ];
        msg.content[msg.content.length] = [ getTxtInfo(0 == data.result ? "\u5931\u8d25" : "\u6210\u529f") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.TASK_RESULT] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("\u6b63\u5728\u6267\u884c\u7b2c" + PanelMsg.curRound + "\u6b21\u51fa\u5f81,\u8bf7\u7b49\u5f85\u51fa\u5f81\u7ed3\u679c") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.TASK_RESULT] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("\u672c\u6b21\u51fa\u5f81" + (0 == data.result ? "\u5931\u8d25" : "\u6210\u529f")) ];
        msg.content[msg.content.length] = [ getTxtInfo(data.agree + "\u4eba\u652f\u6301," + data.disagree + "\u4eba\u7834\u574f") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.ACTIVE_KILL] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("\u523a\u5ba2\u5927\u558a\u4e00\u58f0\u8df3\u5230\u4e86\u684c\u5b50\u4e0a") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.THUG_KILL_RESULT] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo("\u516c\u5e03\u523a\u6740\u7ed3\u679c") ];
        if (0 === data.toUid) msg.content[msg.content.length] = [ getTxtInfo("\u523a\u6740\u8005\u653e\u5f03\u523a\u6740") ]; else {
          msg.content[msg.content.length] = [ getTxtInfo("\u523a\u6740\u8005") ];
          msg.content[msg.content.length] = [ getHeadInfo(data.fromUid) ];
          msg.content[msg.content.length] = [ getTxtInfo("\u76ee\u6807") ];
          msg.content[msg.content.length] = [ getHeadInfo(data.toUid) ];
          msg.content[msg.content.length] = [ getTxtInfo("\u523a\u6740" + (data.role === data.toRole ? "\u6210\u529f" : "\u5931\u8d25")) ];
        }
        PanelMsg.chatUIScript.addItem(msg);
      };
      InfoToMsg[window.SC.GAME_END] = function(data) {
        var msg = {};
        msg.type = 2;
        msg.title = {
          content: "\u7cfb\u7edf\u901a\u77e5"
        };
        msg.content = [];
        msg.content[msg.content.length] = [ getTxtInfo(100 === data.winning ? "\u6b63\u6d3e\u83b7\u80dc" : "\u53cd\u6d3e\u83b7\u80dc") ];
        PanelMsg.chatUIScript.addItem(msg);
      };
    };
    var data = {
      winning: 100,
      leaderUid: 1,
      memberNum: 2,
      timeCur: 157e7,
      timeEnd: 1570000060,
      timeTotal: 60
    };
    module.exports = PanelMsg;
    cc._RF.pop();
  }, {} ],
  PlayerManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b23a3H5l0ZMIrwLCkkZrwxa", "PlayerManager");
    "use strict";
    var PlayerManager = cc.Class({
      extends: cc.Component,
      properties: {
        uid: 0,
        nickName: "wjw",
        avater: "",
        token: "",
        status: 0,
        balance: 0,
        location: "\u5317\u4eac\u5e02\u671d\u9633\u533a"
      },
      ctor: function ctor() {},
      start: function start() {}
    });
    PlayerManager._instance = null;
    PlayerManager.getInstance = function() {
      PlayerManager._instance || (PlayerManager._instance = new PlayerManager());
      return PlayerManager._instance;
    };
    module.exports = PlayerManager;
    cc._RF.pop();
  }, {} ],
  Pop_up: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b47cbniEcJK5LZb8CRzWQFV", "Pop_up");
    "use strict";
    var _properties;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    var Utils = require("Utils");
    var Config = require("Config");
    cc.Class({
      extends: cc.Component,
      properties: (_properties = {
        bg: cc.Sprite,
        kill_sprite: cc.Sprite,
        kill_text: cc.Sprite,
        final: cc.Node,
        good_players_bg: cc.Sprite,
        bad_players_bg: cc.Sprite,
        player: cc.Prefab,
        victory_bg: cc.Node,
        good_result: cc.Sprite,
        bad_result: cc.Sprite,
        finalAllPlayersArr: {
          type: Array,
          default: []
        },
        exit: cc.Sprite,
        exit_cancel: cc.Button,
        exit_sure: cc.Button,
        playerInfo: cc.Sprite,
        playerInfo_avatar: cc.Sprite,
        playerInfo_nickname: cc.Label,
        playerInfo_level: cc.Label,
        playerInfo_innings: cc.Label,
        playerInfo_rate: cc.Label,
        playerInfo_addFriend: cc.Button,
        btn_kick: cc.Button,
        Recorder: cc.Node,
        recorder_task: cc.Prefab,
        applyList_bg: cc.Sprite,
        helpPageView: cc.PageView
      }, _defineProperty(_properties, "applyList_bg", cc.Sprite), _defineProperty(_properties, "applyItem", cc.Prefab), 
      _defineProperty(_properties, "Img", cc.Sprite), _properties),
      onLoad: function onLoad() {
        this.bg.node.on("touchstart", function(e) {
          e.stopPropagation();
          this.playerInfo.node.active ? this.hidePlayerInfo() : this.kill_sprite.node.active ? this.hideText() : this.helpPageView.node.active && this.hideHelpPageView();
          this.Recorder.active && this.hideRecorder();
        }, this);
      },
      start: function start() {},
      setBgOpacity: function setBgOpacity(num) {
        this.bg.node.active = true;
        this.bg.node.opacity = num;
      },
      showFinalResult: function showFinalResult(isShow) {
        this.final.active = isShow;
        isShow || this.clearFinalAllPlayers();
      },
      showText: function showText() {
        var _this = this;
        var kill_type = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.setBgOpacity(0);
        var kill_text_url = "";
        var auto_fade_time = 2;
        if (0 == kill_type) kill_text_url = Config.TextureUrl.pop_up.text_assassin_kill; else if (1 == kill_type) {
          auto_fade_time = 5;
          var self_role = Utils.gameInfo.selfInfo.role;
          kill_text_url = "104" == self_role ? Config.TextureUrl.pop_up.text_kill_target : Config.TextureUrl.pop_up.text_youxia_kill;
        }
        Utils.loadRes(kill_text_url).then(function(_spriteFrame) {
          _this.kill_text.spriteFrame = _spriteFrame;
        }, function(err) {
          cc.log("\u83b7\u53d6\u56fe\u7247\u5931\u8d25");
        });
        this.kill_sprite.node.active = true;
        this.node.active = true;
        this.scheduleOnce(this.hideText, auto_fade_time);
      },
      hideText: function hideText() {
        this.kill_sprite.node.active = false;
        this.node.active = false;
        this.unschedule(this.hideText);
      },
      setFinalPlayers: function setFinalPlayers(_arr, _parent) {
        var figure1 = .9;
        var figure2 = .9;
        var row_max_players = 5;
        var maxPlayerWidth = _parent.node.width * figure1;
        var min_player_margin = maxPlayerWidth / row_max_players;
        var min_player_width = min_player_margin * figure2;
        var max_player_margin = maxPlayerWidth / 4;
        var max_player_width = min_player_margin * figure2;
        _parent.node.height = _arr.length > 4 ? 380 : 248;
        for (var i = 0; i < _arr.length; i++) {
          var player_margin = max_player_margin;
          var player_width = max_player_width;
          var newPlayer = cc.instantiate(this.player);
          this.finalAllPlayersArr.push(newPlayer);
          var newPlayerScript = newPlayer.getComponent("seat");
          newPlayer.scale = player_width / newPlayer.width;
          var x = -maxPlayerWidth / 2 + player_margin / 2 + player_margin * (i % 4);
          var y = _parent.node.height / 2 - 145 - parseInt(i / 4) * player_margin;
          newPlayer.setPosition(x, y);
          var info = {
            mark_id: _arr[i].seatInfo.seat_roleId,
            nickname: _arr[i].seatInfo.playerInfo.nickname,
            seat_id: _arr[i].seatInfo.seat_id,
            avatar: _arr[i].seatInfo.playerInfo.headimgurl,
            uid: _arr[i].seatInfo.playerInfo.uid
          };
          newPlayerScript.setForResult(info);
          _parent.node.addChild(newPlayer);
        }
      },
      clearFinalAllPlayers: function clearFinalAllPlayers() {
        for (var i in this.finalAllPlayersArr) this.finalAllPlayersArr[i].removeFromParent();
        this.finalAllPlayersArr = [];
      },
      setFinalText: function setFinalText(good_win) {
        var victory_spriteFrame = good_win ? Config.TextureUrl.pop_up.victory_good : Config.TextureUrl.pop_up.victory_bad;
        var good_result_frame = good_win ? Config.TextureUrl.pop_up.success : Config.TextureUrl.pop_up.fail;
        var bad_result_frame = good_win ? Config.TextureUrl.pop_up.fail : Config.TextureUrl.pop_up.success;
        this.setSpriteFrame(this.good_result, good_result_frame);
        this.setSpriteFrame(this.bad_result, bad_result_frame);
      },
      setSpriteFrame: function setSpriteFrame(sprite, url) {
        Utils.loadRes(url, cc.SpriteFrame).then(function(_spriteFrame) {
          sprite.spriteFrame = _spriteFrame;
        }, function(err) {
          console.log(err);
        });
      },
      click_final_sure: function click_final_sure() {
        this.node.active = false;
        this.final.active = false;
      },
      showLayer_GameEnd: function showLayer_GameEnd(good_players, bad_players, is_goodwin) {
        this.node.active = true;
        is_goodwin ? AnimationManager.getInstance().playAnimation(Config.AnimationList.win_good, this.victory_bg, 12, 0, 0, 1.5, 1.5, 1, function() {}) : AnimationManager.getInstance().playAnimation(Config.AnimationList.win_bad, this.victory_bg, 12, 0, 0, 1.5, 1.5, 1, function() {});
        AnimationManager.getInstance().playAnimation(Config.AnimationList.star, this.victory_bg, 12, 0, 0, 1.5, 1.5, 3, function() {});
        this.setBgOpacity(200);
        this.setFinalPlayers(good_players, this.good_players_bg);
        this.setFinalPlayers(bad_players, this.bad_players_bg);
        this.setFinalText(is_goodwin);
      },
      showExitPrompt: function showExitPrompt() {
        this.setBgOpacity(0);
        this.exit.node.active = true;
        this.node.active = true;
      },
      hideExitPrompt: function hideExitPrompt() {
        this.bg.node.active = false;
        this.exit.node.active = false;
        this.node.active = false;
      },
      click_exit_cancel: function click_exit_cancel() {
        this.hideExitPrompt();
      },
      click_exit_sure: function click_exit_sure() {
        var data = {
          roomId: Utils.gameInfo.roomInfo.roomId
        };
        window.message.send(window.CS.LEAVE_HOUSE, data, true);
      },
      showPlayerInfo: function showPlayerInfo(playerInfo) {
        var that = this;
        this.current_playerInfo = playerInfo;
        var info_height = playerInfo.uid == Utils.gameInfo.selfInfo.uid ? 300 : 400;
        var isShowAddFriend = playerInfo.uid != Utils.gameInfo.selfInfo.uid;
        this.playerInfo.node.height = info_height;
        this.playerInfo_addFriend.node.active = isShowAddFriend;
        this.btn_kick.node.active = isShowAddFriend;
        if (playerInfo.hasOwnProperty("avatar_texture")) {
          cc.log(playerInfo.avatar_texture);
          this.playerInfo_avatar.spriteFrame = new cc.SpriteFrame(playerInfo.avatar_texture);
        } else {
          var avatarUrl = playerInfo.headimgurl;
          cc.loader.load({
            url: avatarUrl
          }, function(err, texture) {
            console.log(err, texture);
            err || (that.playerInfo_avatar.spriteFrame = new cc.SpriteFrame(texture));
          });
        }
        this.playerInfo_nickname.string = playerInfo.nickname;
        this.playerInfo_level.string = playerInfo.level;
        this.playerInfo_innings.string = playerInfo.innings;
        this.playerInfo_rate.string = playerInfo.rate;
        this.setBgOpacity(0);
        Utils.showPopupAnimate(this.playerInfo.node);
        this.node.active = true;
      },
      hidePlayerInfo: function hidePlayerInfo() {
        this.bg.node.active = false;
        this.playerInfo.node.active = false;
        Utils.hidePopupAnimate(this.playerInfo.node);
        this.node.active = false;
      },
      addFriend: function addFriend() {
        var self_uid = Utils.gameInfo.selfInfo.uid;
        var target_uid = this.current_playerInfo.uid;
        console.log("add friend");
        console.log("self_uid:" + self_uid);
        console.log("target_uid:" + target_uid);
      },
      click_btn_kick: function click_btn_kick() {
        this.hidePlayerInfo();
        var kick_uid = this.current_playerInfo.uid;
      },
      showRecorder: function showRecorder(data) {
        var recorder_top = this.Recorder.getChildByName("recorder_top");
        var title = recorder_top.getChildByName("title");
        title.getComponent(cc.Label).string = Config.playersNum + "\u4eba\u5c40";
        var lab_good_role = recorder_top.getChildByName("lab_good_role");
        var roleMap = Config.rolesNum[Config.playersNum + ""];
        var str = "";
        for (var i = 1; i <= 6; i++) {
          var idx = "10" + i;
          var roleName = Config.rolesName[idx];
          var roleNum = roleMap[idx];
          str += roleNum > 0 ? roleName : "";
          str += roleNum > 1 ? "*" + roleNum : "";
          str += " ";
        }
        lab_good_role.getComponent(cc.Label).string = str;
        var lab_bad_role = recorder_top.getChildByName("lab_bad_role");
        var str2 = "";
        for (var _i = 1; _i <= 6; _i++) {
          var _idx = "20" + _i;
          var _roleName = Config.rolesName[_idx];
          var _roleNum = roleMap[_idx];
          str2 += _roleNum > 0 ? _roleName : "";
          str2 += _roleNum > 1 ? "*" + _roleNum : "";
          str2 += " ";
        }
        lab_bad_role.getComponent(cc.Label).string = str2;
        var lab_company_num = recorder_top.getChildByName("lab_company_num");
        lab_company_num.getComponent(cc.Label).string = Config.playersNum + "\u4eba\u5c40";
        var lab_num1 = recorder_top.getChildByName("lab_num1");
        lab_num1.getComponent(cc.Label).string = data.teamResults[0] ? data.teamResults[0].memberUids.length : "";
        var lab_num2 = recorder_top.getChildByName("lab_num2");
        lab_num2.getComponent(cc.Label).string = data.teamResults[1] ? data.teamResults[1].memberUids.length : "";
        var lab_num3 = recorder_top.getChildByName("lab_num3");
        lab_num3.getComponent(cc.Label).string = data.teamResults[2] ? data.teamResults[2].memberUids.length : "";
        var lab_num4 = recorder_top.getChildByName("lab_num4");
        lab_num4.getComponent(cc.Label).string = data.teamResults[3] ? data.teamResults[3].memberUids.length : "";
        var lab_num5 = recorder_top.getChildByName("lab_num5");
        lab_num5.getComponent(cc.Label).string = data.teamResults[4] ? data.teamResults[4].memberUids.length : "";
        var record_list = this.Recorder.getChildByName("record_list").getComponent(cc.ScrollView);
        var content = record_list.content;
        content.height = 170 * data.teamResults.length;
        for (var _i2 = 0; _i2 < data.teamResults.length; _i2++) {
          var item = cc.instantiate(this.recorder_task);
          data.teamResults[_i2].index = _i2 + 1;
          item.getComponent("RecordTask").setData(data.teamResults[_i2]);
          content.addChild(item);
          var y = -170 * _i2 - 85;
          item.y = y;
        }
        this.setBgOpacity(0);
        Utils.showPopupAnimate(this.Recorder);
        this.node.active = true;
      },
      hideRecorder: function hideRecorder() {
        this.bg.node.active = false;
        Utils.hidePopupAnimate(this.Recorder);
        this.node.active = false;
      },
      setHelpPageView: function setHelpPageView() {
        var _this2 = this;
        this.helpPageView.removeAllPages();
        var curRolesNum = Config.rolesNum[Config.playersNum];
        this.curRolesArr = [];
        for (var i in curRolesNum) curRolesNum[i] > 0 && function() {
          _this2.curRolesArr.push(i);
          var newNode = new cc.Node();
          newNode.width = 612;
          newNode.height = 866;
          var newSprite = newNode.addComponent(cc.Sprite);
          var spriteUrl = Config.TextureUrl.help[i];
          Utils.loadRes(spriteUrl).then(function(_spriteFrame) {
            newSprite.spriteFrame = _spriteFrame;
          }, function(err) {
            cc.log("\u83b7\u53d6\u56fe\u7247\u5931\u8d25,err");
          });
          _this2.helpPageView.addPage(newNode);
        }();
      },
      showHelpPageView: function showHelpPageView() {
        var _this3 = this;
        this.setBgOpacity(0);
        var self_role = Utils.gameInfo.selfInfo.role;
        this.helpPageView.node.active = true;
        setTimeout(function() {
          _this3.helpPageView.scrollToPage(_this3.curRolesArr.indexOf(self_role));
        }, 100);
        this.node.active = true;
      },
      hideHelpPageView: function hideHelpPageView() {
        this.bg.node.active = false;
        this.helpPageView.node.active = false;
        this.node.active = false;
      },
      showApplyInfo: function showApplyInfo(data) {
        var record_list = this.applyList_bg.node.getChildByName("apply_list").getComponent(cc.ScrollView);
        var content = record_list.content;
        content.height = 70 * data.length;
        for (var i = 0; i < data.length; i++) {
          var item = cc.instantiate(this.applyItem);
          item.getComponent("ApplyItem").setData(data[i]);
          content.addChild(item);
          var y = -70 * i - 35;
          item.y = y;
        }
        Utils.showPopupAnimate(this.applyList_bg.node);
        this.node.active = true;
      },
      hideApplyInfo: function hideApplyInfo() {
        Utils.hidePopupAnimate(this.applyList_bg.node);
        this.node.active = false;
      },
      showImg: function showImg(type) {
        var _this4 = this;
        var that = this;
        var img_url = "";
        switch (type) {
         case 101:
          img_url = Config.TextureUrl.pop_up.team_success;
          break;

         case 102:
          img_url = Config.TextureUrl.pop_up.team_fail;
          break;

         case 201:
          img_url = Config.TextureUrl.pop_up.task_success;
          break;

         case 202:
          img_url = Config.TextureUrl.pop_up.task_fail;
        }
        Utils.loadRes(img_url, cc.SpriteFrame).then(function(_spriteFrame) {
          that.Img.spriteFrame = _spriteFrame;
        }, function(err) {
          console.log("\u56fe\u7247\u52a0\u8f7d\u5931\u8d25", err);
        });
        Utils.showPopupAnimate(this.Img.node);
        this.node.active = true;
        this.scheduleOnce(function() {
          _this4.hideImg();
        }, 2);
      },
      hideImg: function hideImg() {
        Utils.hidePopupAnimate(this.Img.node);
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {
    Config: "Config",
    Utils: "Utils"
  } ],
  RecordTask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2652cy5xHNOMLSf5gaYytsw", "RecordTask");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      setData: function setData(data) {
        this.data = data;
      },
      ctor: function ctor() {},
      getSeatByUid: function getSeatByUid(uid) {
        var info = Utils.gameInfo.playerUid_SeatList[uid];
        return info.seatInfo.seat_id;
      },
      onLoad: function onLoad() {
        var _this = this;
        if (this.data) {
          var title = this.node.getChildByName("title");
          var str = "\u7b2c" + this.data.index + "\u8f6e:";
          this.data.memberUids.forEach(function(uid) {
            str = str + _this.getSeatByUid(uid) + " ";
          });
          str += "\u505a\u4efb\u52a1";
          str += this.data.taskResults && 1 === this.data.taskResults.result ? "\u6210\u529f" : "\u5931\u8d25";
          title.getComponent(cc.Label).string = str;
          var lab_captain = this.node.getChildByName("lab_captain");
          lab_captain.getComponent(cc.Label).string = this.getSeatByUid(this.data.leaderUid);
          var lab_company = this.node.getChildByName("lab_company");
          var str2 = "";
          this.data.memberUids.forEach(function(uid) {
            str2 = str2 + _this.getSeatByUid(uid) + " ";
          });
          lab_company.getComponent(cc.Label).string = str2;
          var lab_agree = this.node.getChildByName("lab_agree");
          var str3 = "";
          this.data.agree.forEach(function(uid) {
            str3 = str3 + _this.getSeatByUid(uid) + " ";
          });
          lab_agree.getComponent(cc.Label).string = str3;
          var lab_disagree = this.node.getChildByName("lab_disagree");
          var str4 = "";
          this.data.disagree.forEach(function(uid) {
            str4 = str4 + _this.getSeatByUid(uid) + " ";
          });
          lab_disagree.getComponent(cc.Label).string = str4;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  RoleMark: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63991qa+HhGzajKZYqe5wpC", "RoleMark");
    "use strict";
    var Utils = require("Utils");
    var Config = require("Config");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.isAddTouchStart = false;
      },
      setRoleMark: function setRoleMark(_parent_this, markId) {
        this.setSpriteFrame(markId);
        if (this.isAddTouchStart) return;
        this.isAddTouchStart = true;
        this.node.on("touchstart", function(e) {
          e.stopPropagation();
          this.node.removeFromParent();
          _parent_this.changeRoleMark(this.mark_id);
        }, this);
      },
      setSpriteFrame: function setSpriteFrame(markId) {
        var _this = this;
        this.mark_id = markId;
        var url = Config.TextureUrl.mark[markId];
        Utils.loadRes(url).then(function(_spriteFrame) {
          _this.node.getComponent(cc.Sprite).spriteFrame = _spriteFrame;
        });
      }
    });
    cc._RF.pop();
  }, {
    Config: "Config",
    Utils: "Utils"
  } ],
  Test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ece5cNo2u1L+5R2haZlovxI", "Test");
    "use strict";
    var Utils = require("Utils");
    cc.Class({
      extends: cc.Component,
      properties: {},
      ctor: function ctor() {
        cc.log("==test==");
      },
      onLoad: function onLoad() {},
      start: function start() {},
      update: function update() {},
      lateUpdate: function lateUpdate() {}
    });
    cc._RF.pop();
  }, {
    Utils: "Utils"
  } ],
  Tip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b204c8JlxJva7Ngd4PxKYJ", "Tip");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bg: cc.Sprite,
        lab: cc.Label
      },
      onLoad: function onLoad() {},
      init: function init(data) {
        var _this = this;
        var size = cc.winSize;
        var bgSize = this.bg.node.getContentSize();
        this.bg.node.scale = size.width / bgSize.width;
        this.lab.string = data;
        var _actions = [];
        _actions[_actions.length] = cc.delayTime(1);
        _actions[_actions.length] = cc.fadeOut(1);
        _actions[_actions.length] = cc.callFunc(function() {
          _this.node.removeFromParent(true);
        });
        var seq = cc.sequence(_actions);
        this.node.runAction(seq);
      }
    });
    cc._RF.pop();
  }, {} ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "156d3VV/mJBiorJ2HekqQZF", "Utils");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var Utils = {};
    Utils.tenChangeTwo = function(number) {
      var oldName = number;
      var a = "";
      while (number > 0) {
        var _b = number % 2;
        a += _b;
        number = Math.floor(number / 2);
      }
      var b = "";
      for (var i = a.length - 1; i >= 0; i--) b += a[i];
      return b;
    };
    Utils.twoChangeTen = function(numberStr) {
      var a = 0;
      var len = numberStr.length;
      for (var i = len - 1; i >= 0; i--) a = a + 2 ^ len - i - 1;
      return Math.floor(a);
    };
    Utils.showLoading = function() {
      Utils.hideLoading();
      cc.loader.loadRes("prefab/Loading", cc.Prefab, function(err, prefab) {
        var load = cc.instantiate(prefab);
        if (load) {
          var size = cc.winSize;
          load.position = cc.v2(size.width / 2, size.height / 2);
          var scene = cc.director.getScene();
          scene.addChild(load, 1e3);
          cc.log("undefined" === typeof load ? "undefined" : _typeof(load));
          window.loadingLayer = load;
        } else window.loadingLayer = null;
      });
    };
    Utils.hideLoading = function() {
      cc.log("==removeLoading=======");
      if (window.loadingLayer) {
        window.loadingLayer.removeFromParent(true);
        window.loadingLayer = null;
      }
    };
    Utils.showTip = function(str) {
      cc.loader.loadRes("prefab/tip", cc.Prefab, function(err, prefab) {
        var load = cc.instantiate(prefab);
        if (load) {
          var size = cc.winSize;
          load.position = cc.v2(size.width / 2, size.height / 2);
          load.getComponent("Tip").init(str);
          var scene = cc.director.getScene();
          scene.addChild(load, 1e3);
        }
      });
    };
    Utils.showPanelInfo = function(str) {
      cc.loader.loadRes("prefab/tip", cc.Prefab, function(err, prefab) {
        var load = cc.instantiate(prefab);
        if (load) {
          var size = cc.winSize;
          load.position = cc.v2(size.width / 2, size.height / 2);
          load.getComponent("Tip").init(str);
          var scene = cc.director.getScene();
          scene.addChild(load, 1e3);
        }
      });
    };
    Utils.loadRes = function(url) {
      var type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : cc.SpriteFrame;
      return new Promise(function(resolve, reject) {
        var res = cc.loader.getRes(url, type);
        res ? resolve(res) : cc.loader.loadRes(url, type, function(err, _res) {
          err ? reject(err) : resolve(_res);
        });
      });
    };
    Utils.getJsonLength = function(jsonData) {
      var length = 0;
      for (var ever in jsonData) length++;
      return length;
    };
    Utils.msgData = {
      code: -1,
      data: {},
      errCode: 0
    };
    Utils.deepCopy = function(obj) {
      if (obj instanceof Array) {
        var n = [];
        for (var i = 0; i < obj.length; ++i) n[i] = Utils.deepCopy(obj[i]);
        return n;
      }
      if (obj instanceof Object) {
        var n = {};
        for (var i in obj) n[i] = Utils.deepCopy(obj[i]);
        return n;
      }
      return obj;
    };
    Utils.loadHeadImage = function(url, uid, callback) {
      if (!cc.sys.isNative) {
        cc.loader.load({
          url: url,
          type: "jpg"
        }, function(err, tex) {
          err ? cc.error(err) : callback(tex);
        });
        return;
      }
      var loadFile = function loadFile(filePath) {
        cc.loader.load(filePath, function(err, tex) {
          err ? cc.error(err) : callback(tex);
        });
      };
      var dirpath = jsb.fileUtils.getWritablePath() + "CocosGameImg/";
      jsb.fileUtils.isDirectoryExist(dirpath) ? cc.log("\u8def\u5f84 " + dirpath + "\u5df2\u7ecf\u5b58\u5728\u3002") : jsb.fileUtils.createDirectory(dirpath);
      cc.log("dirpath: " + dirpath);
      var filePath = dirpath + Crypto.MD5(url) + ".jpg";
      cc.log(filePath);
      if (jsb.fileUtils.isFileExist(filePath)) {
        cc.log("Remote img is find: " + filePath);
        loadFile(filePath);
        return true;
      }
      var saveFile = function saveFile(data) {
        if (data && "undefined" !== typeof data) if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filePath)) {
          cc.log("Remote img save succeed.");
          loadFile(filePath);
        } else cc.log("Remote img save failed."); else cc.log("Remote img download failed.");
      };
      var xhr = cc.loader.getXMLHttpRequest();
      xhr.onreadystatechange = function() {
        4 === xhr.readyState && (200 === xhr.status ? saveFile(xhr.response) : cc.log("\u52a0\u8f7d\u5934\u50cf\u5931\u8d25"));
      }.bind(void 0);
      xhr.responseType = "arraybuffer";
      xhr.open("GET", url, true);
      xhr.send();
    };
    Utils.showPopupAnimate = function(node) {
      node.active = true;
      node.setScale(.1);
      var actions = [];
      actions[actions.length] = new cc.ScaleTo(.1, 1.2);
      actions[actions.length] = new cc.ScaleTo(.1, 1);
      node.runAction(new cc.Sequence(actions));
    };
    Utils.hidePopupAnimate = function(node, callBack) {
      var actions = [];
      actions[actions.length] = new cc.ScaleTo(.1, 1.1);
      actions[actions.length] = new cc.ScaleTo(.2, .1);
      actions[actions.length] = new cc.CallFunc(function() {
        node.active = false;
        node.setScale(1);
        callBack && callBack();
      });
      node.runAction(new cc.Sequence(actions));
    };
    Utils.gameInfo = {
      gameState: "ready",
      selfInfo: {
        uid: -1,
        role: ""
      },
      roomInfo: {
        roomId: "",
        ownerHouseUid: -1,
        curGameRound: 1
      },
      allSeatsNode: [],
      playerUid_SeatList: {},
      playerRole_UidList: {}
    };
    Utils.clearGameInfo = function() {
      Utils.gameInfo.gameState = "ready";
      Utils.gameInfo.selfInfo.uid = -1;
      Utils.gameInfo.selfInfo.role = "";
      Utils.gameInfo.roomInfo.roomId = "";
      Utils.gameInfo.roomInfo.ownerHouseUid = -1;
      Utils.gameInfo.allSeatsNode = [];
      Utils.gameInfo.playerUid_SeatList = {};
      Utils.gameInfo.playerRole_UidList = {};
    };
    Utils.judgePlayerisGoodCampByRole = function(role) {
      return Number(Utils.gameInfo.selfInfo.role) < 200;
    };
    module.exports = Utils;
    cc._RF.pop();
  }, {} ],
  bottom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da6a7jSkCBKdqdRjBpibDS/", "bottom");
    "use strict";
    var Utils = require("Utils");
    var Config = require("Config");
    cc.Class({
      extends: cc.Component,
      properties: {
        btn_mic: cc.Button,
        btn_comments: cc.Button,
        btn_ready: cc.Button,
        btn_cancel: cc.Button,
        btn_start: cc.Button,
        btn_invite: cc.Button,
        btn_applyList: cc.Button,
        btn_pass: cc.Button,
        UI_top: cc.Node,
        btn_kill: cc.Button,
        btn_assassin_kill: cc.Button,
        btn_approve: cc.Button,
        btn_appose: cc.Button,
        btn_support: cc.Button,
        btn_destroy: cc.Button,
        btn_confirmSubmit: cc.Button,
        btn_card_A: cc.Button,
        card_B: cc.Sprite,
        pop_View: cc.Node,
        isShowAnimation: false
      },
      onLoad: function onLoad() {
        this.btn_mic.node.on("touchstart", this.touchStart_mic, this);
        this.btn_mic.node.on("touchcancel", this.touchEnd_mic, this);
        this.btn_mic.node.on("touchend", this.touchEnd_mic, this);
        this.contentViewScript = cc.find("Canvas/content_view").getComponent("GameScene");
      },
      start: function start() {},
      initBtn: function initBtn() {
        var isMaster = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.btn_start.node.active = isMaster;
        this.btn_cancel.node.active = !isMaster;
        this.btn_ready.node.active = false;
        this.btn_mic.node.active = true;
        this.btn_invite.node.active = true;
        this.btn_applyList.node.active = true;
      },
      touchStart_mic: function touchStart_mic(btn) {
        if ("ready" == Utils.gameInfo.gameState) {
          this.contentViewScript.broadMessage(0);
          Utils.gameInfo.playerUid_SeatList[Utils.gameInfo.selfInfo.uid].showSpeaking(true);
        }
        JsbManager.openMic();
      },
      touchEnd_mic: function touchEnd_mic() {
        if ("ready" == Utils.gameInfo.gameState) {
          this.contentViewScript.broadMessage(1);
          Utils.gameInfo.playerUid_SeatList[Utils.gameInfo.selfInfo.uid].hideSpeaking();
        }
        JsbManager.stopSpeack();
      },
      click_invite: function click_invite() {
        console.log("invite");
      },
      click_pass: function click_pass() {
        console.log("\u53d1\u8a00\u7ed3\u675f");
        var data = {
          speakUid: Utils.gameInfo.selfInfo.uid
        };
        window.message.send(window.CS.CHAT_FINISH, data, true);
      },
      click_comments: function click_comments() {
        console.log("\u6587\u5b57\u8bc4\u8bba");
      },
      click_start: function click_start() {
        console.log("start");
        var data = {
          roomId: "" + Utils.gameInfo.roomInfo.roomId
        };
        window.message.send(window.CS.START_HOUSE, data, true);
      },
      click_ready: function click_ready() {
        console.log("ready");
        this.btn_cancel.node.active = true;
        this.btn_ready.node.active = false;
        var data = {
          roomId: Number(Utils.gameInfo.roomInfo.roomId),
          ready: true
        };
        window.message.send(window.CS.READY_HOUSE, data, true);
      },
      click_cancel: function click_cancel() {
        console.log("cancel");
        this.btn_cancel.node.active = false;
        this.btn_ready.node.active = true;
        var data = {
          roomId: Number(Utils.gameInfo.roomInfo.roomId),
          ready: false
        };
        window.message.send(window.CS.READY_HOUSE, data, true);
      },
      click_applyList: function click_applyList() {
        this.btn_applyList.node.getChildByName("redpoint").active = false;
        this.contentViewScript.popUIScript.showApplyInfo(this.contentViewScript.applicantList);
      },
      setMicBtnEnable: function setMicBtnEnable(enable) {
        this.btn_mic.interactable = enable;
      },
      click_kill: function click_kill() {
        console.log("\u6e38\u4fa0attick");
        var data = {
          toUid: this.contentViewScript.thugToUid,
          toRole: 203,
          fromUid: Utils.gameInfo.selfInfo.uid,
          fromRole: 104
        };
        window.message.send(window.CS.THUG_KILL, data, true);
      },
      click_assassin_kill: function click_assassin_kill() {
        console.log("\u523a\u5ba2attick");
        var data = {
          toUid: this.contentViewScript.thugToUid,
          toRole: 101,
          fromUid: Utils.gameInfo.selfInfo.uid,
          fromRole: 203
        };
        window.message.send(window.CS.THUG_KILL, data, true);
      },
      click_approve: function click_approve() {
        var data = {
          vote: 0,
          fromUid: Utils.gameInfo.selfInfo.uid,
          role: Number(Utils.gameInfo.selfInfo.role),
          num: this.contentViewScript.searcherSkill
        };
        window.message.send(window.CS.PLAYER_VOTE, data, true);
      },
      click_appose: function click_appose() {
        var data = {
          vote: 1,
          fromUid: Utils.gameInfo.selfInfo.uid,
          role: Number(Utils.gameInfo.selfInfo.role),
          num: this.contentViewScript.searcherSkill
        };
        window.message.send(window.CS.PLAYER_VOTE, data, true);
      },
      click_support: function click_support() {
        var data = {
          task: 0,
          fromUid: Utils.gameInfo.selfInfo.uid
        };
        window.message.send(window.CS.TASK_VOTE, data, true);
      },
      click_destroy: function click_destroy() {
        var data = {
          task: 1,
          fromUid: Utils.gameInfo.selfInfo.uid
        };
        window.message.send(window.CS.TASK_VOTE, data, true);
      },
      click_confirmSubmit: function click_confirmSubmit() {
        var data = {
          memberUids: this.contentViewScript.chooseTaskPlayer_UidArr,
          leaderUid: Utils.gameInfo.selfInfo.uid
        };
        window.message.send(window.CS.TAKE_TEAM, data, true);
      },
      showMasterOrReady: function showMasterOrReady(isMaster) {
        var isReady = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.setUI();
        isMaster ? this.setUI().ready_master() : isReady ? this.setUI().ready_regularCancelPlayer() : this.setUI().ready_regularReadyPlayer();
      },
      setUI: function setUI() {
        var that = this;
        that.hideAllChildren(this.node, false);
        that.btn_comments.node.active = true;
        "playing" == Utils.gameInfo.gameState && (that.btn_card_A.node.active = true);
        if (this.isShowAnimation) {
          this.card_B.node.active = true;
          this.btn_card_A.node.active = false;
        }
        return {
          ready_master: function ready_master() {
            that.btn_mic.node.active = true;
            that.btn_start.node.active = true;
            that.btn_invite.node.active = true;
            that.btn_applyList.node.active = true;
          },
          ready_regularReadyPlayer: function ready_regularReadyPlayer() {
            that.btn_mic.node.active = true;
            that.btn_invite.node.active = true;
            that.btn_applyList.node.active = true;
            that.btn_cancel.node.active = true;
            that.btn_ready.node.active = true;
          },
          ready_regularCancelPlayer: function ready_regularCancelPlayer() {
            that.btn_mic.node.active = true;
            that.btn_invite.node.active = true;
            that.btn_applyList.node.active = true;
            that.btn_cancel.node.active = true;
            that.btn_ready.node.active = false;
          },
          push_card: function push_card() {
            that.pop_View.getComponent("Pop_up").setHelpPageView();
            that.showCardAni();
          },
          chat_start: function chat_start() {
            that.btn_mic.node.active = true;
            that.btn_pass.node.active = true;
          },
          chat_end: function chat_end() {},
          only_chat: function only_chat() {
            that.btn_mic.node.active = true;
          },
          take_team_start: function take_team_start() {
            that.hideAllChildren(that.UI_top, false);
            that.UI_top.active = true;
            that.btn_confirmSubmit.node.active = true;
          },
          take_team_end: function take_team_end() {},
          inform_vote_start: function inform_vote_start() {
            that.hideAllChildren(that.UI_top, false);
            that.UI_top.active = true;
            that.btn_approve.node.active = true;
            that.btn_appose.node.active = true;
          },
          inform_vote_end: function inform_vote_end() {},
          task_vote_start: function task_vote_start() {
            that.hideAllChildren(that.UI_top, false);
            that.UI_top.active = true;
            that.btn_support.node.active = true;
            that.btn_destroy.node.active = true;
          },
          task_vote_end: function task_vote_end() {},
          thug_kill_start: function thug_kill_start() {
            that.hideAllChildren(that.UI_top, false);
            that.UI_top.active = true;
            that.btn_assassin_kill.node.active = true;
            that.btn_mic.node.active = true;
          },
          thug_kill_end: function thug_kill_end() {},
          active_kill_start: function active_kill_start() {
            that.hideAllChildren(that.UI_top, false);
            that.UI_top.active = true;
            that.btn_kill.node.active = true;
          },
          active_kill_end: function active_kill_end() {}
        };
      },
      hideAllChildren: function hideAllChildren(node) {
        var isShow = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        node.children.forEach(function(item) {
          item.active = isShow;
        });
      },
      setDestroyBtnEnable: function setDestroyBtnEnable(touchable) {
        this.btn_destroy.getComponent(cc.Button).interactable = touchable;
      },
      showCardAni: function showCardAni() {
        var _this = this;
        this.isShowAnimation = true;
        var self_role = Utils.gameInfo.selfInfo.role;
        var url_A = Config.TextureUrl.card_A[self_role];
        Utils.loadRes(url_A).then(function(_spriteFrame) {
          _this.btn_card_A.node.children[0].getComponent(cc.Sprite).spriteFrame = _spriteFrame;
        }, function(err) {
          cc.log("\u83b7\u53d6\u56fe\u7247\u5931\u8d25,err");
        });
        var url_B = Config.TextureUrl.card_B[self_role];
        Utils.loadRes(url_B).then(function(_spriteFrame) {
          _this.card_B.spriteFrame = _spriteFrame;
        }, function(err) {
          cc.log("\u83b7\u53d6\u56fe\u7247\u5931\u8d25,err");
        });
        this.card_B.node.setPosition(0, 663);
        this.card_B.node.active = true;
        var delay = cc.delayTime(2);
        var action1 = cc.moveTo(.6, cc.v2(-290, 0));
        var action2 = cc.scaleTo(.6, .1, .1);
        var action3 = cc.rotateTo(.6, 722);
        var spawn = cc.spawn(action1, action2, action3);
        var callback = cc.callFunc(function() {
          _this.btn_card_A.node.active = true;
          _this.card_B.node.active = false;
          _this.isShowAnimation = false;
        });
        var sequence = cc.sequence(delay, spawn, callback);
        this.card_B.node.runAction(sequence);
      },
      setBtnStartEnable: function setBtnStartEnable(isEnable) {
        this.btn_start.interactable = isEnable;
      }
    });
    cc._RF.pop();
  }, {
    Config: "Config",
    Utils: "Utils"
  } ],
  crypto: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1adaelymq1OibUQNSqey0Gq", "crypto");
    "use strict";
    (function() {
      var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      window.Crypto = {};
      var util = Crypto.util = {
        rotl: function rotl(n, b) {
          return n << b | n >>> 32 - b;
        },
        rotr: function rotr(n, b) {
          return n << 32 - b | n >>> b;
        },
        endian: function endian(n) {
          if (n.constructor == Number) return 16711935 & util.rotl(n, 8) | 4278255360 & util.rotl(n, 24);
          for (var i = 0; i < n.length; i++) n[i] = util.endian(n[i]);
          return n;
        },
        randomBytes: function randomBytes(n) {
          for (var bytes = []; n > 0; n--) bytes.push(Math.floor(256 * Math.random()));
          return bytes;
        },
        stringToBytes: function stringToBytes(str) {
          var bytes = [];
          for (var i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i));
          return bytes;
        },
        bytesToString: function bytesToString(bytes) {
          var str = [];
          for (var i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));
          return str.join("");
        },
        stringToWords: function stringToWords(str) {
          var words = [];
          for (var c = 0, b = 0; c < str.length; c++, b += 8) words[b >>> 5] |= str.charCodeAt(c) << 24 - b % 32;
          return words;
        },
        bytesToWords: function bytesToWords(bytes) {
          var words = [];
          for (var i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << 24 - b % 32;
          return words;
        },
        wordsToBytes: function wordsToBytes(words) {
          var bytes = [];
          for (var b = 0; b < 32 * words.length; b += 8) bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
          return bytes;
        },
        bytesToHex: function bytesToHex(bytes) {
          var hex = [];
          for (var i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((15 & bytes[i]).toString(16));
          }
          return hex.join("");
        },
        hexToBytes: function hexToBytes(hex) {
          var bytes = [];
          for (var c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
          return bytes;
        },
        bytesToBase64: function bytesToBase64(bytes) {
          if ("function" == typeof btoa) return btoa(util.bytesToString(bytes));
          var base64 = [], overflow;
          for (var i = 0; i < bytes.length; i++) switch (i % 3) {
           case 0:
            base64.push(base64map.charAt(bytes[i] >>> 2));
            overflow = (3 & bytes[i]) << 4;
            break;

           case 1:
            base64.push(base64map.charAt(overflow | bytes[i] >>> 4));
            overflow = (15 & bytes[i]) << 2;
            break;

           case 2:
            base64.push(base64map.charAt(overflow | bytes[i] >>> 6));
            base64.push(base64map.charAt(63 & bytes[i]));
            overflow = -1;
          }
          void 0 != overflow && -1 != overflow && base64.push(base64map.charAt(overflow));
          while (base64.length % 4 != 0) base64.push("=");
          return base64.join("");
        },
        base64ToBytes: function base64ToBytes(base64) {
          if ("function" == typeof atob) return util.stringToBytes(atob(base64));
          base64 = base64.replace(/[^A-Z0-9+\/]/gi, "");
          var bytes = [];
          for (var i = 0; i < base64.length; i++) switch (i % 4) {
           case 1:
            bytes.push(base64map.indexOf(base64.charAt(i - 1)) << 2 | base64map.indexOf(base64.charAt(i)) >>> 4);
            break;

           case 2:
            bytes.push((15 & base64map.indexOf(base64.charAt(i - 1))) << 4 | base64map.indexOf(base64.charAt(i)) >>> 2);
            break;

           case 3:
            bytes.push((3 & base64map.indexOf(base64.charAt(i - 1))) << 6 | base64map.indexOf(base64.charAt(i)));
          }
          return bytes;
        }
      };
      Crypto.mode = {};
    })();
    cc._RF.pop();
  }, {} ],
  header: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe58c6IgZ1O6qmkITQVgxC1", "header");
    "use strict";
    var Utils = require("Utils");
    var Config = require("Config");
    cc.Class({
      extends: cc.Component,
      properties: {
        task_bar: cc.Node,
        num1: cc.Label,
        num2: cc.Label,
        num3: cc.Label,
        num4: cc.Label,
        num5: cc.Label,
        stage_sign: cc.Sprite,
        btn_recorder: cc.Button,
        taskAin_Arr: {
          type: Array,
          default: []
        }
      },
      start: function start() {
        this.stage_sign_url = {
          leading: "texture/stage_icon/icon_learning",
          regular: "texture/stage_icon/icon_regular",
          advanced: "texture/stage_icon/icon_advanced"
        };
        Config.playersNum <= 5 ? this.setStageSign("learning") : Config.playersNum <= 10 ? this.setStageSign("regular") : this.setStageSign("advanced");
      },
      showTask: function showTask() {
        var isShow = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.task_bar.active = isShow;
      },
      setTaskPlayer: function setTaskPlayer(player_Arr) {
        for (var index = 0; index < player_Arr.length; index++) {
          var num = index + 1;
          this["num" + num].string = player_Arr[index];
        }
      },
      setTaskStatus: function setTaskStatus(task_num) {
        var status = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "waiting";
        var that = this;
        var url = Config.TextureUrl.taskPlayer[status];
        Utils.loadRes(url, cc.SpriteFrame).then(function(_spriteFrame) {
          if (that.task_bar) {
            that.task_bar.children[task_num - 1].getComponent(cc.Sprite).spriteFrame = _spriteFrame;
            if ("waiting" != status) {
              var ani = AnimationManager.getInstance().playAnimation(Config.AnimationList.task, that.task_bar.children[task_num - 1], 12, 0, 0, 1, 1, 3, function() {});
              that.taskAin_Arr.push(ani);
            }
          }
        }, function(err) {
          console.log(err);
        });
      },
      resetTaskStatus: function resetTaskStatus() {
        for (var index = 0; index < this.task_bar.children.length; index++) {
          var round = index + 1;
          this.setTaskStatus(round, "waiting");
        }
        this.taskAin_Arr.forEach(function(animation) {
          animation.ani.node.active = false;
        });
        this.taskAin_Arr = [];
      },
      showSign: function showSign() {
        this.stage_sign.node.active = true;
      },
      hideSign: function hideSign() {
        this.stage_sign.node.active = false;
      },
      setStageSign: function setStageSign() {
        var sign = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "learning";
        var that = this;
        var url = Config.TextureUrl.stage_sign_url[sign];
        Utils.loadRes(url, cc.SpriteFrame).then(function(_spriteFrame) {
          that.stage_sign.spriteFrame = _spriteFrame;
        }, function(err) {
          console.log(err);
        });
      },
      showBtnRecorder: function showBtnRecorder() {
        this.btn_recorder.node.active = true;
      },
      hideBtnRecorder: function hideBtnRecorder() {
        this.btn_recorder.node.active = false;
      },
      showUI: function showUI() {
        var stage = Utils.gameInfo.gameState;
        if ("ready" == stage || "end" == stage) {
          this.hideBtnRecorder();
          this.showSign();
          this.showTask(false);
        } else if ("playing" == stage) {
          this.showBtnRecorder();
          this.hideSign();
          this.showTask(true);
        }
      }
    });
    cc._RF.pop();
  }, {
    Config: "Config",
    Utils: "Utils"
  } ],
  main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6ea55Z8axJIYxn5FKTOKfA", "main");
    "use strict";
    (function() {
      window.showLog = false;
      window.Log = function(msg) {
        true === window.showLog && cc.log(msg);
      };
      var GameData = GameData || {};
      window.GameData = GameData;
      GameData.uid = 0;
      var MsgCode = require("MsgCode");
      window.SC = MsgCode.SC;
      window.CS = MsgCode.CS;
      window.playerManager = require("PlayerManager").getInstance();
      window.message = require("Message").getInstance();
      window.Config = require("Config");
      window.Utils = require("Utils");
      window.JsbManager = require("JsbManager");
      var PanelMsg = require("PanelMsg");
      PanelMsg.init();
      window.AnimationManager = require("AnimationManager");
      window.AudioManager = require("AudioManager");
    })();
    cc._RF.pop();
  }, {
    AnimationManager: "AnimationManager",
    AudioManager: "AudioManager",
    Config: "Config",
    JsbManager: "JsbManager",
    Message: "Message",
    MsgCode: "MsgCode",
    PanelMsg: "PanelMsg",
    PlayerManager: "PlayerManager",
    Utils: "Utils"
  } ],
  md5: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b9bdqz24ZO5bdfNLPSQJx2", "md5");
    "use strict";
    (function() {
      var util = Crypto.util;
      var MD5 = Crypto.MD5 = function(message, options) {
        var digestbytes = util.wordsToBytes(MD5._md5(message));
        return options && options.asBytes ? digestbytes : options && options.asString ? util.bytesToString(digestbytes) : util.bytesToHex(digestbytes);
      };
      MD5._md5 = function(message) {
        var m = util.stringToWords(message), l = 8 * message.length, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (var i = 0; i < m.length; i++) m[i] = 16711935 & (m[i] << 8 | m[i] >>> 24) | 4278255360 & (m[i] << 24 | m[i] >>> 8);
        m[l >>> 5] |= 128 << l % 32;
        m[14 + (l + 64 >>> 9 << 4)] = l;
        for (var i = 0; i < m.length; i += 16) {
          var aa = a, bb = b, cc = c, dd = d;
          a = MD5._ff(a, b, c, d, m[i + 0], 7, -680876936);
          d = MD5._ff(d, a, b, c, m[i + 1], 12, -389564586);
          c = MD5._ff(c, d, a, b, m[i + 2], 17, 606105819);
          b = MD5._ff(b, c, d, a, m[i + 3], 22, -1044525330);
          a = MD5._ff(a, b, c, d, m[i + 4], 7, -176418897);
          d = MD5._ff(d, a, b, c, m[i + 5], 12, 1200080426);
          c = MD5._ff(c, d, a, b, m[i + 6], 17, -1473231341);
          b = MD5._ff(b, c, d, a, m[i + 7], 22, -45705983);
          a = MD5._ff(a, b, c, d, m[i + 8], 7, 1770035416);
          d = MD5._ff(d, a, b, c, m[i + 9], 12, -1958414417);
          c = MD5._ff(c, d, a, b, m[i + 10], 17, -42063);
          b = MD5._ff(b, c, d, a, m[i + 11], 22, -1990404162);
          a = MD5._ff(a, b, c, d, m[i + 12], 7, 1804603682);
          d = MD5._ff(d, a, b, c, m[i + 13], 12, -40341101);
          c = MD5._ff(c, d, a, b, m[i + 14], 17, -1502002290);
          b = MD5._ff(b, c, d, a, m[i + 15], 22, 1236535329);
          a = MD5._gg(a, b, c, d, m[i + 1], 5, -165796510);
          d = MD5._gg(d, a, b, c, m[i + 6], 9, -1069501632);
          c = MD5._gg(c, d, a, b, m[i + 11], 14, 643717713);
          b = MD5._gg(b, c, d, a, m[i + 0], 20, -373897302);
          a = MD5._gg(a, b, c, d, m[i + 5], 5, -701558691);
          d = MD5._gg(d, a, b, c, m[i + 10], 9, 38016083);
          c = MD5._gg(c, d, a, b, m[i + 15], 14, -660478335);
          b = MD5._gg(b, c, d, a, m[i + 4], 20, -405537848);
          a = MD5._gg(a, b, c, d, m[i + 9], 5, 568446438);
          d = MD5._gg(d, a, b, c, m[i + 14], 9, -1019803690);
          c = MD5._gg(c, d, a, b, m[i + 3], 14, -187363961);
          b = MD5._gg(b, c, d, a, m[i + 8], 20, 1163531501);
          a = MD5._gg(a, b, c, d, m[i + 13], 5, -1444681467);
          d = MD5._gg(d, a, b, c, m[i + 2], 9, -51403784);
          c = MD5._gg(c, d, a, b, m[i + 7], 14, 1735328473);
          b = MD5._gg(b, c, d, a, m[i + 12], 20, -1926607734);
          a = MD5._hh(a, b, c, d, m[i + 5], 4, -378558);
          d = MD5._hh(d, a, b, c, m[i + 8], 11, -2022574463);
          c = MD5._hh(c, d, a, b, m[i + 11], 16, 1839030562);
          b = MD5._hh(b, c, d, a, m[i + 14], 23, -35309556);
          a = MD5._hh(a, b, c, d, m[i + 1], 4, -1530992060);
          d = MD5._hh(d, a, b, c, m[i + 4], 11, 1272893353);
          c = MD5._hh(c, d, a, b, m[i + 7], 16, -155497632);
          b = MD5._hh(b, c, d, a, m[i + 10], 23, -1094730640);
          a = MD5._hh(a, b, c, d, m[i + 13], 4, 681279174);
          d = MD5._hh(d, a, b, c, m[i + 0], 11, -358537222);
          c = MD5._hh(c, d, a, b, m[i + 3], 16, -722521979);
          b = MD5._hh(b, c, d, a, m[i + 6], 23, 76029189);
          a = MD5._hh(a, b, c, d, m[i + 9], 4, -640364487);
          d = MD5._hh(d, a, b, c, m[i + 12], 11, -421815835);
          c = MD5._hh(c, d, a, b, m[i + 15], 16, 530742520);
          b = MD5._hh(b, c, d, a, m[i + 2], 23, -995338651);
          a = MD5._ii(a, b, c, d, m[i + 0], 6, -198630844);
          d = MD5._ii(d, a, b, c, m[i + 7], 10, 1126891415);
          c = MD5._ii(c, d, a, b, m[i + 14], 15, -1416354905);
          b = MD5._ii(b, c, d, a, m[i + 5], 21, -57434055);
          a = MD5._ii(a, b, c, d, m[i + 12], 6, 1700485571);
          d = MD5._ii(d, a, b, c, m[i + 3], 10, -1894986606);
          c = MD5._ii(c, d, a, b, m[i + 10], 15, -1051523);
          b = MD5._ii(b, c, d, a, m[i + 1], 21, -2054922799);
          a = MD5._ii(a, b, c, d, m[i + 8], 6, 1873313359);
          d = MD5._ii(d, a, b, c, m[i + 15], 10, -30611744);
          c = MD5._ii(c, d, a, b, m[i + 6], 15, -1560198380);
          b = MD5._ii(b, c, d, a, m[i + 13], 21, 1309151649);
          a = MD5._ii(a, b, c, d, m[i + 4], 6, -145523070);
          d = MD5._ii(d, a, b, c, m[i + 11], 10, -1120210379);
          c = MD5._ii(c, d, a, b, m[i + 2], 15, 718787259);
          b = MD5._ii(b, c, d, a, m[i + 9], 21, -343485551);
          a += aa;
          b += bb;
          c += cc;
          d += dd;
        }
        return util.endian([ a, b, c, d ]);
      };
      MD5._ff = function(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._gg = function(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._hh = function(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._ii = function(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._blocksize = 16;
    })();
    cc._RF.pop();
  }, {} ],
  seat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f3b601Hg1IAL9zkg73btWK", "seat");
    "use strict";
    var Config = require("Config");
    var Utils = require("Utils");
    cc.Class({
      extends: cc.Component,
      properties: {
        seat_team_member: cc.Sprite,
        seat_bg: cc.Sprite,
        seat_lock: cc.Sprite,
        noPlayer: cc.Sprite,
        avatar_mask: cc.Mask,
        avatar: cc.Sprite,
        speaking: cc.Node,
        seat_speaking_me: cc.Sprite,
        seat_speaking_other: cc.Sprite,
        nickname_node: cc.Sprite,
        nickname: cc.Label,
        seat_num_node: cc.Sprite,
        seat_id: cc.Label,
        id_mark: cc.Sprite,
        ready_status: cc.Node,
        seat_master: cc.Sprite,
        seat_ready: cc.Sprite,
        seat_arrow: cc.Sprite,
        seat_team_leader: cc.Sprite,
        choose_league: cc.Node,
        seat_noChoose: cc.Sprite,
        seat_choose: cc.Sprite,
        mark_list: cc.Node,
        mark_list_layout: cc.Layout,
        roleMarkPrefab: cc.Prefab,
        ProgressBar: cc.Node,
        circle_bar: cc.Sprite,
        circle_point: cc.Sprite,
        seat_nickname_bg_leader: cc.Node,
        seat_bg_leader: cc.Node,
        seat_num_bg_leader: cc.Node,
        seat_num_bg_self: cc.Node
      },
      onLoad: function onLoad() {
        var that = this;
        this.isAddTouchStart = false;
        this.id_mark.node.on("touchstart", function(e) {
          e.stopPropagation();
          this.clickMarkCallback(this.seatInfo);
        }, this);
        this.choose_league.on("touchstart", function(e) {
          e.stopPropagation();
          this.choose_league_callback();
        }, this);
        this.arrowAction();
      },
      onDisable: function onDisable() {
        this.node.off("touchstart", this.touchStartCallback, this);
      },
      initSeat: function initSeat(obj, this_parent) {
        var that = this;
        that.setSeatStatus("nobody");
        this.seatInfo = obj;
        this.seatInfo.playerInfo = {};
        if ("right" == obj.side) {
          this.id_mark.node.setPosition(45, 45);
          this.ready_status.setPosition(-50, 50);
          this.choose_league.setPosition(-90, 0);
          this.seat_team_leader.node.setPosition(-55, 50);
          this.seat_arrow.node.setPosition(-100, 0);
          this.seat_arrow.node.angle = 0;
          this.mark_list_layout.horizontalDirection = 1;
          this.mark_list_layout.node.setPosition(-26, 0);
        } else {
          this.id_mark.node.setPosition(-45, 45);
          this.ready_status.setPosition(50, 50);
          this.choose_league.setPosition(90, 0);
          this.seat_team_leader.node.setPosition(55, 50);
          this.seat_arrow.node.setPosition(100, 0);
          this.seat_arrow.node.angle = 180;
          this.mark_list_layout.horizontalDirection = 0;
          this.mark_list_layout.node.setPosition(26, 0);
        }
        if (obj.hasOwnProperty("seat_id")) {
          this.seat_id.string = obj.seat_id.toString();
          this.seat_num_node.node.active = true;
        }
        obj.hasOwnProperty("position") && this.node.setPosition(obj.position.x, obj.position.y);
        obj.hasOwnProperty("scale") && this.node.setScale(obj.scale);
        obj.hasOwnProperty("isLock") && obj.isLock && this.setSeatStatus("lock");
        if (!this.isAddTouchStart) {
          this.node.on("touchstart", function() {
            this.callBackSeatInfo(that.seatInfo);
          }, this_parent);
          this.isAddTouchStart = true;
        }
      },
      setData: function setData(_playerInfo) {
        var that = this;
        that.seatInfo.playerInfo = _playerInfo;
        that.seatInfo.seat_uid = _playerInfo.uid;
        if (0 == Utils.getJsonLength(_playerInfo)) {
          that.seatInfo.hasPlayer = false;
          var gameState = Utils.gameInfo.gameState;
          "ready" == gameState ? that.seatInfo.isLock ? that.setSeatStatus("lock") : that.setSeatStatus("nobody") : "playing" == gameState && that.setSeatStatus("lock");
          return;
        }
        that.seatInfo.hasPlayer = true;
        if (_playerInfo.hasOwnProperty("nickname")) {
          this.nickname.string = _playerInfo.nickname;
          this.nickname_node.node.active = true;
        }
        if (_playerInfo.hasOwnProperty("headimgurl")) {
          var avatarUrl = _playerInfo.headimgurl;
          cc.loader.load({
            url: avatarUrl
          }, function(err, texture) {
            if (!err) {
              that.seatInfo.playerInfo.avatar_texture = texture;
              that.avatar.spriteFrame = new cc.SpriteFrame(texture);
              that.avatar_mask.node.active = true;
            }
          });
        }
        "ready" == Utils.gameInfo.gameState && this.showMasterOrReady(Utils.gameInfo.roomInfo.ownerHouseUid == _playerInfo.uid);
        this.seat_num_bg_self.active = that.seatInfo.playerInfo.uid === Utils.gameInfo.selfInfo.uid;
      },
      showMasterOrReady: function showMasterOrReady(ready) {
        if (ready) this.showMaster(); else {
          this.hideMaster();
          this.seatInfo.playerInfo.hasOwnProperty("ready") && (this.seatInfo.playerInfo.ready ? this.showReady() : this.hideReady());
        }
      },
      hideMasterOrReady: function hideMasterOrReady() {
        this.hideMaster();
        this.hideReady();
      },
      updatePlayerInfo_Ready: function updatePlayerInfo_Ready(ready) {
        this.seatInfo.playerInfo.ready = ready;
      },
      getPlayerInfo_Ready: function getPlayerInfo_Ready() {
        return this.seatInfo.playerInfo.ready;
      },
      clickMarkCallback: function clickMarkCallback(_obj) {
        console.log("\u8eab\u4efd\u724c", _obj.seat_id);
        console.log(_obj.playerInfo.role);
        this.mark_list.active = !this.mark_list.active;
      },
      setMarkList: function setMarkList() {
        var markArr = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        this.mark_list_layout.node.removeAllChildren();
        var showMarkArr = [];
        if (0 == markArr.length) {
          if (this.seatInfo.playerInfo.uid == Utils.gameInfo.selfInfo.uid) return;
          var current_role = this.seatInfo.playerInfo.role;
          if ("unknown" === current_role) {
            var self_role = Utils.gameInfo.selfInfo.role;
            var playersNum = Config.playersNum;
            var curRolesNumArr = Utils.deepCopy(Config.rolesNum)[playersNum];
            var maybeRolesArr = Utils.deepCopy(Config.watchRoles[self_role].notSee);
            for (var m = 0; m < maybeRolesArr.length; m++) if (curRolesNumArr[maybeRolesArr[m]] > 0) {
              self_role === maybeRolesArr[m] && curRolesNumArr[maybeRolesArr[m]] > 1 && showMarkArr.push(maybeRolesArr[m]);
              self_role !== maybeRolesArr[m] && showMarkArr.push(maybeRolesArr[m]);
            }
          }
        } else {
          if (1 == markArr.length) return;
          showMarkArr = markArr;
        }
        for (var i in showMarkArr) {
          console.log(showMarkArr[i]);
          this.createRoleMark(showMarkArr[i]);
        }
      },
      createRoleMark: function createRoleMark(markId) {
        var newMarkSprite = cc.instantiate(this.roleMarkPrefab);
        var newMarkSpriteScript = newMarkSprite.getComponent("RoleMark");
        newMarkSpriteScript.setRoleMark(this, markId);
        this.mark_list_layout.node.addChild(newMarkSprite);
      },
      changeRoleMark: function changeRoleMark(replaceMark) {
        var that = this;
        this.mark_list.active = false;
        this.createRoleMark(this.seatInfo.playerInfo.role_marked);
        var url = Config.TextureUrl.mark[replaceMark];
        this.seatInfo.playerInfo.role_marked = replaceMark;
        Utils.loadRes(url).then(function(res) {
          that.id_mark.spriteFrame = res;
        });
      },
      setMark: function setMark() {
        var mark_id = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "unknown";
        var isForGameEnd = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var notSureRoleArr = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        if (!isForGameEnd) {
          this.seatInfo.playerInfo.role = mark_id;
          this.seatInfo.playerInfo.role_marked = mark_id;
          Array.isArray(notSureRoleArr) ? this.setMarkList(notSureRoleArr) : this.setMarkList();
        }
        var that = this;
        var url = Config.TextureUrl.mark[mark_id];
        Utils.loadRes(url).then(function(res) {
          that.id_mark.node.active = true;
          that.id_mark.spriteFrame = res;
        });
      },
      hideMark: function hideMark() {
        this.id_mark.node.active = false;
      },
      lockSeat: function lockSeat() {
        this.hideChildNode();
        this.seat_lock.node.active = true;
      },
      setSeatStatus: function setSeatStatus() {
        var status = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "nobody";
        this.hideChildNode();
        if ("nobody" == status) {
          this.seat_bg.node.active = true;
          this.noPlayer.node.active = true;
        } else "lock" == status && (this.seat_lock.node.active = true);
      },
      hideChildNode: function hideChildNode() {
        var boolean = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var childrenArr = this.node.children;
        childrenArr.forEach(function(item) {
          item.active = boolean;
        });
      },
      choose_league_callback: function choose_league_callback() {
        var isActive = this.seat_choose.node.active;
        this.seat_choose.node.active = !isActive;
        this.contentViewScript = cc.find("Canvas/content_view").getComponent("GameScene");
        var choosePlayer_UidArr = [];
        if (this.contentViewScript.isKill) {
          choosePlayer_UidArr = this.contentViewScript.chooseKillPlayer_UidArr;
          this.contentViewScript.thugToUid = this.seatInfo.seat_uid;
        } else choosePlayer_UidArr = this.contentViewScript.chooseTaskPlayer_UidArr;
        if (isActive) {
          this.contentViewScript.chooseLeagueNum--;
          var index = choosePlayer_UidArr.indexOf(this.seatInfo.seat_uid);
          index > -1 && choosePlayer_UidArr.splice(index, 1);
          console.log("\u53d6\u6d88" + this.seatInfo.seat_id + "\u53f7\u4e3a\u961f\u53cb");
        } else {
          this.contentViewScript.chooseLeagueNum++;
          choosePlayer_UidArr.push(this.seatInfo.seat_uid);
          console.log("\u9009\u62e9" + this.seatInfo.seat_id + "\u53f7\u4e3a\u961f\u53cb");
        }
        this.contentViewScript.checkChooseLeaguaLimit(choosePlayer_UidArr, this.contentViewScript.isKill);
      },
      showMaster: function showMaster() {
        this.seat_master.node.active = true;
        this.seat_ready.node.active = false;
        this.ready_status.active = true;
      },
      hideMaster: function hideMaster() {
        this.ready_status.active = false;
      },
      showReady: function showReady() {
        this.seat_master.node.active = false;
        this.seat_ready.node.active = true;
        this.ready_status.active = true;
      },
      hideReady: function hideReady() {
        this.ready_status.active = false;
      },
      showSpeaking: function showSpeaking() {
        var isSelf = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        var total_time = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var remain_time = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        this.speaking.active = true;
        this.seat_speaking_me.node.active = isSelf;
        this.seat_speaking_other.node.active = !isSelf;
        "playing" == Utils.gameInfo.gameState && total_time && remain_time && this.countDown().start(total_time, remain_time);
      },
      hideSpeaking: function hideSpeaking() {
        this.speaking.active = false;
        this.countDown().end();
        JsbManager.stopSpeack();
      },
      arrowAction: function arrowAction() {
        var action1 = cc.moveBy(.2, cc.v2(-5, 0));
        var action2 = cc.moveBy(.4, cc.v2(10, 0));
        var action3 = cc.moveBy(.2, cc.v2(-5, 0));
        this.seat_arrow.node.runAction(cc.repeatForever(cc.sequence(action1, action2, action3)));
      },
      showArrow: function showArrow() {
        this.seat_arrow.node.active = true;
      },
      hideArrow: function hideArrow() {
        this.seat_arrow.node.active = false;
      },
      showTeamLeader: function showTeamLeader() {
        this.seat_team_leader.node.active = true;
        this.seat_bg_leader.active = true;
        this.seat_nickname_bg_leader.active = true;
        this.seat_num_bg_leader.active = true;
      },
      hideTeamLeader: function hideTeamLeader() {
        this.seat_team_leader.node.active = false;
        this.seat_bg_leader.active = false;
        this.seat_nickname_bg_leader.active = false;
        this.seat_num_bg_leader.active = false;
      },
      showTeamMember: function showTeamMember() {
        this.seat_team_member.node.active = true;
      },
      hideTeamMember: function hideTeamMember() {
        this.seat_team_member.node.active = false;
      },
      showChooseLeague: function showChooseLeague() {
        this.seat_choose.node.active = false;
        this.seat_noChoose.node.active = true;
        this.choose_league.active = true;
      },
      hideChooseLeague: function hideChooseLeague() {
        this.choose_league.active = false;
      },
      setForResult: function setForResult(info) {
        var that = this;
        this.id_mark.node.setPosition(45, 45);
        this.nickname_node.spriteFrame = "";
        this.setMark(info.mark_id, true);
        this.nickname.string = info.nickname;
        this.seat_id.string = info.seat_id;
        this.seat_num_node.node.active = true;
        cc.loader.load({
          url: info.avatar
        }, function(err, texture) {
          if (!err) {
            that.avatar.spriteFrame = new cc.SpriteFrame(texture);
            that.avatar_mask.node.active = true;
          }
        });
        this.seat_num_bg_self.active = info.uid === Utils.gameInfo.selfInfo.uid;
      },
      resetSeat: function resetSeat() {
        var seatInfo = this.seatInfo;
        this.seatInfo.playerInfo = {};
        if (seatInfo.hasOwnProperty("isLock") && seatInfo.isLock) this.setSeatStatus("lock"); else {
          this.setSeatStatus("nobody");
          this.seat_num_node.node.active = true;
        }
      },
      countDown: function countDown() {
        var _this = this;
        return {
          start: function start(_total_time, _remain_time) {
            _this.count_time = {
              total_time: parseInt(_total_time),
              remain_time: parseInt(_remain_time)
            };
            _this.circle_bar.fillRange = _remain_time / _total_time;
            _this.ProgressBar.active = true;
            _this.isTiming = true;
          },
          end: function end() {
            _this.isTiming = false;
            _this.ProgressBar.active = false;
          },
          pause: function pause() {
            _this.isTiming = false;
          },
          continue: function _continue() {
            _this.isTiming = true;
          }
        };
      },
      update: function update(dt) {
        if (this.isTiming) {
          var _dt = Math.abs(1e3 * dt);
          var change_time = this.count_time.remain_time - _dt < 0 ? this.count_time.remain_time : _dt;
          var change_rate = change_time / this.count_time.total_time;
          this.circle_bar.fillRange -= change_rate;
          this.count_time.remain_time -= _dt;
          if (this.count_time.remain_time <= 0) {
            this.isTiming = false;
            this.ProgressBar.active = false;
          }
        }
      }
    });
    cc._RF.pop();
  }, {
    Config: "Config",
    Utils: "Utils"
  } ]
}, {}, [ "Canvas", "Config", "Message", "MsgCode", "PanelMsg", "Utils", "main", "GameScene", "HallScene", "HelloWorld", "ApplyItem", "ChatView", "ItemInfo", "LoadRes", "Loading", "Pop_up", "RecordTask", "RoleMark", "Tip", "bottom", "header", "seat", "crypto", "md5", "Animation", "AnimationManager", "AudioManager", "DataManager", "JsbManager", "PlayerManager", "Test", "ChangeIp", "NetWork" ]);