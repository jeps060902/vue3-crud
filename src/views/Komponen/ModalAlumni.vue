<script setup>
import { ref, watch } from "vue";
import api from "../../api";

const nama = ref("");
const jurusan = ref("");
const angkatan = ref("");
const errors = ref({});

const tambah = async () => {
  console.log("submit jalan");
  let formData = new FormData();

  formData.append("nama", nama.value);
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

const edit_id = ref(null);
const edit_nama = ref("");
const edit_jurusan = ref("");
const edit_angkatan = ref("");
const props = defineProps({
  alumni: {
    type: Object,
    default: () => ({}),
  },
});
watch(
  () => props.alumni,

  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      edit_id.value = newVal.id;
      edit_nama.value = newVal.nama;
      edit_jurusan.value = newVal.jurusan;
      edit_angkatan.value = newVal.angkatan;
    }
  }
);

const updatePost = async () => {
  let f = new FormData();
  // f.append("id", edit_id.value);
  f.append("nama", edit_nama.value);
  f.append("jurusan", edit_jurusan.value);
  f.append("angkatan", edit_angkatan.value);
  f.append("_method", "PUT");

  await api
    .post(`/api/Alumni/${edit_id.value}`, f)
    .then((res) => {
      alert("Berhasil mengupdate data");
      window.location.reload();
    })
    .catch((err) => {
      console.error("Error update:", err);
      alert("Gagal mengupdate data. Cek console.");
    });
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
              type="text"
              name="nama"
              v-model="edit_nama"
              id="edit-nama"
              class="form-control mb-2"
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

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <form @submit.prevent="tambah()">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Nama
            <input
              v-model="nama"
              class="form-control mb-1"
              type="text"
              placeholder="Tambahkan Nama"
              name="nama"
            />
            <div v-if="errors.nama" class="text-danger mb-2">
              {{ errors.nama[0] }}
            </div>
            Jurusan
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01"
                >Options</label
              >
              <select
                v-model="jurusan"
                class="form-select"
                id="inputGroupSelect01"
                name="jurusan"
                required
              >
                <option value="" selected disabled>--Pilih Jurusan--</option>
                <option value="PPLG">PPLG</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Perhotelan">Perhotelan</option>
              </select>
              <div v-if="errors.jurusan" class="text-danger mb-2">
                {{ errors.jurusan[0] }}
              </div>
            </div>
            Tahun Angkatan
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01"
                >Options</label
              >
              <select
                v-model="angkatan"
                class="form-select"
                id="inputGroupSelect01"
                name="angkatan"
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
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
              <div v-if="errors.angkatan" class="text-danger mb-2">
                {{ errors.angkatan[0] }}
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
