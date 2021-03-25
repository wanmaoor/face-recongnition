<template>
  <div class="result">
    <div class="result-box">
      <span class="result-box-pic">
        <span class="result-box-pic-icon icon-top"></span>
        <span class="result-box-pic-icon icon-right"></span>
        <span class="result-box-pic-icon icon-bottom"></span>
        <span class="result-box-pic-icon icon-left"></span>
        <img
          v-if="isMatch"
          src="../assets/1.png"
          class="result-box-return-img"
          alt="img"
        />
        <img
          v-else
          src="../assets/pic_default.png"
          class="result-box-return-img"
          alt="default_img"
        />
      </span>
      <div class="result-box-text">
        <span>检测结果：</span>
        <span class="value">
          <span style="color: green" v-if="isMatch">匹配成功</span>
          <span style="color: red" v-else>匹配失败</span>
        </span>
      </div>

      <div class="block">
        <label>姓名：</label>
        <span class="value">{{ name }}</span>
      </div>
      <div class="block">
        <label>匹配度：</label>
        <span class="value">{{ score }}</span>
      </div>
      <div class="block">
        <label>耗时：</label>
        <span class="value">{{ time }}</span>
      </div>
    </div>
    <div class="result-option">
      <Button
        type="info"
        :block="true"
        class="button"
        @click.native="$router.push('/')"
        >完成</Button
      >
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  components: { Button },
  created() {
    if (!this.data) {
      this.$router.push("/");
    }
  },
  computed: {
    isMatch() {
      return this.data.ismatch;
    },
    score() {
      return (this.data.score * 100).toFixed(2) + "%";
    },
    time() {
      return this.data.timeused / 1000 + "秒";
    },
    name() {
      return this.data.name;
    },
    data() {
      return this.$route.params.data;
    },
  },
};
</script>
<style lang="less">
.result {
  background: #e1e1e1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 1.25rem;

  .result-box {
    background: #fff;
    -webkit-box-shadow: 0 -4px 10px 0 #e8e8e8;
    -moz-box-shadow: 0 -4px 10px 0 #e8e8e8;
    box-shadow: 0 -4px 10px 0 #e8e8e8;
    padding: 2rem;
    margin: 0 auto 1.25rem auto;

    .block {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 0;
      color: rgb(156, 156, 156);

      label {
        display: inline-block;
        width: 140px;
        text-align: right;
      }

      .value {
        display: inline-block;
        width: 120px;
        text-align: left;
      }
    }

    .result-box-pic {
      display: block;
      height: 17.25rem;
      margin: 0 auto;
      position: relative;
      text-align: center;

      .result-box-pic-icon {
        position: absolute;
        width: 1.677rem;
        height: 1.677rem;

        &.icon-top {
          left: 0;
          top: 0;
          background: url("../assets/icon_left_top.png") 0 0 no-repeat;
          -moz-background-size: 50% 50%;
          background-size: 50% 50%;
        }

        &.icon-right {
          right: 0;
          top: 0;
          background: url("../assets/icon_right_top.png") 0 0 no-repeat;
          -moz-background-size: 50% 50%;
          background-size: 50% 50%;
        }
        &.icon-bottom {
          right: 0;
          bottom: 0;
          background: url("../assets/icon_right_bottom.png") 0 0 no-repeat;
          -moz-background-size: 50% 50%;
          background-size: 50% 50%;
        }
        &.icon-left {
          left: 0;
          bottom: 0;
          background: url("../assets/icon_left_bottom.png") 0 0 no-repeat;
          -moz-background-size: 50% 50%;
          background-size: 50% 50%;
        }
      }

      .result-box-return-img {
        width: 10.25rem;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }

    .result-box-text {
      font-size: 1.3rem;
      color: #00002d;
      display: block;
      text-align: center;
      height: 4rem;
      line-height: 4rem;
    }
  }
  .result-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
