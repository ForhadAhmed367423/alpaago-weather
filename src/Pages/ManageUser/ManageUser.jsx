import { AiFillDelete } from "react-icons/ai";
import useAxiosUser from "../../Hooks/useAxiosUser";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const ManageUser = () => {
    const [FirstData,refresh] = useAxiosUser();
    const axiosPublic = useAxiosPublic()
	const [status, setStatus] = useState("")

	const { data = [], refetch } = useQuery({
        queryKey: ["userData", status],
        queryFn: async () => {
            const { data: Users } = await axiosPublic.get(`https://weather-alpaago-server.vercel.app/users?status=${status}`)
            return Users;
			
			
        }
    })


    const deleteUser = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure you want to delete this account?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No"
            });
    
            if (result.isConfirmed) {
                await axiosPublic.delete(`/users?id=${id}`);
                alert("User deleted");
                refetch();
            } else if (result.isDenied) {
                return;
            }
        } catch (error) {
            console.error("Error while deleting user:", error);
        }
    
        

    }


	const hanldeChangeStatus = async (status, id) => {

        if (status === "active") {
            await axiosPublic.put(`/users/status?id=${id}&&status=${"inactive"}`)
            alert("Status update successfully")
            refresh()
        }

        if (status === "inactive") {
            await axiosPublic.put(`/users/status?id=${id}&&status=${"active"}`)
            alert("Status update successfully")
            refresh()
        }

        else {
            return;
        }


    }


    return (
        <div className="w-[600px] mx-auto">
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
	<h2 className="mb-8 text-4xl  font-semibold leadi text-center">Manage Users</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup className="w-20">
				<col />
				<col className=""/>
                <col/>
				
				<col  />
			</colgroup>
			<thead className="dark:bg-gray-700">
				<tr className="text-left">
					<th className="p-3">Email</th>
					<th className="p-3">Date</th>
					<th className="p-3">Status</th>
                    <th className="p-4">Action</th>
				</tr>
			</thead>
			{
                FirstData.map(users=>(
                    <tbody key={users._id}>
				
				<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
					
					
					<td className="">
						<span className="px-3 py-1 font-semibold  dark:text-white">
							<span>{users?.email}</span>
						</span>
					</td>

                    <td className="p-3">
						<p>{users?.currentDate}</p>
						
					</td>

					<td className="">
						<span className="px-3 py-1 font-semibold dark:text-white">
						<button style={{ color: users?.status === "active" ? "#12b712" : "red" }} onClick={() => hanldeChangeStatus(users?.status, users?._id)}><span>{users?.status}</span></button>
						</span>
					</td>
                    <td className="p-3">
						<span className=" p-4 py-1 font-semibold text-center flex items-center dark:bg-red-400 dark:text-white rounded-sm ">
							<button onClick={() => deleteUser(users?._id)}  className="flex items-center text-center" >Delete <AiFillDelete/></button>
						</span>
					</td>
                    
				</tr>
			</tbody>
                ))
            }
		</table>
	</div>
</div>
        </div>
    );
};

export default ManageUser;