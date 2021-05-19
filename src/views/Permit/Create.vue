<template>
    <form id="app">
        <p v-if="errors.length">
            <b>Errors:</b>
            <ul>
                <li :key="error" style="color:red" v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="EmployeeName">Employee's Name: </label>
            <input id="EmployeeName" v-model="permit.EmployeeName" type="text" name="EmployeeName">
        </p>
        <p>
            <label for="EmployeeLastName">Employee's Last Name: </label>
            <input id="EmployeeLastName" v-model="permit.EmployeeLastName" type="text" name="EmployeeLastName">
        </p>
        <p>
            <label for="PermitDate">Permit Date: </label>
            <input id="PermitDate" v-model="permit.PermitDate" type="datetime-local" name="PermitDate">
        </p>
        <p>
            <label for="name">Permit Type: </label>
            <select v-model="permit.PermitTypeId">
                <option value="">SELECT A PERMIT TYPE</option>
                <option v-for="permit of permitTypes"  v-bind:value="permit.id" :key="permit.id">{{permit.description}}</option>
            </select>
        </p>
        <p>
            <a href="/Index">Cancel</a> |
            <button @click="SaveData">Save </button>
        </p>

    </form>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Create',
        data() {
            return {
                errors: [],
                permitTypes: [],
                permit: { ID: 0, EmployeeName: "", EmployeeLastName: "", PermitTypeId: "", PermitDate: new Date() }
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
                            })
                            .catch(() => {
                                alert("An unexpected error occurred");
                            });

                    }
                    else {
                        await axios.put("https://localhost:44318/api/Permit", this.permit)
                            .then(() => {
                                console.log("true")
                            })
                            .catch(() => {
                                console.log("false")
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
                    return false;
                }
                else {
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
