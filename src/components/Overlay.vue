<template>
  <div class="container" @click.stop>
    <h4>请牢记以下验证码</h4>
    <p>
      此验证码将于
      <span style="color: red; display: inline-block">{{ second }}</span>
      秒后过期
    </p>
    <p>用普通话朗读数字，视频时长<span style="color: red">3-8</span>秒最佳</p>
    <div class="panel">
      <number-panel
        :value="item"
        v-for="(item, index) in codeArr"
        :key="index"
      ></number-panel>
    </div>
    <Button type="info" class="button">记住了，开始录制</Button>
  </div>
</template>

<script>
import { Button } from "vant";
import NumberPanel from "@/components/NumberPanel.vue";
export default {
  name: "OverlayContainer",
  components: { Button, NumberPanel },
  data() {
    return {
      second: 60,
    };
  },
  computed: {
    codeLength() {
      const value = Math.floor(Math.random() * 10);
      if (0 <= value && value < 3) {
        return 3;
      } else if (3 <= value && value < 6) {
        return 4;
      } else {
        return 5;
      }
    },
    codeArr() {
      let arr = [];
      if (this.codeLength) {
        for (let index = 0; index < this.codeLength; index++) {
          arr.push(Math.floor(Math.random() * 10));
        }
      }

      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  min-width: 80vw;
  height: 40vh;
  background-color: #fff;
  position: relative;

  .button {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 12px;
  }
}
</style>
