<template>
    <div class="col-md-6">
        <div class="m-4">
            <Card>
                <template v-slot:c-header>
                    <h3 v-if="Edit">
                        Update Permit
                    </h3>
                    <h3 v-if="!Edit">
                        Create Permit
                    </h3>
                </template>
                <template v-slot:c-body>
                    <form id="app" class="m-4">
                        <div class="mb-3">
                            <label for="EmployeeName">Employee's Name: </label>
                            <input id="EmployeeName" class="form-control " v-bind:class="{ 'is-invalid' : v$.permit.employeeName.$error }" v-model="permit.employeeName" type="text" name="EmployeeName">
                            <span class="text-danger" v-if="v$.permit.employeeName.$error">{{v$.permit.employeeName.$errors[0].$message}}</span>
                        </div>
                        <div class="mb-3">
                            <label for="EmployeeLastName" class="col-4">Employee's Last Name: </label>
                            <input id="EmployeeLastName" class="form-control" v-bind:class="{ 'is-invalid' : v$.permit.employeeLastName.$error }" v-model="permit.employeeLastName" type="text" name="EmployeeLastName">
                            <span class="text-danger" v-if="v$.permit.employeeLastName.$error">{{v$.permit.employeeLastName.$errors[0].$message}}</span>

                        </div>
                        <div class="mb-3">
                            <label for="PermitDate" class="col-2">Permit Date: </label>
                            <input id="PermitDate" class="form-control" v-bind:class="{ 'is-invalid' : v$.permit.permitDate.$error }" v-model="permit.permitDate" type="datetime-local" name="PermitDate">
                            <span class="text-danger" v-if="v$.permit.permitDate.$error">{{v$.permit.permitDate.$errors[0].$message}}</span>

                        </div>
                        <div class="mb-3">
                            <label for="name" class="col-2">Permit Type: </label>
                            <select class="form-control" v-bind:class="{ 'is-invalid' : v$.permit.permitTypeId.$error }" v-model="permit.permitTypeId">
                                <option value="">SELECT A PERMIT TYPE</option>
                                <option v-for="permit of permitTypes" v-bind:value="permit.id" :key="permit.id">{{permit.description}}</option>
                            </select>
                            <span class="text-danger" v-if="v$.permit.permitTypeId.$error">{{v$.permit.permitTypeId.$errors[0].$message}}</span>
                        </div>
                        <a href="/permit/Index" class="btn btn-secondary">Cancel</a> |
                        <button @click="SaveData" class="btn btn-primary">Save</button>
                    </form>
                </template>
            </Card>
        </div>
    </div>
</template>

<script>
    import Card from '../../components/Card';

    import PermitTypeService from '../../services/permitTypeService';
    import PermitService from '../../services/permitService';

    import useValidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators'

    export default {
        name: 'Create',
        components: {
            Card
        },
        data() {
            return {
                v$: useValidate(),
                Edit: false,
                errors: [],
                permitTypes: [],
                permit: { id: 0, employeeName: "", employeeLastName: "", permitTypeId: "", permitDate: "" }
            }
        },
        validations: {
            permit: {
                employeeName: { required },
                employeeLastName: { required },
                permitTypeId: { required },
                permitDate: { required }
            }
        },
        methods: {
            SaveData: async function (e) {
                e.preventDefault();
                this.v$.$validate();
                if (!this.v$.$error) {
                    if (!this.ValidID()) {
                        this.permit.id = 0;
                        await PermitService.methods.addPermit(this.permit).then(() => {
                            this.$router.push('/Permit/Index');
                        }).catch(() => {
                            alert("An unexpected error occurred");
                        });
                    }
                    else {
                        console.log(this.permit);
                        await PermitService.methods.updatePermit(this.permit).then(() => {
                            this.$router.push('/Permit/Index');
                        }).catch(() => {
                            alert("An unexpected error occurred");
                        });
                    }
                }
            },
            GetData: async function () {
                let permit = await PermitService.methods.getPermit(this.permit.id);
                this.permit = permit;
            },
            ValidID: function () {
                if (this.permit.id == undefined || this.permit.id == "") {
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
            this.permitTypes = await PermitTypeService.methods.getData();
            this.permit.id = this.$route.params.id;
            if (this.ValidID()) {
                this.GetData();
            }
        }
    }
</script>
