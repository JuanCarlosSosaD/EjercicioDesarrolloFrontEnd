<template>
    <div class="m-4">

        <div class="card light">
            <div class="card-header">
                <h3>
                    Permit List
                    <a class="btn  float-end btn-sm btn-primary " href="/permit/Create">+ Add new </a>
                </h3>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Employee's Name</th>
                            <th>Employee's Last Name</th>
                            <th>Permit Date</th>
                            <th>Permit Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="permit of permits" :key="permit.id">
                            <td>{{permit.employeeName}}</td>
                            <td>{{permit.employeeLastName}}</td>
                            <td>{{permit.permitDate}}</td>
                            <td>{{permit.permitType.description}}</td>
                            <td>
                                <button class="btn btn-danger" @click="deletePermit(permit.id)">Delete</button> |
                                <button class="btn btn-secondary" @click="updatePermit(permit.id)" v-bind:href="'/permit/Create/'+permit.id">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                permits: []
            }
        },
        methods: {
            deletePermit: async function (id) {
                let result = confirm("Are you sure you want to delete this record?");
                if (result) {
                    await axios.delete("https://localhost:44318/api/Permit/" + id);
                    this.getPermits();
                }
            },
            updatePermit: async function (id) {
                this.$router.push('/Permit/Create/' + id)
            },
            getPermits: async function () {
                let permits = await axios.get("https://localhost:44318/api/Permit");
                this.permits = permits.data;
            }
        },
        async created() {
            this.getPermits();
        }
    }
</script>