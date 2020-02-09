<template>
    <div class="main">
      <div class="opt">
        <div class="opt-video">
          <img :src="imgBgPath" class="video-bg-img" @click="openVideo"/>
          <div class="stock">
            <div class="stock-one">
              <p class="stock-head">{{stockOneHead}}</p>
              <p class="stock-value" v-if="positiveOneStockValue">{{stockOneValue}}</p>
              <p class="stock-value-green" v-else>{{stockOneValue}}</p>
            </div>
            <div class="stock-two">
              <p class="stock-head">{{stockTwoHead}}</p>
              <p class="stock-value" v-if="positiveTwoStockValue">{{stockTwoValue}}</p>
              <p class="stock-value-green" v-else>{{stockTwoValue}}</p>
            </div>
          </div>
        </div>
        <div class="opt-card">
          <div>
            <p class="day-detail">第1天</p>
            <img v-if="signInOne" class="day-bg-active" src="../assets/main-opt-active1.png" @click="changeVideoBg(0)"/>
            <img v-else class="day-bg-disabled" src="../assets/main-opt-disabled1.png"/>
          </div>
          <div>
            <p class="day-detail">第2天</p>
            <img v-if="signInTwo" class="day-bg-active" src="../assets/main-opt-active2.png" @click="changeVideoBg(1)"/>
            <img v-else class="day-bg-disabled" src="../assets/main-opt-disabled2.png"/>
          </div>
          <div>
            <p class="day-detail">第3天</p>
            <img v-if="signInThree" class="day-bg-active" src="../assets/main-opt-active3.png" @click="changeVideoBg(2)"/>
            <img v-else class="day-bg-disabled" src="../assets/main-opt-disabled3.png"/>
          </div>
          <div>
            <p class="day-detail">第4天</p>
            <img v-if="signInFour" class="day-bg-active" src="../assets/main-opt-active4.png" @click="changeVideoBg(3)"/>
            <img v-else class="day-bg-disabled" src="../assets/main-opt-disabled4.png"/>
          </div>
        </div>
        <p v-if="signined" class="opt-btn-disabled">
          <span>打卡完成，请明天再来</span>
        </p>
        <div v-else class="opt-btn-active" @click="card">
          <span>打卡解锁</span>
        </div>
      </div>
      <div class="opt-activity-tip">
        <p class="activity-tip-head">活动说明</p>
        <p>1.本次活动截止<span class="import-activity-tip">12月31日</span>，打卡结束后请咨询助理查看更多课程；</p>
        <p>2.打卡即可<span class="import-activity-tip">免费观看</span>马力老师的《波段炼金术》价值选股篇体验课程；</p>
        <p>3.免费学习课程共分为4节，每人每天仅可打卡一次，每次打卡可观看一节。</p>
      </div>
      <p class="opt-divide"></p>
      <p class="opt-invest-tip">投资有风险 入市需谨慎</p>
      <div class="tips" v-show="showAlert">
        <div class="tips-text">
          <p class="alert-text">{{content}}</p>
          <button class="alert-btn" @click="closeMsgTip">关闭</button>
        </div>
      </div>
      <div class="video-dialog" v-show="showVideoDialog">
        <div class="video-dialog-detail">
          <video id="lessonVideo" :src="videoPath" :poster="videoBgPath" controls="controls"  controlsList="nodownload" autoplay playsinline webkit-playsinline width="100%">
          </video>
          <img src="../assets/dialog-close.png" @click="closeVideoDialog" class="video-close-dialog"/>
        </div>
      </div>
      <div class="wx-dialog" v-show="showWxDialog">
        <div class="dialog-main">
         <div class="pop-content-wrap">
          <p class="dialog-copy">
            <span>助理微信</span>
            <span class="dialog-wx-value">{{wxValue}}</span>
            <span>已复制</span>
          </p>
          <p class="dialog-add">
            <span class="dialog-friend">添加助理好友成功即可</span><span class="dialog-consult">咨询</span>
          </p>
          <div class="dialog-next" @click="jumpWx">
            <p class="dialog-next-font">前往微信</p>
          </div>
         </div>
         <img class="dialog-close" src="../assets/dialog-close.png" @click="closeWxDialog"/>
        </div>
      </div>
    </div>
</template>

<script>
import {getWxValue, addSignIn, getTodaySignStatus, config} from "../api/index";
export default {
  data: function() {
    return {
      showMain: true,
      signined: false,
      showVideo: false,
      signInOne: false,
      signInTwo: false,
      signInThree: false,
      signInFour: false,
      showAlert: false,
      showVideoDialog: false,
      showWxDialog: false,
      wxValue: "YTXxxxx",
      stockOneHead: "",
      stockOneValue: "",
      stockTwoHead: "",
      stockTwoValue: "",
      imgBgPath: require("../assets/lesson1-bg.png"),
      videoBgPath: require("../assets/video-bg1.png"),
      videoPath: "https://upload.jinyi999.cn/production/20181116/video/波段炼金术第1课.mp4",
      videPathArray: [
        "https://upload.jinyi999.cn/production/20181116/video/波段炼金术第1课.mp4",
        "https://upload.jinyi999.cn/production/20181116/video/波段炼金术第2课.mp4",
        "https://upload.jinyi999.cn/production/20181116/video/波段炼金术第3课.mp4",
        "https://upload.jinyi999.cn/production/20181116/video/波段炼金术第4课.mp4"
      ],
      imgPathArray: [
        require("../assets/lesson1-bg.png"),
        require("../assets/lesson2-bg.png"),
        require("../assets/lesson3-bg.png"),
        require("../assets/lesson4-bg.png")
      ],
      videoBgArray: [
        require("../assets/video-bg1.png"),
        require("../assets/video-bg2.png"),
        require("../assets/video-bg3.png"),
        require("../assets/video-bg4.png")
      ],
      deviceId: "",
      count: 0,
      content: "",
      positiveOneStockValue: false,
      positiveTwoStockValue: false,
      platform: '',
      idfa: '',
      markettype: ''
    };
  },
  methods: {
    async getTodaySignStatus() {
      let status = await getTodaySignStatus({ deviceId: this.deviceId ? this.deviceId : this.idfa });
      if (status.code !== 0) {
        this.showAlert = true;
        this.content = "获取今日打开信息失败";
      } else {
        // 今日是否已打卡
        this.signined = status.data.todaySignIn;
        // 打卡的天数
        this.count = status.data.count;
        // 激活对应的按钮
        this.activeBtn(this.count);
      }
    },
    async addSignIn() {
      let res = await addSignIn({ deviceId: this.deviceId ? this.deviceId : this.idfa });
      if (res.code === 0) {
        if (this.count < 4) {
          this.showAlert = true;
          this.content = "打卡成功！";
        }
        this.getTodaySignStatus();
      } else {
        this.showAlert = true;
        this.content = "打卡失败！";
      }
    },
    async getWxValueFromWeb() {
      let res = await getWxValue({deviceid: this.deviceId, platform: this.platform, idfa: this.idfa, markettype: this.markettype});
      if (res.code !== 0) {
        this.showAlert = true;
        this.content = "获取微信号失败！";
      } else {
        this.wxValue = res.data.wechat;
      }
    },
    card() {
      if (!this.deviceId && !this.idfa) {
        this.showAlert = true;
        this.content = "请先授权，然后再来打卡";
        return;
      } else {
        if (!this.signined) {
          // 今日未打卡.打卡并显示弹框
          if (this.count >= 4) {
            this.showWxDialog = true;
            this.getWxValueFromWeb();
          }
          this.addSignIn();
        } else if (this.signined) {
          // 今日已打卡
          this.showAlert = true;
          this.content = "今日已打卡，请明天再来吧！";
        }
      }
    },
    jumpWx() {
      let wxValue = this.wxValue // 次数是一定要申明,不然无法获取
      // 复制微信到剪切板
      let clipboard = new Clipboard(".dialog-next-font", {
        text: function() {
          console.log("剪切板中的微信是:" + wxValue);
          return wxValue;
        }
      });
      clipboard.on("success", function(e) {
        console.info("Action:", e.action); // 复制类型
        console.info("Text:", e.text); // 复制文本
        console.info("Trigger:", e.trigger); // 复制节点
        e.clearSelection(); // 取消选择节点
      });
      clipboard.on("error", function(e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });

      // 跳转微信
      window.location.href = "weixin://";
    },
    closeWxDialog() {
      this.showWxDialog = false;
    },
    getDeviceId() {
      this.platform = /Android/i.test(navigator.userAgent) ? 'android' : /iPhone/i.test(navigator.userAgent) ? 'ios' : ''
      
      let params = this.parseUrl();
      this.idfa = params.idfa ? params.idfa : ''
      this.deviceId = params.deviceId ? params.deviceId : '';
      if (!this.deviceId && !this.idfa) {
        this.showAlert = true;
        this.content = "请先授权，然后再来打卡";
      } 
      if (this.idfa) {
        this.markettype = '12'
      } else {
        this.markettype = '42'
      }
    },
    getLocalStockInfo() {
      this.stockOneHead = config.stock[0].head;
      this.stockOneValue = config.stock[0].value;
      this.stockTwoHead = config.stock[1].head;
      this.stockTwoValue = config.stock[1].value;
      if (parseInt(this.stockOneValue) >= 0) {
        this.positiveOneStockValue = true
      }
      if (parseInt(this.stockTwoValue) >= 0) {
        this.positiveTwoStockValue = true
      }
    },
    activeBtn(num) {
      switch (num) {
        case 0:
          this.signInOne = false;
          this.signInTwo = false;
          this.signInThree = false;
          this.signInFour = false;
          // 第几天打卡就显示第几天的背景
          this.imgBgPath = require("../assets/lesson1-bg.png");
          this.videoBgPath = require("../assets/video-bg1.png");
          break;
        case 1:
          this.signInOne = true;
          this.signInTwo = false;
          this.signInThree = false;
          this.signInFour = false;
          // 第几天打卡就显示第几天的背景
          this.imgBgPath = require("../assets/lesson1-bg.png");
          this.videoBgPath = require("../assets/video-bg1.png");
          break;
        case 2:
          this.signInOne = true;
          this.signInTwo = true;
          this.signInThree = false;
          this.signInFour = false;
          this.imgBgPath = require("../assets/lesson2-bg.png");
          this.videoBgPath = require("../assets/video-bg2.png");
          break;
        case 3:
          this.signInOne = true;
          this.signInTwo = true;
          this.signInThree = true;
          this.signInFour = false;
          this.imgBgPath = require("../assets/lesson3-bg.png");
          this.videoBgPath = require("../assets/video-bg3.png");
          break;
        case 4:
          this.signInOne = true;
          this.signInTwo = true;
          this.signInThree = true;
          this.signInFour = true;
          this.imgBgPath = require("../assets/lesson4-bg.png");
          this.videoBgPath = require("../assets/video-bg4.png");
        default:
          // 打卡第四天之后都激活所有按钮
          this.signInOne = true;
          this.signInTwo = true;
          this.signInThree = true;
          this.signInFour = true;
          this.imgBgPath = require("../assets/lesson4-bg.png");
          this.videoBgPath = require("../assets/video-bg4.png");
          break;
      }
    },
    changeVideoBg(num) {
      console.log("点击的是:" + num);
      this.videoPath = this.videPathArray[num];
      this.imgBgPath = this.imgPathArray[num];
      this.videoBgPath = this.videoBgArray[num];
    },
    closeVideoDialog() {
      console.log("关闭视频播放按钮");
      let videoBtn = document.getElementById('lessonVideo')
      videoBtn.muted = true // 关闭视频声音
      videoBtn.pause() // 暂停视频
      this.showVideoDialog = false;
    },
    openVideo() {
      if (this.count === 0) {
        this.showAlert = true;
        this.content = "请打卡解锁视频";
      } else {
        this.showVideoDialog = true;
        // 自动播放
        document.getElementById('lessonVideo').play();
      }
    },
    parseUrl() {
      let searchHref = window.location.search.replace("?", "");
      let params = searchHref.split("&");
      let returnParam = {};
      params.forEach(function(param) {
        let paramSplit = param.split("=");
        returnParam[paramSplit[0]] = paramSplit[1];
      });
      return returnParam;
    },
    closeMsgTip() {
      this.showAlert = false;
    }
  },
  mounted() {
    this.getDeviceId();
    this.getTodaySignStatus();
    this.getLocalStockInfo();
  }
};
</script>

<style>

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background: url("../assets/main-bg.png") no-repeat;
  background-size: 100% 100%;
  background-color: #6393ff;
}

.opt {
  width: 6.92rem;
  height: 6.46rem;
  padding:.28rem .24rem .32rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 .05rem .16rem 0 rgba(9, 194, 255, 0.15);
  -webkit-box-shadow: 0 .05rem .16rem 0 rgba(9, 194, 255, 0.15);
  border-radius: .2rem;
  margin-top: 4.8rem;
}

.opt-btn-disabled {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 5.82rem;
  height: 1.16rem;
  font-size: .36rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
  line-height: .42rem;
  background-color: #c2c2c2;
  border-radius: .5rem;
  margin-top: .3rem;
  margin-bottom: .2rem;
}

.opt-btn-active {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 5.82rem;
  height: 1.16rem;
  font-size: .42rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
  line-height: .42rem;
  background: linear-gradient(to right, #ff787d 50%, #ff434f 100%);
  border-radius: .5rem;
  margin: 0 auto;
  margin-top: .14rem;
}

.opt-video {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.opt-card {
  padding: 0 .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: PingFang-SC-Medium;
  color: rgba(160, 160, 160, 1);
  margin-top: .44rem;
  justify-content: space-between;
}

.day-detail {
  text-align: center;
  font-size: .2rem;
  line-height: .2rem;
}

.day-bg-disabled {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1.34rem;
  height: 1.16rem;
  margin-top: .1rem;
}

.day-bg-active {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1.34rem;
  height: 1.16rem;
}

.day-font {
  font-size: 0.2rem;
  font-weight: bold;
  color: rgba(192, 192, 192, 1);
  text-align: center;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  margin-top: 0.3rem;
}

.day-active-font {
  font-size: 0.1rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  margin-top: 0.3rem;
}

.day-small-font {
  font-size: 0.06rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(192, 192, 192, 1);
  text-align: center;
  margin-top: 0.3rem;
}

.day-small-active-font {
  margin-top: 0.3rem;
  font-size: 0.14rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}

.day-band {
  font-size: 0.06rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(151, 151, 151, 1);
  margin-top: 0.21rem;
}

.day-small-band {
  font-size: 0.12rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(151, 151, 151, 1);
  margin-top: 0.21rem;
}

.day-active-band {
  font-size: 0.06rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(88, 181, 255, 1);
  margin-top: 0.1rem;
}

.day-small-active-band {
  font-size: 0.08rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(88, 181, 255, 1);
  margin-top: 0.1rem;
}

.day-lock {
  position: absolute;
  padding-top: 0.6rem;
  width: 1.28rem;
}

.stock {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: .2rem;
}

.stock-one {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1.46rem;
  height: .88rem;
  font-family: PingFang-SC-Medium;
  background: url("../assets/stock-bottom.png") no-repeat;
  background-size: 100% 100%;
}

.stock-two {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 1.46rem;
  height: .88rem;
  margin-top: .45rem;
  font-family: PingFang-SC-Medium;
  background: url("../assets/stock-bottom.png") no-repeat;
  background-size: 100% 100%;
}

.stock-head {
  font-size: .18rem;
  color: rgba(83, 83, 83, 1);
  text-align: center;
}

.stock-value {
  font-size: .26rem;
  color: #f83741;
  text-align: center;
}

.stock-value-green {
  font-size: .26rem;
  color: green;
  text-align: center;
}

.video-bg-img {
  width: 4.8rem;
  height: 2.7rem;
}

.opt-activity-tip {
  width: 6.92rem;
  margin: .28rem auto 0;
}
.opt-activity-tip p{
  font-size: .2rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: .36rem;
}

.opt-activity-tip .activity-tip-head {
  font-size: .24rem;
  line-height: .24rem;
  font-family: PingFang-SC-Heavy;
  margin-bottom: .08rem;
}

.import-activity-tip {
  color: #ffff00;
}

.opt-divide {
  width: 6.92rem;
  border-top: 1px solid rgba(255, 255, 255, 1);
  margin: .16rem 0 .22rem;
}

.opt-invest-tip {
  font-size: .16rem;
  font-family: PingFang-SC-Medium;
  color: rgba(255, 255, 255, 1);
  line-height: .16rem;
  text-align: center;
  margin-bottom: .52rem;
}

p {
  margin: 0 auto;
}

.wx-dialog {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.video-dialog {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.dialog-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7.5rem;
  height: 5.64rem;
  margin-top: 1.5rem;
  background: url("../assets/dialog-bg.png") no-repeat center / contain;
}

.dialog-close {
  width: 0.68rem;
  margin-top: 1rem;
}

.dialog-next {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 5.55rem;
  height: 1.15rem;
  margin-top: 0.2rem;
  text-align: center;
  background: linear-gradient(to right, #ff787d 50%, #ff434f 100%);
  border-radius: 0.5rem;
}

.dialog-next-font {
  font-size: .42rem;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
}

.dialog-next-font::after {
  content: "\00a0";
  background: url("../assets/dialog-next.png") no-repeat center / contain;
  margin-left: .1rem;
}

.dialog-friend {
  color: #485e76;
  font-family: PingFang-SC-Medium;
}

.dialog-consult {
  color: #09c2ff;
  font-family: PingFang-SC-Bold;
}

.dialog-wx-value {
  color: #09c2ff;
  border: 2px solid #09c2ff;
  border-radius: 0.25rem;
}

.dialog-add,
.dialog-copy {
  line-height: 2;
}

.dialog-add {
  font-size: 0.32rem;
  text-align: center;
}

.dialog-copy {
  color: #485e76;
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-size: 0.36rem;
}

.pop-content-wrap {
  margin-top: 2rem;
}

.main-left-circle {
  position: absolute;
  width: 0.61rem;
  left: 0.08rem;
  top: 7.4rem;
}

.main-bottom-line {
  position: absolute;
  width: 2.17rem;
  height: 0.5rem;
  right: 0.19rem;
  bottom: 2.47rem;
}

.tips {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7)
}

.tips-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: .2rem;
  width: 5rem;
  height: 3rem;
  margin: 0 auto;
  margin-top: 5rem;
  background-color: rgb(255, 255, 255);
}

.alert-text {
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-size: 0.3rem;
  color: gray;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
}

.alert-btn {
  width: 2rem;
  height: 0.5rem;
  font-size: 0.2rem;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(to right, #ff787d 50%, #ff434f 100%);
  border-radius: .2rem;
  border: 0px rgb(255, 255, 255);
}

.video-close-dialog {
  width: 0.68rem;
  margin-top: 0.1rem;
  justify-content: center;
}

.video-dialog-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
