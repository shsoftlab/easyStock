<template>
  <div
    class="col-md-6"
    style="color: #fff; background: #315238; font-family: 'Roboto', sans-serif"
  >
    <div class="login d-flex align-items-center py-5">
      <!-- Demo content-->
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-xl-7 mx-auto">
            <h3 class="display-6 mb-5">easyStock Sign Up</h3>
            <div class="d-flex carousel-nav">
              <a
                href="#"
                :class="isHospitalJoin ? 'col active' : 'col'"
                @click="selectJoinType(0)"
                >기관가입</a
              >
              <a
                href="#"
                :class="isHospitalJoin ? 'col' : 'col active'"
                @click="selectJoinType(1)"
                >사용자가입</a
              >
            </div>
            <JoinHsptComponent
              v-show="isHospitalJoin"
              :clickCount="countTabClick"
            />
            <JoinMemberComponent
              v-show="isMemberJoin"
              :clickCount="countTabClick"
            />
            <!-- <router-view></router-view> -->
          </div>
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
  <!-- End -->
</template>

<script>
import JoinHsptComponent from "./JoinHsptComponent.vue"
import JoinMemberComponent from "./JoinMemberComponent.vue"

export default {
  data() {
    return {
      isHospitalJoin: true,
      isMemberJoin: false,
      countTabClick: 1,
    }
  },
  methods: {
    selectJoinType(type) {
      if (type == 0) {
        this.isHospitalJoin = true
        this.isMemberJoin = false
      } else {
        this.isHospitalJoin = false
        this.isMemberJoin = true
      }

      this.countTabClick++
    },
  },
  components: {
    JoinHsptComponent,
    JoinMemberComponent,
  },
}
</script>

<style>
.carousel-nav {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.carousel-nav a {
  color: #fff;
  padding: 20px;
  text-align: center;
  display: inline-block;
}
.carousel-nav a:hover {
  color: rgb(245, 190, 9);
  background: #ccc;
  background: #719b7a;
}
.carousel-nav a.active {
  color: rgb(245, 190, 9);
  font-weight: bold;
  background: #253e2a;
}
a,
a:hover {
  text-decoration: none !important;
}
</style>
