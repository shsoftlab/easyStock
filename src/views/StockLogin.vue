<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-6 d-none d-md-flex bg-image"></div>
      <!-- The content half -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockLogin",
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style>
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  background-image: url("https://therichpost.com/wp-content/uploads/2021/02/login-split.jpg");
  background-size: cover;
  background-position: center center;
}
</style>
