<template>
  <div class="home">
    <div class="setting">
      <Popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        placement="bottom-end"
        @select="handleSelect"
      >
        <template #reference>
          <Button type="info" size="small">{{ mode }}</Button>
        </template>
      </Popover>
    </div>
    <div class="sketch">
      <div class="sketch-img"></div>
      <p class="sketch-text">正面平视手机、保证光线充足<br />请勿遮挡面部</p>
      <div class="prompt-box">
        <div class="prompt-box-text">
          <span class="prompt-box-text-number">1</span>
          <span class="prompt-box-text-content">开启前置摄像头开始录制</span>
          <span class="prompt-box-text-border"></span>
        </div>
        <div class="prompt-box-text" style="margin-bottom: 0">
          <span class="prompt-box-text-number">2</span>
          <span class="prompt-box-text-content">完成录制，等待验证结果</span>
        </div>
      </div>
    </div>
    <div class="prompt">
      <div class="form">
        <Form @submit="alert('航航a')">
          <Field
            v-model="name"
            label="姓名"
            colon
            label-align="right"
            placeholder="请输入姓名"
            @focus="scrollBottom"
          />
          <Field
            v-model="cardno"
            label-align="right"
            colon
            label="身份证号码"
            placeholder="请输入身份证号"
            @focus="scrollBottom"
          />
        </Form>
      </div>
      <div class="prompt-next" v-if="mode === '非读数模式'">
        <label for="take-video" :disabled="true" :class="uploadClass">
          下一步
        </label>
        <input
          type="file"
          accept="video/*"
          id="take-video"
          capture="camcorder"
          :class="uploadClass"
          :disabled="nextAvailable"
        />
      </div>
      <div class="prompt-next" v-else @click="handleClick">下一步</div>
      <Overlay
        :show="showOverlay"
        @click="showOverlay = false"
        :close-on-click-overlay="true"
      >
        <div>hello</div>
        <div class="wrapper">
          <OverlayContainer />
        </div>
      </Overlay>
      <Overlay :show="showLoading">
        <LoadingOverlay />
      </Overlay>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Overlay, Notify, Field, Form, Popover, Button } from "vant";
import store from "@/store";
import OverlayContainer from "@/components/Overlay.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
export default {
  name: "Home",
  components: {
    Overlay,
    OverlayContainer,
    LoadingOverlay,
    Field,
    Form,
    Popover,
    Button,
  },
  data() {
    return {
      showPopover: false,
      showOverlay: false,
      showLoading: false,
      name: "",
      cardno: "",
      actions: [{ text: "读数模式" }, { text: "非读数模式" }],
    };
  },
  methods: {
    handleSelect(val) {
      store.commit("change_mode", val.text);
    },
    handleClick() {
      this.showOverlay = true;
    },
    scrollBottom() {
      setTimeout(() => {
        window.scrollTo(0, 1000000000);
      }, 0);
    },
  },
  computed: {
    mode() {
      return this.$store.state.countingMode;
    },
    nextAvailable() {
      return !(this.name && this.cardno);
    },
    uploadClass() {
      return {
        "custom-file-upload": true,
        disabled: this.nextAvailable,
      };
    },
  },
  mounted() {
    const input = document.getElementById("take-video");
    input.onchange = (event) => {
      this.showLoading = true;
      const files = event.target.files;
      if (files && files.length > 0) {
        let file = files[0];
        fetch("/biometricProxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceid: "portal_system_loginSign",
            params: {
              loginname: "cpyf_ylzdsjsjfx",
              password: "b19d3341936c888adbaa8ab3c22c3c7e",
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => res.datas[0]["vcode"])
          .then((vcode) => {
            let data = new FormData();
            const formElement = {
              vcode,
              loginName: "cpyf_ylzdsjsjfx",
              name: this.name,
              cardno: this.cardno,
              file,
              serviceid: "face_vivo_cardno",
            };
            Object.keys(formElement).forEach((key) => {
              data.append(key.toString(), formElement[key.toString()]);
            });
            // 设置超时
            const timeout = 1000 * 60;
            const controller = new AbortController();
            const id = setTimeout(() => {
              controller.abort();
              this.showLoading = false;
              Notify({
                type: "warning",
                message: "请求超时, 请上传符合要求的视频或减少视频的录制时长",
                duration: 1000 * 5,
              });
            }, timeout);

            fetch("/biometricProxy", {
              method: "POST",
              body: data,
              signal: controller.signal,
            })
              .then((res) => res.json())
              .then((res) => {
                clearTimeout(id);
                if (res.code === 200) {
                  this.showLoading = false;
                  this.$router.push({
                    path: "/result",
                    name: "Result",
                    params: { data: res.datas[0] },
                  });
                } else if (res.code === 500) {
                  this.showLoading = false;
                  Notify({
                    type: "danger",
                    message: res.message,
                  });
                  if (
                    res.message ===
                    "调用算法识别活体认证服务返回状态码：2008,返回消息：invalid video error"
                  ) {
                    Notify({
                      type: "danger",
                      message: "视频内容不符合要求，识别失败",
                    });
                  } else if (
                    res.message ===
                    "调用算法照片服务返回状态码：1100,返回消息：invalid crendential"
                  ) {
                    Notify({
                      type: "danger",
                      message: "身份信息不规范，请重新填写",
                    });
                  } else if (
                    res.message ===
                    "调用算法照片服务返回状态码：3004,返回消息：invalid id number"
                  ) {
                    Notify({
                      type: "danger",
                      message: "身份信息不规范，请重新填写",
                    });
                  } else if (res.message.includes("3003")) {
                    Notify({
                      type: "danger",
                      message: "姓名与身份证号不匹配，请重新填写",
                    });
                  }
                } else if (res.code === 10016) {
                  this.showLoading = false;
                  Notify({ type: "danger", message: res.message });
                }
              });
          });
        // let reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.addEventListener("loadend", () => {
        //   this.$router.push({
        //     path: "/result",
        //     name: "Result",
        //     params: { src: reader.result },
        //   });
        // });
      } else {
        alert("请重新上传视频");
      }
    };
  },
};
</script>

<style lang="less">
input[type="file"] {
  display: none;
}
.wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  padding-top: 20vh;
}

.custom-file-upload {
  width: 100%;
  display: inline-block;
  cursor: pointer;
  background: #0073eb;

  &.disabled {
    opacity: 0.2;
  }
}
.home {
  .sketch {
    background: hsla(0, 0%, 88%, 0.35);
    padding: 0.875rem 1.625rem 1.25rem;

    .sketch-img {
      background-image: url("../assets/sketch.png");
      width: 7.916rem;
      height: 11.583rem;
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

  .prompt-box {
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

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
  .prompt {
    box-shadow: 0 -4px 10px 0 #e8e8e8;
    padding-bottom: 12px;

    .form {
      margin: 0.75rem;
    }

    .prompt-next {
      margin: 0 0.75rem;
      height: 4.083rem;
      line-height: 4.083rem;
      text-align: center;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      color: #fff;
      display: block;
      font-size: 16px;
      outline: none;
      border: none;
    }
  }

  .setting {
    position: absolute;
    top: 6px;
    right: 6px;
  }
}
</style>
