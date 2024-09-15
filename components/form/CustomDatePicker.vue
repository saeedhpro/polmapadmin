<template>
  <v-menu
    v-model="showDatePicker"
    :close-on-content-click="false"
    offset-y
    bottom
    transition="slide-x-transition"
    @click="openDatePicker"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        text
        width="100%"
        class="custom-date-picker"
        :class="{'open': showDatePicker}"
        height="54px"
        :ripple="false"
      >
        <slot name="label">
          <span class="custom-date-picker-label">{{ getLabel | toPersianNumber }}</span>
        </slot>
        <slot name="arrow">
          <img src="/main/arrow-down.svg" alt="" class="custom-date-picker-arrow">
          <!--          <v-icon alt="" class="custom-date-picker-arrow">mdi-chevron-down</v-icon>-->
        </slot>
      </v-btn>
    </template>
    <div class="custom-date-picker-content">
      <div class="custom-date-picker-content-header">
        <v-btn
          dense
          icon
          @click="prevMonth"
          class="custom-date-picker-content-arrow"
        >
          <img src="/main/arrow-right.svg" alt="">
        </v-btn>
        <span class="custom-date-picker-content-title" v-if="faDate">
          {{ faDate | toPersianDate('MMMM YYYY') }}
          </span>
        <v-btn
          dense
          icon
          @click="nextMonth"
        >
          <img src="/main/arrow-left.svg" alt="">
        </v-btn>
      </div>
      <v-divider/>
      <div class="custom-date-picker-days-list">
        <div
          v-for="(l, n) in monthDays"
          :key="n"
          class="custom-date-picker-days"
        >
          <div
            v-for="(d, n) in l"
            :key="n"
            class="custom-date-picker-day"
            :class="{
              'selected': isSelected(d),
              'disabled': dayIsDisabled(d),
              'today': isToday(d)
            }"
            @click="selectDay(d)"
          >
            {{ d | toPersianNumber }}
          </div>
        </div>
      </div>
    </div>
  </v-menu>
</template>

<script>
import moment from 'jalali-moment'

export default {
  name: "CustomDatePicker",
  props: {
    label: {
      type: String,
      default: "",
    },
    initialValue: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: "",
    },
    disablePast: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      showDatePicker: false,
      date: "",
      selectedDay: "",
      year: 1800,
      month: 1,
      day: 1,
      jYear: 1300,
      jMonth: 1,
      jDay: 1,
    }
  },
  mounted() {
    this.setInitDateValue()
  },
  methods: {
    openDatePicker() {
      this.showDatePicker = true
    },
    closeDatePicker() {
      this.showDatePicker = false
    },
    nextMonth() {
      this.date = moment(`${this.jYear}/${this.jMonth}/${this.jDay}`, "jYYYY/jMM/jDD").add(1, "jMonth").locale("en").format("YYYY/MM/DD")
    },
    prevMonth() {
      this.date = moment(`${this.jYear}/${this.jMonth}/${this.jDay}`, "jYYYY/jMM/jDD").subtract(1, "jMonth").locale("en").format("YYYY/MM/DD")
    },
    setInitDateValue() {
      if (this.initialValue && this.isValidDate(this.initialValue)) {
        this.date = this.initialValue
        this.selectedDay = this.$moment(this.initialValue).format("YYYY/MM/DD")
      } else {
        this.selectedDay = ""
        this.date = this.$moment().format('YYYY/MM/DD')
      }
    },
    isValidDate(date) {
      return this.$moment(date).isValid()
    },
    dayIsDisabled(day) {
      if(this.disabled) {
        return true
      }
      if (this.disablePast && this.date) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        const d = moment(`${dStr}/${day}`, "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD")
        const r = this.$moment(d).diff(this.$moment(this.date))
        return r < 0
      }
      return false
    },
    isSelected(day) {
      if (this.selectedDay) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        const d = moment(`${dStr}/${day}`, "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD")
        const r = this.$moment(d).diff(this.$moment(this.selectedDay))
        return r === 0
      }
      return false
    },
    isToday(day) {
      if (this.date) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        const d = moment(`${dStr}/${day}`, "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD")
        const r = this.$moment(d).diff(this.$moment(this.date))
        return r === 0
      }
      return false
    },
    selectDay(day) {
      if (!day || this.disabled) return
      if (!this.dayIsDisabled(day)) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        this.selectedDay = moment(`${dStr}/${day}`, "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD")
        this.closeDatePicker()
        this.$emit('select', this.selectedDay)
        this.$emit('input', this.selectedDay)
      }
    }
  },
  computed: {
    faDate() {
      if (!this.date) {
        return ""
      }
      return this.$moment(this.date).format('jYYYY/jMM/jDD')
    },
    faDaysInMonth() {
      if (!this.faDate) {
        return 0
      }
      return moment.from(this.faDate, "fa", "jYYYY/jMM").jDaysInMonth()
    },
    monthDays() {
      let days = []
      let j = 0;
      days[j] = []
      for (let i = 1; i <= this.faDaysInMonth; i++) {
        if (i < 10) {
          days[j].push(`0${i}`)
        } else {
          days[j].push(i)
        }
        if (i % 7 === 0) {
          j++
          days[j] = []
        }
      }
      for (let i = days[j].length; i < 7; i++) {
        days[j][i] = ``
      }
      return days;
    },
    getLabel() {
      if (this.selectedDay) {
        return moment.from(this.selectedDay, "en", "YYYY/MM/DD").locale("fa").format("jYYYY/jMM/jDD")
      } else {
        return this.label
      }
    }
  },
  watch: {
    date() {
      this.year = parseInt(this.$moment(this.date).format("YYYY"))
      this.month = parseInt(this.$moment(this.date).format("MM"))
      this.day = parseInt(this.$moment(this.date).format("DD"))
      this.jYear = parseInt(this.$moment(this.date).format("jYYYY"))
      this.jMonth = parseInt(this.$moment(this.date).format("jMM"))
      this.jDay = parseInt(this.$moment(this.date).format("jDD"))
    },
    initialValue(val) {
      this.setInitDateValue()
    }
  }
}
</script>

<style scoped lang="scss">
.open-btn {
  width: 100%;
}

.v-menu__content {
  box-shadow: 0 1px 8px rgb(26 26 26 / 12%) !important;
  border-color: rgba(26, 26, 26, 0.12) !important;
  border-radius: 0 0 15px 15px !important;
  border-bottom: 1px solid #E4E4E4 !important;
  transition: all 0.3s ease-in-out !important;
}

.custom-date-picker {
  background: #FFFFFF;
  border: 1px solid #B4B4B4;
  border-radius: 15px;
  height: 56px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 13px 20px;
  position: relative;
  transition: all .3s ease-in-out;

  &.v-btn:before {
    background-color: #FFFFFF !important;
  }

  &.open {
    box-shadow: 0 1px 8px rgba(26, 26, 26, 0.12);
    border-color: rgba(26, 26, 26, 0.12);
    border-radius: 15px 15px 0 0;
    border-bottom: 1px solid #E4E4E4;
    transition: all .3s ease-in-out;

    .custom-date-picker-label {
      color: #E4E4E4;
      transition: all .3s ease-in-out;
    }

    .custom-date-picker-arrow {
      transform: rotateX(180deg);
      transition: all .3s ease-in-out;
    }

    .custom-date-picker-content {
      display: flex;
      flex-direction: column;
      top: 55px;
      right: 0;
      transition: all .3s ease-in-out;
    }
  }

  .custom-date-picker-label {
    font-family: 'IRANSansX', sans-serif !important;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #6C6C6C;
    transition: all .3s ease-in-out;
  }

  .custom-date-picker-arrow {
    position: absolute;
    left: 0;
    top: 0;
    transition: all .3s ease-in-out;
  }

}

.custom-date-picker-content {
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0 1px 8px rgba(26, 26, 26, 0.12);
  border-radius: 0 0 15px 15px;
  padding: 10px;
  transition: all .3s ease-in-out;
  z-index: 9;

  .custom-date-picker-content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .custom-date-picker-content-title {
      font-family: 'IRANSansX', sans-serif !important;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      color: #1A1A1A;
    }
  }

  .custom-date-picker-days-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    direction: ltr;
    padding: 0 10px;

    .custom-date-picker-days {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      margin-top: 5px;

      //&:last-child {
      //  width: 108px;
      //}

      .custom-date-picker-day {
        font-family: 'IRANSansX', sans-serif !important;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #1A1A1A;
        height: 24px;
        width: 24px;
        margin-right: 11px;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }

        &.disabled {
          color: #B4B4B4;
          cursor: not-allowed;
        }

        &.today {
          background: rgba(231, 109, 45, 0.15);
          border-radius: 5px;
        }

        &.selected {
          background: #E76D2D !important;
          border-radius: 5px;
          color: #FFFFFF !important;
        }
      }
    }
  }
}
</style>
