<template>
  <q-dialog v-model="isShow" :persistent="true">
    <div class="dialog-content">
      <q-btn icon="close" flat v-close-popup class="close" />
      <div class="dialog-head">立即预约</div>
      <div class="dialog-body">
        <div class="input-wrapper">
          <input class="input" v-model="name" placeholder="请输入姓名" />
          <span>姓名</span>
        </div>
        <div class="input-wrapper">
          <input class="input" v-model="phone" placeholder="请输入手机号码" />
          <span>手机</span>
        </div>
        <div class="warn-text">{{ tip }}</div>
      </div>
      <div class="bottom-btn">
        <div @click="cancel">取消</div>
        <div @click="submit">立即提交</div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import apis from "../../../api/common";
export default {
  data() {
    return {
      isShow: false,
      name: "",
      phone: "",
      tip: "",
      type: ""
    };
  },
  created() {
    const {
      $route: {
        query: { type }
      }
    } = this;
    this.type = type;
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
      if (this.type === "prev") {
        this.tip = "预览模式无法预约";
        return;
      }
      const { name, phone } = this;
      let today = new Date();
      const param = {
        activityInformationId: this.$route.params.id,
        name,
        phone,
        bookingTime: `${today.getFullYear()}-${today.getMonth() +
          1}-${today.getDate()}`
      };
      if (name.trim() === "") {
        this.tip = "请输入姓名！";
        return;
      } else if (phone.trim() === "") {
        this.tip = "请输入手机号！";
        return;
      }
      try {
        const res = await apis.eventBooking(param);
        const {
          data: { code, msg }
        } = res;
        if (code === 200) {
          this.tip = "预约成功！";
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

<style lang="stylus" src="./order-dialog.styl"></style>
