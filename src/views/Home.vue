<template>
  <div class="home">
    <div class="sketch">
      <div class="sketch-img"></div>
      <p class="sketch-text">正面平视手机、保证光线充足<br />请勿遮挡面部</p>
    </div>
    <div class="prompt">
      <div class="prompt-box">
        <div class="prompt-box-text">
          <span class="prompt-box-text-number">1</span>
          <span class="prompt-box-text-content">开启前置摄像头开始录制</span>
          <span class="prompt-box-text-border"></span>
        </div>
        <div class="prompt-box-text">
          <span class="prompt-box-text-number">2</span>
          <span class="prompt-box-text-content">完成录制，等待验证结果</span>
        </div>
      </div>
      <div class="prompt-next">下一步</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style lang="less">
.home {
  .sketch {
    background: hsla(0, 0%, 88%, 0.35);
    padding: 0.875rem 1.625rem 1.25rem;

    .sketch-img {
      background-image: url("../assets/sketch.png");
      width: 14.916rem;
      height: 21.583rem;
      margin: 0 auto;
      background-size: 100% auto;
    }

    .sketch-text {
      font-size: 14px;
      color: #999;
      letter-spacing: 0;
      line-height: 24px;
      text-align: center;
    }
  }

  .prompt {
    box-shadow: 0 -4px 10px 0 #e8e8e8;
    padding-bottom: 12px;

    .prompt-box {
      padding: 4rem 0;

      .prompt-box-text {
        margin: 0 auto 2.666rem;
        height: 1.334rem;
        line-height: 1.334rem;
        width: 23.5rem;

        .prompt-box-text-number {
          -webkit-border-radius: 200px;
          -moz-border-radius: 200px;
          border-radius: 200px;
          border: 1px solid #0073eb;
          text-align: center;
          color: #0073eb;
          display: inline-block;
          width: 1.334rem;
          height: 1.333rem;
          line-height: 1.333rem;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 12px;
          margin-right: 0.833rem;
          letter-spacing: 0;
          vertical-align: top;
        }
        .prompt-box-text-content {
          color: #333;
          letter-spacing: 0;
          white-space: nowrap;
          display: inline-block;
          font-size: 1.333rem;
        }

        .prompt-box-text-border {
          height: 1.9rem;
          margin: 0.417rem 0 0.417rem 4rem;
          width: 0;
          border-left: 1px dotted #0073eb;
          display: block;
        }
      }
    }

    .prompt-next {
      margin: 0 auto;
      height: 4.083rem;
      line-height: 4.083rem;
      text-align: center;
      background: #0073eb;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      color: #fff;
      display: block;
      width: 28.75rem;
      font-size: 16px;
      outline: none;
      border: none;
    }
  }
}
</style>
