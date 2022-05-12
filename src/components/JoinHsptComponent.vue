<template>
  <div class="signup-form">
    <form @submit.prevent="onSubmit">
      <h2>Organiztion Info</h2>
      <p>Please fill in this form to create an account!</p>
      <hr />
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style="padding: 0.575rem 0.75rem; background: #385e28"
            >
              <span class="fa fa-user"></span>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            name="inputHospitalname"
            placeholder=" 기관명"
            style="padding-left: 7px"
            required="required"
            v-model="hospitalname"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style="padding: 0.575rem 0.75rem; background: #385e28"
            >
              <span class="fa fa-map-marker" aria-hidden="true"></span>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            name="inputAddress"
            placeholder=" 주 소"
            style="padding-left: 7px"
            required="required"
            v-model="inputAddress"
          />
          <button
            class="btn btn-primary"
            type="button"
            id="btnAddSearch"
            @click="getAddressKakao()"
          >
            검색
          </button>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            name="inputDetailAddress"
            placeholder="상세주소"
            required="required"
            v-model="inputAddressDetail"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style="padding: 0.575rem 0.75rem; background: #385e28"
            >
              <i class="fa fa-phone"></i>
            </span>
          </div>
          <input
            type="tel"
            v-model="tel"
            class="form-control"
            name="inputDetailTel"
            placeholder=" 연락처"
            required="required"
            style="padding-left: 7px"
            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
            @keyup="getPhoneMask(tel)"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style="padding: 0.575rem 0.75rem; background: #385e28"
            >
              <i class="fa fa-paper-plane"></i>
            </span>
          </div>
          <input
            v-model="email"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
            class="form-control"
            name="inputEmail"
            placeholder=" Email Address"
            style="padding-left: 7px"
            required="required"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="form-check-label"
          ><input type="checkbox" required="required" /> I accept the
          <a href="#">Terms of Use</a> &amp;
          <a href="#">Privacy Policy</a></label
        >
      </div>
      <div class="form-group">
        <button
          type="submit"
          class="btn btn-primary btn-lg mx-2"
          style="background: #aabbb7 !important"
          @click="goBack()"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn btn-primary btn-lg"
          @click="joinSubmit()"
        >
          Sign Up
        </button>
      </div>
    </form>
    <div class="text-center">
      Already have an account?
      <a href="#"><span style="color: rgb(245, 190, 9)">Login here</span></a>
    </div>
  </div>
</template>

<script>
import shsoftlab from "../js/shsoftlab"

export default {
  data() {
    return {
      hospitalname: "",
      inputAddress: "",
      inputAddressDetail: "",
      tel: "",
      email: "",
    }
  },

  props: {
    clickCount: Number,
  },

  methods: {
    async joinSubmit() {
      if (
        this.hospitalname != "" &&
        this.inputAddress != "" &&
        this.inputAddressDetail != "" &&
        this.tel != "" &&
        this.email != ""
      ) {
        const result = await shsoftlab.requestData(
          "post",
          "/api/hospital/join",
          {
            hospitalname: this.hospitalname,
            address: this.inputAddress,
            addressDetail: this.inputAddressDetail,
            tel: this.tel,
            email: this.email,
          },
        )
        if (result.data.affectedRows == "1") {
          alert("가입 신청이 완료되었습니다.")
          this.goBack()
        }
      } else {
        alert("모든 내용을 입력하세요")
      }
    },

    getPhoneMask(val) {
      let res = this.getMask(val)
      this.tel = res
      //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
      this.model.tel = this.tel.replace(/[^0-9]/g, "")
    },

    getMask(phoneNumber) {
      if (!phoneNumber) return phoneNumber
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "")

      let res = ""
      if (phoneNumber.length < 3) {
        res = phoneNumber
      } else {
        if (phoneNumber.substr(0, 2) == "02") {
          if (phoneNumber.length <= 5) {
            //02-123-5678
            res = phoneNumber.substr(0, 2) + "-" + phoneNumber.substr(2, 3)
          } else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {
            //02-123-5678
            res =
              phoneNumber.substr(0, 2) +
              "-" +
              phoneNumber.substr(2, 3) +
              "-" +
              phoneNumber.substr(5)
          } else if (phoneNumber.length > 9) {
            //02-1234-5678
            res =
              phoneNumber.substr(0, 2) +
              "-" +
              phoneNumber.substr(2, 4) +
              "-" +
              phoneNumber.substr(6)
          }
        } else {
          if (phoneNumber.length < 8) {
            res = phoneNumber
          } else if (phoneNumber.length == 8) {
            res = phoneNumber.substr(0, 4) + "-" + phoneNumber.substr(4)
          } else if (phoneNumber.length == 9) {
            res =
              phoneNumber.substr(0, 3) +
              "-" +
              phoneNumber.substr(3, 3) +
              "-" +
              phoneNumber.substr(6)
          } else if (phoneNumber.length == 10) {
            res =
              phoneNumber.substr(0, 3) +
              "-" +
              phoneNumber.substr(3, 3) +
              "-" +
              phoneNumber.substr(6)
          } else if (phoneNumber.length > 10) {
            //010-1234-5678
            res =
              phoneNumber.substr(0, 3) +
              "-" +
              phoneNumber.substr(3, 4) +
              "-" +
              phoneNumber.substr(7)
          }
        }
      }

      return res
    },

    getAddressKakao: function () {
      new window.daum.Postcode({
        oncomplete: data => {
          if (this.extraAddress !== "") {
            this.extraAddress = ""
          }

          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.inputAddress = data.roadAddress
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.inputAddress = data.jibunAddress
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              //this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              // this.extraAddress +=
              //     this.extraAddress !== ""
              //     ? `, ${data.buildingName}`
              //     : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            // if (this.extraAddress !== "") {
            //     this.extraAddress = `(${this.extraAddress})`;
            // }
          } else {
            this.extraAddress = ""
          }

          // 우편번호를 입력한다.
          //this.postcode = data.zonecode;
        },
      }).open()
    },

    goBack() {
      return this.$router.go(this.clickCount * -1)
    },
  },
}
</script>

<style>
.input-group-text {
  padding: 0.575rem 0.75rem;
}

.form-control {
  font-size: 15px;
}

.form-control,
.form-control:focus,
.input-group-text {
  border-color: #e1e1e1;
}

.form-control,
.btn {
  border-radius: 3px;
}

.signup-form {
  width: 100%;
  margin: 0 auto;
}

.signup-form form {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}

.signup-form h2 {
  color: #9b9b9b;
  /*font-weight: bold;*/
  margin-top: 0;
}

.signup-form hr {
  margin: 0 -30px 20px;
}

.signup-form .form-group {
  margin-bottom: 20px;
}

.signup-form label {
  font-weight: normal;
  font-size: 15px;
}

.signup-form .form-control {
  min-height: 38px;
  box-shadow: none !important;
}

.signup-form .input-group-addon {
  max-width: 42px;
  text-align: center;
}

.signup-form .btn,
.signup-form .btn:active {
  font-size: 16px;
  font-weight: bold;
  background: #19aa8d !important;
  border: none;
}

.signup-form .btn:hover,
.signup-form .btn:focus {
  background: #179b81 !important;
}

.signup-form a {
  color: #fff;
  text-decoration: underline;
}

.signup-form a:hover {
  text-decoration: none;
}

.signup-form form a {
  color: #19aa8d;
  text-decoration: none;
}

.signup-form form a:hover {
  text-decoration: underline;
}

.signup-form .fa {
  font-size: 21px;
}

.signup-form .fa-paper-plane {
  font-size: 18px;
}

.signup-form .fa-check {
  color: #fff;
  left: 17px;
  top: 18px;
  font-size: 7px;
  position: absolute;
}
</style>
