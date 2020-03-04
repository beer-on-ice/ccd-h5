<template>
  <div class="stocks-box">
    <div class="stocks-list">
      <div class="stocks-head">
        <i class="iconfont iconjianhao"></i>
        <span>{{ companyName }}</span>
      </div>
      <ul>
        <li
          class="li-big clearfix"
          v-for="item in info"
          :key="item.shareholder"
        >
          <div class="list-title">{{ item.shareholder }}</div>
          <div class="list-fl">
            <div class="list-big" v-for="el in item.holderTags" :key="el">
              {{ el }}
            </div>
          </div>

          <div>
            <span class="stocks-key">股比：</span
            ><span class="stocks-val">{{ item.shareholding }}</span>
            <span class="stocks-key">认缴金额：</span
            ><span class="stocks-val">{{ item.contributions }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apis from "../../api/common";
export default {
  data() {
    return {
      companyName: "",
      id: "",
      info: []
    };
  },
  created() {
    const {
      $route: {
        params: { id },
        query: { name }
      }
    } = this;
    this.id = id;
    this.companyName = name;
  },
  mounted() {
    this.fetchCompanyHolder();
  },
  methods: {
    async fetchCompanyHolder() {
      const { id, handleTag } = this;
      try {
        const { code, data, msg } = await apis.getCompanyHolder({
          companyId: id
        });
        if (code === 200) {
          this.info = data;
          handleTag(this.info);
        } else {
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
    },
    handleTag(arr) {
      arr.forEach(item => {
        if (item.holderTags !== "") {
          item.holderTags = item.holderTags.split(",");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped src="./stocks.styl"></style>
