import axios from "axios";

const PermitService = {
    methods: {
        getData: async function () {
            let types = await axios.get("https://localhost:44318/api/PermitType");
            return types.data;
        }
    }
}

export default PermitService;