<script setup>
import { ref, watch } from "vue";
import api from "../../api";

const nama_input = ref("");
const jurusan = ref("");
const angkatan = ref("");
const errors = ref({});

const tambah = async () => {
  console.log("submit jalan");  
  let formData = new FormData();

  formData.append("nama", nama_input.value);
  formData.append("jurusan", jurusan.value);
  formData.append("angkatan", angkatan.value);

  try {
    const res = await api.post("api/Alumni", formData);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    window.location.reload();
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
    }
  }
};

const props = defineProps({
  alumni: Object
});
const id_edit = ref(null);
const nama_edit = ref("");
const jurusan_edit = ref("");
const angkatan_edit = ref("");
import { toRaw } from "vue";

watch(
  () => props.alumni,
  (newVal) => {
    const raw = toRaw(newVal);
    if (raw && Object.keys(raw).length > 0) {
      id_edit.value = raw.id ?? null;
      nama_edit.value = raw.nama ?? "";
      jurusan_edit.value = raw.jurusan ?? "";
      angkatan_edit.value = raw.angkatan ?? "";
    }
  },
  { immediate: true }
);


const edit = async () => {
  try {
    const res = await api.post(`/api/Alumni/${id_edit.value}`, {
      nama: nama_edit.value,
      jurusan: jurusan_edit.value,
      angkatan: Number(angkatan_edit.value)
    });
    localStorage.setItem("successMessage", res.data.message || "Data berhasil diupdate");
    window.location.reload();
  } catch (error) {
    errors.value = error.response?.data || { message: "Terjadi kesalahan" };
  }
};
</script>
<template>
  <div class="modal fade" id="modalEditAlumni" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="updatePost">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Alumni</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <input type="text" name="id" v-model="edit_id" id="edit-id" />
            <label>Nama</label>
            <input
              class="form-control mb-1"
              type="text"
              name="nama"
              v-model="edit_nama"
              id="edit-nama"
            />
            <label>Jurusan</label>
            <select
              name="jurusan"
              v-model="edit_jurusan"
              class="form-select mb-2"
            >
              <option value="" selected disabled>--Pilih Jurusan--</option>
              <option value="PPLG">PPLG</option>
              <option value="Akuntansi">Akuntansi</option>
              <option value="Perhotelan">Perhotelan</option>
            </select>
            <label>Angkatan</label>
            <select
              name="angkatan"
              v-model="edit_angkatan"
              id="edit-angkatan"
              class="form-select"
            >
              <option selected>--Pilih Tahun--</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="modal fade" id="modalEditAlumni" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="edit()">
        <input type="hidden" v-model="id_edit"/>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Alumni</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <label>Nama</label>
            <input
              type="text"
               v-model="nama_edit"
              class="form-control mb-2"
            />
            <label>Jurusan</label>
            <select  v-model="jurusan_edit" class="form-select mb-2">
              <option value="" selected disabled>--Pilih Jurusan--</option>
              <option value="PPLG">PPLG</option>
              <option value="Akuntansi">Akuntansi</option>
              <option value="Perhotelan">Perhotelan</option>
            </select>
            <label>Angkatan</label>
            <select v-model="angkatan_edit" class="form-select">
              <option selected>--Pilih Tahun--</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
