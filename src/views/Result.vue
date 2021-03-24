<template>
  <div class="result">
    <div class="result-box">
      <span class="result-box-pic">
        <span class="result-box-pic-icon icon-top"></span>
        <span class="result-box-pic-icon icon-right"></span>
        <span class="result-box-pic-icon icon-bottom"></span>
        <span class="result-box-pic-icon icon-left"></span>
        <img
          src="../assets/pic_default.png"
          class="result-box-return-img"
          alt="default_img"
        />
      </span>
      <span class="result-box-text"></span>
      <div class="result-box-value"></div>
    </div>
    <div class="result-option">
      <Button
        type="info"
        :block="true"
        class="button"
        @click.native="$router.push('/')"
        >完成</Button
      >
      <Button type="info" plain :block="true" class="button">重拍</Button>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  components: { Button },
  mounted() {
    console.log(this.$route.params);
  },

  computed: {
    src() {
      return this.$route.params.src;
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
    margin-bottom: 1.25rem;

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
      font-size: 1.5rem;
      color: #00002d;
      display: block;
      text-align: center;
      height: 4rem;
      margin-bottom: 3.542rem;
    }
  }
  .result-option {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button:first-child {
      margin-right: 4px;
    }

    .button:last-child {
      margin-left: 4px;
    }
  }
}
</style>
