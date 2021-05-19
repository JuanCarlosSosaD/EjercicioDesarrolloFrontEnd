<template>
    <div class="row">
        <div class="col-md-6">
            <div class="m-4">

                <div class="card light">
                    <div class="card-header">
                        <h3 v-if="Edit">
                            Update Permit
                        </h3>
                        <h3 v-if="!Edit">
                            Create Permit
                        </h3>
                    </div>
                    <form id="app" class="m-4">
                        <p v-if="errors.length">
                            <b>Errors:</b>
                            <ul>
                                <li :key="error" style="color:red" v-for="error in errors">{{ error }}</li>
                            </ul>
                        </p>
                        <div class="mb-3">
                            <label for="EmployeeName">Employee's Name: </label>
                            <input id="EmployeeName" class="form-control" v-model="permit.EmployeeName" type="text" name="EmployeeName">
                        </div>
                        <div class="mb-3">
                            <label for="EmployeeLastName" class="col-2">Employee's Last Name: </label>
                            <input id="EmployeeLastName" class="form-control" v-model="permit.EmployeeLastName" type="text" name="EmployeeLastName">

                        </div>
                        <div class="mb-3">
                            <label for="PermitDate" class="col-2">Permit Date: </label>
                            <input id="PermitDate" class="form-control" v-model="permit.PermitDate" type="datetime-local" name="PermitDate">

                        </div>
                        <div class="mb-3">
                            <label for="name" class="col-2">Permit Type: </label>
                            <select class="form-control" v-model="permit.PermitTypeId">
                                <option value="">SELECT A PERMIT TYPE</option>
                                <option v-for="permit of permitTypes" v-bind:value="permit.id" :key="permit.id">{{permit.description}}</option>
                            </select>
                        </div>
                        <a href="/permit/Index" class="btn btn-secondary">Cancel</a> |
                        <button @click="SaveData" class="btn btn-primary">Save</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
 
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Create',
        data() {
            return {
                Edit: false,
                errors: [],
                permitTypes: [],
                permit: { ID: 0, EmployeeName: "", EmployeeLastName: "", PermitTypeId: "", PermitDate: new Date().toISOString().slice(0, 10) }
            }
        },
        methods: {
            SaveData: async function (e) {
                e.preventDefault();
                this.errors = [];
                let check = true;
                if (this.permit.EmployeeName === '') {
                    this.errors.push("Employee's name is required");
                    check = false;
                }
                if (this.permit.EmployeeLastName === '') {
                    this.errors.push("Employee's lastname is required");
                    check = false;
                }
                if (this.permit.PermitDate === '') {
                    this.errors.push("Permit Date is required");
                    check = false;
                }
                if (this.permit.PermitTypeId == '') {
                    this.errors.push("Permit type is required");
                    check = false;
                }
                if (check) {
                    if (!this.ValidID()) {
                        this.permit.ID = 0;
                        await axios.post("https://localhost:44318/api/Permit", this.permit)
                            .then(() => {
                                alert("Permit saved successfully");
                                this.$router.push('/Permit/Index')
                            })
                            .catch(() => {
                                alert("An unexpected error occurred");
                            });
                    }
                    else {
                        await axios.put("https://localhost:44318/api/Permit", this.permit)
                            .then(() => {
                                alert("Permit updated successfully");
                                this.$router.push('/Permit/Index')
                            })
                            .catch(() => {
                                alert("An unexpected error occurred");
                            });
                    }
                }

            },
            GetData: async function () {
                let permit = await axios.get("https://localhost:44318/api/Permit/" + this.permit.ID);
                console.log(permit.data);
                this.permit.EmployeeName = permit.data.employeeName;
                this.permit.EmployeeLastName = permit.data.employeeLastName;
                this.permit.PermitDate = permit.data.permitDate;
                this.permit.PermitTypeId = permit.data.permitTypeId;
            },
            ValidID: function () {
                if (this.permit.ID == undefined || this.permit.ID == "") {
                    this.Edit = false;
                    return false;
                }
                else {
                    this.Edit = true;
                    return true;
                }
            }
        },
        async created() {
            let types = await axios.get("https://localhost:44318/api/PermitType");
            this.permitTypes = types.data;
            this.permit.ID = this.$route.params.id;
            if (this.ValidID()) {
                this.GetData();
            }
        }
    }
</script>
