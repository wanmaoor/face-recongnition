<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  -webkit-tap-highlight-color: rgb(244 244 244);
}
html,
body {
  background: rgb(244 244 244);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
