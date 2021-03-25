<template>
  <div class="container" @click.stop>
    <Loading type="spinner">正在识别中，请耐心等待...</Loading>
  </div>
</template>

<script>
import { Loading } from "vant";
export default {
  name: "LoadingOverlay",
  components: { Loading },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
