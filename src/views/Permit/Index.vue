<template>
    <div class="m-4">
        <Card create_url="Create">
            <template v-slot:c-header>
                Permit List
            </template>
            <template v-slot:c-body>
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
                            <td>{{permit.permitTypeDescription}}</td>
                            <td>
                                <button class="btn btn-danger" @click="deletePermit(permit.id)">Delete</button> |
                                <button class="btn btn-secondary" @click="updatePermit(permit.id)">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </Card>
    </div>
</template>

<script>
    import Card from '../../components/Card';
    import PermitService from '../../services/permitService';
    export default {
        components: { Card },
        data() {
            return {
                permits: []
            }
        },
        methods: {
            deletePermit: async function (id) {
                await PermitService.methods.deletePermit(id);
                this.getPermits();
            },
            updatePermit: function (id) {
                this.$router.push('/Permit/Create/' + id);
            },
            getPermits: async function () {
                let permits = await PermitService.methods.getPermits();
                this.permits = permits;
            },
        },
        async created() {
            await this.getPermits();
            console.log(this.permits);
        }
    }
</script>