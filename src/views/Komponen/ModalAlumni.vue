<script setup>
import { ref } from "vue";
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
</script>
<template>
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
