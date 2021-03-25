<template>
  <div
    style="
      font-size: 40px;
      color: #333;
      display: inline-block;
      width: 2.6rem;
      height: 5rem;
      line-height: 5rem;
      margin-right: 4px;
      border: 1px solid #e1e1e1;
      border-radius: 10px;
      text-align: center;
      box-sizing: border-box;
    "
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  name: "NumberPanel",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>
