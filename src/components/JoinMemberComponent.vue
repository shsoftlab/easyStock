<template>
  <div class="signup-form">
    <form @submit.prevent="onSubmit">
      <h2>User Info</h2>
      <p>Please fill in this form to create an account!</p>
      <hr />
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style="padding: 0.575rem 0.75rem; background: #385e28"
            >
              <span class="fa fa-building"></span>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            name="hospitalsrno"
            placeholder=" 기관코드"
            required="required"
            v-model="hospitalsrno"
          />
          <button
            class="btn btn-primary"
            type="button"
            id="btnAddSearch"
            @click="checkHospitalsrno()"
          >
            조회
          </button>
        </div>
      </div>
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
            name="username"
            style="padding-left: 7px"
            placeholder=" 성 함"
            required="required"
            v-model="userName"
          />
        </div>
      </div>
      <div class="form-group">
        <select
          class="custom-select"
          aria-label="Default select example"
          @change="selDepartment($event)"
        >
          <option selected>부서</option>
          <option
            v-for="d in departements"
            :key="d.depth2_code"
            :value="d.depth2_code"
          >
            {{ d.depth2_name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <select
          class="custom-select"
          aria-label="Default select example"
          @change="selPosition($event)"
        >
          <option selected>직급</option>
          <option
            v-for="d in positions"
            :key="d.depth2_code"
            :value="d.depth2_code"
          >
            {{ d.depth2_name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style="padding: 0.575rem 0.75rem; background: #385e28"
            >
              <i class="fa fa-address-card"></i>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            name="id"
            placeholder=" ID"
            style="padding-left: 7px"
            required="required"
            v-model="userId"
          />
          <button
            class="btn btn-primary"
            type="button"
            id="btnAddSearchID"
            @click="checkUserId()"
          >
            조회
          </button>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style="padding: 0.575rem 0.75rem; background: #385e28"
            >
              <i class="fa fa-lock"></i>
            </span>
          </div>
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder=" 비밀번호"
            style="padding-left: 7px"
            required="required"
            v-model="password"
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
              <i class="fa fa-lock"></i>
              <i class="fa fa-check"></i>
            </span>
          </div>
          <input
            type="password"
            class="form-control"
            name="confirm_password"
            placeholder=" 비밀번호 확인"
            style="padding-left: 7px"
            required="required"
            v-model="rePassword"
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
            type="email"
            class="form-control"
            name="email"
            placeholder=" Email Address"
            style="padding-left: 7px"
            required="required"
            v-model="email"
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
          @click="goBack()"
          style="background: #aabbb7 !important"
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
      <a href="#" @click="goBack()"
        ><span style="color: rgb(245, 190, 9)">Login here</span></a
      >
    </div>
  </div>
</template>

<script>
import shsoftlab from "../js/shsoftlab"

export default {
  data() {
    return {
      hospitalsrno: "",
      userName: "",
      userId: "",
      password: "",
      rePassword: "",
      email: "",
      department: null,
      position: null,
      departements: {},
      positions: {},
      validHospitalSrno: false,
      validUserId: false,
    }
  },

  props: {
    clickCount: Number,
  },

  mounted() {
    this.readPublicDepartments().then(result => {
      this.departements = result.data
    })

    this.readPublicPositions().then(result => {
      this.positions = result.data
    })
  },

  methods: {
    async joinSubmit() {
      if (!this.validHospitalSrno) {
        alert("기관코드를 조회해 주세요.")
        return
      }

      if (!this.validUserId) {
        alert("ID를 조회해 주세요")
        return
      }

      const result = await shsoftlab.requestData("post", "/api/member/join", {
        hospitalsrno: this.hospitalsrno,
        userName: this.userName,
        userId: this.userId,
        password: this.password,
        position: this.position,
        department: this.department,
        email: this.email,
      })

      if (result.data.affectedRows == "1") {
        alert("가입 신청이 완료되었습니다. 관리자 승인 후 사용 가능합니다.")
        this.goBack()
      }
    },

    async checkUserId() {
      if (this.userId != "") {
        const result = await shsoftlab.requestData(
          "get",
          `/api/member/read/${this.userId}`,
          "",
        )
        if (result.data.length > 0) {
          this.validUserId = false
          alert("동일한 ID가 존재 합니다.")
        } else {
          this.validUserId = true
          alert("등록 가능한 ID 입니다.")
        }
      } else {
        this.validUserId = false
        alert("ID를 입력하세요.")
      }
    },

    async checkHospitalsrno() {
      if (this.hospitalsrno != "") {
        const result = await shsoftlab.requestData(
          "get",
          `/api/hospital/read/${this.hospitalsrno}`,
          "",
        )
        if (result.data.length > 0) {
          const hn = result.data[0].hospitalname
          this.validHospitalSrno = true
          alert(hn)
        } else {
          this.validHospitalSrno = false
          alert(`기관코드 ${this.hospitalsrno} 가 존재하지 않습니다.`)
        }
      } else {
        this.validHospitalSrno = false
        alert("기관코드를 입력하세요.")
      }
    },

    async readPublicDepartments() {
      const result = await shsoftlab.requestData(
        "get",
        `/api/public/read/department`,
        "",
      )
      if (result.data.length == 0) {
        alert("해당 기본 코드가 없습니다.")
      } else {
        return result
      }
    },

    async readPublicPositions() {
      const result = await shsoftlab.requestData(
        "get",
        `/api/public/read/position`,
        "",
      )
      if (result.data.length == 0) {
        alert("해당 기본 코드가 없습니다.")
      } else {
        return result
      }
    },

    goBack() {
      return this.$router.go(this.clickCount * -1)
    },

    selDepartment(e) {
      this.department = e.target.value
    },

    selPosition(e) {
      this.position = e.target.value
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
