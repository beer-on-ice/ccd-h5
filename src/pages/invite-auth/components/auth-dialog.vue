<template>
  <q-dialog v-model="isShow" no-backdrop-dismiss>
    <div class="dialog-content">
      <q-btn icon="close" flat v-close-popup class="close" />
      <div class="dialog-head">企业认证申请</div>
      <div class="dialog-tip">请填写联系方式，我们会尽快与您联系</div>
      <div class="dialog-body">
        <div class="input-wrapper">
          <input class="input" v-model="name" placeholder="请输入姓名" />
          <span>姓名</span>
        </div>
        <div class="input-wrapper">
          <input class="input" v-model="position" placeholder="请输入职业" />
          <span>职业</span>
        </div>
        <div class="input-wrapper">
          <input class="input" v-model="phone" placeholder="请输入手机号码" />
          <span>手机</span>
        </div>
        <div class="warn-text">{{ tip }}</div>
      </div>
      <div class="bottom-btn">
        <div @click="submit">立即提交</div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import moment from "moment";
import apis from "../../../api/common";
export default {
  data() {
    return {
      companyUrl: "",
      isShow: false,
      name: "",
      position: "",
      phone: "",
      tip: ""
    };
  },
  created() {
    const {
      $route: {
        params: { companyUrl }
      }
    } = this;
    this.companyUrl = companyUrl;
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.tip = "";
      this.isShow = false;
    },
    cancel() {
      this.hide();
    },
    async submit() {
      const {
        name,
        position,
        phone,
        $route: {
          params: { companyUrl }
        }
      } = this;
      let today = new Date();
      const param = {
        companyUrl,
        name,
        position,
        phone,
        applicationTime: moment().format("YYYY-MM-DD HH:mm:ss")
      };
      if (name.trim() === "") {
        this.tip = "请输入姓名！";
        return;
      } else if (position.trim() === "") {
        this.tip = "请输入职业！";
        return;
      } else if (phone.trim() === "") {
        this.tip = "请输入手机号！";
        return;
      }
      try {
        const res = await apis.appButtonIdentification(param);
        const {
          data: { code, msg }
        } = res;
        if (code === 200) {
          this.tip = msg;
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.hide();
          }, 500);
        } else {
          this.tip = msg;
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
    }
  }
};
</script>

<style lang="stylus" src="./auth-dialog.styl"></style>
