<script setup>
import { onMounted, ref } from "vue";
import api from "../../api";
import { DataTable } from "simple-datatables";
import ModalAlumni from "../Komponen/ModalAlumni.vue";
import "simple-datatables/dist/style.css";

const Alumni = ref([]);
const currentAlumni = ref({});  
const successMessage = ref("");
const fetchDataAlumni = async () => {
  const response = await api.get("/api/Alumni");
  Alumni.value = response.data.data;
};
const handleEdit = async (id) => {
  try {
    const response = await api.get(`/api/Alumni/${id}`);
    currentAlumni.value = response.data.data;
    console.log(currentAlumni.value);
  } catch (error) {
    console.error("Gagal fetch data:", error);
  }
};
onMounted(async () => {
  await fetchDataAlumni();
  // Delay agar DOM selesai render
  const msg = localStorage.getItem("successMessage");
  if (msg) {
    successMessage.value = msg;
    localStorage.removeItem("successMessage");

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  }
  setTimeout(() => {
    new DataTable("#alumniTable");
  }, 0);
});
</script>

<template>
  <div>
    <h3 class="mb-3">Data Alumni</h3>
    <ModalAlumni :alumni="currentAlumni"/>
    <button
      type="button"
      class="mb-3 btn-grad"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Tambahkan Data
    </button>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
    <table id="alumniTable" class="table table-striped table-dark">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Tahun</th>
          <th>Jurusan</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in Alumni" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.Nama }}</td>
          <td>{{ item.angkatan }}</td>
          <td>{{ item.jurusan }}</td>
          <td>
            <button
              type="button"
              
              class="badgeEdit-grad"
              data-bs-toggle="modal"
              data-bs-target="#modalEditAlumni"
              @click="handleEdit(item.id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
