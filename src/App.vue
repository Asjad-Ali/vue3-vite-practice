<template>
  <div class="fullscreen-bg">
    <div class="box">
      <div class="top-container">
        <h1 style="text-align: center">{{ leftdataValue }}</h1>
        <div class="center">
          <div
            class="top-line center"
            style="flex-direction: row; justify-content: space-around"
          >
            <div>
              <button
                :class="{ 'color-result-btn': result === 'WIN' }"
                class="result-btn"
              >
                WIN
              </button>
            </div>
            <div>
              <button
                :class="{ 'color-result-btn': result === 'FAIR' }"
                class="result-btn"
              >
                FAIR
              </button>
            </div>
            <div>
              <button
                :class="{ 'color-result-btn': result === 'LOSE' }"
                class="result-btn"
              >
                LOSE
              </button>
            </div>
          </div>
          <div
            class="center"
            style="flex-direction: row; justify-content: space-around"
          >
            <h1 style="text-align: center">YOUR OFFERS</h1>
            <h1 style="text-align: center">&nbsp;|&nbsp;</h1>
            <h1 style="text-align: center">THEIR OFFERS</h1>
          </div>
          <div class="progress-bar">
            <span
              id="progress"
              class="progress-bar-fill"
              :style="`width: ${progress}%`"
              style="text-align: center"
            >
            </span>
          </div>
        </div>
        <h1 style="text-align: center">{{ rightdataValue }}</h1>
      </div>
      <div v-if="isModal" class="modal">
        <div class="modal-content">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <b style="font-size: 30px">Select Pets</b>
            <div class="center" style="flex-direction: row">
              <input type="text" placeholder="Search.." v-model="query" />
              <span
                style="margin-left: 10px"
                @click="isModal = false"
                class="close"
                >&times;</span
              >
            </div>
          </div>
          <div class="modal-container">
            <div style="display: flex; flex-flow: column">
              <button @click="type = 'all'" class="type-btn">All</button>
              <button @click="type = 'pets'" class="type-btn">PETS</button>
              <button @click="type = 'petWear'" class="type-btn">
                PET WEAR
              </button>
              <button @click="type = 'strollers'" class="type-btn">
                STOLLERS
              </button>
              <button @click="type = 'eggs'" class="type-btn">EGGS</button>
              <button @click="type = 'vehicles'" class="type-btn">
                VAHICALES
              </button>
              <button @click="type = 'toys'" class="type-btn">TOYES</button>
              <button @click="type = 'others'" class="type-btn">OTHERS</button>
            </div>
            <div style="display: flex; flex-direction: column">
              <div class="modal-grid-container">
                <div
                  @click="selectPet(pet)"
                  v-for="pet in data"
                  :key="pet.value"
                  class="grid-item"
                >
                  <img :src="pet.img" alt="" />
                </div>
              </div>
              <div class="english-word">
                <button class="btn">F</button>
                <button class="btn">R</button>
                <button class="btn">D</button>
                <button class="btn">N</button>
                <button class="btn">M</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="grid-container">
          <div
            @click="deleteLeft(index)"
            v-for="(pet, index) in leftData"
            :key="index"
            class="grid-item"
          >
            <img :src="pet.img" alt="" />
          </div>
          <div v-if="leftData.length < 18" class="grid-item">
            <button @click="(isModal = true), (side = 'left')" class="add-btn">
              +
            </button>
          </div>

          <div
            v-for="obj in leftEmptyLength"
            :key="obj"
            class="grid-item"
          ></div>
        </div>
        <div>
          <h1 style="text-align: center">Trade</h1>
        </div>
        <div class="grid-container">
          <div
            @click="deleteRight(index)"
            v-for="pet in rightData"
            :key="pet.value"
            class="grid-item"
          >
            <img :src="pet.img" alt="" />
          </div>
          <div v-if="rightData.length < 18" class="grid-item">
            <button @click="(isModal = true), (side = 'right')" class="add-btn">
              +
            </button>
          </div>
          <div
            v-for="obj in rightEmptyLength"
            :key="obj"
            class="grid-item"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  pets,
  petWear,
  strollers,
  vehicles,
  toys,
  eggs,
  others,
} from "./data/data.json";
const isModal = ref(false);
const side = ref("");
const leftData = ref([]);
const rightData = ref([]);
const leftEmptyLength = ref(8);
const rightEmptyLength = ref(8);
const type = ref("All");
const query = ref("");
const result = computed(() => {
  if (leftdataValue.value === rightdataValue.value) return "FAIR";
  else if (leftdataValue.value > rightdataValue.value) return "LOSE";
  else return "WIN";
});
const leftdataValue = computed(() => {
  let sum = 0;
  leftData.value.forEach((item) => {
    sum += item.value;
  });
  return sum;
});
const rightdataValue = computed(() => {
  let sum = 0;
  rightData.value.forEach((item) => {
    sum += item.value;
  });
  return sum;
});

const progress = computed(() => {
  return (
    (rightdataValue.value / (rightdataValue.value + leftdataValue.value)) *
      100 || 0
  );
});

function selectPet(pet) {
  if (side.value === "left") {
    if (leftData.value.length < 18) leftData.value.push(pet);
    else {
      alert("The set is already full with 18 pets.");
      return;
    }
    if (leftData.value.length < 8) --leftEmptyLength.value;
    else if (leftData.value.length === 8) leftEmptyLength.value = 0;
    else if (leftData.value.length === 9) leftEmptyLength.value = 2;
    else if (leftData.value.length === 10) leftEmptyLength.value = 1;
    else if (leftData.value.length === 11) leftEmptyLength.value = 0;
    else if (leftData.value.length === 12) leftEmptyLength.value = 2;
    else if (leftData.value.length === 13) leftEmptyLength.value = 1;
    else if (leftData.value.length === 14) leftEmptyLength.value = 0;
    else if (leftData.value.length === 15) leftEmptyLength.value = 2;
    else if (leftData.value.length === 16) leftEmptyLength.value = 1;
    else leftEmptyLength.value = 0;
  } else {
    if (rightData.value.length < 18) rightData.value.push(pet);
    else {
      alert("The set is already full with 18 pets.");
      return;
    }
    if (rightData.value.length < 8) --rightEmptyLength.value;
    else if (rightData.value.length === 8) rightEmptyLength.value = 0;
    else if (rightData.value.length === 9) rightEmptyLength.value = 2;
    else if (rightData.value.length === 10) rightEmptyLength.value = 1;
    else if (rightData.value.length === 11) rightEmptyLength.value = 0;
    else if (rightData.value.length === 12) rightEmptyLength.value = 2;
    else if (rightData.value.length === 13) rightEmptyLength.value = 1;
    else if (rightData.value.length === 14) rightEmptyLength.value = 0;
    else if (rightData.value.length === 15) rightEmptyLength.value = 2;
    else if (rightData.value.length === 16) rightEmptyLength.value = 1;
    else rightEmptyLength.value = 0;
  }
}

function deleteLeft(index) {
  leftData.value.splice(index, 1);
  if (leftData.value.length < 8)
    leftEmptyLength.value = 8 - leftData.value.length;
  else if (leftData.value.length === 8) leftEmptyLength.value = 0;
  else if (leftData.value.length === 9) leftEmptyLength.value = 2;
  else if (leftData.value.length === 10) leftEmptyLength.value = 1;
  else if (leftData.value.length === 11) leftEmptyLength.value = 0;
  else if (leftData.value.length === 12) leftEmptyLength.value = 2;
  else if (leftData.value.length === 13) leftEmptyLength.value = 1;
  else if (leftData.value.length === 14) leftEmptyLength.value = 0;
  else if (leftData.value.length === 15) leftEmptyLength.value = 2;
  else if (leftData.value.length === 16) leftEmptyLength.value = 1;
}
function deleteRight(index) {
  rightData.value.splice(index, 1);
  if (rightData.value.length < 8)
    rightEmptyLength.value = 8 - rightData.value.length;
  else if (rightData.value.length === 8) rightEmptyLength.value = 0;
  else if (rightData.value.length === 9) rightEmptyLength.value = 2;
  else if (rightData.value.length === 10) rightEmptyLength.value = 1;
  else if (rightData.value.length === 11) rightEmptyLength.value = 0;
  else if (rightData.value.length === 12) rightEmptyLength.value = 2;
  else if (rightData.value.length === 13) rightEmptyLength.value = 1;
  else if (rightData.value.length === 14) rightEmptyLength.value = 0;
  else if (rightData.value.length === 15) rightEmptyLength.value = 2;
  else if (rightData.value.length === 16) rightEmptyLength.value = 1;
}

const data = computed(() => {
  const alldata = pets.concat(petWear, strollers, vehicles, toys, eggs, others);
  if (query.value)
    return alldata.filter((obj) =>
      obj.name.toLowerCase().includes(query.value.toLowerCase())
    );
  else if (type.value === "Pets") return pets;
  else if (type.value === "petWear") return petWear;
  else if (type.value === "strollers") return strollers;
  else if (type.value === "vehicles") return vehicles;
  else if (type.value === "toys") return toys;
  else if (type.value === "eggs") return eggs;
  else if (type.value === "others") return others;
  else return alldata;
});
</script>

<style scoped>
.fullscreen-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* Background styles for fullscreen-bg */
  background: url("/images/background.jpg") center center / cover no-repeat; /* Background image */
}

.fullscreen-bg img {
  /* Ensure the image covers the entire container */
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.box {
  background-color: rgb(184, 184, 167);
  height: 670px;
  width: 1000px;
  border-radius: 20px;
}

.center {
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.top-line {
  border: 2px solid black;
  height: 50px;
  background: #e0e0e0;
  margin: 20px;
  border-radius: 60px;
  width: 70%;
}

.container {
  display: grid;
  grid-template-columns: 45% 10% 45%;
  padding: 10px;
  align-items: center;
}
.top-container {
  display: grid;
  grid-template-columns: 15% 70% 15%;
  padding: 5px;
  margin: 5px;
  align-items: center;
}
.modal-container {
  display: grid;
  grid-template-columns: 45% 10% 45%;
  padding: 10px;
  align-items: center;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #313131;
  padding: 5px;
  border-radius: 10px;
  max-height: 431px;
  overflow-y: auto;
}
.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  text-align: center;
  height: 130px;
  width: 130px;
  margin: 4px;
  padding: 2px;
}

.add-btn {
  width: 100%;
  height: 100%;
  background-color: #10de10;
  font-size: 100px;
  color: white;
  border: none;
  cursor: pointer;
}
.overlay {
  /* Background color or gradient for overlay */
  background: rgba(0, 0, 0, 0.5); /* Example: semi-transparent black */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.english-word {
  margin: 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
}

.btn {
  background: #58d795;
  height: 40px;
  width: 87px;
  border: none;
  border-radius: 10px;
  font-size: 30px;
  cursor: pointer;
}
.type-btn {
  background: #4b07dc;
  padding: 5px;
  margin: 5px;
  border: none;
  border-radius: 10px;
  font-size: 30px;
  cursor: pointer;
}
/* CSS for modal styling */

.modal-container {
  display: flex;
  justify-content: space-around;
}

.modal-grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #313131;
  padding: 5px;
  border-radius: 10px;
  border-radius: 10px;
  max-height: 431px;
  overflow-y: auto;
}

.modal {
  display: block; /* Hide modal by default */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 1% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #363535;
  float: right;
  font-size: 30px;
  font-weight: bolder;
}

.close:hover,
.close:focus {
  color: rgb(202, 11, 11);
  text-decoration: none;
  cursor: pointer;
}

.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  padding: 3px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  border-radius: 20px;
}

.progress-bar-fill {
  display: block;
  height: 12px;
  background-color: #659cef;
  border-radius: 20px;
  transition: width 500ms ease-in-out;
}
.result-btn {
  font-size: 25px;
  background: none;
  border: none;
}
.color-result-btn {
  border-radius: 24px;
  width: 89px;
  height: 45px;
  background: darkgreen;
}
h1 {
  margin-top: 2px;
  margin-bottom: 2px;
}

input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url("/searchicon.webp");
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}
</style>
