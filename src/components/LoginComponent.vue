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
            <h3 class="display-1" style="color: white">
              easy<span style="color: rgb(245, 190, 9)">Stock</span>
            </h3>
            <p class="mb-4">easyStock offers a new experience</p>
            <form @submit.prevent="onSubmit">
              <div class="form-group mb-3">
                <input
                  id="input-hospitalsrno"
                  type="text"
                  v-model="hospitalsrno"
                  placeholder="병원코드"
                  required=""
                  autofocus=""
                  class="form-control rounded-pill border-0 shadow-sm px-4"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  id="input-id"
                  type="text"
                  v-model="userId"
                  placeholder="ID"
                  required=""
                  autofocus=""
                  class="form-control rounded-pill border-0 shadow-sm px-4"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  id="inputPassword"
                  type="password"
                  v-model="userPassword"
                  placeholder="Password"
                  required=""
                  class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                />
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <input
                  id="customCheck1"
                  type="checkbox"
                  checked
                  class="custom-control-input"
                />
                <label for="customCheck1" class="custom-control-label"
                  >Remember password</label
                >
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                style="margin-right: 7px"
                @click="loginSubmit()"
              >
                Sign in
              </button>
              <router-link to="/login/join">
                <button
                  type="submit"
                  class="btn btn-success btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                >
                  Sign up
                </button></router-link
              >
              <div class="text-center mt-4">
                <p>
                  Copyright © SHINHWA SOFTLAB Corp. all rights reserved.<br />
                  <a
                    href="https://www.shsoftlab.com"
                    class="font-italic text-warning"
                    ><u>www.shsoftlab.com</u></a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
  <!-- End -->
</template>

<script>
import shsoftlab from "../js/shsoftlab";

export default {
  methods: {
    loginSubmit() {
      if (
        this.hospitalsrno != "" &&
        this.userId != "" &&
        this.userPassword != ""
      ) {
        shsoftlab
          .requestData("post", "/api/member/login", {
            hospitalsrno: this.hospitalsrno,
            userId: this.userId,
            password: this.userPassword,
          })
          .then((result) => {
            if (result.status == 201) {
              this.$router.push({
                name: "main",
                params: { productId: "P0002" },
              });
            } else {
              alert("로그인 실패");
            }
          });
      } else {
        alert("로그인 정보를 입력하세요");
      }
    },
  },

  data() {
    return {
      hospitalsrno: "",
      userId: "",
      userPassword: "",
    };
  },
};
</script>

<style></style>
