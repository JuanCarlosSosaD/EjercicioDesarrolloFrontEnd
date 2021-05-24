import axios from "axios";

const PermitService = {
    methods: {
        deletePermit: async function (id) {
            let result = confirm("Are you sure you want to delete this record?");
            if (result) {
                await axios.delete("https://localhost:44318/api/Permit/" + id);
            }
        },
        getPermits:  async function () {
            let permits = await axios.get("https://localhost:44318/api/Permit");
            return permits.data;
        },
        addPermit: async function (permit) {
            await axios.post("https://localhost:44318/api/Permit", permit)
            .then(() => {
                console.log("Permit saved successfully");
             })
            .catch((error) => {
                console.error(error);
            });
        },
        updatePermit:  async function (permit) {
            await axios.put("https://localhost:44318/api/Permit", permit)
                .then(() => {
                    console.log("Permit updated successfully");
                })
                .catch(() => {
                    return false;
                });
        },
        getPermit: async function (id) {
            let permit = await axios.get("https://localhost:44318/api/Permit/" + id);
            return permit.data;
        }
    }
};

export default PermitService;





