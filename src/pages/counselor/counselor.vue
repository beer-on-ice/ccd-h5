<template>
  <div class="counselor-box">
    <counselor-head
      :info="info"
      @showPhoneList="showPhoneList"
    ></counselor-head>
    <section class="discribe">
      <div class="title">个人介绍</div>
      <discribe-card
        style="margin-top: 20px;"
        :title="info.individualResume"
      ></discribe-card>
    </section>
    <section
      class="qiang"
      v-if="info.personalLabelArr && info.personalLabelArr.length"
    >
      <div class="title">印象墙</div>
      <ul>
        <li v-for="item in info.personalLabelArr" :key="item">{{ item }}</li>
      </ul>
    </section>
    <section
      class="card"
      v-if="info.competenceUrlList && info.competenceUrlList.length"
    >
      <div class="title">专业证书</div>
      <div class="card-list">
        <ul ref="cardList">
          <li v-for="item in info.competenceUrlList" :key="item.winPath">
            <img :src="item.tmpSrc" alt="competenceUrl" />
          </li>
        </ul>
      </div>
    </section>
    <section
      class="honor"
      v-if="info.honourUrlList && info.honourUrlList.length"
    >
      <div class="title">获得荣誉</div>
      <ul>
        <li v-for="item in info.honourUrlList" :key="item.winPath">
          <img :src="item.winPath" alt="荣誉" v-gallery:group4 />
          <div>{{ item.name }}</div>
          <div><span>查看</span><i class="iconfont iconright1"></i></div>
        </li>
      </ul>
    </section>
    <section class="work" v-if="workExpList && workExpList.length">
      <div class="title">工作经历</div>
      <list-tree
        :listData="workExpList"
        :showMoreText="true"
        :defaultLength="10"
      ></list-tree>
    </section>
    <section
      class="education"
      v-if="info.schoolExpList && info.schoolExpList.length"
    >
      <div class="title">教育经历</div>
      <school-list-tree
        :listData="info.schoolExpList"
        :defaultLength="1"
      ></school-list-tree>
    </section>
    <section class="fengcai" v-if="info.mienUrlList && info.mienUrlList.length">
      <div class="title">风采展示</div>
      <card-list :listData="info.mienUrlList"></card-list>
    </section>
    <section
      class="phone-select"
      v-show="phoneListVisible"
      @click="hidePhoneList"
    >
      <div class="wrapper">
        <h3>拨打电话</h3>
        <div class="phoneList">
          <a
            ref="caller"
            :href="`tel:${item}`"
            v-for="item in info.phoneList"
            :key="item"
          >
            <p>{{ item }}</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import counselorHead from "./components/counselor-head";
import discribeCard from "components/discribe-card";
import listTree from "./components/list-tree";
import schoolListTree from "./components/school-list-tree";
import cardList from "./components/card";
import apis from "../../api/common";

export default {
  components: {
    counselorHead,
    discribeCard,
    schoolListTree,
    listTree,
    cardList
  },
  data() {
    return {
      id: "",
      type: "",
      info: {},
      workExpList: [],
      phoneListVisible: false,
      isAndroid: false,
      isIOS: false
    };
  },
  created() {
    const {
      $route: {
        params: { id },
        query: { type }
      }
    } = this;
    this.id = id;
    this.type = type;
  },
  mounted() {
    this._calcCardWidth();
    this.fetchCounselorDetail();
    this.fetchWorkExperience();
    this._judgeClient();
  },
  methods: {
    async fetchCounselorDetail() {
      const {
        id,
        handleHeadUrl,
        handleBgUrl,
        handleJobExp,
        handleLabel,
        handleSchoolExp,
        handlePhone,
        handleCompetenceUrl
      } = this;
      try {
        let res;
        if (this.type === "app") {
          res = await apis.getCounselorInfo({ id });
        } else {
          res = await apis.previewShowSingleCompanyAdviser({ id });
        }
        const { code, data, msg } = res;
        if (code === 200) {
          this.info = data;
          handleHeadUrl(this.info);
          handleBgUrl(this.info);
          handleJobExp(this.info);
          handleLabel(this.info);
          handleSchoolExp(this.info);
          handlePhone(this.info);
          handleCompetenceUrl(this.info);
        } else {
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
    },
    async fetchWorkExperience() {
      const { id } = this;
      try {
        let res;
        if (this.type === "app") {
          res = await apis.getWorkExperiences({ adviserId: id });
        } else {
          res = await apis.previewWorkExperiences({ adviserId: id });
        }
        const { code, data, msg } = res;
        if (code === 200) {
          this.workExpList = data;
          this.workExpList.map(item => {
            item.startTime = item.startTime.replace(/-/g, ".");
            item.endTime = item.endTime.replace(/-/g, ".");
          });
        } else {
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
    },
    handleHeadUrl({ headUrl }) {
      if (headUrl !== "") {
        this.info.headUrl = headUrl.split(";")[0];
      }
    },
    handleBgUrl({ backgroundUrl }) {
      if (backgroundUrl !== "") {
        this.info.backgroundUrl = backgroundUrl.split(";")[0];
      }
    },
    handleJobExp({ yearOfEmployment }) {
      let dateStart = new Date(yearOfEmployment);
      let dateEnd = new Date(new Date().getTime());
      let difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
      if (difValue < 365) {
        this.info.jobRange = "不足一年";
      } else if (difValue >= 365) {
        let num = Math.floor(difValue / 365);
        this.info.jobRange = `从业${num}年`;
      } else {
        this.info.jobRange = "从业时间有误";
      }
    },
    handleLabel({ personalLabel }) {
      if (personalLabel !== "") {
        this.info.personalLabelArr = personalLabel.split(";");
      }
    },
    handlePhone({ phone }) {
      if (phone !== "") {
        this.info.phoneList = phone.split(";");
      }
    },
    handleSchoolExp({
      schoolName,
      startTime,
      endTime,
      professionalTitle,
      highestEducation
    }) {
      if (schoolName !== "") {
        let start = startTime.replace(/-/g, ".");
        let end = endTime.replace(/-/g, ".");
        this.info.schoolExpList = [
          {
            schoolName,
            startTime: start,
            endTime: end,
            professionalTitle,
            highestEducation
          }
        ];
      } else {
        this.info.schoolExpList = [];
      }
    },
    handleCompetenceUrl({ competenceUrlList }) {
      if (competenceUrlList.length) {
        competenceUrlList.map(item => {
          switch (item.name) {
            case "AFP金融理财师":
              item.tmpSrc = require("./img/1.png");
              break;
            case "CFP国际金融理财师":
              item.tmpSrc = require("./img/2.png");
              break;
            case "CHFP国家理财规划师":
              item.tmpSrc = require("./img/3.png");
              break;
            case "CPA注册会计师":
              item.tmpSrc = require("./img/4.png");
              break;
            case "CFA金融特许分析师":
              item.tmpSrc = require("./img/5.png");
              break;
            case "FRM金融风险管理师":
              item.tmpSrc = require("./img/6.png");
              break;
            case "CPB认证私人银行家":
              item.tmpSrc = require("./img/7.png");
              break;
            case "MDRT百万圆桌会议":
              item.tmpSrc = require("./img/8.png");
              break;
            case "IDA国际龙奖":
              item.tmpSrc = require("./img/9.png");
              break;
            case "RFP注册财务策划师":
              item.tmpSrc = require("./img/10.png");
              break;
            case "大同保险DRM认证":
              item.tmpSrc = require("./img/11.png");
              break;
            case "期货分析师资格":
              item.tmpSrc = require("./img/12.png");
              break;
            case "证券分析师资格":
              item.tmpSrc = require("./img/13.png");
              break;
            case "证券投资顾问资格":
              item.tmpSrc = require("./img/14.png");
              break;
            case "银行从业资格":
              item.tmpSrc = require("./img/15.png");
              break;
            case "基金从业资格证":
              item.tmpSrc = require("./img/16.png");
              break;
            case "证券从业资格证":
              item.tmpSrc = require("./img/17.png");
              break;
            case "期货从业资格证":
              item.tmpSrc = require("./img/18.png");
              break;
            case "黄金从业资格证":
              item.tmpSrc = require("./img/19.png");
              break;
            case "贵金属分析师资格证":
              item.tmpSrc = require("./img/20.png");
              break;
            case "保险代理人资格证":
              item.tmpSrc = require("./img/21.png");
              break;
            default:
              item.tmpSrc = item.winPath;
              break;
          }
        });
      }
    },
    showPhoneList() {
      this.phoneListVisible = true;
    },
    hidePhoneList() {
      this.phoneListVisible = false;
    },
    // androidCall(item) {
    //   if (this.isAndroid) {
    //     alert(1)
    //     this.$refs.caller.map(item => {
    //       item.href = "javascript:;";
    //     });
    //     window.Android.call(item);
    //   }
    // },
    _calcCardWidth() {
      if (this.info.competenceUrlList && this.info.competenceUrlList.length) {
        this.$refs.cardList.style.width = 150 * 3 + "px";
      }
    },
    _judgeClient() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        this.isAndroid = isAndroid;
      } else if (isIOS) {
        this.isIOS = isIOS;
      } else {
        return "PC";
      }
    }
  }
};
</script>

<style lang="stylus" scoped src="./counselor.styl"></style>
