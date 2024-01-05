// Setting dateThrowLetter to the dateTomorow before putting into app
var dateTomorrow = new Date();
dateTomorrow.setDate(dateTomorrow.getDate() + 1);
dateTomorrow.setHours(0, 0, 0, 0);

const app = Vue.createApp({
  data() {
    return {
      dateToday: new Date(),
      //dateThrowLetter refers to the date the user has picked for countdown
      dateThrowLetter: dateTomorrow,
      targetReached: false,
    };
  },
  methods: {
    changeDateThrowLetter(event) {
      console.log("change date throw letter");
      console.log(event.target.value);
      this.dateThrowLetter = new Date(event.target.value);
      this.dateThrowLetter.setHours(0, 0, 0, 0);
    },
  },
  watch: {
    secondsLeftFormatted(newValue, oldValue) {
      // console.log("watching...");
      // console.log(this.secondsLeft);

      if (this.secondsLeft < 0) {
        this.targetReached = true;
      } else {
        this.targetReached = false;
      }
      // console.log(this.targetReached);
    },
  },
  computed: {
    dateThrowLetterFormatted() {
      return this.dateThrowLetter.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    secondsLeft() {
      return (this.dateThrowLetter.getTime() - this.dateToday.getTime()) / 1000;
    },
    secondsLeftFormatted() {
      return Math.round(this.secondsLeft).toLocaleString();
    },
    minutesLeft() {
      return this.secondsLeft / 60;
    },
    minutesLeftFormatted() {
      return Math.round(this.minutesLeft).toLocaleString();
    },
    hoursLeft() {
      return this.minutesLeft / 60;
    },
    hoursLeftFormatted() {
      return Math.round(this.hoursLeft).toLocaleString();
    },
    daysLeft() {
      return this.hoursLeft / 24;
    },
    daysLeftFormatted() {
      return Math.round(this.daysLeft).toLocaleString();
    },
    weeksLeft() {
      return this.daysLeft / 7;
    },
    weeksLeftFormatted() {
      return Math.round(this.weeksLeft * 10) / 10;
    },
    monthsLeft() {
      return this.daysLeft / 30;
    },
    monthsLeftFormatted() {
      return Math.round(this.monthsLeft * 10) / 10;
    },
  },
  mounted() {
    console.log("App mounted!");
    setInterval(() => {
      this.dateToday = new Date();
    });
  },
});

app.mount("#vue-mount");

// To unhide section after script is loaded
const section = document.querySelector("section");
section.hidden = false;
